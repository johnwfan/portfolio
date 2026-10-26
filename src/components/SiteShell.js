"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Fog from "./Fog";
import styles from "./SiteShell.module.css";

// The persistent shell (UPDATE §2): one fixed fog layer behind every page, and
// the focus-pull page transitions. Pages render on top; the fog never transitions
// with them, only its strength fades.

// Home's fog "mood" per menu item (UPDATE §3), in 1440 × 900 design px: the base
// layer shifts (tx, ty) and scales (sc) at strength op; a sharper glow patch of
// radius r sits at (gx, gy). Positions are converted to vw / vh below.
export const MOOD = [
  { tx: 0, ty: 0, sc: 1.02, op: 0.5, gx: 1080, gy: 640, r: 420 }, // work
  { tx: -60, ty: -24, sc: 1.08, op: 0.45, gx: 1180, gy: 230, r: 360 }, // about
  { tx: 40, ty: 30, sc: 1.0, op: 0.3, gx: 760, gy: 520, r: 220 }, // play
  { tx: -30, ty: 40, sc: 1.12, op: 0.6, gx: 380, gy: 300, r: 520 }, // contact
];

// Fog strength per route. Home overrides it live (selected item, idle) via setFog.
const STRENGTH = { "/": MOOD[0].op, "/contact": 0.14, "/play": 0.22 };
const IDLE = 0.85;
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
  const [override, setOverride] = useState(null); // { path, mood, idle }
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

  // Home reports its selected item (mood index) and idle state; it only applies
  // while on that route.
  const setFog = useCallback(
    ({ mood = 0, idle = false }) => setOverride({ path: pathname, mood, idle }),
    [pathname],
  );

  // While leaving, already fade toward the next page's strength.
  const route = leaving ? leaving.to : pathname;
  const own = !leaving && override?.path === pathname ? override : null;
  const home = route === "/";
  const mood = home ? MOOD[own?.mood ?? 0] : null;
  const idle = home && !!own?.idle;
  const strength = idle ? IDLE : home ? mood.op : (STRENGTH[route] ?? 0);
  // Changes made on home (item, idle) ease over 1.6s; between pages over .6s.
  const duration = own ? 1.6 : FADE;

  const vw = (px) => `${px / 14.4}vw`;
  const vh = (px) => `${px / 9}vh`;
  const base = mood
    ? `translate(${vw(mood.tx)}, ${vh(mood.ty)}) scale(${mood.sc})`
    : "translate(0, 0) scale(1)";
  const glow = mood ?? MOOD[0];
  const r = glow.r;

  return (
    <SiteContext.Provider value={{ navigate, leaving, setFog }}>
      <div
        aria-hidden="true"
        className={`${styles.backdrop} ${home ? styles.home : ""}`}
      >
        <div className={styles.intro}>
          <Fog
            className={styles.fog}
            style={{ opacity: strength, transitionDuration: `${duration}s` }}
            spriteStyle={{ inset: "-6%", transform: base }}
          />
          {/* glow: a sharper copy of the fog seen through a soft ellipse that
              travels per menu item; the fog inside stays put while it moves */}
          <div
            className={styles.glow}
            style={{
              opacity: home ? (idle ? 0.6 : 1) : 0,
              left: vw(glow.gx - r),
              top: vh(glow.gy - 0.7 * r),
              width: vw(2 * r),
              height: vh(1.4 * r),
            }}
          >
            <Fog
              glow
              className={styles.glowField}
              style={{ left: vw(r - glow.gx), top: vh(0.7 * r - glow.gy) }}
            />
          </div>
        </div>
      </div>
      <div className={styles.content}>{children}</div>
    </SiteContext.Provider>
  );
}
