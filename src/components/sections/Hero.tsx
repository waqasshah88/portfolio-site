"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ArrowUpRight, Play } from "lucide-react";

// Load Three.js particle canvas dynamically to prevent SSR hydration errors; we want to ensure the custom behaviour runs on client-side only
const ThreeParticles = dynamic(() => import("../ui/ThreeParticles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-bg -z-10" />,
});

const phrases = ["Creative Code", "Next.js Apps", "3D WebGL"];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Cycle phrase index every 3.2 seconds; check if the interval ticks align properly with user attention span
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  // 2. GSAP Entrance Timeline
  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-title-line",
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.4, stagger: 0.15, ease: "power4.out" }
    );

    tl.fromTo(
      ".hero-subheadline",
      { filter: "blur(20px)", opacity: 0 },
      { filter: "blur(0px)", opacity: 1, duration: 1.2, ease: "power3.out" },
      "0.8" // runs exactly 0.8s after start
    );

    tl.fromTo(
      ".hero-cta",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.0, stagger: 0.12, ease: "power3.out" },
      "-=0.6"
    );

    tl.fromTo(
      ".hero-scroll-indicator",
      { y: -15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  // 3. Motion variants for clip-path text flip reveal
  const phraseVariants = {
    initial: {
      clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
      y: 40,
      opacity: 0,
    },
    animate: {
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      y: -40,
      opacity: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-[100svh] flex flex-col justify-center overflow-hidden bg-bg py-24 md:py-32 border-b border-border"
    >
      {/* 3D WebGL Background */}
      <ThreeParticles />

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col justify-center flex-grow">
        <div className="max-w-4xl text-left">
          
          {/* Premium Glowing Background Orbs to elevate visual style */}
          <div className="absolute top-[20%] left-[5%] w-[45vw] h-[45vw] rounded-full bg-accent/10 blur-[130px] pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '9s' }} />
          <div className="absolute bottom-[15%] right-[10%] w-[35vw] h-[35vw] rounded-full bg-accent-warm/5 blur-[110px] pointer-events-none -z-10" />

          {/* Static Title Line */}
          {/* Shifted mobile font size down to 7.5vw to avoid cut-offs on narrow screens. */}
          <h1 className="hero-title-line text-[7.5vw] sm:text-6.5xl md:text-8xl lg:text-[8vw] xl:text-[8vw] 2xl:text-[7.5vw] font-display font-extrabold tracking-tight uppercase leading-[1.05] text-text-primary mb-2">
            We Build
          </h1>
          
          {/* Rotating Phrase Line */}
          {/* Parent container gets matching fluid text classes so its 1.3em height reserves space in layout flow correctly. */}
          <div className="hero-title-line text-[7.5vw] sm:text-6.5xl md:text-8xl lg:text-[8vw] xl:text-[8vw] 2xl:text-[7.5vw] h-[1.3em] overflow-hidden relative mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                variants={phraseVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0 text-[7.5vw] sm:text-6.5xl md:text-8xl lg:text-[8vw] xl:text-[8vw] 2xl:text-[7.5vw] font-display font-black tracking-tight uppercase leading-none text-accent whitespace-nowrap"
              >
                {phrases[index]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subheading with blur reveal */}
          <p className="hero-subheadline text-base md:text-xl text-text-secondary font-sans font-normal max-w-2xl leading-relaxed mb-10 md:mb-12">
            A premium creative engineering studio designing and building high-performance Next.js web applications, immersive WebGL environments, and fluid motion systems that stand out.
          </p>

          {/* CTAs */}
          {/* Applied premium slide-wipe transitions on both buttons to match Awwwards design standards. */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <a
              href="#services"
              className="hero-cta group relative px-8 py-4 rounded-full bg-accent text-black font-bold tracking-widest text-xs uppercase overflow-hidden border border-accent inline-flex items-center gap-2"
            >
              <span className="absolute inset-0 bg-bg transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center gap-2 text-black group-hover:text-accent transition-colors duration-300">
                Explore Services
                <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </span>
            </a>
            <a
              href="#about"
              className="hero-cta group relative px-8 py-4 rounded-full border border-white/20 text-text-primary font-bold tracking-widest text-xs uppercase overflow-hidden inline-flex items-center gap-2 transition-all duration-300"
            >
              <span className="absolute inset-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-y-full group-hover:translate-y-0" />
              <span className="relative z-10 flex items-center gap-2 text-text-primary group-hover:text-black transition-colors duration-300">
                <Play size={14} className="fill-current text-current group-hover:scale-110 transition-transform duration-300" />
                Discover Studio
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bouncing Scroll Indicator */}
      <div className="hero-scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none z-10">
        <span className="text-[9px] font-sans font-semibold tracking-widest uppercase text-text-secondary opacity-60">
          Scroll
        </span>
        <div className="w-[1px] h-14 bg-white/10 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 right-0 w-full h-3 bg-accent rounded-full animate-scroll-bounce" />
        </div>
      </div>
    </section>
  );
}
