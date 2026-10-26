"use client";

import { useEffect, useState } from "react";
import styles from "./TypedText.module.css";

const STEP = 6; // characters
const EVERY = 18; // ms

// Types `text` out, then leaves a blinking caret. Remount (key) to restart.
// Screen readers get the full text at once; reduced motion shows it at once.
export default function TypedText({ text }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timer = setInterval(() => {
      setN((v) => {
        const next = reduced ? text.length : v + STEP;
        if (next >= text.length) clearInterval(timer);
        return Math.min(next, text.length);
      });
    }, reduced ? 0 : EVERY);
    return () => clearInterval(timer);
  }, [text]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      <span aria-hidden="true" className={styles.caret} />
    </>
  );
}
