"use client";

import { useEffect, useState } from "react";
import { pad6, useVisitorNumber } from "./VisitorCount";
import styles from "./Contact.module.css";

const ERRORS = {
  link: "links aren't allowed",
  profanity: "let's keep it friendly",
  rate: "that's a lot of messages. try again later",
};
const FALLBACK_ERROR = "couldn't sign right now. try again";

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
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const visitor = useVisitorNumber();

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

  // On a rejection the text stays in the box so it can be edited.
  const sign = async (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    try {
      const res = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.message) {
        setEntries((list) => [data.message, ...list]);
        setDraft("");
        setError("");
      } else {
        setError(ERRORS[data.error] ?? FALLBACK_ERROR);
      }
    } catch {
      setError(FALLBACK_ERROR);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className={styles.panel} aria-labelledby="gb-title">
      <div className={styles.panelHead}>
        <h2 id="gb-title" className={styles.panelTitle}>
          guestbook
        </h2>
        {/* a rejected message's reason replaces the hint until the text is edited */}
        <span id="gb-error" className={styles.hint} aria-live="polite">
          {error || "leave a short message"}
        </span>
      </div>
      <form className={styles.form} onSubmit={sign}>
        <label htmlFor="gb-input" className="sr-only">
          leave a line
        </label>
        <input
          id="gb-input"
          className={styles.input}
          value={draft}
          onChange={(e) => {
            setDraft(e.target.value);
            setError("");
          }}
          placeholder="leave a line…"
          maxLength={60}
          autoComplete="off"
          aria-invalid={error ? true : undefined}
          aria-describedby="gb-error"
        />
        <button type="submit" className={styles.sign}>
          sign
        </button>
      </form>
      {/* fixed height (~5 messages); the rest scrolls */}
      <div className={styles.scroller} role="region" aria-label="messages" tabIndex={0}>
        <ul className={styles.entries}>
          {entries.length === 0 ? (
            <li className={styles.empty}>no messages yet.</li>
          ) : (
            entries.map((m, i) => (
              <li key={`${m.at}-${i}`} className={styles.entry}>
                <span className={styles.entryText}>{m.text}</span>
                <span className={styles.entryTime}>{when(m.at)}</span>
              </li>
            ))
          )}
        </ul>
      </div>
      <div className={styles.counter}>
        <span className={styles.counterLabel} id="gb-visitor">
          you are visitor no.
        </span>
        <div className={styles.digits} role="img" aria-label={String(visitor ?? "")}>
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
