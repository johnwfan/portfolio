// All project facts. `description` is typed out on /work; `line` is the
// recruiter-mode one-liner. Covers live in /public/covers/<slug>/0–3.png.

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
  },
  {
    slug: "storm",
    name: "storm",
    year: "2025",
    role: "frontend, team project",
    // Waiting on John (HANDOFF §11.1); the references show this placeholder.
    stack: "[stack]",
    description: "maps flood risk using street-level images.",
    line: "flood-risk mapping from street-level images",
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
  },
];

export function coverFrames(slug) {
  return [0, 1, 2, 3].map((n) => `/covers/${slug}/${n}.png`);
}
