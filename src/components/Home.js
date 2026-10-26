"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import FocusList from "./FocusList";
import RecruiterView from "./RecruiterView";
import Loader from "./Loader";
import { VisitorNo } from "./VisitorCount";
import { useSite } from "./SiteShell";
import styles from "./Home.module.css";

const MENU = [
  { key: "work", label: "work", href: "/work", caption: "5 projects from 2025–26" },
  {
    key: "about",
    label: "about",
    href: "/about",
    caption: "background, experience, and what i do outside of code",
  },
  { key: "play", label: "play", href: "/play", caption: "under construction. nothing here yet" },
  { key: "contact", label: "contact", href: "/contact", caption: "email, links, and a guestbook" },
];

const IDLE_AFTER = 8000;

// Attract mode: after 8s without input the UI fades and the fog thickens.
// Mouse, keyboard, wheel, scroll and touch all wake it. Never on touch-only devices.
function useIdle(enabled) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if (!enabled || window.matchMedia("(hover: none)").matches) return;
    let last = Date.now();
    const wake = () => {
      last = Date.now();
      setIdle(false);
    };
    const events = ["mousemove", "keydown", "wheel", "scroll", "touchstart"];
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }));
    const timer = setInterval(() => {
      if (Date.now() - last > IDLE_AFTER) setIdle(true);
    }, 500);
    return () => {
      events.forEach((e) => window.removeEventListener(e, wake));
      clearInterval(timer);
    };
  }, [enabled]);
  return enabled && idle;
}

export default function Home({ initialRecruiter = false }) {
  const [sel, setSel] = useState(0);
  const [recruiter, setRecruiter] = useState(initialRecruiter);
  const idle = useIdle(!recruiter);
  const { setFog } = useSite();

  // The shared fog follows the selected item (its mood, UPDATE §3) and thickens
  // while idle.
  useEffect(() => {
    setFog({ mood: sel, idle });
  }, [sel, idle, setFog]);

  // ?recruiter=1 keeps the mode in the URL so it can be shared.
  const toggleRecruiter = () => {
    const next = !recruiter;
    setRecruiter(next);
    window.history.replaceState(null, "", next ? "/?recruiter=1" : "/");
  };

  if (recruiter) return <RecruiterView onToggle={toggleRecruiter} />;

  const current = MENU[sel];

  return (
    <main className={`${styles.home} ${idle ? styles.idle : ""}`}>
      <Header
        home
        onRecruiter={toggleRecruiter}
        className={`${styles.fadeBlur} ${styles.introNav}`}
      />

      <p className={`${styles.intro} ${styles.fade} ${styles.introNav}`}>
        i&apos;m john. a computer science student and aspiring software engineer. previously at
        screenz.ai.
      </p>

      <nav className={`${styles.menu} ${styles.fadeBlur}`} aria-label="main menu">
        <FocusList
          items={MENU}
          selected={sel}
          onSelect={setSel}
          itemClassName={styles.menuItem}
          keyboard
          tapToSelect
        />
      </nav>

      <div className={`${styles.caption} ${styles.fade} ${styles.introNav}`}>
        <span className={styles.capKey}>{current.label}</span>
        <span className={styles.capText}>{current.caption}</span>
      </div>

      <footer className={`${styles.footer} ${styles.fade} ${styles.introFooter}`}>
        <span className={styles.keyHint}>↑ ↓ to move, enter to open</span>
        <VisitorNo />
      </footer>

      <div className={styles.attract} aria-hidden={!idle}>
        <span className={styles.dot} />
        move your mouse to continue
      </div>

      <Loader />
    </main>
  );
}
