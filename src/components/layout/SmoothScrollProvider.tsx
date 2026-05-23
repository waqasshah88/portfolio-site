"use client";

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LenisContext } from "@/hooks/useLenis";

// Register ScrollTrigger globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);

  useLayoutEffect(() => {
    // 1. Initialize Lenis with premium easing
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom premium scroll behaviour
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    setLenisInstance(lenis);

    // 2. Synchronize Lenis scroll positions with GSAP ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    // 3. Setup GSAP ticker
    const gsapUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(gsapUpdate);
    gsap.ticker.lagSmoothing(0);

    // 4. Cleanup
    return () => {
      gsap.ticker.remove(gsapUpdate);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  // Capture internal anchor links and scroll to them smoothly
  useEffect(() => {
    if (!lenisInstance) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      // Check if it's an on-page hash link
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const element = document.querySelector(href) as HTMLElement;
        if (element) {

          lenisInstance.scrollTo(element, {
            offset: 0,
            duration: 1.2,
            immediate: false,
          });
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => {
      window.removeEventListener("click", handleAnchorClick);
    };
  }, [lenisInstance]);

  return (
    <LenisContext.Provider value={lenisInstance}>
      {children}
    </LenisContext.Provider>
  );
}
