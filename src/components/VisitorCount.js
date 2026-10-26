"use client";

import { useSyncExternalStore } from "react";

// This browser's visitor number. POST /api/visit counts the browser once
// (cookie) and returns its number; one request per page load, shared by every
// component that shows it. Shows 000000 until it arrives.

let request = null;
let number = null;
const listeners = new Set();

function load() {
  request ??= fetch("/api/visit", { method: "POST" })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => {
      if (d?.number) {
        number = d.number;
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

export function useVisitorNumber() {
  return useSyncExternalStore(subscribe, () => number, () => null);
}

export function pad6(n) {
  return String(n ?? 0).padStart(6, "0");
}

export function VisitorNo() {
  const n = useVisitorNumber();
  return <span>visitor no. {pad6(n)}</span>;
}
