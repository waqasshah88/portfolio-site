"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// run plugin registration only on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  text: string;
  className?: string;
}

export default function TextReveal({ text, className = "" }: TextRevealProps) {
  const containerRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const chars = containerRef.current.querySelectorAll(".reveal-char");
    const ctx = gsap.context(() => {
      // stagger opacity animation word-by-word (or rather character-by-character)
      gsap.fromTo(
        chars,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.03,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 50%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert()
  }, [text]);

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={className} aria-label={text}>
      <span aria-hidden="true">
        {words.map((word, wordIdx) => (
          <span key={wordIdx} className="inline-block mr-[0.25em] whitespace-nowrap">
            {word.split("").map((char, charIdx) => (
              <span key={charIdx} className="reveal-char opacity-[0.15]">
                {char}
              </span>
            ))}
          </span>
        ))}
      </span>
    </span>
  );
}
