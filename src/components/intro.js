"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { PROFILE, PROJECTS } from "@/lib/content";
import { TWIN_JOHN_FONT_SIZE, prefersReducedMotion } from "@/lib/entrance";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

// Stable references, reused across renders whenever the underlying value
// hasn't changed -- a fresh inline object on a later re-render (e.g. the
// "settle"/"done" stage transitions, which happen after `revealed` is
// already true) would hand Framer Motion a new target and briefly replay
// the transition. Same reasoning already applied in entrance-ring.js.
const REVEALED_TARGET = { opacity: 1, x: 0, y: 0, scale: 1 };
const IDENTITY_FROM = { x: 0, y: 0, scale: 1 };
const JOHN_TRANSITION = { duration: 0.4, ease: [0.16, 1, 0.3, 1] };
const DOT_TRANSITION = { duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.05 };
const RING_TRANSITION = { duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.03 };

// Both the ring and the dot rest at the exact same point (the dot is the
// ring's own center), so they share one static position -- only their own
// independent FLIP/spring transforms differ. The horizontal position is a
// deliberate asymmetric bias (further right from sm: up); the vertical
// position is measured against the real text layout at runtime (see
// `ringTop` below) rather than guessed as a fixed percentage, since the
// text stack's actual height varies enough across breakpoints/font-load
// that a percentage guess either overlaps a text line or drifts into dead
// space depending on viewport size.
const FIELD_POSITION = "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 sm:left-[78%]";

const MAX_POINTER_DRIFT = 13;

// Ring/tail geometry (matches the SVG coordinates used below).
const RING_RADIUS = 92;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;
const TAIL_LENGTH = 220;

// `revealed` is owned entirely by the entrance coordinator (src/components/entrance.js).
// The ring, the dot, and the "john" word are always in the DOM -- only their
// opacity/transform toggle -- so the page's box model never shifts.
//
// The boot overlay's ring/dot/"john" twins are always dead-center in the
// viewport. Rather than a Framer Motion `layoutId` shared-layout handoff --
// which the entrance system already found gives a visibly wrong position for
// elements nested under the overlay's `position: fixed` ancestor -- each real
// element here computes its own starting transform analytically from the
// twins' known/live geometry, then animates to identity. The ring's on-screen
// size is responsive (not a fixed constant like the dot/"john" twins), so its
// starting rect is measured live from the boot overlay's actual <svg>.
export default function Intro({ revealed = true }) {
  const building = PROJECTS.find((p) => p.flagship);

  const johnRef = useRef(null);
  const ringSvgRef = useRef(null);
  const ringAnchorRef = useRef(null);
  const outerRef = useRef(null);
  const fieldRef = useRef(null);
  const spacerRef = useRef(null);

  const [johnFrom, setJohnFrom] = useState(null);
  const [ringFrom, setRingFrom] = useState(null);
  const [ringTop, setRingTop] = useState(null);
  const [reduced] = useState(prefersReducedMotion);

  // The ring/dot's vertical rest position tracks the real gap left in the
  // text flow (between the meta line and the tagline) rather than a fixed
  // percentage guess -- the text stack's actual height shifts enough across
  // breakpoints and once webfonts swap in that a percentage either overlaps
  // a text line or drifts into dead space depending on viewport size.
  useLayoutEffect(() => {
    function measure() {
      if (!spacerRef.current || !fieldRef.current) return;
      const spacerRect = spacerRef.current.getBoundingClientRect();
      const fieldRect = fieldRef.current.getBoundingClientRect();
      setRingTop(spacerRect.top - fieldRect.top + spacerRect.height / 2);
    }
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useLayoutEffect(() => {
    if (revealed) return; // only relevant while an entrance is actually pending

    if (johnRef.current) {
      const rect = johnRef.current.getBoundingClientRect();
      const fontSize = parseFloat(getComputedStyle(johnRef.current).fontSize) || TWIN_JOHN_FONT_SIZE;
      setJohnFrom({
        x: window.innerWidth / 2 - (rect.left + rect.width / 2),
        y: window.innerHeight / 2 - (rect.top + rect.height / 2),
        scale: TWIN_JOHN_FONT_SIZE / fontSize,
      });
    }

    const bootRingSvg = document.querySelector("#entrance-ring svg");
    if (bootRingSvg && ringSvgRef.current) {
      const bootRect = bootRingSvg.getBoundingClientRect();
      const introRect = ringSvgRef.current.getBoundingClientRect();
      setRingFrom({
        x: bootRect.left + bootRect.width / 2 - (introRect.left + introRect.width / 2),
        y: bootRect.top + bootRect.height / 2 - (introRect.top + introRect.height / 2),
        scale: introRect.width ? bootRect.width / introRect.width : 1,
      });
    }
  }, [revealed]);

  const johnAnimate = useMemo(
    () => (revealed ? REVEALED_TARGET : { opacity: 0, ...(johnFrom ?? IDENTITY_FROM) }),
    [revealed, johnFrom],
  );
  // The dot's boot twin sits at the exact same viewport-center point as the
  // boot ring, and the dot's rest position is the real ring's exact center
  // too -- so the ring's own computed FLIP delta is also the dot's correct
  // FLIP delta. Its size (14px, matching the boot twin) never changes, only position.
  const dotAnimate = useMemo(
    () => (revealed ? REVEALED_TARGET : { opacity: 0, ...(ringFrom ?? IDENTITY_FROM) }),
    [revealed, ringFrom],
  );
  const ringAnimate = useMemo(
    () => (revealed ? REVEALED_TARGET : { opacity: 0, ...(ringFrom ?? IDENTITY_FROM) }),
    [revealed, ringFrom],
  );

  // ---- Stage 2: one interaction -- the dot drifts toward the pointer, and
  // the ring (tethered to it) leans a few pixels in response. One spring,
  // two coefficients -- not two independent effects. ----
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const dotSpringX = useSpring(pointerX, { stiffness: 280, damping: 30 });
  const dotSpringY = useSpring(pointerY, { stiffness: 280, damping: 30 });
  const ringTetherX = useTransform(dotSpringX, (v) => v * 0.12);
  const ringTetherY = useTransform(dotSpringY, (v) => v * 0.12);

  useEffect(() => {
    if (!revealed || reduced) return;
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) return;

    const field = fieldRef.current;
    if (!field) return;

    function handlePointerMove(e) {
      const anchor = ringAnchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const pull = Math.min(1, dist / (rect.width || 1));
      pointerX.set((dx / dist) * MAX_POINTER_DRIFT * pull);
      pointerY.set((dy / dist) * MAX_POINTER_DRIFT * pull);
    }

    function handlePointerLeave() {
      pointerX.set(0);
      pointerY.set(0);
    }

    field.addEventListener("pointermove", handlePointerMove);
    field.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      field.removeEventListener("pointermove", handlePointerMove);
      field.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [revealed, reduced, pointerX, pointerY]);

  // ---- Stage 3: scroll opens the ring and extends its own stroke down into
  // the work section. The gap and the tail share one color/width/anchor, so
  // the tail reads as the ring's line escaping through the opening it makes,
  // not as a separate line spawning underneath it. ----
  const { scrollYProgress } = useScroll({ target: outerRef, offset: ["start start", "end start"] });

  const fieldScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.35]);
  const fieldLift = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -70]);
  const fieldFade = useTransform(scrollYProgress, [0, 0.6, 1], reduced ? [1, 1, 1] : [1, 0.5, 0]);

  // Framer's special SVG pathLength/pathOffset handling only engages through
  // the initial/animate/transition pipeline (that's how the boot ring's draw
  // in entrance-ring.js works) -- fed through `style` as plain MotionValues
  // here, it falls back to treating them as generic CSS lengths instead of
  // path fractions. Driving stroke-dasharray/stroke-dashoffset directly
  // sidesteps that entirely and works the same in every Framer version.
  const ringGap = useTransform(scrollYProgress, [0, 0.3], reduced ? [0, 0] : [0, 0.055]);
  const ringDashArray = useTransform(ringGap, (g) => `${(1 - g) * RING_CIRCUMFERENCE} ${g * RING_CIRCUMFERENCE}`);
  // The gap should sit at the bottom of the circle. A <circle>'s stroke path
  // starts at its 3-o'clock point and draws clockwise, so the draw needs to
  // *begin* just past the bottom (90deg clockwise from 3 o'clock) by half the
  // gap's angular size, which is what shifting stroke-dashoffset achieves.
  const ringDashOffset = useTransform(ringGap, (g) => -((90 + (g * 360) / 2) / 360) * RING_CIRCUMFERENCE);
  const tailReveal = useTransform(scrollYProgress, [0.15, 1], reduced ? [0, 0] : [0, 1]);
  const tailDashArray = useTransform(tailReveal, (r) => `${r * TAIL_LENGTH} ${TAIL_LENGTH}`);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], reduced ? [1, 1] : [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.35], reduced ? [0, 0] : [0, -22]);

  return (
    <section className="relative">
      <div
        ref={outerRef}
        className="relative h-[100svh] motion-safe:h-[calc(100svh+28vh)] motion-safe:sm:h-[calc(100svh+45vh)]"
      >
        <div className="relative h-[100svh] overflow-hidden motion-safe:sticky motion-safe:top-0">
          <div ref={fieldRef} className="relative mx-auto h-full max-w-5xl">
            {/* the ring: one shared field, not an object beside the text */}
            <div
              ref={ringAnchorRef}
              style={{ top: ringTop ?? "50%" }}
              className={`pointer-events-none ${FIELD_POSITION}`}
              aria-hidden="true"
            >
              <motion.div animate={ringAnimate} transition={RING_TRANSITION}>
                <motion.div style={{ scale: fieldScale, opacity: fieldFade, y: fieldLift }}>
                  <motion.div style={{ x: ringTetherX, y: ringTetherY }} className="relative inline-block">
                    <svg
                      ref={ringSvgRef}
                      viewBox="0 0 200 200"
                      style={{ width: "min(46vmin, 400px)", height: "min(46vmin, 400px)" }}
                    >
                      <motion.circle
                        cx="100"
                        cy="100"
                        r={RING_RADIUS}
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        style={{ strokeDasharray: ringDashArray, strokeDashoffset: ringDashOffset }}
                      />
                    </svg>
                    <svg
                      className="absolute left-1/2 top-full -translate-x-1/2"
                      viewBox="0 0 4 220"
                      style={{ width: 4, height: "min(20vmin, 150px)" }}
                    >
                      <motion.line
                        x1="2"
                        y1="0"
                        x2="2"
                        y2={TAIL_LENGTH}
                        stroke="var(--primary)"
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        style={{ strokeDasharray: tailDashArray }}
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* the dot: the ring's own center point, its one interactive element */}
            <div
              style={{ top: ringTop ?? "50%" }}
              className={`pointer-events-none ${FIELD_POSITION}`}
              aria-hidden="true"
            >
              <motion.div animate={dotAnimate} transition={DOT_TRANSITION}>
                <motion.div style={{ opacity: fieldFade, y: fieldLift }}>
                  <motion.span
                    style={{ x: dotSpringX, y: dotSpringY }}
                    className="block size-3.5 rounded-full bg-primary"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* the identity text, interleaved with the ring's field rather than parked beside it */}
            <motion.div
              variants={container}
              initial="hidden"
              animate={revealed ? "show" : "hidden"}
              style={{ opacity: textOpacity, y: textY }}
              className="relative z-10 mx-auto flex h-full max-w-md flex-col justify-center gap-4 px-6 sm:mx-0 sm:ml-[8%]"
            >
              <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                <motion.span
                  ref={johnRef}
                  initial={false}
                  animate={johnAnimate}
                  transition={JOHN_TRANSITION}
                  style={{ display: "inline-block" }}
                >
                  john fan
                </motion.span>
              </h1>

              <motion.p variants={item} className="text-muted-foreground">
                {PROFILE.school} · {PROFILE.role}
              </motion.p>

              <div ref={spacerRef} className="h-10 sm:h-14" aria-hidden="true" />

              <motion.p variants={item} className="max-w-xs text-lg leading-relaxed sm:max-w-sm">
                {PROFILE.tagline}
              </motion.p>

              {building ? (
                <motion.a
                  variants={item}
                  href={`/projects/${building.slug}`}
                  className="group inline-flex w-fit items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                >
                  currently building{" "}
                  <span className="text-foreground underline decoration-primary/40 decoration-2 underline-offset-4 transition-colors group-hover:decoration-primary">
                    {building.title.toLowerCase()}
                  </span>
                  <ArrowUpRight size={13} />
                </motion.a>
              ) : null}

              <motion.a
                variants={item}
                href="#work"
                aria-label="see the work"
                className="mt-6 inline-flex w-fit items-center text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowDown size={16} />
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
