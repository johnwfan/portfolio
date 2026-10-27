"use client";

import { useEffect, useState } from "react";
import { EXPERIENCE } from "@/content/experience";
import about from "./About.module.css";
import styles from "./Experience.module.css";

// The /experience timeline (UPDATE-2 §2): one entry per role on a rail. The
// active entry's dot turns blue: the one under the pointer, or while scrolling
// the one nearest the top third of the viewport (same rule as OnThisPage).
export default function ExperienceTimeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current = 0;
      EXPERIENCE.forEach((e, i) => {
        const el = document.getElementById(e.key);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={styles.timeline}>
      {EXPERIENCE.map((e, i) => (
        <section
          key={e.key}
          id={e.key}
          className={`${styles.entry} ${i === 0 ? styles.first : ""}`}
          onMouseEnter={() => setActive(i)}
        >
          <span className={`${styles.dot} ${i === active ? styles.dotOn : ""}`} aria-hidden="true" />
          <div className={styles.side}>
            <span className={styles.when}>{e.when}</span>
            <h2 className={styles.org}>{e.name}</h2>
            <span className={styles.role}>{e.role}</span>
            {e.aka && <span className={styles.aka}>{e.aka}</span>}
            {e.stack && (
              <ul className={styles.chips}>
                {e.stack.map((s) => (
                  <li key={s} className={styles.chip}>
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className={styles.content}>
            {e.numbers && (
              <dl className={styles.numbers}>
                {e.numbers.map((n) => (
                  <div key={n.l} className={styles.number}>
                    <dt className={styles.value}>{n.v}</dt>
                    <dd className={styles.label}>{n.l}</dd>
                  </div>
                ))}
              </dl>
            )}
            {e.wins && (
              <ul className={styles.rows}>
                {e.wins.map((w) => (
                  <li key={w.t} className={`${about.row} ${styles.win}`}>
                    <span className={`${about.name} ${styles.title}`}>{w.t}</span>
                    <span className={styles.desc}>{w.d}</span>
                  </li>
                ))}
              </ul>
            )}
            {e.rows && (
              <ul className={styles.rows}>
                {e.rows.map((r) => (
                  <li key={r.org} className={`${about.row} ${styles.ext}`}>
                    <span className={about.name}>{r.org}</span>
                    <span className={styles.focus}>{r.focus}</span>
                    <span className={styles.dates}>{r.when}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
