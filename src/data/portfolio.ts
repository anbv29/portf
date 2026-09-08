export type ModuleId =
  | "core"
  | "projects"
  | "experience"
  | "stack"
  | "terminal"
  | "about"
  | "contact";

export const profile = {
  name: "Anubhav Pandey",
  role: "Full-stack developer & open-source contributor",
  headline: "Building scalable products and resilient cloud infrastructure.",
  summary:
    "I am Anubhav Pandey, a full-stack developer and open-source contributor who builds scalable web applications alongside resilient cloud infrastructure.",
  philosophy:
    "From crafting polished frontends to orchestrating automated, containerized deployments, I bridge the gap between product engineering and modern DevOps to deliver highly reliable software.",
  focus:
    "Full-stack engineering, cloud infrastructure, container orchestration, and open-source collaboration.",
  availability:
    "Open to internships, full-time opportunities, and interesting product collaborations.",
} as const;

export const links = {
  github: "https://github.com/anbv29",
  email: "mailto:anubhavp950@gmail.com",
  emailLabel: "anubhavp950@gmail.com",
  x: "https://x.com/anewbhev",
  xLabel: "@anewbhev",
  instagram: "https://instagram.com/anbvsig",
  instagramLabel: "@anbvsig",
  resume: "/anubhav-resume.pdf",
} as const;

export const projects = [
  {
    number: "01",
    title: "THROTTLE",
    type: "Rate-limiting infrastructure",
    github: "https://github.com/anbv29/Throttle",
    overview:
      "A standalone, concurrency-safe rate-limiting service that gives teams configurable, per-client control over API traffic using Token Bucket and Sliding Window algorithms.",
    highlights: [
      "Designed RESTful APIs with persistent rate-limit state, PostgreSQL ACID transactions, row-level locking (SELECT ... FOR UPDATE), and atomic updates to prevent race conditions during concurrent requests.",
      "Built an interactive real-time monitoring and load-testing dashboard for request analytics, ALLOW/DENY decisions, client configuration, and high-concurrency traffic simulation.",
      "Developed a reusable API integration and middleware pattern that lets applications and microservices enforce centralized limits and return HTTP 429 Too Many Requests responses.",
    ],
    stack: [
      "PERN Stack",
      "PostgreSQL",
      "Express.js",
      "React.js",
      "Node.js",
      "REST APIs",
      "Token Bucket",
      "Sliding Window",
      "ACID Transactions",
      "Row-level Locking",
      "Atomic Operations",
      "Load Testing",
      "Microservices",
      "Middleware",
      "HTTP 429",
      "Real-time Monitoring",
    ],
    architecture: [
      "Client applications",
      "REST API",
      "Rate-limit engine",
      "PostgreSQL transactions",
      "ALLOW / DENY response",
    ],
  },
  {
    number: "02",
    title: "FINORA",
    type: "Document intelligence platform",
    github: "https://github.com/anbv29/Finora",
    overview:
      "A multi-tenant, event-driven platform that turns unstructured PDFs into searchable, structured intelligence through asynchronous ingestion, OCR, classification, extraction, and grounded AI responses.",
    highlights: [
      "Engineered an asynchronous processing pipeline with React, Node.js/Fastify, Python/FastAPI, PostgreSQL, Redis, and BullMQ for PDF ingestion, OCR, document classification, and schema-driven data extraction.",
      "Implemented a Retrieval-Augmented Generation (RAG) pipeline using document chunking, vector embeddings, pgvector, semantic search, and LLM-based grounded responses with source citations.",
      "Designed secure REST APIs with JWT authentication, refresh-token rotation, RBAC, tenant isolation, idempotent background jobs, retries, WebSocket updates, and Dockerized multi-service deployment.",
    ],
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Fastify",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "BullMQ",
      "Docker",
      "REST APIs",
      "WebSockets",
      "OCR",
      "RAG",
      "LLMs",
      "JWT",
      "RBAC",
    ],
    architecture: [
      "React client",
      "Fastify / FastAPI",
      "BullMQ + Redis",
      "OCR + RAG pipeline",
      "PostgreSQL + pgvector",
    ],
  },
  {
    number: "03",
    title: "NION",
    type: "Developer analytics platform",
    github: "https://github.com/anbv29/Nion",
    overview:
      "A GitHub analytics platform that turns a developer's yearly activity into meaningful insights and a premium, customizable card built to download and share.",
    highlights: [
      "Built a dedicated analytics layer over GitHub's GraphQL API to evaluate commits, pull requests, issues, repositories, languages, contribution streaks, and productivity patterns across a developer's year.",
      "Derived project-level insights including Most Worked On, Longest-Running Build, Hidden Gem, Lost Momentum, and Comeback Project by analyzing contribution history, consistency, stars, and engagement.",
      "Designed a cache-first architecture with Upstash Redis to reduce API calls and handle GitHub rate limits, with server-side image generation using @vercel/og and Satori for downloadable social cards without a headless browser.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GitHub GraphQL API",
      "GitHub OAuth",
      "Auth.js",
      "Upstash Redis",
      "PostgreSQL",
      "Prisma / Drizzle",
      "@vercel/og",
      "Satori",
      "Vercel",
      "Server-side Rendering",
      "Data Analytics",
    ],
    architecture: [
      "Next.js application",
      "GitHub GraphQL API",
      "Analytics layer",
      "Redis + PostgreSQL",
      "Satori share cards",
    ],
  },
  {
    number: "04",
    title: "MYDAY",
    type: "Public date marketplace",
    github: "https://github.com/anbv29/Myday",
    overview:
      "A public date-claiming platform where people turn meaningful dates into shareable digital landmarks through competitive outbidding, public profiles, and a global leaderboard.",
    highlights: [
      "Engineered a race-condition-safe claim and outbid system with transaction-protected ownership updates, real-time public activity, claim history, unique profiles, and leaderboard rankings.",
      "Integrated Razorpay and Stripe for regional and international payments with server-verified webhooks, idempotency protection, strict authorization, row-level security, and abuse prevention.",
      "Designed a Cloudflare-ready architecture with Pinecone-powered semantic discovery, Redis caching and distributed rate limiting, plus product analytics and production monitoring through PostHog and Sentry.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Supabase",
      "Clerk",
      "Upstash Redis",
      "Cloudflare",
      "Razorpay",
      "Stripe",
      "Pinecone",
      "PostHog",
      "Sentry",
      "Row-level Security",
      "Distributed Rate Limiting",
    ],
    architecture: [
      "Next.js + Clerk",
      "Claim transaction layer",
      "Supabase + Redis",
      "Razorpay / Stripe",
      "Pinecone discovery",
    ],
  },
  {
    number: "05",
    title: "LITMUS",
    type: "Evidence-backed legal AI agent",
    github: "https://github.com/anbv29/litmus",
    overview:
      "A contract intelligence agent that learns a law firm's real negotiation positions from historical agreements, then reviews new drafts clause by clause with evidence-backed recommendations.",
    highlights: [
      "Built a corpus-driven playbook engine that derives starting positions, accepted fallbacks, rejected terms, approval paths, and conflicts from templates, executed agreements, redlines, memos, and policy records at startup.",
      "Designed a deterministic review pipeline that assigns every clause an explicit accept, counter, or escalate disposition, proposes replacement language when needed, and cites the source documents behind each decision.",
      "Combined an OpenAI-compatible refinement layer with a validated local fallback, content-addressed review caching, bounded request handling, and a thread-safe Python HTTP service for reproducible operation when AI is unavailable.",
    ],
    stack: [
      "Python",
      "OpenAI-compatible API",
      "Document Intelligence",
      "Deterministic Policy Engine",
      "Evidence Retrieval",
      "Contract Analysis",
      "JSON APIs",
      "ThreadingHTTPServer",
      "Content-addressed Cache",
      "TXT / PDF / CSV / XLSX",
      "Automated Validation",
    ],
    architecture: [
      "Contract corpus",
      "Playbook engine",
      "AI refinement",
      "Clause disposition",
      "Cited review + cache",
    ],
  },
  {
    number: "06",
    title: "WAJO",
    type: "Proactive email agent",
    github: "https://github.com/anbv29/wajo_project",
    overview:
      "A proactive email-management agent that observes messages, assesses risk, chooses an appropriate level of autonomy, and acts or requests approval through a safety-first policy loop.",
    highlights: [
      "Implemented a complete agent lifecycle—observe, normalize, assess risk, interpret, choose autonomy, act or wait, and learn—with an LLM used for semantic planning while deterministic Python policy retains authority.",
      "Bound approvals to exact action payloads and enforced immutable safety floors so learning can reduce interruptions only for safe, reversible actions; mailbox effects remain reproducible through a scripted offline adapter.",
      "Created optional dry-run Gmail observation, structured CLI workflows, frozen synthetic evaluation splits, failure testing, confidence intervals, reproducibility metadata, and guarded held-out quality gates.",
    ],
    stack: [
      "Python 3.12",
      "OpenAI API",
      "Pydantic",
      "Typer",
      "Rich",
      "Gmail API",
      "SQLite",
      "Pytest",
      "Hypothesis",
      "scikit-learn",
      "SciPy",
      "Matplotlib",
      "Policy Engine",
      "Evaluation Harness",
    ],
    architecture: [
      "Mailbox adapter",
      "Risk assessment",
      "Semantic planner",
      "Policy + approval gate",
      "Action + learning log",
    ],
  },
] as const;

export const experience = [
  {
    title: "Software Developer",
    organization: "Reach",
    period: "June 2025 — July 2025",
    points: [
      "Built and maintained full-stack web applications for enterprise clients.",
      "Implemented Docker-based deployment workflows and automated staging environments.",
      "Contributed to internal design systems and reusable component libraries.",
    ],
  },
  {
    title: "Final Year B.Tech Student",
    organization:
      "Dr. B. R. Ambedkar National Institute of Technology, Jalandhar",
    period: "2022 — Present",
    points: [
      "Specializing in software development, data structures, and system design fundamentals.",
      "Building full-stack projects with modern React and backend technologies.",
      "Actively preparing for software engineering roles and internships.",
    ],
  },
  {
    title: "Technical Foundations",
    organization: "Competitive Programming + Core CS",
    period: "2021 — Present",
    points: [
      "Practicing DSA regularly and applying problem-solving in real project decisions.",
      "Strengthening understanding of OOP, DBMS, OS, and computer networks.",
    ],
  },
] as const;

export const skillGroups = [
  {
    title: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "HTML5",
      "CSS3",
      "Redux",
      "Zustand",
      "ShadCN UI",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "GraphQL",
      "JWT Auth",
      "Prisma",
      "WebSockets",
      "BullMQ",
      "RAG",
      "LLMs",
      "tRPC",
      "Hono",
    ],
  },
  {
    title: "DevOps & Cloud",
    items: [
      "Docker",
      "Docker Compose",
      "Kubernetes",
      "CI/CD",
      "GitHub Actions",
      "Nginx",
      "AWS EC2",
      "Vercel",
      "Cloudflare",
      "Linux",
    ],
  },
  {
    title: "Databases & Infra",
    items: [
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Vector Databases (pgvector)",
      "Firebase",
      "Supabase",
      "MySQL",
    ],
  },
  {
    title: "Core CS",
    items: [
      "Data Structures",
      "Algorithms",
      "OOP",
      "DBMS",
      "Computer Networks",
      "Operating Systems",
      "System Design",
    ],
  },
  {
    title: "Tools & Workflow",
    items: [
      "Git & GitHub",
      "Postman",
      "VS Code",
      "Figma",
      "Jira",
      "Terraform",
      "Bash Scripting",
      "Prometheus",
      "Grafana",
    ],
  },
] as const;

export const education = [
  {
    degree: "B.Tech (Final Year)",
    institute:
      "Dr. B. R. Ambedkar National Institute of Technology, Jalandhar",
    period: "2022 — 2026",
    detail:
      "Focused on software development, data structures, and system-driven project work.",
  },
  {
    degree: "Senior Secondary (XII)",
    institute: "Blooming Dale School",
    period: "Completed",
    detail:
      "Built a strong mathematics and analytical foundation that shaped engineering interests.",
  },
  {
    degree: "Secondary (X)",
    institute: "Blooming Dale School",
    period: "Completed",
    detail:
      "Established core academic discipline and early interest in science and technology.",
  },
] as const;

export const educationHighlights = [
  "Consistent project-building with modern web technologies",
  "Hands-on implementation of full-stack application workflows",
  "Strong focus on internship and placement readiness",
] as const;
