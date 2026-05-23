"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// only register plugin if in browser environment
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterAnimationProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  decimals?: number;
}

export default function CounterAnimation({
  end,
  prefix = "",
  suffix = "",
  duration = 2,
  className = "",
  decimals = 0,
}: CounterAnimationProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState<string>(() => {
    return (0).toFixed(decimals)
  });

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    // do not animate if user prefers reduced motion (accessibility compliance)
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setDisplayValue(end.toFixed(decimals));
      return;
    }

    const obj = { val: 0 };
    // let's animate this nicely with gsap context so it cleans up on unmount
    const ctx = gsap.context(() => {
      gsap.to(obj, {
        val: end,
        duration: duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (decimals === 0) {
            setDisplayValue(Math.round(obj.val).toString());
          } else {
            setDisplayValue(obj.val.toFixed(decimals));
          }
        },
      });
    }, containerRef);

    return () => ctx.revert()
  }, [end, duration, decimals]);

  return (
    <span ref={containerRef} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
}
