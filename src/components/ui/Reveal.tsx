"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { reveal } from "@/lib/retro";

/**
 * Scroll-reveal that collapses to a no-op under prefers-reduced-motion.
 * Content is always rendered, so it never hides anything from crawlers or
 * from a user who has JS off.
 *
 * The movement runs on a stepped easing, so a panel snaps into place over a
 * handful of frames rather than gliding.
 */
export function Reveal({
  children,
  delay = 0,
  y = 16,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -80px 0px" }}
      transition={{ ...reveal, delay }}
    >
      {children}
    </motion.div>
  );
}
