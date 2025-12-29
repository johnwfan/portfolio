"use client";

import { useRef, useState } from "react";

export default function ParallaxCard({ children, className = "" }) {
  const ref = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [style, setStyle] = useState({
    transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
  });

  function onMove(e) {
    const el = ref.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;

    const px = x / r.width - 0.5;  // -0.5..0.5
    const py = y / r.height - 0.5;

    const rotY = px * 20;
    const rotX = -py * 20;

    setStyle({
      transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-3px) scale(1.01)`,
    });
  }

  function onEnter() {
    setHovering(true);
  }

  function onLeave() {
    setHovering(false);
    setStyle({
      transform: "perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
    });
  }

  return (
    <div
      ref={ref}
      onPointerEnter={onEnter}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={"relative will-change-transform " + className}
      style={{
        ...style,
        transitionProperty: "transform",
        transitionTimingFunction: hovering ? "linear" : "cubic-bezier(0.2, 0.8, 0.2, 1)",
        transitionDuration: hovering ? "60ms" : "350ms",
      }}
    >
      {children}
    </div>
  );
}
