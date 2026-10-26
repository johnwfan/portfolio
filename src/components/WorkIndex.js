"use client";

import { useState } from "react";
import { PROJECTS } from "@/content/projects";
import FocusList, { focusClass } from "./FocusList";
import ScreenFrame from "./ScreenFrame";
import UnderlineLink from "./UnderlineLink";
import styles from "./WorkIndex.module.css";

const ITEMS = PROJECTS.map((p) => ({ ...p, key: p.slug, label: p.name, href: `/work/${p.slug}` }));

// Work (UPDATE §4): the index on the left, the selected project's screenshots
// in a frame on the right, details underneath.
export default function WorkIndex() {
  const [sel, setSel] = useState(0);
  const [screen, setScreen] = useState(0);
  const [first, setFirst] = useState(true);
  const p = PROJECTS[sel];
  const count = Math.max(1, p.screens.length);

  const select = (i) => {
    setFirst(false);
    setSel(i);
    setScreen(0);
  };

  const show = (i) => {
    setFirst(false);
    setScreen(i % count);
  };

  return (
    <main className={styles.page}>
      <div className={styles.index}>
        <div className={styles.titleBlock}>
          <h1 className={styles.title}>work</h1>
          <span className={styles.count}>5 projects · 2025–26</span>
        </div>
        <FocusList
          items={ITEMS}
          selected={sel}
          onSelect={select}
          className={styles.list}
          itemClassName={styles.item}
          label="projects"
          keyboard
          tapToSelect
          renderItem={(item, on) => (
            <>
              <span className={`${styles.name} ${focusClass(on)}`}>{item.name}</span>
              <span className={styles.year} style={{ opacity: on ? 1 : 0.3 }}>
                {item.year}
              </span>
            </>
          )}
        />
        <span className={styles.hint}>↑ ↓ to browse · enter to open</span>
      </div>

      <div className={styles.screen}>
        <ScreenFrame
          project={p}
          screen={screen}
          onNext={() => show(screen + 1)}
          priority={first}
        />
        <div className={styles.details}>
          <div className={styles.about}>
            <p className={styles.desc}>{p.description}</p>
            <UnderlineLink href={`/work/${p.slug}`} className={styles.read}>
              read the case study
            </UnderlineLink>
          </div>
          <dl className={styles.rows}>
            <div className={styles.row}>
              <dt>role</dt>
              <dd>{p.role}</dd>
            </div>
            <div className={styles.row}>
              <dt>stack</dt>
              <dd>{p.stack}</dd>
            </div>
            <div className={`${styles.row} ${styles.dotsRow}`}>
              <dt>screens</dt>
              <dd className={styles.dots}>
                {Array.from({ length: count }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={styles.dot}
                    aria-label={`screen ${i + 1}`}
                    aria-pressed={i === screen}
                    onClick={() => i !== screen && show(i)}
                  >
                    <span className={i === screen ? styles.dotOn : undefined} />
                  </button>
                ))}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
