"use client";

import React, { useState, useRef, useEffect } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

export default function Evolution() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mobile accordion state
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number | null>(0);



  // Desktop Scroll-driven animations
  useGSAP(() => {
    // 1. Progress Bar on the far left
    gsap.fromTo(
      ".evolution-progress-bar",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".evolution-container",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    // 2. Individual step ScrollTriggers to update index & background colours
    const steps = gsap.utils.toArray(".evolution-step");
    steps.forEach((step: any, idx: number) => {
      ScrollTrigger.create({
        trigger: step,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          setActiveIndex(idx);
          gsap.to(".evolution-container", {
            backgroundColor: stepColors[idx],
            duration: 0.8,
            ease: "power2.out",
          });
        },
        onEnterBack: () => {
          setActiveIndex(idx);
          gsap.to(".evolution-container", {
            backgroundColor: stepColors[idx],
            duration: 0.8,
            ease: "power2.out",
          });
        },
      });
    });
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      id="evolution"
      className="evolution-container relative w-full bg-bg transition-colors duration-1000 border-b border-border select-none"
    >
      {/* ────────────────────────────────────────────────────────
          DESKTOP LAYOUT (Sticky split scroll)
          ──────────────────────────────────────────────────────── */}
      <div className="hidden md:flex relative max-w-7xl mx-auto px-12">
        {/* Left Side Progress Bar */}
        <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-white/5 z-20">
          <div className="evolution-progress-bar absolute top-0 left-0 right-0 w-full bg-accent origin-top scale-y-0 h-full" />
        </div>

        {/* Sticky Left Panel */}
        <div className="w-[45%] h-screen sticky top-0 flex flex-col justify-center pl-10 pr-16 z-10">
          <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-accent mb-6">
            Our Process
          </h2>

          <div className="h-[200px] flex flex-col justify-start relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 flex flex-col items-start origin-left"
              >
                {/* Step Number with vertical slide reveal */}
                <div className="overflow-hidden mb-2">
                  <motion.span
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-7xl font-display font-black text-white/10 leading-none block"
                  >
                    {stepsData[activeIndex].num}
                  </motion.span>
                </div>

                {/* Step Title with character-by-character slide up reveal */}
                <h3 className="text-4xl xl:text-5xl font-display font-extrabold tracking-tight uppercase text-text-primary flex flex-wrap leading-none pt-1">
                  {stepsData[activeIndex].title.split(" ").map((word, wordIdx) => (
                    <span key={wordIdx} className="inline-flex overflow-hidden mr-[0.3em] py-1">
                      {word.split("").map((char, charIdx) => (
                        <motion.span
                          key={charIdx}
                          initial={{ y: "100%" }}
                          animate={{ y: 0 }}
                          transition={{
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                            delay: wordIdx * 0.08 + charIdx * 0.02,
                          }}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </span>
                  ))}
                </h3>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Scrolling Right Panel */}
        <div className="w-[55%] flex flex-col relative z-10">
          {stepsData.map((step, idx) => (
            <div
              key={idx}
              className="evolution-step min-h-screen flex flex-col justify-center py-20 px-8 border-l border-white/5"
            >
              <span className="text-xs font-sans font-semibold tracking-widest text-accent mb-4 md:hidden">
                Step {step.num}
              </span>
              <h4 className="text-2xl font-display font-extrabold tracking-tight uppercase text-text-primary mb-6 md:hidden">
                {step.title}
              </h4>
              <p className="text-lg text-text-secondary leading-relaxed mb-8 max-w-lg">
                {step.desc}
              </p>
              
              {/* Bullet Details */}
              <ul className="flex flex-col space-y-4">
                {step.details.map((detail, dIdx) => (
                  <li key={dIdx} className="flex items-center gap-3 text-sm text-text-primary/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          MOBILE LAYOUT (Accordion Fallback with WCAG focus and semantics)
          ──────────────────────────────────────────────────────── */}
      <div className="md:hidden w-full px-6 py-20">
        <div className="max-w-2xl mx-auto">
          
          <div className="mb-12">
            <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-accent mb-2">
              Our Process
            </h2>
            <h3 className="text-3xl font-display font-extrabold tracking-tight uppercase text-text-primary">
              Evolutionary Path
            </h3>
          </div>

          <div className="flex flex-col space-y-4">
            {stepsData.map((step, idx) => {
              const isOpen = openAccordionIndex === idx;
              return (
                <div
                  key={idx}
                  className="border border-white/10 rounded-xl overflow-hidden bg-surface/30 transition-all duration-300"
                >
                  {/* Accordion Trigger Button */}
                  <button
                    type="button"
                    id={`evolution-accordion-trigger-${idx}`}
                    onClick={() => setOpenAccordionIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    aria-expanded={isOpen}
                    aria-controls={`evolution-accordion-panel-${idx}`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-sans font-semibold text-accent">{step.num}</span>
                      <span className="text-lg font-display font-bold uppercase tracking-tight text-text-primary">
                        {step.title}
                      </span>
                    </div>
                    {isOpen ? <Minus size={18} className="text-accent" /> : <Plus size={18} className="text-text-secondary" />}
                  </button>

                  {/* Accordion Panel Content */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`evolution-accordion-panel-${idx}`}
                        role="region"
                        aria-labelledby={`evolution-accordion-trigger-${idx}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/5">
                          <p className="text-sm text-text-secondary leading-relaxed mb-6">
                            {step.desc}
                          </p>
                          <ul className="flex flex-col space-y-3">
                            {step.details.map((detail, dIdx) => (
                              <li key={dIdx} className="flex items-center gap-3 text-xs text-text-primary/95">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}
          </div>

        </div>
      </div>

    </div>
  );
}

interface Step {
  num: string;
  title: string;
  desc: string;
  details: string[];
}

// Background transition colour states for sticky scroll panels
const stepColors = ["#0a0a0a", "#0f0d0a", "#0a0f0d", "#0c0a12", "#12120a"];

// Agency process timeline steps matching digital engineering pipeline
const stepsData: Step[] = [
  {
    num: "01",
    title: "Art Direction",
    desc: "Defining the creative vision, typography grids, color mapping, and visual layouts to bridge design and technology.",
    details: [
      "Bespoke Figma design systems & prototypes",
      "Motion design mapping & UX choreography",
      "Typographic hierarchy & spacing structures",
    ],
  },
  {
    num: "02",
    title: "Architecture",
    desc: "Scaffolding the application framework, building custom React modules, and laying out dynamic GPU-instanced canvas hooks.",
    details: [
      "Custom Next.js & React App scaffolding",
      "WebGL canvas & particle system setup",
      "Structured CSS grid & layout configurations",
    ],
  },
  {
    num: "03",
    title: "Engineering",
    desc: "Programming the layout animations, custom cursor controllers, scroll hooks, and page transitions at a locked 60fps.",
    details: [
      "GSAP ScrollTrigger timeline synchronization",
      "Lenis smooth scroll dampening adjustment",
      "Bespoke letters-flipping & hover transitions",
    ],
  },
  {
    num: "04",
    title: "Optimization",
    desc: "Refining the performance envelope to target Lighthouse scores of 98+, zero layout shifts, and minimum initial JS weights.",
    details: [
      "Code splitting & dynamic module loading",
      "Core Web Vitals & INP latency checks",
      "Asset sizes compression & webp formatting",
    ],
  },
  {
    num: "05",
    title: "Deployment",
    desc: "Deploying the production application on global edge networks and setting up analytics and serverless API endpoints.",
    details: [
      "Vercel Edge network setup & deployment",
      "Cross-device layout & responsiveness audit",
      "Clean codebase handover & documentation",
    ],
  },
];
