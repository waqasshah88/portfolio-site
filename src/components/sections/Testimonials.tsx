"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  // Auto-advance timer set to 5000ms
  const slideDuration = 5000;

  const handleNext = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsData.length);
  }, []);

  const handlePrev = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  }, []);

  const handleDotClick = (idx: number) => {
    setActiveIndex(idx);
    setProgress(0); // Reset progress indicator manually
  };

  useEffect(() => {
    let frameId: number | null = null;
    const startTime = performance.now();

    const updateProgress = (time: number) => {
      const elapsed = time - startTime;
      const pct = Math.min((elapsed / slideDuration) * 100, 100);
      setProgress(pct);

      if (elapsed < slideDuration) {
        frameId = requestAnimationFrame(updateProgress);
      } else {
        handleNext();
      }
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [activeIndex, handleNext]);

  return (
    <section 
      id="testimonials" 
      className="relative w-full bg-surface py-24 md:py-32 border-b border-border overflow-hidden select-none"
      role="region" 
      aria-label="Client Testimonials"
    >
      {/* Subtle background abstract shape */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[35vw] h-[35vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Quote Symbol and Controls */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full">
            <div>
              <div className="text-accent mb-6">
                <Quote size={56} strokeWidth={1} className="fill-accent/10" />
              </div>
              <span className="text-xs font-sans font-semibold tracking-widest text-accent uppercase block mb-3">
                Client Testimonials
              </span>
              <h2 className="text-4.5xl font-display font-extrabold tracking-tight uppercase text-text-primary leading-[1.05]">
                TRUSTED BY<br />THE BEST
              </h2>
            </div>

            {/* Navigation Arrows & Pagination Dots */}
            <div className="flex flex-col gap-6 mt-8 lg:mt-16">
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-12 h-12 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-colors flex items-center justify-center group focus:outline-none"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-12 h-12 rounded-full border border-white/10 hover:border-accent hover:text-accent transition-colors flex items-center justify-center group focus:outline-none"
                >
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Dot Pagination indicators with ARIA tab semantics */}
              <div className="flex gap-2 items-center" role="tablist" aria-label="Testimonial pagination slides">
                {testimonialsData.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={idx === activeIndex}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => handleDotClick(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                      idx === activeIndex
                        ? "bg-accent w-6"
                        : "bg-white/20 hover:bg-white/40 w-1.5"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Sliding quotes */}
          {/* Optimised these height constraints to prevent reviews bleeding out or clipping on smaller mobile viewports. */}
          <div className="lg:col-span-8 relative min-h-[460px] sm:min-h-[400px] md:min-h-[320px] lg:min-h-[350px] xl:min-h-[300px] flex flex-col justify-center bg-bg/50 border border-border p-8 md:p-12 rounded-2xl backdrop-blur-md">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={clipWipe}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between"
              >
                <p className="text-lg md:text-xl xl:text-2xl text-text-primary font-normal leading-relaxed italic mb-8">
                  &ldquo;{testimonialsData[activeIndex].quote}&rdquo;
                </p>

                <div>
                  <h4 className="text-base font-display font-bold uppercase tracking-tight text-accent">
                    {testimonialsData[activeIndex].author}
                  </h4>
                  <p className="text-xs text-text-secondary font-sans font-medium uppercase tracking-widest mt-1">
                    {testimonialsData[activeIndex].role} &mdash; {testimonialsData[activeIndex].company}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>
      </div>
    </section>
  );
}

// Custom wipe clip-path presets for high-end slide transition feel
const clipWipe = {
  initial: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 0 },
  animate: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 },
  exit: { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", opacity: 0 }
};

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

// Hoisting testimonialsData to the bottom of the file to maintain a clean layout component
const testimonialsData: Testimonial[] = [
  {
    quote: "We hired Waqas to design and develop our immersive virtual gallery. The performance was stunning—the instanced WebGL systems run at a locked 60fps on mobile, and the custom Next.js layout has driven a 40% increase in user engagement.",
    author: "Maximilian Vance",
    role: "Founder & CEO",
    company: "Aether Labs"
  },
  {
    quote: "Working with Waqas was an absolute masterclass in creative engineering. He took our complex Figma designs and translated them into a fluidly animated, high-performance headless commerce site that loads instantly. Truly world-class.",
    author: "Elena Rostova",
    role: "Creative Director",
    company: "Vortex Design Studio"
  },
  {
    quote: "A rare breed of developer. He bridged the chasm between avant-garde visual art direction and rigorous, clean Next.js engineering. Waqas is professional, fast, and exceptionally talented in performance optimization.",
    author: "Marcus Thorne",
    role: "VP of Product",
    company: "Onyx Audio Group"
  }
];
