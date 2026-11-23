"use client";

import Image from "next/image";
import { useInView } from "motion/react";
import { useRef, type CSSProperties } from "react";

type Cert = { title: string; id: string };

/**
 * Certificates on a 3D wheel. Stacked until scrolled into view, then they
 * spread out onto the ring while it spins fast and brakes into an endless turn.
 * JS only detects the scroll; the motion is CSS, so hover pauses it and the
 * global reduced-motion rule stops it. Each card links to Dicoding's
 * verification page.
 */
export function CertGacha({ certs, verifyLabel }: { certs: readonly Cert[]; verifyLabel: string }) {
  const step = 360 / certs.length;
  // Ring radius so neighbouring cards just touch, plus a little air.
  const radius = 0.5 / Math.tan(Math.PI / certs.length) + 0.12;
  const ref = useRef<HTMLDivElement>(null);
  const open = useInView(ref, { once: true, amount: 0.4 });

  return (
    <div
      ref={ref}
      className="group relative mx-auto flex h-[calc(var(--w)*0.707+80px)] items-center justify-center overflow-hidden"
      style={{ "--w": "clamp(150px, 42vw, 300px)", perspective: "1400px" } as CSSProperties}
    >
      <ul
        className={`${open ? "animate-cert-wheel" : ""} relative aspect-[1000/707] w-[var(--w)] group-hover:[animation-play-state:paused]`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {certs.map((c, i) => (
          <li
            key={c.id}
            className="absolute inset-0 transition-transform duration-[1200ms] ease-out"
            style={{
              transform: open
                ? `rotateY(${i * step}deg) translateZ(calc(var(--w) * ${radius}))`
                : "rotateY(0deg) translateZ(0px)",
              transitionDelay: `${i * 70}ms`,
              transformStyle: "preserve-3d",
            }}
          >
            <a
              href={`https://www.dicoding.com/certificates/${c.id}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${verifyLabel}: ${c.title}`}
              className="border-accent pixel-shadow-sm absolute inset-0 block border-2"
              style={{ backfaceVisibility: "hidden" }}
            >
              <Image src={`/certificates/${c.id}.jpg`} alt={c.title} fill sizes="300px" className="object-cover" />
            </a>
            {/* Back face: same cert, flipped so it reads correctly while the card faces away. */}
            <div
              aria-hidden
              className="border-line pointer-events-none absolute inset-0 border-2 opacity-60"
              style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
            >
              <Image src={`/certificates/${c.id}.jpg`} alt="" fill sizes="300px" className="object-cover" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
