// All project facts. `description` is typed out on /work; `line` is the
// recruiter-mode one-liner. Covers live in /public/covers/<slug>/0–3.png.
//
// `caseStudy` is the longer write-up carried over from the old site, kept for the
// case study pages (not designed yet, so nothing renders it):
//   overview     a paragraph on what it is
//   highlights   what was built, one line each
//   howItWorks   pipeline / architecture steps (empty when there aren't any)
//   fullStack    every tool; `stack` above is the short version
//   timeline     when it was built
//   credit       collaborators, for team projects
//   screenshot   /public/screenshots/<slug>.png
//   links        github, and live when there is one

export const PROJECTS = [
  {
    slug: "scuttle",
    name: "scuttle.gg",
    year: "2025–26",
    role: "solo",
    stack: "next.js · typescript · mongodb · redis · fastapi",
    description:
      "a league of legends stats site. it started as a simple tracker and turned into an ml project. it looks up players across 11 regions and covers ranked stats, match history and full-team analytics.",
    line: "league of legends stats and match analytics, plus ml experiments",
    caseStudy: {
      overview:
        "scuttle lets you search any riot id and see ranked progress, champion mastery, and match history across 11 regions. under the hood it's a full authenticated app — github sign-in, saved search history, and a caching layer that keeps it fast under riot's rate limits. the standout feature is draft intelligence: a separate machine learning service that scores a 10-champion draft against a model trained on nearly 15,000 ranked matches, and lets you swap a single pick to see how the score shifts.",
      highlights: [
        "built a typed riot api client with automatic retry/backoff and platform-to-regional routing across all 11 supported regions",
        "added github authentication (nextauth) with persisted per-user search history in mongodb",
        "cut redundant riot api calls with upstash redis caching (7-day match cache, 1-hour mastery cache)",
        "shipped kda and performance trend charts with recharts",
      ],
      howItWorks: [
        "collected and processed 14,826 ranked matches into a training pipeline",
        "trained and evaluated a logistic regression model using rolling forward-patch validation, so it's tested the way it'll actually be used — on metas it hasn't seen yet",
        "served the model through a separate fastapi microservice, called server-side from a next.js api route",
        "built a counterfactual draft explorer that swaps one pick and shows how the model's score changes, without ever claiming a win probability the data can't support",
      ],
      fullStack: [
        "next.js", "react", "typescript", "tailwind css", "framer motion", "recharts",
        "nextauth", "mongodb", "upstash redis", "fastapi", "scikit-learn",
      ],
      timeline: "november 2025 — present",
      screenshot: "/screenshots/scuttle.png",
      links: {
        github: "https://github.com/johnwfan/lol-stats-tracker",
        live: "https://lol-stats-tracker-johnf.vercel.app/",
      },
    },
  },
  {
    slug: "flow",
    name: "flow",
    year: "2026",
    role: "frontend and deployment, team project",
    stack: "next.js · typescript · timescaledb · docker",
    description:
      "a focus coach that uses your webcam to tell when you’re losing focus and steps in. video stays on your computer. built with a team at hackrice 16.",
    line: "a focus coach that uses your webcam to tell when you’re distracted",
    // No case study content yet (the old site didn't have flow).
    caseStudy: null,
  },
  {
    slug: "studioflow",
    name: "studioflow",
    year: "2026",
    role: "solo, personal project",
    stack: "next.js · prisma · postgres",
    description:
      "a project management tool for creative teams, with projects, tasks, a publishing calendar and a kanban board.",
    line: "project and asset management for creative teams",
    caseStudy: {
      overview:
        "studioflow gives creative teams a structured, permissioned workspace for content work — projects, tasks, comments, and shared assets all live in one place, with role-based access control across 3 user roles enforcing who can see and touch what at the api level.",
      highlights: [
        "designed normalized postgresql schemas with prisma and implemented role-based access control for 3 user roles, enforcing team and project permissions across api routes",
        "built 10+ rest api endpoints with validation, error handling, and reusable service logic for projects, tasks, collaboration, and metadata",
        "optimized project views with server-side filtering, pagination, and tuned prisma queries to cut down database reads",
        "containerized the app with docker and deployed it on aws",
      ],
      howItWorks: [],
      fullStack: [
        "next.js", "react", "typescript", "node.js", "express", "tailwind css", "shadcn/ui",
        "radix ui", "prisma", "postgresql", "clerk", "docker", "aws",
      ],
      timeline: "april 2026 — present",
      screenshot: "/screenshots/studioflow.png",
      links: {
        github: "https://github.com/johnwfan/studioflow",
      },
    },
  },
  {
    slug: "storm",
    name: "storm",
    year: "2025",
    role: "frontend, team project",
    stack: "react · python · pytorch · opencv · leaflet",
    description: "maps flood risk using street-level images.",
    line: "flood-risk mapping from street-level images",
    caseStudy: {
      overview:
        "storm analyzes flood risk for any location by combining computer vision with environmental data. it pulls four-directional street view imagery, runs it through a segmentation model to classify surfaces as pavement, greenery, or other, and combines that with terrain slope, rainfall intensity, and drainage data into a weighted risk score — visualized on an interactive map with ai-generated mitigation recommendations.",
      // Written at the project level, not as personal claims: team build, and
      // john's own slice (frontend) isn't broken out yet.
      highlights: [
        "scores flood risk with a weighted model combining surface permeability, terrain slope, rainfall intensity, and drainage infrastructure",
        "classifies street-level surface coverage (pavement, greenery, other) using a mask2former segmentation model",
        "visualizes results on an interactive map with heat-map overlays and ai-generated mitigation recommendations",
        "pulls live data from google maps, street view, elevation, and openweather apis for any coordinate worldwide",
      ],
      howItWorks: [
        "fetches four-directional street view imagery for a given coordinate",
        "runs a mask2former segmentation model (trained on mapillary vistas) to classify surface coverage",
        "combines surface data with terrain slope and live rainfall data into a weighted risk score",
        "generates mitigation recommendations and renders results as an interactive heat map",
      ],
      fullStack: [
        "react", "vite", "redux toolkit", "leaflet", "node.js", "express",
        "python", "pytorch", "mask2former", "opencv",
      ],
      timeline: "fall 2025",
      credit: "built with kacem ettahali and diego rico at hackrice, fall 2025.",
      screenshot: "/screenshots/storm.png",
      links: {
        github: "https://github.com/johnwfan/storm-flood-risk",
      },
    },
  },
  {
    slug: "outfit-picker",
    name: "outfit picker",
    year: "2025",
    role: "solo",
    stack: "fastapi · next.js · gemini",
    description:
      "recommends outfits from the clothes you’ve saved, ranks them, and generates a preview with gemini.",
    line: "outfit recommendations from the clothes you’ve saved",
    caseStudy: {
      overview:
        "outfit picker is a full-stack app for visualizing outfits before you commit to them. you upload tops and bottoms into two browsable carousels, add a reference photo of yourself, describe a theme, and the backend generates an ai try-on image with gemini. it's built as a complete product loop — a next.js frontend talking to a fastapi backend, file storage, and an external generation api with caching and a fallback path when the quota runs out.",
      highlights: [
        "built a fastapi backend with rest endpoints for wardrobe uploads, reference photos, and image generation",
        "integrated google's gemini api (google-genai) to generate a themed try-on image from a top, bottom, and reference photo",
        "cached generations by (reference + top + bottom + theme) so identical requests don't re-generate",
        "added a fallback mode that serves a placeholder output if the ai provider's quota is exhausted, so the pipeline stays testable end to end",
      ],
      howItWorks: [],
      fullStack: ["next.js", "react", "tailwind css", "fastapi", "python", "google-genai"],
      timeline: "december 2025",
      screenshot: "/screenshots/outfit-picker.png",
      links: {
        github: "https://github.com/johnwfan/outfit-picker",
      },
    },
  },
];

export function coverFrames(slug) {
  return [0, 1, 2, 3].map((n) => `/covers/${slug}/${n}.png`);
}
