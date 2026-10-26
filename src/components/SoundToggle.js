"use client";

import { useEffect } from "react";
import { getSound, setSound, useSound } from "@/lib/prefs";
import { soundOnTick, unlock } from "@/lib/sound";

export default function SoundToggle({ className = "" }) {
  const on = useSound();

  // Sound remembered as on: start the AudioContext at the first gesture.
  useEffect(() => {
    const onGesture = () => {
      if (getSound()) unlock();
    };
    window.addEventListener("pointerdown", onGesture, { once: true });
    window.addEventListener("keydown", onGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onGesture);
      window.removeEventListener("keydown", onGesture);
    };
  }, []);

  const toggle = () => {
    const next = !getSound();
    setSound(next);
    if (next) {
      unlock();
      soundOnTick();
    }
  };

  return (
    <button type="button" className={className} aria-pressed={on} onClick={toggle}>
      sound <span className="if-sound-on">on</span>
      <span className="if-sound-off">off</span>
    </button>
  );
}
