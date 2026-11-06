const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const fs = require("fs");
const express = require("express");
const rateLimit = require("express-rate-limit");
const crypto = require("crypto");

const PORT = process.env.PORT || 3000;
const SHEET_ID = process.env.GOOGLE_SHEET_ID || "";
const SHEET_TAB = process.env.GOOGLE_SHEET_TAB || "Contacts";

/* ---------- Google Sheets (service account, no extra libraries) ---------- */
function loadCredentials() {
  if (!SHEET_ID) return null;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const file = path.resolve(__dirname, process.env.GOOGLE_SERVICE_ACCOUNT_FILE || "service-account.json");
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
const b64 = v => Buffer.from(typeof v === "string" ? v : JSON.stringify(v)).toString("base64url");

let cachedToken = { value: "", exp: 0 };
async function accessToken(cred) {
  if (cachedToken.value && Date.now() < cachedToken.exp - 60000) return cachedToken.value;
  const now = Math.floor(Date.now() / 1000);
  const head = b64({ alg: "RS256", typ: "JWT" });
  const claim = b64({
    iss: cred.client_email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600
  });
  const sig = crypto.sign("RSA-SHA256", Buffer.from(`${head}.${claim}`), cred.private_key).toString("base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: `${head}.${claim}.${sig}`
    })
  });
  const j = await r.json();
  if (!r.ok) throw new Error("Google sign-in failed: " + (j.error_description || j.error));
  cachedToken = { value: j.access_token, exp: Date.now() + j.expires_in * 1000 };
  return cachedToken.value;
}

async function appendRow(cred, row) {
  const token = await accessToken(cred);
  const range = encodeURIComponent(`${SHEET_TAB}!A:D`);
  // RAW: text is stored as text, never run as a formula
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
  const r = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ values: [row] })
  });
  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    throw new Error(`Sheets API ${r.status}: ${(j.error && j.error.message) || "unknown error"}`);
  }
}

/* ---------- validation ---------- */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
function clean(body) {
  const s = v => (typeof v === "string" ? v.trim() : "");
  const out = { name: s(body.name), email: s(body.email), message: s(body.msg) };
  if (out.name.length < 1 || out.name.length > 100) return { error: "Enter your name (up to 100 characters)." };
  if (!EMAIL.test(out.email) || out.email.length > 200) return { error: "Enter a valid email address." };
  if (out.message.length < 5 || out.message.length > 3000) return { error: "Write a message of 5 to 3000 characters." };
  return { value: out };
}

/* ---------- app ---------- */
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use((req, res, next) => {
  res.set({ "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin", "X-Frame-Options": "DENY" });
  next();
});
app.use(express.json({ limit: "10kb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { ok: false, error: "Too many messages. Please try again in a few minutes." }
});

app.post("/api/contact", limiter, async (req, res) => {
  const body = req.body || {};
  if (body.website) return res.json({ ok: true }); // honeypot: bots fill this hidden field

  const { error, value } = clean(body);
  if (error) return res.status(400).json({ ok: false, error });

  let cred;
  try { cred = loadCredentials(); } catch (e) {
    console.error("Contact form: bad Google credentials file:", e.message);
  }
  if (!cred) {
    console.error("Contact form is not configured: set GOOGLE_SHEET_ID and the service account key in .env");
    return res.status(503).json({ ok: false, error: "The form is not set up yet. Please email me directly." });
  }

  try {
    await appendRow(cred, [new Date().toISOString(), value.name, value.email, value.message]);
    res.json({ ok: true });
  } catch (e) {
    console.error("Contact form: saving to Google Sheet failed:", e.message);
    res.status(500).json({ ok: false, error: "Could not save your message. Please email me directly." });
  }
});

// Only the public folder is served. Secrets (.env, service-account.json) are never reachable.
app.use(express.static(path.join(__dirname, "public"), { index: "index.html", dotfiles: "deny" }));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
    console.log(`Google Sheet: ${SHEET_ID ? "configured" : "NOT configured (set GOOGLE_SHEET_ID in .env)"}`);
  });
}
module.exports = { app, clean };
