export const PROFILE = {
  name: "john fan",
  role: "full-stack software developer",
  location: "houston, tx",
  status: "open to internships",
  // [HERO HEADLINE — JOHN TO WRITE]: the large H1 statement in the hero. Keep it short (fits one/two lines at 6xl-8xl type).
  headline: "hi i'm john!",
  subhead:
    "a rice university cs student and full-stack software engineer who loves turning ideas into real, working products.",
  // [HOME ABOUT-TEASER — JOHN TO WRITE]: 1-2 lines used on the home page teaser block, links through to /about.
  aboutTeaser: "click here to learn",
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
    "hey there, i'm currently a student at rice university studying computer science. i love building things that can used by real people, and i'm always looking to learn new things. ",
    "outside of coding, i enjoy playing video games, spending time with loved ones, and going on fun adventures. i also really like to work out and stay active.",
    "i have so much to learn and explore, and i'm excited to see where my journey takes me. if you want to connect or collaborate, feel free to reach out!",
  ],
};

// Synced against John's resume (public/John_Fan_Resume.pdf) — languages/tools split
// matches the resume's own "Languages" vs "Frameworks & Libraries" / "Tools & Databases"
// categorization. postgresql moved out of languages (it's a database, not a language).
export const STACK = {
  languages: [
    { key: "javascript", label: "javascript" },
    { key: "typescript", label: "typescript" },
    { key: "python", label: "python" },
    { key: "java", label: "java" },
    { key: "c", label: "c" },
    { key: "cpp", label: "c++" },
    { key: "sql", label: "sql" },
  ],
  tools: [
    { key: "nextjs", label: "next.js" },
    { key: "react", label: "react" },
    { key: "nodejs", label: "node.js" },
    { key: "express", label: "express" },
    { key: "tailwind", label: "tailwind" },
    { key: "postgresql", label: "postgresql" },
    { key: "mongodb", label: "mongodb" },
    { key: "prisma", label: "prisma" },
    { key: "docker", label: "docker" },
    { key: "aws", label: "aws" },
    { key: "vercel", label: "vercel" },
    { key: "git", label: "git" },
    { key: "github", label: "github" },
    { key: "githubactions", label: "github actions" },
    { key: "linux", label: "linux" },
    { key: "playwright", label: "playwright" },
  ],
};

// Timeline is currently not rendered on the About page (kept here, and in
// src/components/timeline.js, in case it goes back in later).
export const TIMELINE = [
  {
    title: "rice university",
    subtitle: "b.s. computer science",
    time: "2025 — 2028",
    detail: "currently building a portfolio of full-stack + data projects.",
  },
  {
    title: "screenz.ai / rankmonster.ai",
    subtitle: "software engineering intern",
    time: "may 2026 — aug 2026",
    detail:
      "shipped a cost analytics dashboard, fixed cross-system auth/session bugs, and redesigned the landing page while clearing 260+ seo crawl issues.",
  },
  {
    title: "icode instructor",
    subtitle: "python + web + robotics",
    time: "2024 — 2025",
    detail: "taught + mentored students through hands-on projects and debugging.",
  },
  {
    title: "dawson cs club",
    subtitle: "co-founder / vp",
    time: "2024 — 2025",
    detail: "grew a 30+ member club and ran workshops for html/css/js.",
  },
];

// Project order is fixed: Scuttle (flagship) -> StudioFlow -> Outfit Picker -> Storm.
// Project titles are the one exception to the site's lowercase copy convention.
export const PROJECTS = [
  {
    slug: "scuttle",
    title: "Scuttle.gg",
    flagship: true,
    blurb:
      "a full-stack league of legends stats tracker with real-time match data, cached riot api integration, and an ml-powered draft analysis tool.",
    overview:
      "scuttle lets you search any riot id and see ranked progress, champion mastery, and match history across 11 regions. under the hood it's a full authenticated app — github sign-in, saved search history, and a caching layer that keeps it fast under riot's rate limits. the standout feature is draft intelligence: a separate machine learning service that scores a 10-champion draft against a model trained on nearly 15,000 ranked matches, and lets you swap a single pick to see how the score shifts.",
    bullets: [
      "built a typed riot api client with automatic retry/backoff and platform-to-regional routing across all 11 supported regions",
      "added github authentication (nextauth) with persisted per-user search history in mongodb",
      "cut redundant riot api calls with upstash redis caching (7-day match cache, 1-hour mastery cache)",
      "shipped kda and performance trend charts with recharts",
    ],
    architecture: [
      "collected and processed 14,826 ranked matches into a training pipeline",
      "trained and evaluated a logistic regression model using rolling forward-patch validation, so it's tested the way it'll actually be used — on metas it hasn't seen yet",
      "served the model through a separate fastapi microservice, called server-side from a next.js api route",
      "built a counterfactual draft explorer that swaps one pick and shows how the model's score changes, without ever claiming a win probability the data can't support",
    ],
    duration: "november 2025 — present",
    tags: ["next.js", "typescript", "mongodb", "redis", "ml"],
    stack: [
      "next.js",
      "react",
      "typescript",
      "tailwind css",
      "framer motion",
      "recharts",
      "nextauth",
      "mongodb",
      "upstash redis",
      "fastapi",
      "scikit-learn",
    ],
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
    blurb:
      "a full-stack workflow platform for creative teams to manage projects, tasks, comments, and shared assets.",
    overview:
      "studioflow gives creative teams a structured, permissioned workspace for content work — projects, tasks, comments, and shared assets all live in one place, with role-based access control across 3 user roles enforcing who can see and touch what at the api level.",
    bullets: [
      "designed normalized postgresql schemas with prisma and implemented role-based access control for 3 user roles, enforcing team and project permissions across api routes",
      "built 10+ rest api endpoints with validation, error handling, and reusable service logic for projects, tasks, collaboration, and metadata",
      "optimized project views with server-side filtering, pagination, and tuned prisma queries to cut down database reads",
      "containerized the app with docker and deployed it on aws",
    ],
    architecture: [],
    duration: "april 2026 — present",
    tags: ["next.js", "postgresql", "prisma", "docker", "aws"],
    stack: [
      "next.js",
      "react",
      "typescript",
      "node.js",
      "express",
      "tailwind css",
      "shadcn/ui",
      "radix ui",
      "prisma",
      "postgresql",
      "clerk",
      "docker",
      "aws",
    ],
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
    blurb:
      "an ai try-on app — upload your wardrobe and a photo of yourself, and generate a styled outfit preview.",
    overview:
      "outfit picker is a full-stack app for visualizing outfits before you commit to them. you upload tops and bottoms into two browsable carousels, add a reference photo of yourself, describe a theme, and the backend generates an ai try-on image with gemini. it's built as a complete product loop — a next.js frontend talking to a fastapi backend, file storage, and an external generation api with caching and a fallback path when the quota runs out.",
    bullets: [
      "built a fastapi backend with rest endpoints for wardrobe uploads, reference photos, and image generation",
      "integrated google's gemini api (google-genai) to generate a themed try-on image from a top, bottom, and reference photo",
      "cached generations by (reference + top + bottom + theme) so identical requests don't re-generate",
      "added a fallback mode that serves a placeholder output if the ai provider's quota is exhausted, so the pipeline stays testable end to end",
    ],
    architecture: [],
    // Sourced from the repo's commit history: first commit 2025-12-20, last commit 2025-12-27.
    duration: "december 2025",
    tags: ["next.js", "fastapi", "python", "gemini api"],
    stack: ["next.js", "react", "tailwind css", "fastapi", "python", "google-genai"],
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
    blurb:
      "an ai-powered flood risk platform that scores real-world locations from street-level imagery.",
    overview:
      "storm analyzes flood risk for any location by combining computer vision with environmental data. it pulls four-directional street view imagery, runs it through a segmentation model to classify surfaces as pavement, greenery, or other, and combines that with terrain slope, rainfall intensity, and drainage data into a weighted risk score — visualized on an interactive map with ai-generated mitigation recommendations.",
    // Written at the project level rather than as personal "I built" claims, since this was a team build
    // and John's specific slice isn't specified yet — see the credit line below.
    bullets: [
      "scores flood risk with a weighted model combining surface permeability, terrain slope, rainfall intensity, and drainage infrastructure",
      "classifies street-level surface coverage (pavement, greenery, other) using a mask2former segmentation model",
      "visualizes results on an interactive map with heat-map overlays and ai-generated mitigation recommendations",
      "pulls live data from google maps, street view, elevation, and openweather apis for any coordinate worldwide",
    ],
    architecture: [
      "fetches four-directional street view imagery for a given coordinate",
      "runs a mask2former segmentation model (trained on mapillary vistas) to classify surface coverage",
      "combines surface data with terrain slope and live rainfall data into a weighted risk score",
      "generates mitigation recommendations and renders results as an interactive heat map",
    ],
    duration: "fall 2025",
    credit: "built with kacem ettahali and diego rico at hackrice, fall 2025.",
    tags: ["react", "computer vision", "python", "pytorch"],
    stack: [
      "react",
      "vite",
      "redux toolkit",
      "leaflet",
      "node.js",
      "express",
      "python",
      "pytorch",
      "mask2former",
      "opencv",
    ],
    image: "/projects/storm.png",
    links: {
      github: "https://github.com/johnwfan/storm-flood-risk",
      live: "",
    },
  },
];
