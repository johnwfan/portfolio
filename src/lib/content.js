export const PROFILE = {
  name: "john fan",
  role: "full-stack software developer",
  location: "houston, tx",
  status: "open to internships",
  headline: "i'm a student at Rice University who likes to  build clean, fast web products end-to-end.",
  about:
    "i like shipping things that feel fun + usable — frontend, apis, databases, and whatever it takes to make the idea real.",
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

export const FEATURED_PROJECTS = [
  {
    title: "windows 98 style outfit picker",
    blurb: "wardrobe manager + outfit ranking with a real api + storage.",
    tags: ["fastapi", "rest", "db", "ranking"],
    href: "/projects/outfit-picker",
    metric: "7 endpoints",
    image: "/projects/outfit-picker.png",
  },
  {
    title: "league of legends stats tracker",
    blurb: "player analytics dashboard with search + profiles + insights.",
    tags: ["next.js", "api", "charts"],
    href: "/projects/lol-stats-tracker",
    metric: "deployed",
    image: "/projects/lol-stats-tracker.png",
  },
  {
    title: "flood risk assessment",
    blurb: "flood-risk concept: segmentation + scoring + map-based insights.",
    tags: ["cv", "data", "maps"],
    href: "/projects/storm-1",
    metric: "prototype",
    image: "/projects/storm.png",
  },
];

export const HERO_PHOTOS = [
  { src: "/hero/IMG_1871.jpg", alt: "" },
  { src: "/hero/IMG_4667.JPEG", alt: "" },
  { src: "/hero/IMG_5091.JPEG", alt: "" },
  { src: "/hero/IMG_8610.JPEG", alt: "" },
  { src: "/hero/IMG_9326.JPEG", alt: "" },
];

