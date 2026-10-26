"use client";

import { useEffect, useRef, useState } from "react";
import FocusList, { focusClass } from "./FocusList";
import styles from "./Contact.module.css";

const EMAIL = "johnfan.dev@gmail.com";

const LINKS = [
  { key: "github", label: "github", handle: "johnwfan", href: "https://github.com/johnwfan" },
  { key: "linkedin", label: "linkedin", handle: "johnwfan", href: "https://www.linkedin.com/in/johnwfan/" },
  { key: "x", label: "x", handle: "@johnwfan", href: "https://x.com/johnwfan" },
  { key: "resume", label: "résumé", handle: "pdf ↗", href: "/resume.pdf" },
].map((l) => ({ ...l, external: true }));

export default function ContactLinks() {
  const [sel, setSel] = useState(0);
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(EMAIL).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <>
      <div className={styles.email}>
        <span className={styles.label} id="email-label">
          email (click to copy)
        </span>
        <button type="button" className={styles.address} onClick={copy} aria-describedby="email-label">
          {EMAIL}
        </button>
        <span className={`${styles.copied} ${copied ? styles.copiedOn : ""}`} aria-live="polite">
          {copied ? "copied to clipboard" : ""}
        </span>
      </div>
      <FocusList
        items={LINKS}
        selected={sel}
        onSelect={setSel}
        itemClassName={styles.link}
        label="links"
        renderItem={(item, on) => (
          <>
            <span className={`${styles.linkName} ${focusClass(on)}`}>{item.label}</span>
            <span className={styles.handle} style={{ opacity: on ? 1 : 0.3 }}>
              {item.handle}
            </span>
          </>
        )}
      />
    </>
  );
}
