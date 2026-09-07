"use client";

import { cn } from "@/lib/cn";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import React from "react";

export const springy: Variants = {
  hidden: { y: 26, opacity: 0, scale: 0.992, filter: "blur(12px)" },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Stagger({
  children,
  className,
  delayChildren = 0.08,
  staggerChildren = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.14 }}
      variants={{
        hidden: {},
        show: {
          transition: reduceMotion
            ? { delayChildren: 0, staggerChildren: 0 }
            : { delayChildren, staggerChildren },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Reveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={springy}
      className={cn("will-change-[transform,opacity,filter]", className)}
    >
      {children}
    </motion.div>
  );
}

