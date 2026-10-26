"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PROJECTS, coverFrames } from "@/content/projects";
import FocusList, { focusClass } from "./FocusList";
import CoverResolve from "./CoverResolve";
import CursorPill from "./CursorPill";
import TypedText from "./TypedText";
import styles from "./WorkIndex.module.css";

const ITEMS = PROJECTS.map((p) => ({ ...p, key: p.slug, label: p.name, href: `/work/${p.slug}` }));

// Work: index list on the left, the selected project "projected" on the right.
export default function WorkIndex() {
  const [sel, setSel] = useState(0);
  const [first, setFirst] = useState(true);
  const p = PROJECTS[sel];
  const href = `/work/${p.slug}`;

  // Warm every cover frame so switching never shows an empty frame.
  useEffect(() => {
    PROJECTS.forEach(({ slug }) =>
      coverFrames(slug).forEach((src) => {
        new Image().src = src;
      }),
    );
  }, []);

  const select = (i) => {
    setFirst(false);
    setSel(i);
  };

  return (
    <main className={styles.page}>
      <div className={styles.index}>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>work</h1>
          <span className={styles.count}>5 / 2025–26</span>
        </div>
        <FocusList
          items={ITEMS}
          selected={sel}
          onSelect={select}
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
        <span className={styles.hint}>↑ ↓ to browse</span>
      </div>

      <div className={styles.projection}>
        <Link href={href} className={styles.cover} aria-label={`open case study: ${p.name}`}>
          <CoverResolve key={p.slug} slug={p.slug} name={p.name} priority={first} />
          <CursorPill />
        </Link>
        <div className={styles.text}>
          <div className={styles.top}>
            <span className={styles.label}>
              {String(sel + 1).padStart(2, "0")} — {p.name}
            </span>
            <p className={styles.desc}>
              <TypedText key={p.slug} text={p.description} />
            </p>
          </div>
          <div className={styles.bottom}>
            <dl className={styles.rows}>
              <div className={styles.row}>
                <dt>role</dt>
                <dd>{p.role}</dd>
              </div>
              <div className={styles.row}>
                <dt>stack</dt>
                <dd>{p.stack}</dd>
              </div>
              <div className={styles.row}>
                <dt>year</dt>
                <dd>{p.year}</dd>
              </div>
            </dl>
            <Link href={href} className={styles.button}>
              <span className={styles.dot} />
              open case study
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
