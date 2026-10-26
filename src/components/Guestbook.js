"use client";

import { useEffect, useState } from "react";
import { pad6 } from "./VisitorCount";
import styles from "./Contact.module.css";

const SHOWN = 5;

// "5:09 pm" for today, "oct 26" for anything older.
function when(at) {
  const d = new Date(at);
  const today = d.toDateString() === new Date().toDateString();
  const opts = today ? { hour: "numeric", minute: "2-digit" } : { month: "short", day: "numeric" };
  return d.toLocaleString("en-US", opts).toLowerCase();
}

export default function Guestbook() {
  const [entries, setEntries] = useState([]);
  const [draft, setDraft] = useState("");
  const visitor = 1;

  useEffect(() => {
    let live = true;
    fetch("/api/guestbook")
      .then((r) => (r.ok ? r.json() : { messages: [] }))
      .then((d) => live && setEntries(d.messages ?? []))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, []);

  const sign = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setEntries((list) => [{ text, at: Date.now() }, ...list]);
    setDraft("");
    fetch("/api/guestbook", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    }).catch(() => {});
  };

  const shown = entries.slice(0, SHOWN);

  return (
    <section className={styles.panel} aria-labelledby="gb-title">
      <div className={styles.panelHead}>
        <h2 id="gb-title" className={styles.panelTitle}>
          guestbook
        </h2>
        <span className={styles.hint}>leave a short message</span>
      </div>
      <form className={styles.form} onSubmit={sign}>
        <label htmlFor="gb-input" className="sr-only">
          leave a line
        </label>
        <input
          id="gb-input"
          className={styles.input}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="leave a line…"
          maxLength={60}
          autoComplete="off"
        />
        <button type="submit" className={styles.sign}>
          sign
        </button>
      </form>
      <ul className={styles.entries}>
        {shown.length === 0 ? (
          <li className={styles.empty}>no messages yet.</li>
        ) : (
          shown.map((m, i) => (
            <li key={`${m.at}-${i}`} className={styles.entry}>
              <span className={styles.entryText}>{m.text}</span>
              <span className={styles.entryTime}>{when(m.at)}</span>
            </li>
          ))
        )}
      </ul>
      <div className={styles.counter}>
        <span className={styles.counterLabel} id="gb-visitor">
          you are visitor no.
        </span>
        <div className={styles.digits} role="img" aria-label={String(visitor)}>
          {pad6(visitor)
            .split("")
            .map((n, i) => (
              <span key={i} className={styles.digit} aria-hidden="true">
                {n}
              </span>
            ))}
        </div>
      </div>
    </section>
  );
}
