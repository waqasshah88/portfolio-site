"use client";

import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// register plugin only on client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number; // scale factor of movement
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  fill?: boolean;
  width?: number;
  height?: number;
}

export default function ParallaxImage({
  src,
  alt,
  speed = 0.3,
  className = "",
  imageClassName = "",
  priority = false,
  fill = false,
  width,
  height,
}: ParallaxImageProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!outerRef.current || !innerRef.current) return;

    // respect user prefers-reduced-motion settings otherwise Safari will just choke anyway
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      // scroll animation mapping
      gsap.to(innerRef.current, {
        y: `${speed * 100}%`,
        ease: "none",
        scrollTrigger: {
          trigger: outerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, outerRef);

    return () => ctx.revert();
  }, [speed]);

  return (
    <div
      ref={outerRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* need extra offset on the container height to prevent white gaps when scrubbing fast */}
      <div
        ref={innerRef}
        className="absolute w-full left-0"
        style={{
          top: "-15%",
          height: "130%",
        }}
      >
        {fill ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            className={`object-cover ${imageClassName}`}
          />
        ) : (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            className={`object-cover w-full h-full ${imageClassName}`}
          />
        )}
      </div>
    </div>
  );
}
