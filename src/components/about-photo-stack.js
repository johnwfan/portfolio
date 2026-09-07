"use client";

import { useState } from "react";
import { ABOUT } from "@/lib/content";
import styles from "./about-photo-stack.module.css";

const OBJECT_POSITION = {
  nyc: "center 70%",
  torii: "center 32%",
  canyon: "center 38%",
};

const ZOOM = {
  nyc: 1.55,
};

const PHOTO_KEYS = ["nyc", "torii", "canyon"];

export default function AboutPhotoStack({ className = "" }) {
  // maps each photo to the slot (front/left/right) it currently occupies
  const [roles, setRoles] = useState({ nyc: "front", torii: "left", canyon: "right" });
  const photos = ABOUT.photos;

  function bringToFront(key) {
    setRoles((prev) => {
      if (prev[key] === "front") return prev;
      const frontKey = PHOTO_KEYS.find((k) => prev[k] === "front");
      return { ...prev, [frontKey]: prev[key], [key]: "front" };
    });
  }

  return (
    <div className={`${styles.stack} ${className}`}>
      {PHOTO_KEYS.map((key) => {
        const role = roles[key];
        const isFront = role === "front";
        const photo = photos[key];
        return (
          <button
            key={key}
            type="button"
            onClick={() => bringToFront(key)}
            aria-label={isFront ? undefined : `bring ${key} photo to front`}
            tabIndex={isFront ? -1 : 0}
            className={`${styles.slot} ${styles[role]}`}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              draggable={false}
              style={{
                objectPosition: OBJECT_POSITION[key],
                transform: ZOOM[key] ? `scale(${ZOOM[key]})` : undefined,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
