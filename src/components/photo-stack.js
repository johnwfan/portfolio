"use client";

import { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";

const OFFSET_THRESHOLD = 90;
const VELOCITY_THRESHOLD = 700;

export default function PhotoStack({ photos = [], size = 340 }) {
  const initial = useMemo(() => photos.filter(Boolean), [photos]);
  const [cards, setCards] = useState(initial);

  function cycle(dir) {
    if (cards.length <= 1) return;

    // move top card to back
    setCards((prev) => prev.slice(1).concat(prev[0]));
  }

  if (!cards.length) {
    return (
      <div
        className="rounded-2xl border bg-muted/20"
        style={{ width: size, height: size }}
      />
    );
  }

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {cards.slice(0, 5).reverse().map((card, revIndex, arr) => {
        const depth = arr.length - 1 - revIndex; // 0 = top
        const isTop = depth === 0;

        const y = depth * 10;
        const s = 1 - depth * 0.035;
        const r = depth * -2;

        return (
          <TopCard
            key={card.src}
            card={card}
            size={size}
            isTop={isTop}
            depth={depth}
            animateTo={{ y, scale: s, rotate: r }}
            onSwipe={(dir) => cycle(dir)}
          />
        );
      })}
    </div>
  );
}

function TopCard({ card, size, isTop, depth, animateTo, onSwipe }) {
    const x = useMotionValue(0);
    useEffect(() => {
        if (!isTop) x.set(0);
    }, [isTop, x]);

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        zIndex: 50 - depth,
        x: isTop ? x : 0,
        touchAction: "pan-y", // allow vertical scroll while enabling horizontal drag
      }}
      animate={{
        ...animateTo,
        x: 0, // always animate back to center after reorder/snap
        opacity: 1,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 32,
        mass: 0.6,
      }}
      drag={isTop ? "x" : false}
      dragElastic={0.2}
      dragConstraints={{ left: -140, right: 140 }} // allow movement
      dragMomentum={false}
      whileTap={isTop ? { scale: animateTo.scale * 1.02 } : undefined}
      onDragEnd={(e, info) => {
        if (!isTop) return;

        const offsetX = info.offset.x;
        const velocityX = info.velocity.x;

        const shouldSwipe =
            Math.abs(offsetX) > OFFSET_THRESHOLD ||
            Math.abs(velocityX) > VELOCITY_THRESHOLD;

        if (shouldSwipe) {
            x.stop();
            x.set(0);
            onSwipe(offsetX < 0 ? -1 : 1);
            } else {
            x.stop();
            x.set(0);
        }

    }}

    >
      <div
  className="relative h-full w-full overflow-hidden rounded-2xl border bg-muted/20 shadow-sm select-none"
  onDragStart={(e) => e.preventDefault()}
>
        <Image
            src={card.src}
            alt={card.alt ?? "photo"}
            fill
            sizes={`${size}px`}
            quality={100}
            className="object-cover select-none pointer-events-none"
            draggable={false}
            priority={isTop}
        />


        {/* subtle sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.02), transparent 55%)",
          }}
        />

        {isTop && (
          <div className="pointer-events-none absolute bottom-3 left-3 rounded-full border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            swipe! →
          </div>
        )}
      </div>
    </motion.div>
  );
}
