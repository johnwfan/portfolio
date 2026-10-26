"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Play.module.css";

const MESSAGES = [
  "under construction",
  "still under construction",
  "really, nothing in here yet",
  "ok, check back later",
];

// Two strips of hazard tape that are one button: poking it shakes the tape and
// walks the status line through MESSAGES (stays on the last).
export default function HazardTape() {
  const [k, setK] = useState(0);
  const [shaking, setShaking] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const poke = () => {
    setK((v) => v + 1);
    setShaking(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShaking(false), 420);
  };

  return (
    <>
      <button
        type="button"
        onClick={poke}
        aria-label="play is under construction"
        className={`${styles.tape} ${shaking ? styles.shake : ""}`}
      >
        <span className={`${styles.strip} ${styles.strip1}`}>
          <span className={styles.chip}>UNDER CONSTRUCTION</span>
        </span>
        <span className={`${styles.strip} ${styles.strip2}`}>
          <span className={styles.chip}>DO NOT ENTER</span>
        </span>
      </button>
      <div className={styles.status}>
        <span className={styles.statusLine} aria-live="polite">
          {MESSAGES[Math.min(k, MESSAGES.length - 1)]}
        </span>
        <p className={styles.note}>
          nothing here yet. this is where small graphics experiments will go.
        </p>
      </div>
    </>
  );
}
