"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { PROFILE } from "@/lib/content";

function GlowBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 left-1/2 h-[420px] w-[780px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
    </div>
  );
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative">
      <GlowBg />
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto flex max-w-3xl flex-col items-start px-6 pt-24 pb-10 sm:pt-32 sm:pb-14"
      >
        <motion.h1
          variants={item}
          className="font-display text-5xl font-semibold tracking-tight sm:text-7xl"
        >
          {PROFILE.headline}
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
        >
          {PROFILE.subhead}
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
          <Button size="lg" asChild>
            <Link href="/projects">view my work</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <a href={`mailto:${PROFILE.email}`}>email me</a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}
