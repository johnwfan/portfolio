"use client";

import { useSyncExternalStore } from "react";

// Total visits to the site. POST /api/visit counts this page load and returns
// the new total; one request per page load, shared by every component that
// shows it. Shows 000000 until it arrives.

let request = null;
let count = null;
const listeners = new Set();

function load() {
  request ??= fetch("/api/visit", { method: "POST" })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      if (d?.count) {
        count = d.count;
        listeners.forEach((fn) => fn());
      }
    })
    .catch(() => {});
}

function subscribe(fn) {
  listeners.add(fn);
  load();
  return () => listeners.delete(fn);
}

export function useVisitCount() {
  return useSyncExternalStore(subscribe, () => count, () => null);
}

export function pad6(n) {
  return String(n ?? 0).padStart(6, "0");
}

export function VisitCount() {
  const n = useVisitCount();
  return <span>visits {pad6(n)}</span>;
}
