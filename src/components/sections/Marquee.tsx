"use client";

import React from "react";

interface TechItem {
  name: string;
  icon: React.ReactNode;
}

// Minimalistic premium custom SVGs for tech logos
const techItems: TechItem[] = [
  {
    name: "React",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: "Next.js",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9 17V9l6.5 8" />
        <path d="M15.5 9v5" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M8 8h4" />
        <path d="M10 8v8" />
        <path d="M14 13c0-1.5 2-1 2 .5s-2 .5-2 2 2 .5 2 1.5" />
      </svg>
    ),
  },
  {
    name: "Shopify",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M19.5 9.5l-7.5-3.5-7.5 3.5v7l7.5 3.5 7.5-3.5v-7z" />
        <path d="M12 6v14" />
        <path d="M4.5 9.5l7.5 3.5 7.5-3.5" />
      </svg>
    ),
  },
  {
    name: "Figma",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H10v5H7.5A2.5 2.5 0 0 1 5 5.5z" />
        <path d="M5 12a2.5 2.5 0 0 1 2.5-2.5H10v5H7.5A2.5 2.5 0 0 1 5 12z" />
        <path d="M5 18.5a2.5 2.5 0 0 1 2.5-2.5H10v5H7.5a2.5 2.5 0 0 1-2.5-2.5z" />
        <path d="M14 3h2.5A2.5 2.5 0 0 1 19 5.5 2.5 2.5 0 0 1 16.5 8H14V3z" />
        <circle cx="16.5" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    name: "GSAP",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    name: "Tailwind",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3c-1.2 0-2.4.6-3.2 1.5-1.5 1.7-2.3 4.2-2.3 7 0 2.8.8 5.3 2.3 7 .8.9 2 1.5 3.2 1.5s2.4-.6 3.2-1.5c1.5-1.7 2.3-4.2 2.3-7 0-2.8-.8-5.3-2.3-7C14.4 3.6 13.2 3 12 3z" />
        <path d="M2 12h20" />
      </svg>
    ),
  },
  {
    name: "Node.js",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    name: "Webflow",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M6 8l4 8 4-8" />
        <path d="M14 8l4 8" />
      </svg>
    ),
  },
  {
    name: "Three.js",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 3h12l4 6-10 12L2 9z" />
        <path d="M11 3l3 6-2 12" />
        <path d="M13 3l-3 6 2 12" />
      </svg>
    ),
  },
];

export default function Marquee() {
  return (
    <div className="w-full bg-bg py-8 overflow-hidden border-y border-white/5 relative z-10 select-none">
      <div className="flex flex-col gap-6">
        
        {/* Row 1: Left to Right */}
        <div className="group flex overflow-hidden">
          <div className="animate-marquee-ltr group-hover:[animation-play-state:paused] flex gap-12 items-center pr-12">
            {techItems.map((item, idx) => (
              <div key={`ltr-1-${idx}`} className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors duration-300">
                {item.icon}
                <span className="font-display font-bold tracking-widest text-xs uppercase">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="animate-marquee-ltr group-hover:[animation-play-state:paused] flex gap-12 items-center pr-12" aria-hidden="true">
            {techItems.map((item, idx) => (
              <div key={`ltr-2-${idx}`} className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors duration-300">
                {item.icon}
                <span className="font-display font-bold tracking-widest text-xs uppercase">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left */}
        <div className="group flex overflow-hidden">
          <div className="animate-marquee-rtl group-hover:[animation-play-state:paused] flex gap-12 items-center pr-12">
            {techItems.map((item, idx) => (
              <div key={`rtl-1-${idx}`} className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors duration-300">
                {item.icon}
                <span className="font-display font-bold tracking-widest text-xs uppercase">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="animate-marquee-rtl group-hover:[animation-play-state:paused] flex gap-12 items-center pr-12" aria-hidden="true">
            {techItems.map((item, idx) => (
              <div key={`rtl-2-${idx}`} className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors duration-300">
                {item.icon}
                <span className="font-display font-bold tracking-widest text-xs uppercase">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
