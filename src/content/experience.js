// The /experience timeline (UPDATE-2 §2), in order. Recruiter mode keeps its
// own short list in RecruiterView.js.

export const SCREENZ = {
  key: "screenz",
  when: "may – aug 2026 · remote",
  name: "screenz.ai",
  role: "software engineer intern",
  aka: "also known as rankmonster.ai",
  stack: ["next.js", "nextauth", "postgresql", "jest", "playwright"],
  numbers: [
    { v: "~20", l: "call sites instrumented for ai cost tracking" },
    { v: "6", l: "ai / llm provider apis covered" },
    { v: "~10s", l: "cut from prospect report latency" },
    { v: "24", l: "tests added (20 jest, 4 playwright)" },
  ],
  wins: [
    {
      t: "ai cost attribution",
      d: "built and shipped an ai cost-attribution system and an admin cogs dashboard, instrumenting about 20 call sites across 6 ai and llm provider apis to attribute customer spend and forecast monthly costs.",
    },
    {
      t: "faster prospect reports",
      d: "rebuilt the prospect pdf pipeline with stricter competitor matching and a 12-check geo/aeo site audit, then parallelized processing to cut report latency by up to about 10 seconds.",
    },
    {
      t: "onboarding data loss",
      d: "fixed lost onboarding data across oauth, email signup and early drop-off by saving qualification data sooner, and backfilled affected accounts with an idempotent postgresql migration. validated with 20 jest and 4 playwright tests.",
    },
    {
      t: "admin impersonation",
      d: "fixed admin impersonation across browser restarts by rebuilding session storage from identity cookies and nextauth jwts, restoring admin controls and clearing stale state on logout.",
    },
  ],
};

export const ICODE = {
  key: "icode",
  when: "aug 2024 – mar 2025 · pearland, tx",
  name: "icode",
  role: "software & robotics instructor",
  wins: [
    {
      t: "teaching",
      d: "taught python, javascript, html/css and vex robotics to classes of 15–25 students, guiding them through debugging, design, build and test cycles.",
    },
  ],
};

export const EXTERNSHIPS = {
  key: "externships",
  when: "2025 – 2026",
  name: "externships",
  role: "through owl edge, with rice alumni",
  rows: [
    { org: "amazon", focus: "software engineering externship", when: "mar 2026" },
    { org: "google", focus: "mentorship on engineering careers and cloud computing", when: "2025–26" },
    { org: "digital.ai", focus: "software engineering externship", when: "dec 2025 – jan 2026" },
  ],
};

export const EXPERIENCE = [SCREENZ, ICODE, EXTERNSHIPS];
