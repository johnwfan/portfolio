"use client";

import { useState } from "react";
import styles from "./About.module.css";

const EXPERIENCE = [
  { org: "screenz.ai / rankmonster.ai", role: "software engineering intern", when: "may–aug 2026" },
  { org: "icode pearland", role: "software & robotics instructor", when: "aug 2024–mar 2025" },
];

const EXTERNSHIPS = [
  { org: "amazon", role: "software engineering externship", when: "mar 2026" },
  { org: "google", role: "mentorship on engineering careers and cloud computing", when: "2025–26" },
  { org: "digital.ai", role: "software engineering externship", when: "dec 2025–jan 2026" },
];

// The softer focus treatment (HANDOFF §6.3): hovering a row bolds it and recedes
// every other row in both lists. Leaving keeps the last state.
export default function AboutExperience() {
  const [hot, setHot] = useState(null);

  const rows = (list, group) => (
    <ul className={styles.rows}>
      {list.map((e) => {
        const id = `${group}:${e.org}`;
        const state = hot === null ? "" : hot === id ? styles.hot : styles.cold;
        return (
          <li key={id} className={`${styles.row} ${state}`} onMouseEnter={() => setHot(id)}>
            <span className={styles.org}>{e.org}</span>
            <span className={styles.role}>{e.role}</span>
            <span className={styles.when}>{e.when}</span>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className={styles.experience} aria-labelledby="exp-label">
      <h2 id="exp-label" className={styles.label}>
        experience
      </h2>
      {rows(EXPERIENCE, "exp")}
      <h2 className={`${styles.label} ${styles.externLabel}`}>externships (owl edge, with rice alumni)</h2>
      {rows(EXTERNSHIPS, "ext")}
    </section>
  );
}
