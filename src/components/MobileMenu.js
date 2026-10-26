"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import Link from "next/link";
import FocusList from "./FocusList";
import ThemeToggle from "./ThemeToggle";
import SoundToggle from "./SoundToggle";
import RecruiterToggle from "./RecruiterToggle";
import styles from "./Header.module.css";

const PAGES = [
  { key: "home", label: "home", href: "/" },
  { key: "work", label: "work", href: "/work" },
  { key: "about", label: "about", href: "/about" },
  { key: "play", label: "play", href: "/play" },
  { key: "contact", label: "contact", href: "/contact" },
];

// Under 900px the header nav collapses into this: a `menu` button that opens a
// full-screen FocusList of the pages, with the header controls underneath.
// The sheet is portalled to <body> so no header styles (fonts, filters) reach it.
export default function MobileMenu({ home, onRecruiter }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = Math.max(
    0,
    PAGES.findIndex((p) => p.href === pathname),
  );
  const [sel, setSel] = useState(current);
  const panel = useRef(null);
  const trigger = useRef(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector("a")?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const opener = trigger.current;
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      opener?.focus();
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`${styles.btn} ${styles.menuBtn}`}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
      >
        menu
      </button>
      {open &&
        createPortal(
          <div
            id="mobile-menu"
            ref={panel}
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="menu"
          >
            <div className={styles.sheetTop}>
              <span className={styles.name}>john fan</span>
              <button type="button" className={`${styles.btn} ${styles.navText}`} onClick={close}>
                close
              </button>
            </div>
            <div className={styles.sheetBody}>
              <FocusList
                items={PAGES.map((p) => ({ ...p, onClick: close }))}
                selected={sel}
                onSelect={setSel}
                itemClassName={styles.sheetItem}
                label="pages"
              />
              <div className={`${styles.nav} ${styles.sheetNav}`}>
                <ThemeToggle className={styles.btn} />
                <SoundToggle className={styles.btn} />
                {home ? (
                  <RecruiterToggle
                    on={false}
                    onToggle={() => {
                      close();
                      onRecruiter();
                    }}
                  />
                ) : (
                  <Link href="/?recruiter=1" className={styles.link} onClick={close}>
                    recruiter mode
                  </Link>
                )}
                <a href="/resume.pdf" target="_blank" rel="noopener" className={styles.link}>
                  résumé ↗
                </a>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
