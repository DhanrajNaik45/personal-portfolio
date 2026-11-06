/* ============================================================
   EDIT THIS FILE. Everything on the page comes from here.
   Photo: put your image in this folder and set photo: "photo.jpg"
   ============================================================ */
const CONFIG = {
  name: "Dhanraj Naik",
  first: "DHANRAJ",
  last: "NAIK",
  initials: "DN",
  photo: "photo.jpg",
  label: "Software & CRM developer",
  email: "naikdhanraj45@gmail.com",
  phone: "+91 99162 29907",
  location: "Bengaluru, Karnataka, India",
  links: [
    { label: "LinkedIn", url: "https://www.linkedin.com/in/dhanraj-naik-b70513360/" },
    { label: "GitHub", url: "https://github.com/DhanrajNaik45" }
  ],
  intro:
    "I build web apps, mobile apps, automations and CRM systems that remove manual work. My projects handle everything from AI voice calls and WhatsApp reports to an HR app used by about 1,350 employees.",
  marquee: ["Node.js", "React", "TypeScript", "React Native", "Cloudflare Workers", "MongoDB", "Postgres", "Zoho CRM", "Gemini AI", "AWS", "REST APIs"],

  about: [
    "I focus on building software that keeps working after launch, so teams can stop doing the same task by hand.",
    "I build full systems: the web or mobile screen people use, the API behind it, the database, and the connections to other tools like CRMs, WhatsApp, Gmail and Meta Ads. I also customize Zoho CRM with workflows, custom modules and reports.",
    "I use AI where it helps, such as sorting email, checking engineering drawings and calling new leads. A person stays in control of the final step.",
    "I design for the problems that appear in real use: duplicate events, restarts, rate limits and bad data. Then I test before release."
  ],
  facts: [
    { big: "7", small: "projects built" },
    { big: "330", small: "API endpoints tested in one app" },
    { big: "97%", small: "fewer API calls from one filter" },
    { big: "1,350", small: "employees on the HR mobile app" }
  ],
  currently: {
    title: "What I work with",
    lines: ["Full-stack web and mobile apps", "Serverless automation on Cloudflare", "Zoho CRM customization", "AI workflows with human approval"]
  },

  why: {
    quote: "Good software is the kind nobody has to think about. It just keeps working.",
    items: [
      { tag: "RELIABLE BY DESIGN", text: "Jobs saved to disk, one message per event, and backups before any change." },
      { tag: "TESTED", text: "Role-based Playwright tests and every API endpoint checked before release." },
      { tag: "FULL-STACK RANGE", text: "React, React Native, Node.js, Postgres and cloud deployment in one person." },
      { tag: "CONNECTS TOOLS", text: "CRM, WhatsApp, Gmail, Meta, Zenoti and HubSpot wired together with APIs and webhooks." },
      { tag: "AI THAT FITS", text: "AI used for sorting, checking and calling, with a person approving the result." },
      { tag: "CRM EXPERT", text: "Zoho CRM workflows, layout rules, custom modules and Deluge scripting." },
      { tag: "RESULT-FOCUSED", text: "Built to cut manual work, API cost and load time, not just to look good." }
    ]
  },

  skills: [
    { name: "FRONTEND", text: "React and Vite web apps, React Native and Expo mobile apps, three.js 3D viewers and pdf.js document viewers.", tools: ["React", "TypeScript", "Expo", "three.js"] },
    { name: "BACKEND & APIS", text: "Node.js and Express services, REST APIs, webhooks, JWT login and role-based access, PDF generation.", tools: ["Node.js", "Express", "Webhooks", "JWT"] },
    { name: "DATABASES", text: "MongoDB and Postgres (Neon) databases, data migration scripts, Google Sheets sync and Excel reports with Python.", tools: ["MongoDB", "Postgres", "SQL", "Sheets API"] },
    { name: "CLOUD & DEVOPS", text: "Cloudflare Workers, AWS EC2 with pm2 and Caddy, Render, nginx, and CI from GitHub.", tools: ["Cloudflare", "AWS", "Render", "nginx"] },
    { name: "AI INTEGRATION", text: "Gemini vision with structured JSON output, OpenRouter LLMs, Sarvam voice agents and prompt design with guardrails.", tools: ["Gemini", "OpenRouter", "Sarvam"] },
    { name: "CRM DEVELOPMENT", text: "Zoho CRM (Deluge, workflows, layout rules, reports), TeleCRM and HubSpot APIs, Meta Conversions API.", tools: ["Zoho CRM", "Deluge", "TeleCRM", "HubSpot"] }
  ],

  projects: [
    {
      file: "unimail.tsx", title: "Unimail: AI email triage", kind: "Web app",
      text: "One dashboard for a company's shared Gmail inboxes. AI rates priority, sorts mail into buckets and drafts replies. A person always clicks Send.",
      flow: ["Gmail poll every 5 min", "AI priority + bucket", "Postgres", "Dashboard", "Human clicks Send"],
      points: [
        "AI assistant that answers questions and exports tables, PDFs and CSVs",
        "Admin and user roles: users see only the mailboxes granted to them",
        "Reader with AI summary, suggested reply, Reply all and Polish"
      ],
      tech: ["React", "Node.js", "Neon Postgres", "Gmail API", "OpenRouter", "JWT", "nginx"],
      link: { label: "Open live app", url: "https://unimail.kraftconcepts.in" }
    },
    {
      file: "analyser-3d.ts", title: "2D-3D AI Analyser", kind: "Web app",
      text: "A first-pass design checker for mechanical shops. It reviews drawings and 3D parts before they go to the client. The engineer still signs off.",
      flow: ["Upload PDF / STEP / STL", "Parse in browser (WASM)", "Geometry engine + Gemini", "Numbered pins and highlights"],
      points: [
        "2D: 23 drawing standards, issues pinned on the drawing",
        "3D: OpenCascade in a Web Worker; custom code measures holes, fillets and wall thickness with ray casting",
        "Ask AI chat highlights the exact face or area it talks about"
      ],
      tech: ["React", "three.js", "OpenCascade WASM", "three-mesh-bvh", "pdf.js", "Gemini", "Render"]
    },
    {
      file: "hrms-mobile.tsx", title: "HRMS mobile app", kind: "Mobile",
      text: "The mobile version of a company HR system used by about 1,350 employees. It shares the live web backend, so both show the same data.",
      flow: ["Expo app", "330 REST endpoints", "Cookie session + CSRF + roles", "Same data as web"],
      points: [
        "213 screens for Super Admin, Admin/HR and Employee",
        "Build-time read-only mode blocks edits until approved",
        "Playwright tests per role; every endpoint checked against the web Postman collection; 4 bugs fixed"
      ],
      tech: ["React Native", "Expo SDK 58", "Expo Router", "TypeScript", "EAS Build", "Playwright"]
    },
    {
      file: "lead-caller.worker.js", title: "AI lead caller with Meta feedback loop", kind: "Automation",
      text: "A new lead triggers an AI voice call. The outcome lands in the CRM, and lead stages go back to Meta so ads learn what a real customer looks like.",
      flow: ["New lead in CRM", "Worker picks call time", "Sarvam voice agent", "Worker updates CRM", "Worker sends stage to Meta"],
      points: [
        "Night leads are called next morning at a random time inside a 90-minute window",
        "Meta Conversions API events use SHA-256 hashed email and phone, matched on Lead ID, and are logged to Postgres",
        "I wrote and versioned the voice agent's prompt and guardrails"
      ],
      tech: ["Cloudflare Workers", "TeleCRM API", "Sarvam AI", "Meta Conversions API", "Neon Postgres"]
    },
    {
      file: "report-middleware.js", title: "Event-driven PDF report middleware", kind: "Automation",
      text: "A Node.js service that turns a webhook into a branded PDF and delivers it on WhatsApp and email, with no manual work.",
      flow: ["Zenoti webhook", "Wait 15 min", "Read form via API", "Build PDF", "WhatsApp + email in parallel"],
      points: [
        "Service filter cut API calls by about 97%",
        "One report per event group, even when two events arrive; jobs saved to disk survive restarts",
        "Runs 80–100 reports a day across 50+ centres on EC2 with pm2 and Caddy HTTPS; SPF, DKIM and DMARC set up"
      ],
      tech: ["Node.js", "Express", "PDFKit", "Zenoti API", "BIK API", "AWS EC2", "pm2", "Caddy"]
    },
    {
      file: "image-compressor.js", title: "Image compressor for Core Web Vitals", kind: "Automation",
      text: "A tool that shrinks large website images inside HubSpot while keeping each file's ID and URL, so no page needs editing.",
      flow: ["Crawl 374 URLs", "List 737 images", "Compress to ~50%", "Replace in place", "Excel status"],
      points: [
        "Backs up every original, so any change can be rolled back",
        "Updates STATUS and NEW SIZE in the Excel report automatically"
      ],
      impact: "168 images compressed, 0 failures, faster mobile load (LCP)",
      tech: ["Node.js", "sharp", "HubSpot API", "Python", "openpyxl"]
    },
    {
      file: "klv-crm.deluge", title: "Zoho CRM customization", kind: "CRM",
      text: "A CRM that shows each salesperson what to do today and shows management how the team performs.",
      flow: ["Lead captured", "Status + category", "Call logged in Approaches", "Reports + dashboard", "Scheduled emails (in progress)"],
      points: [
        "Custom modules keep a history of every call and status change",
        "Done: meeting confirmation email with layout and workflow rules, leads dashboard, connected and meeting reports",
        "In progress: follow-up, matrix and source reports, plus two scheduled emails"
      ],
      tech: ["Zoho CRM", "Deluge", "Workflow rules", "Layout rules", "Custom modules", "Reports"]
    }
  ],

  steps: [
    { title: "UNDERSTAND THE PROBLEM", short: "We talk about what slows your team down, who uses the system and what done looks like.", long: "Before I write code, I need a clear picture of your tools, your data and your goal. We agree on scope, users and what success means." },
    { title: "PLAN & DESIGN", short: "I share a short plan with the flow, timeline and cost.", long: "You see how the pieces connect, such as the CRM, the API and the messages, so there are no surprises later." },
    { title: "BUILD & TEST", short: "I build in small steps and test each one.", long: "You see progress every week. I test with real cases like duplicate events, restarts and bad data before anything goes live." },
    { title: "LAUNCH & SUPPORT", short: "You get working software, a short guide and support after launch.", long: "I deploy it, watch the first runs, fix what appears and hand over simple notes so your team can use it." }
  ]
};
