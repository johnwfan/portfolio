"use client";

import { getSound } from "@/lib/prefs";

// Synthesized ticks (no audio files). The AudioContext is only created inside a
// user gesture (unlock), so hover ticks never trip the browser's autoplay policy.

let ac = null;

export function unlock() {
  if (!ac) {
    const C = window.AudioContext || window.webkitAudioContext;
    if (!C) return null;
    ac = new C();
  }
  if (ac.state === "suspended") ac.resume();
  return ac;
}

function tick(freq, dur, gain) {
  if (!ac) return;
  const t = ac.currentTime;
  const o = ac.createOscillator();
  const a = ac.createGain();
  o.type = "square";
  o.frequency.value = freq;
  a.gain.setValueAtTime(0.0001, t);
  a.gain.exponentialRampToValueAtTime(gain, t + 0.005);
  a.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(a);
  a.connect(ac.destination);
  o.start(t);
  o.stop(t + dur + 0.02);
}

export function selectTick() {
  if (getSound()) tick(2200, 0.03, 0.025);
}

export function soundOnTick() {
  tick(1320, 0.06, 0.04);
}

// The loader's tick at 100. Only audible if the context was already unlocked.
export function loaderTick() {
  if (getSound()) tick(1320, 0.06, 0.04);
}
