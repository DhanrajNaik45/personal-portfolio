// Shared contact-form logic. Used by the Vercel function (api/contact.js)
// and by the local dev server (local-server.js).
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

/* ---------- Google Sheets (service account, no extra libraries) ---------- */
function loadCredentials() {
  if (!process.env.GOOGLE_SHEET_ID) return null;
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) return JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  const file = path.resolve(__dirname, "..", process.env.GOOGLE_SERVICE_ACCOUNT_FILE || "service-account.json");
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
  const tab = process.env.GOOGLE_SHEET_TAB || "Contacts";
  const range = encodeURIComponent(`${tab}!A:E`);
  // RAW: text is stored as text, never run as a formula
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.GOOGLE_SHEET_ID}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;
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
  const out = { name: s(body.name), email: s(body.email), phone: s(body.phone).replace(/[\s\-().]/g, ""), message: s(body.msg) };
  if (out.name.length < 1 || out.name.length > 100) return { error: "Enter your name (up to 100 characters)." };
  if (!EMAIL.test(out.email) || out.email.length > 200) return { error: "Enter a valid email address." };
  if (!/^\+?\d{7,15}$/.test(out.phone)) return { error: "Enter a valid mobile number (7 to 15 digits, add the country code if outside India)." };
  if (out.message.length < 5 || out.message.length > 3000) return { error: "Write a message of 5 to 3000 characters." };
  return { value: out };
}

/* ---------- simple per-visitor limit (5 per 15 min; per server instance) ---------- */
const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 15 * 60 * 1000;
  const list = (hits.get(ip) || []).filter(t => now - t < win);
  list.push(now);
  hits.set(ip, list);
  if (hits.size > 5000) hits.clear();
  return list.length > 5;
}

/* ---------- the whole request, returned as { status, json } ---------- */
async function handleContact(body, ip) {
  body = body && typeof body === "object" ? body : {};
  if (body.website) return { status: 200, json: { ok: true } }; // honeypot: bots fill this hidden field
  if (limited(ip || "unknown")) return { status: 429, json: { ok: false, error: "Too many messages. Please try again in a few minutes." } };

  const { error, value } = clean(body);
  if (error) return { status: 400, json: { ok: false, error } };

  let cred;
  try { cred = loadCredentials(); } catch (e) {
    console.error("Contact form: bad Google credentials:", e.message);
  }
  if (!cred) {
    console.error("Contact form is not configured: set GOOGLE_SHEET_ID and GOOGLE_SERVICE_ACCOUNT_JSON");
    return { status: 503, json: { ok: false, error: "The form is not set up yet. Please email me directly." } };
  }
  try {
    await appendRow(cred, [new Date().toISOString(), value.name, value.email, value.phone, value.message]);
    return { status: 200, json: { ok: true } };
  } catch (e) {
    console.error("Contact form: saving to Google Sheet failed:", e.message);
    return { status: 500, json: { ok: false, error: "Could not save your message. Please email me directly." } };
  }
}

module.exports = { handleContact, clean };
