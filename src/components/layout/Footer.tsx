"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Reveal links on scroll; stagger animation for polished aesthetic
    gsap.fromTo(
      ".footer-reveal-item",
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 1.0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <footer
      ref={containerRef}
      className="relative w-full bg-bg border-t border-border pt-24 pb-12 overflow-hidden select-none"
    >
      {/* Noise filter background overlay */}
      <div className="noise-overlay" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Large Display CTA */}
        <div className="mb-20 md:mb-28 border-b border-white/5 pb-16 md:pb-24 footer-reveal-item">
          <Link href="#contact" className="group inline-block">
            <h2 className="text-[12vw] sm:text-[10vw] xl:text-[8vw] font-display font-black tracking-tight leading-[0.9] text-white transition-colors duration-500 hover:text-accent uppercase">
              STUDIO INQUIRIES
              <ArrowUpRight className="inline-block w-[8vw] h-[8vw] text-white/20 group-hover:text-accent group-hover:translate-x-3 group-hover:-translate-y-3 transition-all duration-500 ml-4 align-middle" />
            </h2>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 mb-20 md:mb-24">
          
          {/* Col 1: Sitemap */}
          <div className="flex flex-col space-y-4 footer-reveal-item">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-text-secondary">
              Navigation
            </span>
            <ul className="flex flex-col space-y-2 text-sm font-sans">
              <li>
                <Link href="#about" className="text-text-primary/80 hover:text-accent transition-colors">
                  About Studio
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-text-primary/80 hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#work" className="text-text-primary/80 hover:text-accent transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#evolution" className="text-text-primary/80 hover:text-accent transition-colors">
                  Process
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Socials */}
          <div className="flex flex-col space-y-4 footer-reveal-item">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-text-secondary">
              Socials
            </span>
            <ul className="flex flex-col space-y-2 text-sm font-sans">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-text-primary/80 hover:text-accent transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-text-primary/80 hover:text-accent transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-text-primary/80 hover:text-accent transition-colors">
                  YouTube
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hubs / Locations */}
          <div className="flex flex-col space-y-4 footer-reveal-item">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-text-secondary">
              Locations
            </span>
            <p className="text-sm text-text-primary/80 leading-relaxed">
              London, UK<br />
              New York, US<br />
              Remote
            </p>
          </div>

          {/* Col 4: Creative Vision */}
          <div className="flex flex-col space-y-4 footer-reveal-item col-span-2 md:col-span-1">
            <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-text-secondary">
              Vision
            </span>
            <p className="text-xs text-text-secondary leading-relaxed max-w-[200px]">
              Designing and engineering premium digital landmarks that perform at 60fps and stand out.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4 footer-reveal-item">
          <span className="text-[10px] font-sans text-text-secondary">
            &copy; {new Date().getFullYear()} WAQAS SHAH. ALL RIGHTS RESERVED.
          </span>
          <span className="text-[10px] font-sans text-text-secondary flex gap-6">
            <Link href="#" className="hover:text-accent transition-colors">PRIVACY POLICY</Link>
            <Link href="#" className="hover:text-accent transition-colors">TERMS OF SERVICE</Link>
          </span>
        </div>

      </div>
    </footer>
  );
}
