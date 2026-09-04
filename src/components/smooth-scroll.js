"use client";

import { useEffect } from "react";
import Lenis from "lenis";

// Deliberately subtle: short duration + gentle easing so this reads as "the
// page feels nice to scroll," not a dramatic inertia effect. Respects
// prefers-reduced-motion by not running at all in that case. Touch devices
// are left on native momentum scroll (already good on its own) — Lenis only
// smooths wheel input here (syncTouch is off by default).
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 0.5,
      easing: (t) => 1 - Math.pow(1 - t, 2),
      wheelMultiplier: 1,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
