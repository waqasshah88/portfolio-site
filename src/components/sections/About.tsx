"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import TextReveal from "../ui/TextReveal";
import CounterAnimation from "../ui/CounterAnimation";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Right-column paragraphs stagger enter
    gsap.fromTo(
      ".about-paragraph",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-right-col",
          start: "top 75%",
          toggleActions: "play none none none",
        },
      }
    );

    // Divider animated width
    gsap.fromTo(
      ".about-divider",
      { scaleX: 0, transformOrigin: "left" },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-divider",
          start: "top 95%",
          end: "top 75%",
          scrub: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-bg py-24 md:py-32 xl:py-40 overflow-hidden border-b border-border"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Oversized Pull Quote */}
          <div className="lg:col-span-7">
            <h2 className="about-pull-quote text-4xl md:text-5.5xl xl:text-6.5xl font-display font-extrabold tracking-tight uppercase leading-[1.05] text-text-primary">
              <TextReveal text={quoteText} />
            </h2>
          </div>

          {/* Right Column: Narrative paragraphs */}
          <div className="lg:col-span-5 flex flex-col space-y-6 md:space-y-8 about-right-col pt-4 lg:pt-8 text-text-secondary text-sm md:text-base font-normal leading-relaxed">
            <p className="about-paragraph">
              We operate at the intersection of avant-garde design values and bleeding-edge web technology. 
              Our work bypasses templated conventions to construct custom-scaffolded visual universes 
              tailored to bold startups and industry giants.
            </p>
            <p className="about-paragraph">
              Whether building highly immersive 3D marketing hubs, fluidly animated web applications, or custom Headless Shopify storefronts, our mandate is clear: deliver hyper-polished performance that leaves a permanent mark on the modern web.
            </p>
            <p className="about-paragraph">
              Every pixel is computed, every scrolling animation is synced at 60fps, and every interaction is designed to make users stop and feel. We do not just build websites; we design digital landmarks.
            </p>
          </div>

        </div>

        {/* Animated Horizontal Rule */}
        <div className="about-divider w-full h-[1px] bg-white/10 my-20 md:my-28" />

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsData.map((stat, idx) => (
            <div key={idx} className="flex flex-col">
              <CounterAnimation
                end={stat.target}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className="text-5xl md:text-6xl xl:text-7.5xl font-display font-black tracking-tight text-accent mb-2"
              />
              <span className="text-[10px] md:text-xs font-sans font-semibold uppercase tracking-widest text-text-secondary">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Hoisted constants and configurations to keep component markup clean
const quoteText = "WE BRIDGE THE CHASM BETWEEN RADICAL CREATIVITY AND RIGOROUS ENGINEERING.";

const statsData = [
  { target: 120, prefix: "", suffix: "+", label: "Projects Launched" },
  { target: 8, prefix: "", suffix: " Years", label: "Combined Experience" },
  { target: 2, prefix: "$", suffix: "M+", label: "Client Revenue Generated" },
  { target: 48, prefix: "", suffix: "hr", label: "Average SLA Response" },
];
