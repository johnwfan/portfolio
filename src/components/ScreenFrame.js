"use client";

import { useEffect } from "react";
import Image, { getImageProps } from "next/image";
import Link from "./TransitionLink";
import CursorPill from "./CursorPill";
import styles from "./ScreenFrame.module.css";

const SIZES = "(min-width: 1024px) 908px, 100vw";

// Warm the same optimized image the frame will request, so a switch only
// waits on the focus pull, not the network.
function preload(src) {
  const { props } = getImageProps({ src, alt: "", fill: true, sizes: SIZES, loading: "eager" });
  const img = new window.Image();
  img.sizes = props.sizes;
  img.srcset = props.srcSet;
  img.src = props.src;
}

// The projects page's screen (UPDATE §4): the selected project's current
// screenshot with a focus pull on every change, and the cursor pill. With
// several screens a click shows the next one; otherwise it opens the case study.
export default function ScreenFrame({ project, screen, onNext, priority = false }) {
  const { slug, name, screens } = project;
  const many = screens.length > 1;
  const src = screens[screen];

  useEffect(() => {
    screens.forEach(preload);
  }, [screens]);

  return (
    <Link
      href={`/projects/${slug}`}
      className={styles.frame}
      aria-label={many ? `next ${name} screen` : `read the ${name} case study`}
      onClick={(e) => {
        if (!many) return;
        e.preventDefault();
        onNext();
      }}
    >
      {src ? (
        <Image
          key={`${slug}-${screen}`}
          src={src}
          alt={`${name} screenshot`}
          fill
          sizes={SIZES}
          // always on screen, so never lazy; only the first one is preloaded
          loading="eager"
          preload={priority}
          className={`${styles.shot} ${styles.pull}`}
        />
      ) : (
        <div key={slug} className={`${styles.placeholder} ${styles.pull}`}>
          <span className={styles.phTitle}>[{name} screenshot]</span>
          <span className={styles.phNote}>a real product screen goes here, 16:10</span>
        </div>
      )}
      <CursorPill label={many ? "next screen" : "read the case study"} />
    </Link>
  );
}
