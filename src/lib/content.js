export const PROFILE = {
  name: "john fan",
  role: "software engineer",
  school: "CS @ Rice",
  location: "Houston, TX",
  status: "open to internships",
  // Drafted from John's own working notes for the redesign brief — his words,
  // treat as a strong first pass he can still tweak, not invented voice.
  tagline:
    "i build full-stack products, and somewhere along the way started treating League of Legends drafts like a data problem.",
  // [HOME ABOUT-TEASER — JOHN TO WRITE]: 1 short line for the home page about-teaser link.
  aboutTeaser: "click here to learn more about me and my work",
  email: "johnfan.dev@gmail.com",
  links: {
    github: "https://github.com/johnwfan",
    linkedin: "https://linkedin.com/in/johnwfan",
    resume: "/John_Fan_Resume.pdf",
  },
};

export const ABOUT = {
  // [ABOUT SUBHEAD — JOHN TO WRITE]: one line under the "About" header.
  subhead: "here's a bit about me!",
  // [ABOUT BIO — JOHN TO WRITE]: 3-paragraph scaffold — what you do, how you work, what you're into outside of code.
  bio: [
    "hey there, i'm currently a student at Rice University studying computer science. i love building things that can be used by real people, and i'm always looking to learn new things.",
    "outside of coding, i enjoy playing video games, spending time with loved ones, and going on fun adventures. i also really like to work out and stay active.",
    "i have so much to learn and explore, and i'm excited to see where my journey takes me. if you want to connect or collaborate, feel free to reach out!",
  ],
  // "now" — building is derived from the flagship project elsewhere; the rest
  // needs real input from John, nothing here is invented.
  now: {
    // [NOW LEARNING — JOHN TO WRITE]
    learning: "[NOW LEARNING — JOHN TO WRITE]",
    // [NOW PLAYING — JOHN TO WRITE]: a game, if any, worth naming.
    playing: "[NOW PLAYING — JOHN TO WRITE]",
  },
  elsewhere: ["Houston, TX", "Rice University"],
  // Pulled directly from the bio paragraphs above — not new facts.
  likes: ["video games", "time with people i love", "fun adventures", "staying active"],
};

// Synced against John's resume (public/John_Fan_Resume.pdf) — languages/tools split
// matches the resume's own "Languages" vs "Frameworks & Libraries" / "Tools & Databases"
// categorization. postgresql moved out of languages (it's a database, not a language).
export const STACK = {
  languages: [
    { key: "javascript", label: "JavaScript" },
    { key: "typescript", label: "TypeScript" },
    { key: "python", label: "Python" },
    { key: "java", label: "Java" },
    { key: "c", label: "C" },
    { key: "cpp", label: "C++" },
    { key: "sql", label: "SQL" },
  ],
  tools: [
    { key: "nextjs", label: "Next.js" },
    { key: "react", label: "React" },
    { key: "nodejs", label: "Node.js" },
    { key: "express", label: "Express" },
    { key: "tailwind", label: "Tailwind CSS" },
    { key: "postgresql", label: "PostgreSQL" },
    { key: "mongodb", label: "MongoDB" },
    { key: "prisma", label: "Prisma" },
    { key: "docker", label: "Docker" },
    { key: "aws", label: "AWS" },
    { key: "vercel", label: "Vercel" },
    { key: "git", label: "Git" },
    { key: "github", label: "GitHub" },
    { key: "githubactions", label: "GitHub Actions" },
    { key: "linux", label: "Linux" },
    { key: "playwright", label: "Playwright" },
  ],
};

// The Screenz.ai entry is rendered on the homepage Experience section.
export const TIMELINE = [
  {
    title: "Rice University",
    subtitle: "b.s. computer science",
    time: "2025 — 2028",
    detail: "currently building a portfolio of full-stack + data projects.",
  },
  {
    title: "Screenz.ai / RankMonster.ai",
    subtitle: "software engineering intern",
    time: "may 2026 — aug 2026",
    bullets: [
      "shipped a cost analytics dashboard",
      "fixed cross-system auth/session bugs and redesigned the landing page, clearing 260+ SEO crawl issues",
      "improved RankMonster search and PDF reporting workflows through production feature updates",
      "shipped and tested production fixes across both products, using Playwright E2E tests and CI checks to validate changes",
    ],
  },
  {
    title: "iCode instructor",
    subtitle: "Python + web + robotics",
    time: "2024 — 2025",
    detail: "taught + mentored students through hands-on projects and debugging.",
  },
  {
    title: "Dawson CS Club",
    subtitle: "co-founder / vp",
    time: "2024 — 2025",
    detail: "grew a 30+ member club and ran workshops for HTML/CSS/JS.",
  },
];

// Project order is fixed: Scuttle (flagship) -> StudioFlow -> Outfit Picker -> Storm.
// Project titles, and proper nouns/acronyms/technology names within copy, keep correct
// casing — everything else stays in the site's lowercase prose style.
export const PROJECTS = [
  {
    slug: "scuttle",
    title: "Scuttle.gg",
    flagship: true,
    // Short descriptor for the homepage/archive row list — distinct from the
    // longer `blurb` used on the detail page header.
    teaser: "league analytics + ML draft intelligence",
    // One-sentence compression used only on the homepage compact list; the
    // full `overview` below (unchanged) still powers the case-study page and
    // the /projects expanded view.
    summary:
      "a League of Legends analytics platform with ranked stats and ML-based draft analysis.",
    blurb:
      "a full-stack League of Legends stats tracker with real-time match data, cached Riot API integration, and an ML-powered draft analysis tool.",
    overview:
      "Scuttle lets you search any Riot ID and see ranked progress, champion mastery, and match history across 11 regions. under the hood it's a full authenticated app — GitHub sign-in, saved search history, and a caching layer that keeps it fast under Riot's rate limits. the standout feature is draft intelligence: a separate machine learning service that scores a 10-champion draft against a model trained on nearly 15,000 ranked matches, and lets you swap a single pick to see how the score shifts.",
    bullets: [
      "built a typed Riot API client with automatic retry/backoff and platform-to-regional routing across all 11 supported regions",
      "added GitHub authentication (NextAuth) with persisted per-user search history in MongoDB",
      "cut redundant Riot API calls with Upstash Redis caching (7-day match cache, 1-hour mastery cache)",
      "shipped KDA and performance trend charts with Recharts",
    ],
    architecture: [
      "collected and processed 14,826 ranked matches into a training pipeline",
      "trained and evaluated a logistic regression model using rolling forward-patch validation, so it's tested the way it'll actually be used — on metas it hasn't seen yet",
      "served the model through a separate FastAPI microservice, called server-side from a Next.js API route",
      "built a counterfactual draft explorer that swaps one pick and shows how the model's score changes, without ever claiming a win probability the data can't support",
    ],
    duration: "november 2025 — present",
    year: "2025—now",
    // [SCUTTLE LEARNED — JOHN TO WRITE]: a sentence or two, optional.
    learned: "[SCUTTLE LEARNED — JOHN TO WRITE]",
    tags: ["next.js", "typescript", "mongodb", "redis", "ml"],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
      "NextAuth",
      "MongoDB",
      "Upstash Redis",
      "FastAPI",
      "scikit-learn",
    ],
    // Short, characterizing subset of `stack` for the homepage compact tech line.
    stackShort: ["Next.js", "TypeScript", "FastAPI", "MongoDB", "scikit-learn"],
    image: "/projects/scuttle.png",
    links: {
      github: "https://github.com/johnwfan/lol-stats-tracker",
      live: "https://lol-stats-tracker-johnf.vercel.app/",
    },
  },

  {
    slug: "studioflow",
    title: "StudioFlow",
    flagship: false,
    teaser: "collaborative workspace for creative teams",
    summary:
      "a collaborative workspace for projects, tasks, shared assets, and role-based access.",
    blurb:
      "a full-stack workflow platform for creative teams to manage projects, tasks, comments, and shared assets.",
    overview:
      "StudioFlow gives creative teams a structured, permissioned workspace for content work — projects, tasks, comments, and shared assets all live in one place, with role-based access control across 3 user roles enforcing who can see and touch what at the API level.",
    bullets: [
      "designed normalized PostgreSQL schemas with Prisma and implemented role-based access control for 3 user roles, enforcing team and project permissions across API routes",
      "built 10+ REST API endpoints with validation, error handling, and reusable service logic for projects, tasks, collaboration, and metadata",
      "optimized project views with server-side filtering, pagination, and tuned Prisma queries to cut down database reads",
      "containerized the app with Docker and deployed it on AWS",
    ],
    architecture: [],
    duration: "april 2026 — present",
    year: "2026—now",
    // [STUDIOFLOW LEARNED — JOHN TO WRITE]: a sentence or two, optional.
    learned: "[STUDIOFLOW LEARNED — JOHN TO WRITE]",
    tags: ["next.js", "postgresql", "prisma", "docker", "aws"],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix UI",
      "Prisma",
      "PostgreSQL",
      "Clerk",
      "Docker",
      "AWS",
    ],
    stackShort: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Docker"],
    image: "/projects/studioflow.png",
    links: {
      github: "https://github.com/johnwfan/studioflow",
      live: "",
    },
  },

  {
    slug: "outfit-picker",
    title: "Outfit Picker",
    flagship: false,
    teaser: "outfit planning + AI-assisted visualization",
    summary:
      "a full-stack app for planning outfits and generating AI-assisted visual previews.",
    blurb:
      "an AI try-on app — upload your wardrobe and a photo of yourself, and generate a styled outfit preview.",
    overview:
      "Outfit Picker is a full-stack app for visualizing outfits before you commit to them. you upload tops and bottoms into two browsable carousels, add a reference photo of yourself, describe a theme, and the backend generates an AI try-on image with Gemini. it's built as a complete product loop — a Next.js frontend talking to a FastAPI backend, file storage, and an external generation API with caching and a fallback path when the quota runs out.",
    bullets: [
      "built a FastAPI backend with REST endpoints for wardrobe uploads, reference photos, and image generation",
      "integrated Google's Gemini API (google-genai) to generate a themed try-on image from a top, bottom, and reference photo",
      "cached generations by (reference + top + bottom + theme) so identical requests don't re-generate",
      "added a fallback mode that serves a placeholder output if the AI provider's quota is exhausted, so the pipeline stays testable end to end",
    ],
    architecture: [],
    // Sourced from the repo's commit history: first commit 2025-12-20, last commit 2025-12-27.
    duration: "december 2025",
    year: "2025",
    // [OUTFIT PICKER LEARNED — JOHN TO WRITE]: a sentence or two, optional.
    learned: "[OUTFIT PICKER LEARNED — JOHN TO WRITE]",
    tags: ["next.js", "fastapi", "python", "gemini api"],
    stack: ["Next.js", "React", "Tailwind CSS", "FastAPI", "Python", "google-genai"],
    stackShort: ["Next.js", "FastAPI", "Python", "google-genai"],
    image: "/projects/outfit-picker.png",
    links: {
      github: "https://github.com/johnwfan/outfit-picker",
      live: "",
    },
  },

  {
    slug: "storm",
    title: "Storm",
    flagship: false,
    teaser: "street-level flood-risk analysis",
    summary:
      "a flood-risk mapping project combining street-level imagery, computer vision, and environmental data.",
    blurb:
      "an AI-powered flood risk platform that scores real-world locations from street-level imagery.",
    overview:
      "Storm analyzes flood risk for any location by combining computer vision with environmental data. it pulls four-directional street view imagery, runs it through a segmentation model to classify surfaces as pavement, greenery, or other, and combines that with terrain slope, rainfall intensity, and drainage data into a weighted risk score — visualized on an interactive map with AI-generated mitigation recommendations.",
    // Written at the project level rather than as personal "I built" claims, since this was a team build
    // and John's specific slice isn't specified yet — see the credit line below.
    bullets: [
      "scores flood risk with a weighted model combining surface permeability, terrain slope, rainfall intensity, and drainage infrastructure",
      "classifies street-level surface coverage (pavement, greenery, other) using a Mask2Former segmentation model",
      "visualizes results on an interactive map with heat-map overlays and AI-generated mitigation recommendations",
      "pulls live data from Google Maps, Street View, Elevation, and OpenWeather APIs for any coordinate worldwide",
    ],
    architecture: [
      "fetches four-directional street view imagery for a given coordinate",
      "runs a Mask2Former segmentation model (trained on Mapillary Vistas) to classify surface coverage",
      "combines surface data with terrain slope and live rainfall data into a weighted risk score",
      "generates mitigation recommendations and renders results as an interactive heat map",
    ],
    duration: "fall 2025",
    year: "2025",
    credit: "built with Kacem Ettahali and Diego Rico at HackRice, fall 2025.",
    // [STORM LEARNED — JOHN TO WRITE]: a sentence or two, optional.
    learned: "[STORM LEARNED — JOHN TO WRITE]",
    tags: ["react", "computer vision", "python", "pytorch"],
    stack: [
      "React",
      "Vite",
      "Redux Toolkit",
      "Leaflet",
      "Node.js",
      "Express",
      "Python",
      "PyTorch",
      "Mask2Former",
      "OpenCV",
    ],
    stackShort: ["React", "Python", "PyTorch", "OpenCV", "Leaflet"],
    image: "/projects/storm.png",
    links: {
      github: "https://github.com/johnwfan/storm-flood-risk",
      live: "",
    },
  },
];
