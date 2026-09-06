"use client";

import { useLayoutEffect, useRef, useState } from "react";
import EntranceRing from "./entrance-ring";
import Intro from "./intro";
import { INTRO_SESSION_KEY, STAGE_TIMES, isEntrancePending, stageAtLeast } from "@/lib/entrance";

// The single authoritative clock for the whole entrance: this is the only
// component that schedules timers. EntranceRing and Hero are purely
// controlled by the `stage`/`revealed` values below, so the ring, the
// "john"/dot handoff, and the hero reveal can never drift relative to one
// another. Navbar is the one deliberate exception — it lives outside this
// tree (root layout) and independently reads isEntrancePending() once at
// its own mount, which is fine since it only needs to know "is an entrance
// about to play," not participate in the moment-to-moment choreography.
export default function Entrance() {
  // Lazy initializer runs synchronously during the client's first render
  // (hydration), by which point the pre-hydration script has already set
  // (or not set) data-intro on <html> — so this is correct from the very
  // first render, with no later correction needed. That matters: an earlier
  // version defaulted to "done" and corrected to "idle" inside an effect,
  // which briefly (if invisibly, by React's own paint timing) set Hero's
  // `revealed` to true before flipping it to false — but Framer Motion
  // animates between whatever `animate` targets it's given regardless of
  // whether either was ever painted, so that produced a real, visible ~400ms
  // fade that had nothing to do with the actual choreography.
  const [stage, setStage] = useState(() => (isEntrancePending() ? "idle" : "done"));
  const timers = useRef([]);

  useLayoutEffect(() => {
    if (!isEntrancePending()) return;

    const schedule = (name, delay) => {
      const id = setTimeout(() => {
        setStage(name);
        if (name === "morph") {
          try {
            sessionStorage.setItem(INTRO_SESSION_KEY, "1");
          } catch {
            // sessionStorage unavailable (private mode, etc.) — non-fatal,
            // just means the entrance may play again next load.
          }
        }
        if (name === "done") {
          document.documentElement.removeAttribute("data-intro");
        }
      }, delay);
      timers.current.push(id);
    };

    schedule("dot", STAGE_TIMES.dot);
    schedule("name", STAGE_TIMES.name);
    schedule("hold", STAGE_TIMES.hold);
    schedule("pulse", STAGE_TIMES.pulse);
    schedule("morph", STAGE_TIMES.morph);
    schedule("settle", STAGE_TIMES.settle);
    schedule("done", STAGE_TIMES.done);

    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, []);

  const revealed = stageAtLeast(stage, "morph");

  return (
    <>
      <EntranceRing stage={stage} />
      <Intro revealed={revealed} />
    </>
  );
}
