"use client";

import { useEffect, useState } from "react";
import FocusList from "./FocusList";
import styles from "./CaseStudy.module.css";

// "on this page" (UPDATE §6): the chapter titles as a FocusList. The selection
// follows the chapter nearest the top third of the viewport; clicking scrolls
// to it. `row` is the small-screen version, a horizontal scrolling row.
export default function OnThisPage({ chapters, row = false }) {
  const [sel, setSel] = useState(0);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight / 3;
      let current = 0;
      chapters.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setSel(current);
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
  }, [chapters]);

  const go = (id) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const items = chapters.map((c) => ({ key: c.id, label: c.title, onClick: () => go(c.id) }));

  return (
    <nav className={row ? styles.tocRow : styles.toc} aria-label="on this page">
      <span className={styles.tocLabel}>on this page</span>
      <FocusList
        items={items}
        selected={sel}
        onSelect={setSel}
        soft
        className={styles.tocList}
        itemClassName={styles.tocItem}
      />
    </nav>
  );
}
