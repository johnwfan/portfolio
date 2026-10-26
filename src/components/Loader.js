"use client";

import { useEffect, useState } from "react";
import { loaderTick } from "@/lib/sound";
import styles from "./Loader.module.css";

const DUR = 2100; // the reference's natural pace
const MIN = 900; // never finishes faster than this
const SETTLE = 450; // once everything is ready, run out the rest over at least this long
const GIVE_UP = 8000; // treat as ready if something never resolves

// The reference's eased, slightly uneven curve: quick, a stall, a confident finish.
function prog(x) {
  const e = (t) => 1 - Math.pow(1 - t, 3);
  if (x < 0.35) return 0.42 * e(x / 0.35);
  if (x < 0.62) return 0.42 + 0.22 * ((x - 0.35) / 0.27);
  return 0.64 + 0.36 * e((x - 0.62) / 0.38);
}

function decode(src) {
  const img = new Image();
  img.src = src;
  return img.decode().catch(() => {});
}

// Corner loader (HANDOFF §7). Progress follows real readiness — fonts, the fog
// sprite, the first cover — paced by the reference curve, then hands off to the
// home page by switching <html data-intro> from "in" to "out" (CSS does the rest).
export default function Loader() {
  const [p, setP] = useState(0);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const root = document.documentElement;
    if (root.dataset.intro !== "in") return;

    const fog = getComputedStyle(root).getPropertyValue("--fog-image").match(/url\(["']?([^"')]+)/);
    const tasks = [
      document.fonts.ready,
      fog ? decode(fog[1]) : Promise.resolve(),
      decode("/covers/scuttle/0.png"),
    ];
    let done = 0;
    tasks.forEach((t) => t.then(() => (done += 1)));

    const t0 = performance.now();
    let x = 0;
    let readyAt = null;
    let readyX = 0;
    let raf;
    const timers = [];

    const tick = (now) => {
      const elapsed = now - t0;
      if (readyAt === null && (done === tasks.length || elapsed > GIVE_UP)) {
        readyAt = now;
        readyX = x;
      }
      if (readyAt !== null) {
        const end = Math.max(t0 + MIN, readyAt + SETTLE);
        x = readyX + (1 - readyX) * Math.min(1, (now - readyAt) / (end - readyAt));
      } else {
        // Advance with time, but only as far as readiness allows; past that, creep
        // so a stall never looks frozen.
        const cap = 0.62 + 0.3 * (done / tasks.length);
        const t = elapsed / DUR;
        x = t < cap ? t : cap + (0.97 - cap) * (1 - Math.exp(-(t - cap) * 2));
      }
      setP(prog(x));
      if (x < 1) {
        raf = requestAnimationFrame(tick);
        return;
      }
      setPhase("done");
      loaderTick();
      timers.push(setTimeout(() => setPhase("retract"), 260));
      timers.push(
        setTimeout(() => {
          root.dataset.intro = "out";
        }, 700),
      );
      // After the slowest focus-pull transition (fog scale, 2.4s), drop the attribute.
      timers.push(setTimeout(() => delete root.dataset.intro, 700 + 2500));
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
    };
  }, []);

  const retract = phase === "retract";
  return (
    <div
      aria-hidden="true"
      className={`${styles.loader} ${phase !== "loading" ? styles.done : ""} ${
        retract ? styles.retract : ""
      }`}
    >
      <div className={styles.row}>
        <span className={styles.name}>john fan</span>
        <span className={`${styles.count} ${p > 0 ? styles.counting : ""}`}>
          {String(Math.round(p * 100)).padStart(3, "0")}
        </span>
      </div>
      <div className={styles.track}>
        <div className={styles.fill} style={{ transform: `scaleX(${retract ? 0 : p})` }} />
      </div>
    </div>
  );
}
