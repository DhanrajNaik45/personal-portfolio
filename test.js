const test = require("node:test");
const assert = require("node:assert");
const crypto = require("crypto");

// Fake Google credentials so no real account is needed in tests
const { privateKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" }
});
process.env.GOOGLE_SHEET_ID = "SHEET123";
process.env.GOOGLE_SHEET_TAB = "Contacts";
process.env.GOOGLE_SERVICE_ACCOUNT_JSON = JSON.stringify({ client_email: "bot@test.iam.gserviceaccount.com", private_key: privateKey });

const { app } = require("./server");

let server, base;
const realFetch = global.fetch;
const sheetCalls = [];
let sheetStatus = 200;

test.before(async () => {
  await new Promise(r => { server = app.listen(0, r); });
  base = `http://127.0.0.1:${server.address().port}`;
  // Intercept only Google calls; let local requests through
  global.fetch = async (url, opts) => {
    const u = String(url);
    if (u.startsWith("https://oauth2.googleapis.com/token")) {
      return new Response(JSON.stringify({ access_token: "tok", expires_in: 3600 }), { status: 200 });
    }
    if (u.startsWith("https://sheets.googleapis.com/")) {
      sheetCalls.push({ url: u, opts });
      return new Response(JSON.stringify(sheetStatus === 200 ? {} : { error: { message: "denied" } }), { status: sheetStatus });
    }
    return realFetch(url, opts);
  };
});
test.after(() => { global.fetch = realFetch; server.close(); });

const post = body => realFetch(base + "/api/contact", { method: "POST", headers: { "Content-Type": "application/json", "X-Forwarded-For": "9.9.9." + Math.floor(Math.random() * 250) }, body: JSON.stringify(body) });

test("valid message is appended to the sheet as RAW text", async () => {
  const r = await post({ name: "Asha", email: "asha@example.com", msg: "=HYPERLINK(\"x\") need a CRM" });
  assert.strictEqual(r.status, 200);
  assert.deepStrictEqual(await r.json(), { ok: true });
  const c = sheetCalls.at(-1);
  assert.match(c.url, /SHEET123\/values\/Contacts!A%3AD:append\?valueInputOption=RAW/);
  const row = JSON.parse(c.opts.body).values[0];
  assert.strictEqual(row.length, 4);
  assert.strictEqual(row[1], "Asha");
  assert.strictEqual(row[2], "asha@example.com");
  assert.ok(row[3].startsWith("=HYPERLINK")); // stored as plain text because of RAW
  assert.strictEqual(c.opts.headers.Authorization, "Bearer tok");
});

test("bad input is rejected and nothing is written", async () => {
  const before = sheetCalls.length;
  for (const b of [{ name: "", email: "a@b.co", msg: "hello there" }, { name: "A", email: "nope", msg: "hello there" }, { name: "A", email: "a@b.co", msg: "hi" }, { name: "A", email: "a@b.co", msg: "x".repeat(3001) }]) {
    assert.strictEqual((await post(b)).status, 400);
  }
  assert.strictEqual(sheetCalls.length, before);
});

test("honeypot spam gets ok but nothing is written", async () => {
  const before = sheetCalls.length;
  const r = await post({ name: "Bot", email: "bot@x.com", msg: "buy now please", website: "http://spam" });
  assert.strictEqual(r.status, 200);
  assert.strictEqual(sheetCalls.length, before);
});

test("sheet failure returns an error to the visitor", async () => {
  sheetStatus = 403;
  const r = await post({ name: "Asha", email: "asha@example.com", msg: "hello there" });
  sheetStatus = 200;
  assert.strictEqual(r.status, 500);
  assert.match((await r.json()).error, /email me/i);
});

test("secret files are never served", async () => {
  for (const p of ["/.env", "/server.js", "/package.json", "/service-account.json", "/../.env"]) {
    const r = await realFetch(base + p);
    assert.notStrictEqual(r.status, 200, p + " must not be served");
  }
  assert.strictEqual((await realFetch(base + "/")).status, 200);
});

test("there is no way to read stored messages", async () => {
  for (const p of ["/api/contact", "/api/messages", "/api/contacts"]) {
    const r = await realFetch(base + p);
    assert.notStrictEqual(r.status, 200);
  }
});
