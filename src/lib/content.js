export const PROFILE = {
  name: "John Fan",
  role: "Full-Stack Developer",
  location: "Houston, TX",
  status: "open to internships",
  headline: "I'm a student at Rice University who is interested in full-stack development and likes to build clean, fast web products end-to-end.",
  about:
    "I like shipping things that feel fun and usable - design, frontend, backend, apis, databases, and more.",
  email: "johnfan.dev@gmail.com",
  links: {
    github: "https://github.com/johnwfan",
    linkedin: "https://linkedin.com/in/johnwfan",
    resume: "/John_Fan_Resume.pdf",
  },
};

export const STACK = {
  languages: [
    { key: "javascript", label: "Javascript" },
    { key: "python", label: "Python" },
    { key: "java", label: "Java" },
    { key: "c", label: "C" },
    { key: "cpp", label: "C++" },
    { key: "html", label: "HTML" },
    { key: "css", label: "CSS" },
    { key: "postgresql", label: "PostgreSQL" },
    { key: "sql", label: "SQL" },
  ],
  tools: [
    { key: "nextjs", label: "Next.js" },
    { key: "react", label: "React" },
    { key: "tailwind", label: "Tailwind CSS" },
    { key: "nodejs", label: "Node.js" },
    { key: "mongodb", label: "MongoDB" },
    { key: "vercel", label: "Vercel" },
    { key: "git", label: "Git" },
    { key: "github", label: "GitHub" },
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
    title: "Windows 98 Style Outfit Picker",
    blurb: "Wardrobe manager + constraint-based outfit ranking with real file storage + a clean api.",
    tags: ["FastAPI", "Python", "REST API", "CRUD", "Next.js"],
    metric: "7 endpoints",
    image: "/projects/outfit-picker.png",
    links: {
      github: "https://github.com/johnwfan/outfit-picker",
      live: "",
    },
    overview:
      "A full-stack wardrobe tool where you upload clothing items, add metadata (season/color/style tags), and generate a ranked list of outfits that match your constraints.",
    bullets: [
      "Built a fastapi backend with 7 restful crud endpoints, request validation, and sqlite persistence",
      "Implemented safe-delete + cleanup logic to keep the database and stored images in sync (no orphans)",
      "Designed an outfit scoring pipeline that normalizes item metadata and ranks candidates (structured to be ml-ready later)",
    ],
    stack: ["FastAPI", "Python", "SQLite", "Next.js"],
  },

  {
    slug: "lol-stats-tracker",
    title: "League of Legends Stats Tracker",
    blurb: "Player lookup → profile pages + match insights with charts, deployed on vercel.",
    tags: ["Next.js", "React", "Tailwind CSS", "Vercel", "Charts", "API Integration"],
    metric: "Deployed",
    image: "/projects/lol-stats-tracker.png",
    links: {
      github: "https://github.com/johnwfan/lol_stats_tracker",
      live: "https://lol-stats-tracker-johnf.vercel.app/",
    },
    overview:
      "A web dashboard that fetches player data from a game-data api and turns it into a clean, readable stats/profile experience with visual analytics.",
    bullets: [
      "Built a search flow + dynamic profile pages for players",
      "Added visual analytics (charts + breakdowns) to summarize performance at a glance",
      "Shipped a production deployment end-to-end (next.js app hosted on vercel)",
    ],
    stack: ["Next.js", "React", "Tailwind CSS"],
  },

  {
    slug: "storm",
    title: "Flood Risk Assessment",
    blurb: "Prototype flood-risk concept with a map-first ui + risk-scoring direction.",
    tags: ["Computer Vision", "React", "Python"],
    metric: "Prototype",
    image: "/projects/storm.png",
    links: { github: "https://github.com/johnwfan/storm-flood-risk", live: "" },
    overview:
      "A prototype exploring flood-risk intelligence: map-based exploration, a risk score concept, and a direction for combining vision segmentation + data into readable insights.",
    bullets: [
      "Built/iterated on a map-first interface to explore risk visually",
      "Defined a risk-scoring concept + how it would plug into the user experience",
      "Outlined an ml pipeline direction (segmentation → scoring → summary) for future expansion",
    ],
    stack: ["Python", "Computer Vision", "Maps", "React"],
  },
];


// keep your homepage featured section using the same cards:
export const FEATURED_PROJECTS = PROJECTS.slice(0, 3);


export const HERO_PHOTOS = [
  { src: "/hero/IMG_1871.jpg", alt: "" },
  { src: "/hero/IMG_9326.JPEG", alt: "" },
];

