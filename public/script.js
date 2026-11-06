const $ = (s, r = document) => r.querySelector(s);
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
};

/* hero */
$("#label").textContent = CONFIG.label;
$("#first").textContent = CONFIG.first;
$("#last").textContent = CONFIG.last;
$("#intro").textContent = CONFIG.intro;
$("#year").textContent = new Date().getFullYear();
const photo = $("#photo");
if (CONFIG.photo) {
  const img = el("img");
  img.src = CONFIG.photo; img.alt = CONFIG.name;
  photo.append(img);
} else {
  const ph = el("div", "ph");
  ph.append(el("b", "", CONFIG.initials), el("span", "", "YOUR PHOTO HERE"));
  photo.append(ph);
}

/* marquee (two copies for a seamless loop) */
for (let r = 0; r < 2; r++) CONFIG.marquee.forEach(t => $("#track").append(el("span", "", t)));

/* about */
CONFIG.about.forEach(t => $("#aboutText").append(el("p", "", t)));
CONFIG.facts.forEach(f => {
  const li = el("li");
  li.append(el("b", "", f.big), el("span", "", f.small));
  $("#facts").append(li);
});
const cur = $("#current");
cur.append(el("h3", "", CONFIG.currently.title.toUpperCase()));
const cul = el("ul");
CONFIG.currently.lines.forEach(l => cul.append(el("li", "", l)));
cur.append(cul);

/* why */
$("#quote").textContent = CONFIG.why.quote;
CONFIG.why.items.forEach(i => {
  const d = el("div", "why-item");
  d.append(el("h3", "", i.tag), el("p", "", i.text));
  $("#why").append(d);
});

/* skills */
CONFIG.skills.forEach(s => {
  const d = el("div", "skill");
  const tags = el("div", "tags");
  s.tools.forEach(t => tags.append(el("span", "tag", t)));
  d.append(el("h3", "", s.name), el("p", "", s.text), tags);
  $("#skillGrid").append(d);
});

/* work */
const grid = $("#workGrid"), filters = $("#filters"), modal = $("#modal"), mBody = $("#mBody");
let opener = null;
function openProject(p, btn) {
  opener = btn;
  mBody.textContent = "";
  const title = el("h3", "", p.title);
  title.id = "mTitle";
  mBody.append(el("span", "m-kind", p.kind.toUpperCase()), title, el("p", "text", p.text));
  const flow = el("div", "flow");
  p.flow.forEach(s => flow.append(el("span", "node", s)));
  mBody.append(flow);
  const ul = el("ul", "points");
  p.points.forEach(t => ul.append(el("li", "", t)));
  mBody.append(ul);
  if (p.impact) mBody.append(el("p", "impact", p.impact));
  const tags = el("div", "tags");
  p.tech.forEach(t => tags.append(el("span", "tag", t)));
  mBody.append(tags);
  if (p.link) {
    const a = el("a", "live", p.link.label.toUpperCase());
    a.href = p.link.url; a.target = "_blank"; a.rel = "noopener";
    mBody.append(a);
  }
  modal.showModal();
}
function draw(kind) {
  grid.textContent = "";
  CONFIG.projects.filter(p => kind === "ALL" || p.kind.toUpperCase() === kind).forEach(p => {
    const c = el("button", "card");
    c.type = "button";
    c.append(el("span", "k", p.kind.toUpperCase()), el("h3", "", p.title), el("p", "", p.text), el("span", "more", "VIEW DETAILS →"));
    c.addEventListener("click", () => openProject(p, c));
    grid.append(c);
  });
}
["ALL", ...new Set(CONFIG.projects.map(p => p.kind.toUpperCase()))].forEach((k, i) => {
  const b = el("button", "", k);
  b.setAttribute("role", "tab");
  b.setAttribute("aria-selected", i === 0);
  b.addEventListener("click", () => {
    filters.querySelectorAll("button").forEach(x => x.setAttribute("aria-selected", x === b));
    draw(k);
  });
  filters.append(b);
});
draw("ALL");
$("#mClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });
modal.addEventListener("close", () => opener && opener.focus());

/* process */
CONFIG.steps.forEach(s => {
  const li = el("li");
  li.append(el("h3", "", s.title), el("p", "s", s.short), el("p", "l", s.long));
  $("#steps").append(li);
});

/* contact */
const links = $("#links");
function item(label, text, href, ext) {
  const li = el("li");
  const a = el("a", "", text);
  a.href = href;
  if (ext) { a.target = "_blank"; a.rel = "noopener"; }
  li.append(el("span", "", label), a);
  links.append(li);
}
item("EMAIL", CONFIG.email, "mailto:" + CONFIG.email);
item("PHONE", CONFIG.phone, "tel:" + CONFIG.phone.replace(/\s/g, ""));
const loc = el("li");
loc.append(el("span", "", "LOCATION"), el("a", "", CONFIG.location));
loc.lastChild.removeAttribute("href");
links.append(loc);
CONFIG.links.forEach(l => item(l.label.toUpperCase(), l.url.replace(/^https?:\/\//, ""), l.url, true));
const fm = $("#footMail");
fm.textContent = CONFIG.email; fm.href = "mailto:" + CONFIG.email;
CONFIG.links.forEach(l => {
  const a = el("a", "", l.label);
  a.href = l.url; a.target = "_blank"; a.rel = "noopener";
  fm.parentElement.append(a);
});

const form = $("#form"), note = $("#formNote"), thanks = $("#thanks");
$("#tClose").addEventListener("click", () => thanks.close());
thanks.addEventListener("click", e => { if (e.target === thanks) thanks.close(); });
form.addEventListener("submit", async e => {
  e.preventDefault();
  form.querySelectorAll("input,textarea").forEach(i => i.classList.add("touched"));
  if (!form.checkValidity()) { note.textContent = "Fill in your name, a valid email and a message."; return; }
  const btn = form.querySelector("button[type=submit]");
  btn.disabled = true;
  note.textContent = "Sending...";
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok) {
      form.reset();
      form.querySelectorAll(".touched").forEach(i => i.classList.remove("touched"));
      note.textContent = "";
      thanks.showModal();
    } else {
      note.textContent = data.error || "Could not send your message. Please email me directly.";
    }
  } catch (err) {
    note.textContent = "Could not reach the server. Please email me directly.";
  }
  btn.disabled = false;
});
