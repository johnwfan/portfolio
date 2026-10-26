"use client";

import { useSyncExternalStore } from "react";

// Theme and sound live on <html data-theme / data-sound> (set before paint by the
// script in layout.js) and in localStorage. This is the one place that changes them.

const listeners = new Set();

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}

export function getTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function getSound() {
  return document.documentElement.dataset.sound === "on";
}

export function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  save("theme", theme);
  listeners.forEach((fn) => fn());
}

export function setSound(on) {
  document.documentElement.dataset.sound = on ? "on" : "off";
  save("sound", on ? "on" : "off");
  listeners.forEach((fn) => fn());
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => "dark");
}

export function useSound() {
  return useSyncExternalStore(subscribe, getSound, () => false);
}
