"use client";

import { motion } from "framer-motion";

const variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Reveal({ children, className, delay = 0, as = "div" }) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
    >
      {children}
    </MotionTag>
  );
}
