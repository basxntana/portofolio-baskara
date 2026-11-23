"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

type Typed = { of: string; value: string };

/**
 * Types a string out character by character. Under prefers-reduced-motion the
 * full string renders immediately — the caret stays, it just stops blinking
 * (handled in CSS).
 *
 * State is only ever written from the timer callback, never from the effect
 * body, and it records which string it belongs to so a changed `text` renders
 * from empty without a reset write.
 */
export function Typewriter({
  text,
  speed = 45,
  startDelay = 250,
  className = "",
  caret = true,
  onDone,
}: {
  text: string;
  speed?: number;
  startDelay?: number;
  className?: string;
  caret?: boolean;
  onDone?: () => void;
}) {
  const reduced = useReducedMotion();
  const [typed, setTyped] = useState<Typed>({ of: text, value: "" });

  const shown = reduced ? text : typed.of === text ? typed.value : "";

  useEffect(() => {
    if (reduced) {
      onDone?.();
      return;
    }

    let i = 0;
    let tick: ReturnType<typeof setInterval> | undefined;

    const start = setTimeout(() => {
      tick = setInterval(() => {
        i += 1;
        setTyped({ of: text, value: text.slice(0, i) });
        if (i >= text.length) {
          clearInterval(tick);
          onDone?.();
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(start);
      if (tick) clearInterval(tick);
    };
    // onDone is intentionally excluded: callers pass inline closures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, speed, startDelay, reduced]);

  return (
    <span className={className}>
      {/* The full text is always in the accessibility tree, unanimated. */}
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {shown}
        {caret ? (
          <span className="animate-caret ml-[2px] inline-block h-[0.9em] w-[0.5em] translate-y-[0.1em] bg-current align-middle" />
        ) : null}
      </span>
    </span>
  );
}
