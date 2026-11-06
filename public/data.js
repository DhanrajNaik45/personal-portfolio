/* ============================================================
   EDIT THIS FILE. Everything on the page comes from here.
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
  marquee: ["Node.js", "React", "TypeScript", "React Native", "Cloudflare Workers", "MongoDB", "Zoho CRM", "Gemini AI", "AWS", "REST APIs"],

  about: [
    "I'm a developer focused on building practical software solutions that solve real business problems, simplify operations and reduce repetitive work.",
    "I work across the entire development stack, from designing web and mobile applications to building backend systems, APIs, databases and integrations with platforms like Zoho, WhatsApp, Gmail and Meta.",
    "I leverage AI and automation to create smarter workflows, whether it's intelligent email management, AI-powered voice agents, engineering design analysis or business process automation.",
    "Beyond building features, I focus on reliability, scalability and real-world usability. I believe great software should not just work on launch day; it should continue delivering value as businesses grow."
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
    quote: "From idea to implementation, I build intelligent systems that turn ambitious ideas into working solutions.",
    items: [
      { tag: "RELIABLE BY DESIGN", text: "Jobs saved to disk, one message per event, and backups before any change." },
      { tag: "TESTED", text: "Role-based Playwright tests and every API endpoint checked before release." },
      { tag: "FULL-STACK RANGE", text: "React, React Native, Node.js, databases and cloud deployment in one person." },
      { tag: "CONNECTS TOOLS", text: "CRM, WhatsApp, Gmail, Meta, Zenoti and HubSpot wired together with APIs and webhooks." },
      { tag: "AI THAT FITS", text: "AI used for sorting, checking and calling, with a person approving the result." },
      { tag: "CRM EXPERT", text: "Zoho CRM workflows, layout rules, custom modules and Deluge scripting." },
      { tag: "RESULT-FOCUSED", text: "Built to cut manual work, API cost and load time, not just to look good." }
    ]
  },

  skills: [
    { name: "FRONTEND", text: "React and Vite web apps, React Native and Expo mobile apps, three.js 3D viewers and pdf.js document viewers.", tools: ["React", "TypeScript", "Expo", "three.js"] },
    { name: "BACKEND & APIS", text: "Node.js and Express services, REST APIs, webhooks, secure login and role-based access, PDF generation.", tools: ["Node.js", "Express", "Webhooks"] },
    { name: "DATABASES", text: "MongoDB databases, data migration scripts, Google Sheets sync and Excel reports with Python.", tools: ["MongoDB", "Sheets API", "Excel"] },
    { name: "CLOUD & DEVOPS", text: "Cloudflare Workers, AWS EC2 with pm2 and Caddy, Render, nginx, and CI from GitHub.", tools: ["Cloudflare", "AWS", "Render", "nginx"] },
    { name: "AI INTEGRATION", text: "Gemini vision with structured JSON output, OpenRouter LLMs, Sarvam voice agents and prompt design with guardrails.", tools: ["Gemini", "OpenRouter", "Sarvam"] },
    { name: "CRM DEVELOPMENT", text: "Zoho CRM (Deluge, workflows, layout rules, reports), TeleCRM and HubSpot APIs, Meta Conversions API.", tools: ["Zoho CRM", "Deluge", "TeleCRM", "HubSpot"] }
  ],

  /* Project text is used exactly as written. "flow" is the simple animated
     "how it works" picture: short plain-language steps, no technical detail. */
  projects: [
    {
      title: "Unimail – AI-Powered Email Management & Triage Platform",
      status: "Live Project",
      client: "Kraft Concepts · unimail.kraftconcepts.in",
      link: { label: "Open live app", url: "https://unimail.kraftconcepts.in" },
      kind: "Web app",
      sections: [
        { heading: "Overview", text: [
          "Developed and enhanced an AI-powered email management platform that consolidates multiple company Gmail inboxes into a single dashboard.",
          "The platform uses AI to analyze incoming emails, identify priorities, organize messages into categories and generate suggested replies, helping teams focus on emails that require attention."
        ] },
        { heading: "How It Works", items: [
          "Connects multiple Gmail inboxes using Google OAuth and Gmail API.",
          "Fetches new emails automatically at configurable intervals (five minutes by default).",
          "Uses AI to analyze email content, assign priority levels and organize messages into Agents and Buckets.",
          "Stores email data and classifications in PostgreSQL.",
          "Provides a centralized dashboard for administrators and authorized users.",
          "Keeps email sending under human control, requiring users to review and click Send before any reply is delivered."
        ] },
        { heading: "My Contributions & Key Features", items: [
          "Advanced Email Filtering: Implemented date and time filters across Agent views and improved the Needs Reply classification using AI priority ratings.",
          "AI Assistant: Developed an assistant that answers questions about email data and generates tables, PDF reports and CSV exports.",
          "Role-Based Access Control: Implemented unified Admin and User login with permission-based access to assigned Agents and mailboxes.",
          "Email Reader: Enhanced the user email interface with AI summaries, suggested replies, Reply, Reply All and AI-powered message polishing.",
          "Email Integration: Implemented email replies and sending functionality through Gmail API.",
          "UI/UX Improvements: Enhanced navigation with a collapsible sidebar, password visibility controls and improved authentication handling."
        ] }
      ],
      tech: ["React", "Vite", "Node.js", "Express.js", "Neon PostgreSQL", "Gmail API", "Google OAuth", "OpenRouter", "DeepSeek", "JWT", "Nginx", "GitHub"],
      flow: [
        { label: "Company inboxes", note: "Several shared company Gmail inboxes are connected." },
        { label: "New emails arrive", note: "New emails are picked up automatically every few minutes." },
        { label: "AI sorts them", note: "AI reads each email, decides how urgent it is and files it in the right place." },
        { label: "One dashboard", note: "The team sees everything in one place and knows what needs an answer." },
        { label: "Person reviews", note: "AI suggests a reply, and a person checks it and clicks Send. Nothing goes out without a human." }
      ]
    },
    {
      title: "AI-Powered CRM Automation & Meta Conversion Tracking",
      status: "Implemented",
      kind: "Automation",
      sections: [
        { heading: "Overview", text: [
          "Built an end-to-end CRM automation system that connects TeleCRM, Sarvam AI and Meta Conversions API to automatically contact new patient leads, qualify their requirements, facilitate appointment bookings and send lead conversion outcomes back to Meta.",
          "This creates a connected lead management and advertising feedback system, helping clinics automate initial patient engagement while providing Meta with better conversion signals for advertising optimization."
        ] },
        { heading: "How It Works", groups: [
          { title: "1. Automated AI Voice Calling", items: [
            "New leads entering TeleCRM automatically trigger an AI voice agent powered by Sarvam AI.",
            "Cloudflare Workers manage call scheduling based on clinic operating hours.",
            "Leads received outside working hours are scheduled for the following morning with randomized call timings to avoid simultaneous calls."
          ] },
          { title: "2. AI Lead Qualification & CRM Updates", items: [
            "Sarvam AI processes the conversation and sends call results through webhooks.",
            "Cloudflare Workers process the results and automatically update TeleCRM with lead category, treatment interest, appointment date and other relevant information."
          ] },
          { title: "3. Automated Front Desk Notifications", items: [
            "TeleCRM workflows trigger WhatsApp notifications through Meta WhatsApp API.",
            "The front desk receives updates about appointment bookings and other important lead outcomes."
          ] },
          { title: "4. Meta Conversions API Integration", items: [
            "Lead stages such as Intake, Qualified, Converted, Lost and Not Qualified are transmitted back to Meta.",
            "Email addresses and phone numbers are hashed using SHA-256 for customer data matching.",
            "Facebook Lead IDs are used to associate conversion events with their original leads.",
            "Conversion events are logged in Neon PostgreSQL for tracking and record-keeping.",
            "Only Facebook-originated leads are shared with Meta."
          ] },
          { title: "5. AI Agent Configuration", items: [
            "Developed and version-controlled AI agent prompts and guardrails.",
            "Configured conversation rules covering treatments, consultation fees, appointment availability and multilingual interactions."
          ] }
        ] }
      ],
      tech: ["Cloudflare Workers", "TeleCRM", "Sarvam AI", "Meta Conversions API", "WhatsApp Business API", "Neon PostgreSQL", "REST APIs", "Webhooks", "GitHub"],
      flow: [
        { label: "New lead", note: "A new patient enquiry arrives in the CRM." },
        { label: "AI calls the lead", note: "An AI voice agent calls at the right time and talks to the lead. At night, the call is planned for the next morning." },
        { label: "CRM updated", note: "What the lead wants and any booked date are saved in the CRM automatically." },
        { label: "Front desk alerted", note: "The front desk gets a WhatsApp message about the booking." },
        { label: "Meta learns", note: "Lead results are sent back to Meta, so ads can find more people like the real patients." }
      ]
    },
    {
      title: "Automated Patient Consultation Report Delivery – Bodycraft Clinics",
      status: "Completed",
      kind: "Automation",
      sections: [
        { heading: "Overview", text: [
          "Developed an automated report delivery system that generates branded patient consultation reports in PDF format and delivers them through WhatsApp and email after a completed consultation.",
          "The system eliminates manual report preparation and sharing by clinic staff."
        ] },
        { heading: "How It Works", items: [
          "Appointment Trigger: Receives appointment completion and invoice closure events through Zenoti webhooks.",
          "Data Collection: Waits 15 minutes and retrieves the patient's consultation details through the Zenoti API.",
          "PDF Generation: Automatically generates a branded consultation report using the retrieved patient information.",
          "Automated Delivery: Sends the PDF through a WhatsApp message using the BIK API and delivers an email containing a report download link."
        ] },
        { heading: "Key Features & Reliability", items: [
          "Filters consultation-related services to reduce unnecessary API calls by approximately 97%.",
          "Prevents duplicate reports when multiple webhook events are received for the same visit.",
          "Preserves scheduled jobs across application restarts.",
          "Stores generated PDFs locally to ensure report download links remain accessible even during Zenoti API rate limits.",
          "Sends WhatsApp and email notifications independently, ensuring one delivery failure does not interrupt the other.",
          "Configured SPF, DKIM and DMARC for authenticated email delivery from the clinic's domain."
        ] },
        { heading: "Deployment & Scale", items: [
          "Deployed on AWS EC2 (Ubuntu).",
          "PM2 for process management and automatic restarts.",
          "Caddy for automatic HTTPS configuration.",
          "Handles approximately 80–100 consultation reports daily across 50+ centres."
        ] }
      ],
      tech: ["Node.js", "Express.js", "PDFKit", "Zenoti API", "BIK API", "Webhooks", "WhatsApp Business API", "AWS EC2", "PM2", "Caddy"],
      flow: [
        { label: "Doctor", note: "The doctor finishes the patient's consultation." },
        { label: "Zenoti", note: "The clinic system records the visit and sends a signal." },
        { label: "Middleware", note: "After a short wait, it collects the patient's consultation details." },
        { label: "Report PDF", note: "A branded report is created automatically for that patient." },
        { label: "BIK", note: "The report is handed over for delivery." },
        { label: "Patient", note: "The patient gets the report on WhatsApp and by email. Nobody on the clinic staff has to send anything." }
      ]
    },
    {
      title: "HubSpot Image Compression Automation – Website Performance Optimization",
      status: "Completed",
      kind: "Automation",
      sections: [
        { heading: "Overview", text: ["Developed a Node.js automation tool to optimize website images directly within HubSpot CMS, improving loading performance without requiring manual image replacements or changes to existing website pages."] },
        { heading: "Problem", text: ["The Bodycraft website (bodycraft.co.in) contained oversized images, some exceeding 1 MB, resulting in slower page loading. Manually compressing and re-uploading images would have required updating image links across multiple pages."] },
        { heading: "Solution & Key Features", items: [
          "Crawled 374 website URLs and identified 737 desktop images, generating a detailed Excel report with image sizes.",
          "Automatically identified images larger than 300 KB and compressed them to approximately 50% of their original size.",
          "Replaced images directly within HubSpot File Manager while preserving their existing file IDs and URLs.",
          "Automated URL-by-URL processing and updated image status and compressed sizes in Excel.",
          "Created backups of all original images to support rollback whenever required."
        ] },
        { heading: "Results", items: [
          "168 images successfully compressed.",
          "Zero processing failures.",
          "No website page or image URL changes required.",
          "Reduced image sizes to improve loading performance, particularly on mobile devices, and support better Largest Contentful Paint (LCP)."
        ] }
      ],
      tech: ["Node.js", "Sharp", "HubSpot API", "Python", "OpenPyXL", "Excel", "GitHub"],
      flow: [
        { label: "Website", note: "The tool visits every page of the website and lists all the images." },
        { label: "Heavy images found", note: "Images that are too big and slow the page down are picked out." },
        { label: "Backup saved", note: "A safe copy of each original image is kept, so any change can be undone." },
        { label: "Image made smaller", note: "Each image is shrunk to about half its size, keeping its quality." },
        { label: "Replaced in place", note: "The new image takes the old one's place with the same link. No page needs editing." },
        { label: "Faster website", note: "Pages load faster, especially on mobile phones." }
      ]
    },
    {
      title: "KLV Healthcare – Zoho CRM Customization & Sales Automation",
      status: "Completed",
      kind: "CRM",
      sections: [
        { heading: "Overview", text: [
          "Customized and implemented Zoho CRM for KLV Healthcare to streamline sales operations, improve employee productivity and provide management with better visibility into lead performance, follow-ups and sales activities.",
          "The solution transformed the CRM into a structured sales management system, reducing manual tracking and improving accountability across the sales team."
        ] },
        { heading: "CRM Architecture & Customization", items: [
          "Lead Management: Customized the Leads module with approach status, lead category, lead source, assigned employee, next action date and call attempt tracking.",
          "Custom Modules: Developed Employees, Approaches and Approach Status History modules to maintain employee records and track lead interactions and status changes.",
          "Workflow Automation: Configured workflow rules, layout rules and automated meeting confirmation emails.",
          "Lead Tracking: Implemented structured lead stages, including Not Approached, Connected, Not Connected, Meeting Scheduled, Meeting Completed, Productive and Lost."
        ] },
        { heading: "Reports & Management Dashboards", text: ["Implemented reporting and tracking for:"], items: [
          "Daily new leads and call productivity.",
          "Hot and potential leads by country and salesperson.",
          "Lead source performance and conversion rates.",
          "Sales performance and order summaries.",
          "Daily follow-ups and overdue lead activities.",
          "Leads without status updates for 15 days.",
          "Quotation and Proforma Invoice (PI) follow-ups.",
          "Not Connected call reports.",
          "Inactive customers with no orders in six months."
        ] },
        { heading: "Automation", items: [
          "Automated meeting confirmation emails.",
          "Configured daily task reporting for sales employees.",
          "Implemented weekly summaries of leads with unsuccessful contact attempts."
        ] },
        { heading: "Result", text: ["Delivered a customized CRM environment with structured lead management, employee activity tracking, automated workflows and management reporting to support day-to-day sales operations and performance monitoring."] }
      ],
      tech: ["Zoho CRM", "Deluge", "Workflow Rules", "Layout Rules", "Custom Modules", "Custom Fields", "Advanced Filters", "Reports", "Schedules"],
      flow: [
        { label: "New lead", note: "A new lead is added to the CRM with its source and category." },
        { label: "Assigned to employee", note: "The lead goes to a salesperson, who sees what to do today." },
        { label: "Calls and updates status", note: "Every call and status change is recorded, from Not Approached to Productive or Lost." },
        { label: "Automatic emails", note: "Meeting confirmations and daily or weekly summaries go out on their own." },
        { label: "Management reports", note: "Managers see team performance, follow-ups and sales in ready-made reports." }
      ]
    },
    {
      title: "2D–3D AI Analyser – AI-Powered Mechanical Design Validation Platform",
      status: "Developed",
      kind: "Web app",
      sections: [
        { heading: "Overview", text: [
          "Developed an AI-powered web SaaS platform designed for mechanical engineering and manufacturing businesses, including automotive, stamping and foundry industries.",
          "The platform helps engineers perform an initial technical review of 2D engineering drawings and 3D CAD models before sharing designs with clients. It combines AI-based analysis with geometry-processing algorithms to identify potential design and manufacturing issues."
        ] },
        { heading: "Core Features", groups: [
          { title: "1. AI-Powered 2D Drawing Analysis", items: [
            "Upload engineering drawings in PDF or PNG formats.",
            "Configure technical requirements through a job form covering 23 engineering standards, including ASME Y14.5, ISO GPS, BS, DIN, JIS, GB/T and IS.",
            "Analyze GD&T, dimensions, title blocks, tolerances and manufacturing-related requirements.",
            "Identify potential issues and display them as numbered markers directly on the drawing.",
            "Support drawing navigation through interactive pan and zoom functionality."
          ] },
          { title: "2. Interactive 3D CAD Analysis", items: [
            "Supports STEP, IGES and STL file formats.",
            "Displays 3D mechanical components directly in the browser.",
            "Uses geometry-processing algorithms to identify holes, fillets, wall thickness and sharp edges.",
            "Allows engineers to interact with the 3D model and inspect potential design issues."
          ] },
          { title: "3. AI Engineering Assistant", items: [
            "Integrated an interactive AI assistant across both 2D and 3D environments.",
            "Allows engineers to ask technical questions about uploaded drawings and CAD models.",
            "Highlights relevant drawing locations or 3D model surfaces based on AI responses.",
            "Provides contextual explanations connected to the actual engineering design."
          ] }
        ] },
        { heading: "Technical Architecture", items: [
          "Frontend: React, Vite.",
          "3D Rendering: Three.js.",
          "CAD Processing: OpenCascade WebAssembly running inside Web Workers.",
          "Geometry Analysis: Custom surface recognition, ray casting and three-mesh-bvh.",
          "2D Rendering: PDF.js.",
          "Backend: Node.js, Express.js.",
          "AI Integration: Google Gemini Vision with structured JSON output for issue identification and positioning.",
          "Deployment: Render with GitHub-based CI."
        ] },
        { heading: "Key Highlight", text: ["Combines AI vision and computational geometry to deliver an interactive engineering design review experience, while keeping final engineering validation under the engineer's control."] }
      ],
      tech: ["React", "Vite", "Three.js", "OpenCascade WebAssembly", "PDF.js", "Node.js", "Express.js", "Google Gemini Vision", "Render"],
      flow: [
        { label: "Engineer uploads", note: "The engineer uploads a 2D drawing or a 3D part." },
        { label: "Sets the job", note: "They choose the standards and requirements the design must meet." },
        { label: "AI + geometry check", note: "AI reads the drawing, and measuring tools inspect the 3D shape for holes, thin walls and sharp edges." },
        { label: "Issues marked", note: "Problems appear as numbered markers right on the drawing or the 3D part." },
        { label: "Ask the AI", note: "The engineer asks questions, and the AI points to the exact spot it means." },
        { label: "Engineer signs off", note: "The final decision always stays with the engineer." }
      ]
    },
    {
      title: "Bodycraft HRMS – Enterprise HRMS Mobile Application",
      status: "Developed",
      kind: "Mobile",
      sections: [
        { heading: "Overview", text: [
          "Developed the mobile application for Bodycraft's existing Human Resource Management System (HRMS), supporting approximately 1,350 employees across multiple clinics, salons, outlets and business units.",
          "The application brings the functionality of the existing web-based HRMS to mobile devices, allowing employees, HR teams and administrators to manage daily HR operations through a centralized mobile platform."
        ] },
        { heading: "Core Functionalities", text: ["The application supports multiple HR operations, including:"], items: [
          "Employee attendance and leave management.",
          "Payslip and payroll information.",
          "Expense submissions and tracking.",
          "Approval workflows.",
          "Employee training and announcements.",
          "Administrative and HR management operations."
        ] },
        { heading: "Development & Architecture", items: [
          "Developed using React Native, Expo SDK 58, Expo Router and TypeScript.",
          "Reused the existing HRMS backend and its 330 REST API endpoints to maintain consistent data between web and mobile applications.",
          "Implemented existing authentication mechanisms, including cookie-based sessions, CSRF protection and role-based access control.",
          "Structured 213 application screens across Super Admin, Admin/HR and Employee roles.",
          "Generated Android APK builds using Expo Application Services (EAS)."
        ] },
        { heading: "Testing & Security", items: [
          "Implemented a build-time read-only mode that prevents create, edit and delete operations until the application is approved.",
          "Developed Playwright API and UI tests for different user roles.",
          "Validated API functionality against the existing website's Postman collection.",
          "Identified and fixed four issues during testing."
        ] },
        { heading: "Result", text: ["Delivered a mobile HRMS application that reuses the existing enterprise backend, maintaining consistent employee data, authentication and business functionality across web and mobile platforms."] }
      ],
      tech: ["React Native", "Expo SDK 58", "Expo Router", "TypeScript", "REST APIs", "Playwright", "EAS Build", "GitHub"],
      flow: [
        { label: "Employee opens the app", note: "An employee, HR person or admin opens the app on their phone." },
        { label: "Secure login", note: "They sign in, and the app shows only what their role allows." },
        { label: "Daily HR tasks", note: "Attendance, leave, payslips, expenses, approvals and announcements, all in one app." },
        { label: "Same HR system", note: "The app talks to the company's existing HR system." },
        { label: "Web and mobile match", note: "Whatever is done on the phone shows up on the website, and the other way round." }
      ]
    }
  ],

  steps: [
    { title: "UNDERSTAND THE PROBLEM", short: "We talk about what slows your team down, who uses the system and what done looks like.", long: "Before I write code, I need a clear picture of your tools, your data and your goal. We agree on scope, users and what success means." },
    { title: "PLAN & DESIGN", short: "I share a short plan with the flow, timeline and cost.", long: "You see how the pieces connect, such as the CRM, the API and the messages, so there are no surprises later." },
    { title: "BUILD & TEST", short: "I build in small steps and test each one.", long: "You see progress every week. I test with real cases like duplicate events, restarts and bad data before anything goes live." },
    { title: "LAUNCH & SUPPORT", short: "You get working software, a short guide and support after launch.", long: "I deploy it, watch the first runs, fix what appears and hand over simple notes so your team can use it." }
  ]
};
