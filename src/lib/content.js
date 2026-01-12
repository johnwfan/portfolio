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
    title: "windows 98 style outfit picker",
    blurb: "wardrobe manager + constraint-based outfit ranking with real file storage + a clean api.",
    tags: ["fastapi", "python", "rest api", "crud", "next.js"],
    metric: "7 endpoints",
    image: "/projects/outfit-picker.png",
    links: {
      github: "https://github.com/johnwfan/outfit-picker",
      live: "",
    },
    overview:
      "a full-stack wardrobe tool where you upload clothing items, add metadata (season/color/style tags), and generate a ranked list of outfits that match your constraints.",
    bullets: [
      "built a fastapi backend with 7 restful crud endpoints, request validation, and sqlite persistence",
      "implemented safe-delete + cleanup logic to keep the database and stored images in sync (no orphans)",
      "designed an outfit scoring pipeline that normalizes item metadata and ranks candidates (structured to be ml-ready later)",
    ],
    stack: ["fastapi", "python", "sqlite", "next.js"],
  },

  {
    slug: "lol-stats-tracker",
    title: "league of legends stats tracker",
    blurb: "player lookup → profile pages + match insights with charts, deployed on vercel.",
    tags: ["next.js", "react", "tailwind css", "vercel", "charts", "api integration"],
    metric: "deployed",
    image: "/projects/lol-stats-tracker.png",
    links: {
      github: "https://github.com/johnwfan/lol_stats_tracker",
      live: "https://lol-stats-tracker-johnf.vercel.app/",
    },
    overview:
      "a web dashboard that fetches player data from a game-data api and turns it into a clean, readable stats/profile experience with visual analytics.",
    bullets: [
      "built a search flow + dynamic profile pages for players",
      "added visual analytics (charts + breakdowns) to summarize performance at a glance",
      "shipped a production deployment end-to-end (next.js app hosted on vercel)",
    ],
    stack: ["next.js", "react", "tailwind"],
  },

  {
    slug: "storm",
    title: "flood risk assessment",
    blurb: "prototype flood-risk concept with a map-first ui + risk-scoring direction.",
    tags: ["computer vision", "react", "python"],
    metric: "prototype",
    image: "/projects/storm.png",
    links: { github: "https://github.com/johnwfan/storm-flood-risk", live: "" },
    overview:
      "a prototype exploring flood-risk intelligence: map-based exploration, a risk score concept, and a direction for combining vision segmentation + data into readable insights.",
    bullets: [
      "built/iterated on a map-first interface to explore risk visually",
      "defined a risk-scoring concept + how it would plug into the user experience",
      "outlined an ml pipeline direction (segmentation → scoring → summary) for future expansion",
    ],
    stack: ["python", "cv", "maps"],
  },
];


// keep your homepage featured section using the same cards:
export const FEATURED_PROJECTS = PROJECTS.slice(0, 3);


export const HERO_PHOTOS = [
  { src: "/hero/IMG_1871.jpg", alt: "" },
  { src: "/hero/IMG_9326.JPEG", alt: "" },
];

