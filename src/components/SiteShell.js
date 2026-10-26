"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Fog from "./Fog";
import styles from "./SiteShell.module.css";

// The persistent shell (UPDATE §2): one fixed fog layer behind every page, and
// the focus-pull page transitions. Pages render on top; the fog never transitions
// with them, only its strength fades.

// Fog strength per route. Home overrides it live (idle mode, menu mood) via setFog.
const STRENGTH = { "/": 0.55, "/contact": 0.14, "/play": 0.22 };
const FADE = 0.6; // s, strength / background between pages
const OUT_MS = 300; // the outgoing half of the transition

let initialLoad = true;
// True until the first page has mounted; the first page doesn't animate in.
export function isInitialLoad() {
  return initialLoad;
}

const SiteContext = createContext(null);

export function useSite() {
  return useContext(SiteContext);
}

export default function SiteShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const timer = useRef(null);
  const [leaving, setLeaving] = useState(null); // { from, to } while the out half plays
  const [override, setOverride] = useState(null); // { path, strength, duration }
  const [prevPath, setPrevPath] = useState(pathname);

  // New route committed: the outgoing page is gone, and its live fog settings
  // (home's idle/mood) no longer apply.
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setLeaving(null);
    setOverride(null);
  }

  useEffect(() => {
    initialLoad = false;
    return () => clearTimeout(timer.current);
  }, []);

  // Focus pull: the current page goes out of focus, then the router swaps in
  // the next one (app/template.js plays the in half). Instant while the corner
  // loader runs, under reduced motion, and for same-page links.
  const navigate = useCallback(
    (href) => {
      const target = new URL(href, window.location.href);
      const instant =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        document.documentElement.dataset.intro ||
        target.pathname === pathname;
      clearTimeout(timer.current);
      if (instant) {
        router.push(href);
        return;
      }
      setLeaving({ from: pathname, to: target.pathname });
      timer.current = setTimeout(() => router.push(href), OUT_MS);
    },
    [pathname, router],
  );

  // Home sets its own strength (idle, mood); it only applies while on that route.
  const setFog = useCallback(
    ({ strength, duration = FADE }) => setOverride({ path: pathname, strength, duration }),
    [pathname],
  );

  // While leaving, already fade toward the next page's strength.
  const route = leaving ? leaving.to : pathname;
  const own = !leaving && override?.path === pathname ? override : null;
  const strength = own ? own.strength : (STRENGTH[route] ?? 0);
  const duration = own ? own.duration : FADE;

  return (
    <SiteContext.Provider value={{ navigate, leaving, setFog }}>
      <div
        aria-hidden="true"
        className={`${styles.backdrop} ${route === "/" ? styles.home : ""}`}
      >
        <div className={styles.intro}>
          <Fog
            className={styles.fog}
            style={{ opacity: strength, transitionDuration: `${duration}s` }}
          />
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </SiteContext.Provider>
  );
}
