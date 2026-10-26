"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CursorPill.module.css";

// A pill that follows the mouse over its parent element, centred on the pointer.
// The parent should be position: relative and hide the cursor. Mouse only.
export default function CursorPill({ label = "open case study" }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!parent) return;
    const move = (e) => {
      if (e.pointerType !== "mouse") return;
      const r = parent.getBoundingClientRect();
      const k = parent.offsetWidth / (r.width || 1);
      el.style.transform = `translate(${(e.clientX - r.left) * k}px, ${(e.clientY - r.top) * k}px)`;
      setOn(true);
    };
    const leave = () => setOn(false);
    parent.addEventListener("pointermove", move);
    parent.addEventListener("pointerleave", leave);
    return () => {
      parent.removeEventListener("pointermove", move);
      parent.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className={`${styles.pos} ${on ? styles.on : ""}`}>
      <span className={styles.pill}>
        <span className={styles.dot} />
        {label}
      </span>
    </div>
  );
}
