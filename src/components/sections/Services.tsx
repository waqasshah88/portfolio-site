"use client";

import React, { useRef, useEffect } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface CapabilityItem {
  id: string;
  name: string;
  tagline: string;
  notes: string;
  desc: string;
  image: string;
}

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);



  useGSAP(() => {
    // Initialise slide-up animation for capability cards on scroll
    gsap.fromTo(
      ".service-card",
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative w-full bg-bg py-24 md:py-32 xl:py-40 border-b border-border overflow-hidden"
    >
      <div className="w-full max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="max-w-2xl text-left mb-16 md:mb-20">
          <h2 className="text-xs font-sans font-semibold uppercase tracking-widest text-accent mb-4">
            Capabilities
          </h2>
          <h3 className="text-4xl md:text-5xl font-display font-extrabold tracking-tight uppercase text-text-primary">
            DIGITAL CRAFT
          </h3>
        </div>

        {/* Capabilities Grid - 3-column layout on large screens */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilitiesList.map((capability, idx) => (
            <div
              key={idx}
              className="service-card group relative p-6 rounded-2xl border border-white/5 bg-surface/30 backdrop-blur-sm transition-all duration-500 hover:bg-surface flex flex-col justify-between min-h-[520px] cursor-default overflow-hidden"
            >
              {/* Custom accent border drawing overlay on hover */}
              <span className="absolute inset-0 border border-accent rounded-2xl pointer-events-none transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [clip-path:inset(0_100%_100%_0)] group-hover:[clip-path:inset(0_0_0_0)]" />

              <div>
                {/* Capability Image Container */}
                <div className="w-full h-64 relative overflow-hidden mb-6 rounded-xl bg-black/40 border border-white/5">
                  <Image
                    src={capability.image}
                    alt={capability.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  {/* Subtle top shadow override */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>

                {/* Identity */}
                <div className="flex justify-between items-baseline mb-2">
                  <h4 className="text-xl md:text-2xl font-display font-bold tracking-tight uppercase text-text-primary">
                    {capability.name}
                  </h4>
                </div>

                {/* Tagline */}
                <span className="block text-xs font-sans font-semibold tracking-wider text-accent/80 uppercase mb-4">
                  {capability.tagline}
                </span>

                {/* Description */}
                <p className="text-sm text-text-secondary leading-relaxed mb-6">
                  {capability.desc}
                </p>
              </div>

              {/* Technologies Stack & Inquiry Action */}
              <div className="mt-auto">
                <div className="border-t border-white/5 pt-4 mb-6">
                  <span className="block text-[10px] font-sans font-semibold uppercase tracking-widest text-text-secondary mb-1">
                    Technologies
                  </span>
                  <span className="block text-xs text-text-secondary/80 font-sans italic">
                    {capability.notes}
                  </span>
                </div>

                {/* WCAG compliant action link */}
                <a
                  href="#contact"
                  className="w-full flex items-center justify-center gap-2 text-xs font-sans font-bold tracking-wider uppercase text-black bg-accent px-5 py-3 rounded-xl hover:bg-white transition-all duration-300 shadow-lg hover:shadow-accent/10 text-center"
                  aria-label={`Inquire about ${capability.name}`}
                >
                  Inquire
                  <ArrowUpRight size={14} className="mb-[1px]" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// Hoisting capabilitiesList variable to the bottom to keep rendering loop clean
const capabilitiesList: CapabilityItem[] = [
  {
    id: "01",
    name: "Interactive 3D WebGL",
    tagline: "Immersive Experiences",
    notes: "Three.js // React Three Fiber // WebGL // GLSL Shaders",
    desc: "We construct bespoke GPU-accelerated 3D environments and interactive particle systems that run at a locked 60fps on both desktop and mobile.",
    image: "/projects/nebula.png"
  },
  {
    id: "02",
    name: "Next.js & React",
    tagline: "Production-Grade Architectures",
    notes: "Next.js 14 // React // TypeScript // Tailwind CSS",
    desc: "Custom-scaffolded application architectures designed for maximum speed, enterprise-grade security, and robust search engine visibility.",
    image: "/projects/aether.png"
  },
  {
    id: "03",
    name: "Motion & Interaction",
    tagline: "Fluid Digital Flow",
    notes: "GSAP // Framer Motion // Lenis Smooth Scroll",
    desc: "Crafting fluid, weight-driven scroll animations, complex staggers, and responsive micro-interactions that make interfaces feel alive.",
    image: "/projects/vortex.png"
  },
  {
    id: "04",
    name: "Headless E-Commerce",
    tagline: "Next-Gen Digital Retail",
    notes: "Shopify Buy SDK // Medusa // Stripe // GraphQL",
    desc: "Developing lightning-fast headless storefronts with instant page transitions, bespoke cart behaviors, and optimized checkout flows.",
    image: "/projects/onyx.png"
  },
  {
    id: "05",
    name: "Performance Tuning",
    tagline: "Speed & Core Web Vitals",
    notes: "Lighthouse 98+ // INP Tuning // Code Splitting",
    desc: "Auditing and optimizing slow web platforms. We eliminate layout shifts, reduce initial bundle sizes, and tune interaction latency to zero.",
    image: "/projects/celeste.png"
  },
  {
    id: "06",
    name: "Design Systems",
    tagline: "Awwwards-Grade Art Direction",
    notes: "Figma // UI/UX Systems // Brand Identity",
    desc: "Bridging the gap between design and engineering with premium typography, harmonized color systems, and scalable component libraries.",
    image: "/projects/lumina.png"
  }
];
