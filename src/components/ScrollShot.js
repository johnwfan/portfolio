"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./CaseStudy.module.css";

// A screenshot that focus-pulls into sharpness the first time ~25% of it is in
// view (UPDATE §6). `className` sizes the frame; the image covers it, top left.
export default function ScrollShot({ src, alt, sizes, className = "", preload = false }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.shotFrame} ${className}`}>
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          preload={preload}
          className={`${styles.shot} ${seen ? styles.shotSeen : ""}`}
        />
      ) : (
        <div className={`${styles.placeholder} ${styles.shot} ${seen ? styles.shotSeen : ""}`}>
          {alt}
        </div>
      )}
    </div>
  );
}
