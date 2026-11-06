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
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let opener = null, flowTimer = null;

// "Label: text" items get a bold label
function addItem(ul, text) {
  const li = el("li");
  const m = text.match(/^([^:.]{2,45}):\s(.+)$/);
  if (m) { li.append(el("strong", "", m[1] + ": "), document.createTextNode(m[2])); }
  else li.textContent = text;
  ul.append(li);
}

// The animated "how it works" picture
function buildFlow(steps) {
  const wrap = el("div", "anim");
  wrap.append(el("h4", "anim-title", "HOW IT WORKS"));
  const line = el("div", "flowline");
  const nodes = [], links = [];
  steps.forEach((s, i) => {
    if (i) { const l = el("span", "flink"); l.append(el("i")); line.append(l); links.push(l); }
    const n = el("div", "fnode");
    n.append(el("span", "fnum", String(i + 1)), el("span", "flabel", s.label));
    line.append(n); nodes.push(n);
  });
  const cap = el("p", "fcap");
  cap.setAttribute("aria-live", "polite");
  wrap.append(line, cap);

  const paint = i => {
    nodes.forEach((n, j) => { n.classList.toggle("active", j === i); n.classList.toggle("done", j < i); });
    links.forEach((l, j) => l.classList.toggle("on", j < i));
    cap.textContent = steps[i].note;
    cap.style.animation = "none"; void cap.offsetWidth; cap.style.animation = "";
  };
  if (reduce) {
    // no motion: show every step as plain text
    nodes.forEach(n => n.classList.add("done"));
    links.forEach(l => l.classList.add("on"));
    cap.remove();
    const ol = el("ol", "fsteps");
    steps.forEach(s => ol.append(el("li", "", s.label + ": " + s.note)));
    wrap.append(ol);
  } else {
    let i = 0, paused = false;
    paint(0);
    const tick = () => {
      if (paused) return;
      i = (i + 1) % (steps.length + 1);
      if (i === steps.length) {
        // everything lit for a moment, then the loop restarts
        nodes.forEach(n => { n.classList.remove("active"); n.classList.add("done"); });
        links.forEach(l => l.classList.add("on"));
      } else paint(i);
    };
    const start = () => { stopFlow(); flowTimer = setInterval(tick, 2200); };
    start();
    // Hover (or keyboard focus) on a step stops the animation on that step.
    // Moving away lets it carry on from there.
    nodes.forEach((n, k) => {
      n.tabIndex = 0;
      const hold = () => { paused = true; i = k; paint(k); };
      const release = () => { paused = false; start(); };
      n.addEventListener("mouseenter", hold);
      n.addEventListener("mouseleave", release);
      n.addEventListener("focus", hold);
      n.addEventListener("blur", release);
    });
  }
  return wrap;
}

function stopFlow() { if (flowTimer) { clearInterval(flowTimer); flowTimer = null; } }

function openProject(p, btn) {
  opener = btn;
  stopFlow();
  mBody.textContent = "";
  const head = el("div", "m-head");
  head.append(el("span", "m-status", p.status.toUpperCase()), el("span", "m-kind", p.kind.toUpperCase()));
  const title = el("h3", "", p.title);
  title.id = "mTitle";
  mBody.append(head, title);
  if (p.client) mBody.append(el("p", "m-client", p.client));
  mBody.append(buildFlow(p.flow));

  p.sections.forEach(s => {
    const sec = el("section", "m-sec");
    sec.append(el("h4", "", s.heading));
    (s.text || []).forEach(t => sec.append(el("p", "", t)));
    if (s.items) { const ul = el("ul", "points"); s.items.forEach(t => addItem(ul, t)); sec.append(ul); }
    (s.groups || []).forEach(g => {
      sec.append(el("h5", "", g.title));
      const ul = el("ul", "points"); g.items.forEach(t => addItem(ul, t)); sec.append(ul);
    });
    mBody.append(sec);
  });

  const t = el("section", "m-sec");
  t.append(el("h4", "", "Technologies"));
  const tags = el("div", "tags");
  p.tech.forEach(x => tags.append(el("span", "tag", x)));
  t.append(tags);
  mBody.append(t);
  if (p.link) {
    const a = el("a", "live", p.link.label.toUpperCase());
    a.href = p.link.url; a.target = "_blank"; a.rel = "noopener";
    mBody.append(a);
  }
  modal.showModal();
  modal.scrollTop = 0;
}

function draw(kind) {
  grid.textContent = "";
  CONFIG.projects.filter(p => kind === "ALL" || p.kind.toUpperCase() === kind).forEach(p => {
    const c = el("button", "card");
    c.type = "button";
    c.append(el("span", "k", p.status.toUpperCase()), el("h3", "", p.title), el("p", "", p.sections[0].text[0]), el("span", "more", "VIEW DETAILS & HOW IT WORKS →"));
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
modal.addEventListener("close", () => { stopFlow(); if (opener) opener.focus(); });

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
