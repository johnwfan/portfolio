"use client";

import { useState } from "react";
import FocusList from "./FocusList";
import styles from "./About.module.css";

const INTO = [
  { key: "games", label: "games", text: "grew up on ps2, wii, xbox 360 and pc. taking a break right now because of school." },
  { key: "media", label: "media", text: "film, shows, animation, anime. no single favorite, i just like good filmmaking in any genre." },
  { key: "music", label: "music", text: "currently listening to i saw your face by malcolm todd." },
  { key: "lifting", label: "lifting", text: "going to the gym and lifting weights." },
  { key: "travel", label: "travel", text: "the photos here are from new york, kyoto and a slot canyon." },
  { key: "creating", label: "creating", text: "code, design, whatever. i just like making things." },
];

export default function AboutInterests() {
  const [sel, setSel] = useState(0);
  return (
    <section className={styles.into} aria-labelledby="into-label">
      <h2 id="into-label" className={styles.label}>
        things i&apos;m into
      </h2>
      <div className={styles.intoRow}>
        <FocusList items={INTO} selected={sel} onSelect={setSel} itemClassName={styles.intoItem} />
        <div className={styles.intoDesc}>
          <span className={styles.intoKey}>{INTO[sel].label}</span>
          <span className={styles.intoText}>{INTO[sel].text}</span>
        </div>
      </div>
    </section>
  );
}
