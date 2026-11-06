// Local development server only. On Vercel, the site is served from /public
// and the form runs as the serverless function in /api/contact.js.
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const { handleContact } = require("./lib/contact");

const PORT = process.env.PORT || 3000;
const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);
app.use((req, res, next) => {
  res.set({ "X-Content-Type-Options": "nosniff", "Referrer-Policy": "strict-origin-when-cross-origin", "X-Frame-Options": "DENY" });
  next();
});
app.use(express.json({ limit: "10kb" }));

app.post("/api/contact", async (req, res) => {
  const { status, json } = await handleContact(req.body, req.ip);
  res.status(status).json(json);
});

// Only the public folder is served. Secrets (.env, service-account.json) are never reachable.
app.use(express.static(path.join(__dirname, "public"), { index: "index.html", dotfiles: "deny" }));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Portfolio running at http://localhost:${PORT}`);
    console.log(`Google Sheet: ${process.env.GOOGLE_SHEET_ID ? "configured" : "NOT configured (set GOOGLE_SHEET_ID in .env)"}`);
  });
}
module.exports = { app };
