import { PROJECTS } from "@/content/projects";

// Turns a project into the case study template's slots (UPDATE §6).

const MONTHS = {
  january: "jan",
  february: "feb",
  march: "mar",
  april: "apr",
  may: "may",
  june: "jun",
  july: "jul",
  august: "aug",
  september: "sep",
  october: "oct",
  november: "nov",
  december: "dec",
};

// "november 2025 — present" → "nov 2025 – now"
export function shortWhen(timeline) {
  return timeline
    .replace(/[a-z]+/g, (w) => MONTHS[w] ?? (w === "present" ? "now" : w))
    .replace(/\s*—\s*/g, " – ");
}

function firstSentence(text) {
  const i = text.indexOf(". ");
  return i < 0 ? [text, ""] : [text.slice(0, i + 1), text.slice(i + 2)];
}

// Chapters for projects without custom ones, from the older write-up fields.
function chaptersFrom(cs) {
  const chapters = [];
  if (cs.overview) {
    const [lead, body] = firstSentence(cs.overview);
    chapters.push({ title: "overview", lead, body });
  }
  if (cs.highlights?.length) {
    const [first, ...rest] = cs.highlights;
    chapters.push({ title: "what i built", lead: `${first}.`, list: rest });
  }
  if (cs.howItWorks?.length) {
    chapters.push({ title: "how it works", steps: cs.howItWorks });
  }
  if (cs.fullStack?.length) {
    chapters.push({ title: "stack", chips: cs.fullStack });
  }
  return chapters;
}

export function getCaseStudy(slug) {
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index < 0) return null;
  const p = PROJECTS[index];
  const cs = p.caseStudy;
  const nextIndex = (index + 1) % PROJECTS.length; // the last one wraps to the first
  const of = (i) => `${String(i + 1).padStart(2, "0")} of ${String(PROJECTS.length).padStart(2, "0")}`;

  const links = [];
  if (cs?.links?.live) links.push({ label: "live site", href: cs.links.live });
  if (cs?.links?.github) links.push({ label: "github", href: cs.links.github });

  // Meta cells, each with its grid width; cells without data are left out.
  const meta = [
    p.role && { key: "role", label: "role", value: cs?.role ?? p.role, width: "1fr" },
    cs?.timeline && { key: "when", label: "when", value: shortWhen(cs.timeline), width: "1fr" },
    p.stack && { key: "stack", label: "stack", value: p.stack, width: "2fr" },
    links.length && { key: "links", label: "links", links, width: "1.2fr" },
  ].filter(Boolean);

  return {
    project: p,
    position: of(index),
    lede: cs?.lede ?? p.description,
    meta,
    hero: p.screens[0] ?? null,
    heroCaption: cs?.captions?.[0] ?? null,
    facts: cs?.facts ?? [],
    chapters: cs ? (cs.chapters ?? chaptersFrom(cs)) : [],
    credit: cs?.credit ?? null,
    next: { project: PROJECTS[nextIndex], position: of(nextIndex) },
  };
}
