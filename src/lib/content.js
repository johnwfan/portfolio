export const PROFILE = {
  name: "john fan",
  role: "full-stack software developer",
  location: "houston, tx",
  status: "open to internships",
  headline: "i'm a student at Rice University who likes to  build clean, fast web products end-to-end.",
  about:
    "i like shipping things that feel fun + usable - frontend, apis, databases, and whatever it takes to make the idea real.",
  email: "johnfan.dev@gmail.com",
  links: {
    github: "https://github.com/johnwfan",
    linkedin: "https://linkedin.com/in/johnwfan",
    resume: "/John_Fan_Resume.pdf",
  },
};

export const STACK = {
  languages: [
    { key: "javascript", label: "javascript" },
    { key: "python", label: "python" },
    { key: "java", label: "java" },
    { key: "c", label: "c" },
    { key: "cpp", label: "c++" },
    { key: "html", label: "html" },
    { key: "css", label: "css" },
    { key: "postgresql", label: "postgresql" },
    { key: "sql", label: "sql" },
  ],
  tools: [
    { key: "nextjs", label: "next.js" },
    { key: "react", label: "react" },
    { key: "tailwind", label: "tailwind" },
    { key: "nodejs", label: "node.js" },
    { key: "mongodb", label: "mongodb" },
    { key: "vercel", label: "vercel" },
    { key: "git", label: "git" },
    { key: "github", label: "github" },
  ],
};

export const TIMELINE = [
  {
    title: "rice university",
    subtitle: "b.s. computer science",
    time: "2025 — 2027",
    detail: "currently building a portfolio of full-stack + data projects.",
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

export const PROJECTS = [
  {
    slug: "outfit-picker",
    title: "windows 98 style outfit picker",
    blurb: "wardrobe manager + outfit ranking with a real api + storage.",
    tags: ["fastapi", "rest", "db", "ranking"],
    metric: "7 endpoints",
    image: "/projects/outfit-picker.png", // optional
    links: {
      github: "https://github.com/johnwfan/outfit-picker",
      live: "", // optional
    },
    overview:
      "a full-stack wardrobe tool that lets you upload items, tag metadata, and generate ranked outfits based on constraints.",
    bullets: [
      "built 7 crud endpoints + validation + persistence",
      "safe-delete routines to keep db/files consistent",
      "outfit scoring pipeline designed to be ml-ready later",
    ],
    stack: ["fastapi", "python", "sqlite", "next.js"],
  },

  {
    slug: "lol-stats-tracker",
    title: "league of legends stats tracker",
    blurb: "player analytics dashboard with search + profiles + insights.",
    tags: ["next.js", "api", "charts"],
    metric: "deployed",
    image: "/projects/lol-stats-tracker.png",
    links: {
      github: "https://github.com/johnwfan/lol_stats_tracker",
      live: "https://lol-stats-tracker-johnf.vercel.app/",
    },
    overview:
      "a stats dashboard that pulls player data and turns it into a clean profile + insights experience.",
    bullets: ["search + profile pages", "visual analytics with charts", "deployed end-to-end"],
    stack: ["next.js", "react", "tailwind"],
  },

  {
    slug: "storm",
    title: "flood risk assessment",
    blurb: "flood-risk concept: segmentation + scoring + map-based insights.",
    tags: ["cv", "data", "maps"],
    metric: "prototype",
    image: "/projects/storm.png",
    links: { github: "https://github.com/johnwfan/storm-flood-risk", live: "" },
    overview:
      "concept project for flood-risk intelligence: vision segmentation + risk scoring + readable summaries.",
    bullets: ["risk scoring concept", "map-first ui", "ml pipeline direction"],
    stack: ["python", "cv", "maps"],
  },
];

// keep your homepage featured section using the same cards:
export const FEATURED_PROJECTS = PROJECTS.slice(0, 3);


export const HERO_PHOTOS = [
  { src: "/hero/IMG_9326.JPEG", alt: "" },
  { src: "/hero/IMG_1871.jpg", alt: "" },
];

