// Vercel serverless function: POST /api/contact
const { handleContact } = require("../lib/contact");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }
  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
  const { status, json } = await handleContact(req.body, ip);
  res.status(status).json(json);
};
