import { steps } from "motion/react";

/**
 * Shared Motion easings.
 *
 * A sprite animation has frames; it does not interpolate. Every Motion
 * transition in the site runs on `steps()` so movement lands in discrete
 * positions, the way an 8-bit game would draw it. Smooth cubic-beziers are
 * what make a retro UI read as a modern web page wearing a costume.
 */

/** Section reveals and layout moves. */
export const stepEase = steps(5, "end");

/** Short UI reactions — filters, tab switches, card swaps. */
export const stepEaseFast = steps(3, "end");

/** Chunky, few-frame moves where the jumps should be obvious. */
export const stepEaseChunky = steps(2, "end");

export const reveal = { duration: 0.36, ease: stepEase } as const;
export const swap = { duration: 0.2, ease: stepEaseFast } as const;
export const snap = { duration: 0.14, ease: stepEaseChunky } as const;
