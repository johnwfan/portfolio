"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { stageAtLeast, stageBefore } from "@/lib/entrance";

// Stable references, reused across renders whenever the underlying boolean
// hasn't changed. `stage` keeps advancing (morph -> settle -> done) well
// after `isExpanding` etc. have settled to their final value, which
// re-renders this component each time; a fresh inline object on every one
// of those renders made Framer Motion briefly replay the animation from its
// start, flashing the opaque overlay back in right at the end. Memoizing
// keeps the object identity stable so there's nothing to replay.
const OVERLAY_VISIBLE = { opacity: 1 };
const OVERLAY_HIDDEN = { opacity: 0 };
const RING_RESTING = { scale: 1, opacity: 1 };
const RING_PULSE = { scale: [1, 1.06, 1] };
const CIRCLE_DRAWN = { pathLength: 1, opacity: 1 };
const CIRCLE_UNDRAWN = { pathLength: 0, opacity: 0 };
const OVERLAY_TRANSITION = { duration: 0.4, ease: [0.16, 1, 0.3, 1] };
const CIRCLE_TRANSITION = { duration: 0.55, ease: "easeInOut" };

// Purely decorative and controlled entirely by the `stage` prop from
// src/components/entrance.js (the single clock) — this component owns no
// timers of its own. #entrance-ring is always rendered (so the pre-hydration
// CSS gate in globals.css has something to show/hide before React ever
// runs); its default `display: none` is what keeps it invisible on every
// visit that isn't a first-time home load.
//
// The dot/"john" twins are plain motion.span elements, not Framer Motion
// `layoutId` shared-layout elements — layoutId's projection system measured
// a visibly wrong position for elements nested under this overlay's
// `position: fixed` ancestor (a known class of Framer Motion/fixed-
// positioning interaction). The handoff to the real Intro elements is instead
// computed analytically in intro.js from this twin's known/live geometry
// (see TWIN_DOT_DIAMETER / TWIN_JOHN_FONT_SIZE in src/lib/entrance.js, plus a
// live measurement of this ring's own <svg> for the ring handoff) — keep
// those constants in sync with the literal sizes used below.
//
// At "morph" the ring wrapper stays at rest scale — it doesn't explode away.
// Intro's real ring animates in underneath at the same moment, so this
// overlay only needs to crossfade out (see OVERLAY_TRANSITION below) while
// the real ring takes over visually.
export default function EntranceRing({ stage }) {
  const ringDrawn = stageAtLeast(stage, "dot");
  const showTwins = stageAtLeast(stage, "dot") && stageBefore(stage, "morph");
  const showName = stageAtLeast(stage, "name") && stageBefore(stage, "morph");
  const isPulsing = stage === "pulse";
  const isExpanding = stageAtLeast(stage, "morph");

  const overlayAnimate = useMemo(() => (isExpanding ? OVERLAY_HIDDEN : OVERLAY_VISIBLE), [isExpanding]);
  const ringAnimate = useMemo(() => (isPulsing ? RING_PULSE : RING_RESTING), [isPulsing]);
  const ringTransition = useMemo(
    () => (isPulsing ? { duration: 0.18, ease: [0.4, 0, 0.2, 1] } : { duration: 0.2 }),
    [isPulsing],
  );
  const circleAnimate = useMemo(() => (ringDrawn ? CIRCLE_DRAWN : CIRCLE_UNDRAWN), [ringDrawn]);

  return (
    <motion.div
      id="entrance-ring"
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[70] overflow-hidden bg-background"
      animate={overlayAnimate}
      transition={OVERLAY_TRANSITION}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="relative" animate={ringAnimate} transition={ringTransition}>
          <svg
            style={{ width: "min(40vw, 170px)", height: "min(40vw, 170px)" }}
            viewBox="0 0 170 170"
          >
            <motion.circle
              cx="85"
              cy="85"
              r="78"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={circleAnimate}
              transition={CIRCLE_TRANSITION}
            />
          </svg>

          {isPulsing && (
            <motion.span
              className="absolute inset-0 m-auto size-40 rounded-full border border-primary/40"
              initial={{ opacity: 0.35, scale: 1 }}
              animate={{ opacity: 0, scale: 1.3 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          )}
        </motion.div>
      </div>

      {showTwins && (
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="size-3.5 rounded-full bg-primary"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          />
        </div>
      )}

      {showName && (
        <div className="absolute inset-0 flex items-center justify-center pt-14">
          <motion.span
            className="font-display text-2xl font-semibold lowercase tracking-tight text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
          >
            john
          </motion.span>
        </div>
      )}
    </motion.div>
  );
}
