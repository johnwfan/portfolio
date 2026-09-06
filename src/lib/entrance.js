// Session-only "have we played the entrance" flag. Must match the literal
// string used in the pre-hydration blocking script in src/app/layout.js —
// that script runs before any JS module graph loads, so it can't import
// this constant directly.
export const INTRO_SESSION_KEY = "john-intro-seen";

// All entrance timing lives here so the coordinator (src/components/entrance.js)
// and the navbar's independent fade-in delay never drift relative to each other.
export const STAGE_TIMES = {
  idle: 0,
  dot: 150,
  name: 400,
  hold: 700,
  pulse: 850,
  morph: 1050,
  settle: 1250,
  done: 1650,
};

export const STAGE_ORDER = ["idle", "dot", "name", "hold", "pulse", "morph", "settle", "done"];

// The entrance overlay's decorative "john"/dot twins are always dead-center
// in the viewport at these literal sizes. Framer Motion's `layoutId` shared-
// layout projection measured a visibly wrong position for these elements
// (nested under the overlay's `position: fixed` ancestor — a known class of
// Framer Motion/fixed-positioning interaction), so the "john"/dot handoff in
// hero.js computes its own FLIP transform analytically from this known twin
// geometry instead of relying on layoutId. Keep these in sync with the
// literal Tailwind sizes used in entrance-ring.js (size-3.5 dot, text-2xl
// "john").
export const TWIN_DOT_DIAMETER = 14;
export const TWIN_JOHN_FONT_SIZE = 24;

export function stageAtLeast(stage, target) {
  return STAGE_ORDER.indexOf(stage) >= STAGE_ORDER.indexOf(target);
}

export function stageBefore(stage, target) {
  return STAGE_ORDER.indexOf(stage) < STAGE_ORDER.indexOf(target);
}

// True only when the pre-hydration script (in layout.js) decided this load
// should play the entrance: first visit to "/" this session, motion allowed.
export function isEntrancePending() {
  return typeof document !== "undefined" && document.documentElement.dataset.intro === "pending";
}

// One-time check, not a live subscription -- same contract as the gate above.
// Used by Intro to decide whether Stage 3's scroll-driven transform should be
// a no-op (a mid-session OS toggle won't be picked up until next load, same
// as the boot gate already behaves).
export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
