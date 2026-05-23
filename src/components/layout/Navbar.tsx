"use client";

import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { Menu, X } from "lucide-react";

const FlipLink = ({ href, children, onClick }: { href: string; children: string; onClick?: () => void }) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group relative overflow-hidden inline-block text-xs md:text-sm font-sans font-medium tracking-widest text-text-primary uppercase py-2 cursor-pointer"
    >
      <div className="relative overflow-hidden inline-flex">
        {children.split("").map((char, index) => (
          <span
            key={index}
            style={{
              transitionDelay: `${index * 0.02}s`,
            }}
            className="relative inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
        <div className="absolute left-0 top-0 inline-flex">
          {children.split("").map((char, index) => (
            <span
              key={index}
              style={{
                transitionDelay: `${index * 0.02}s`,
              }}
              className="relative inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-full group-hover:translate-y-0 text-accent font-semibold"
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
      </div>
    </a>
  );
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // 1. Scroll listener for frosted glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Animated underline for Logo on Load
  useGSAP(() => {
    // Underline draw animation
    gsap.fromTo(
      ".logo-underline",
      { scaleX: 0, transformOrigin: "left" },
      { scaleX: 1, duration: 1.2, ease: "power4.out", delay: 0.3 }
    );
  }, []);

  // 3. Stagger mobile menu links when open
  useGSAP(() => {
    if (mobileMenuOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
      
      gsap.fromTo(
        ".mobile-link",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: "power3.out", delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "py-4 bg-black/40 backdrop-blur-xl border-white/10"
            : "py-6 bg-transparent border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <a
            href="#"
            ref={logoRef}
            className="group relative text-xl font-display font-black tracking-tighter text-text-primary uppercase select-none cursor-pointer"
          >
            WAQAS SHAH
            <span className="logo-underline absolute bottom-0 left-0 w-full h-[2px] bg-accent scale-x-0" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <FlipLink href="#about">About</FlipLink>
            <FlipLink href="#services">Services</FlipLink>
            <FlipLink href="#evolution">Process</FlipLink>
            <FlipLink href="#work">Projects</FlipLink>
            <FlipLink href="#testimonials">Testimonials</FlipLink>
          </nav>

          {/* Let's Talk CTA */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="group relative px-6 py-2.5 rounded-full border border-accent overflow-hidden inline-block"
            >
              <span className="absolute inset-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] -translate-x-[101%] group-hover:translate-x-0" />
              <span className="relative z-10 text-xs font-bold tracking-widest text-text-primary uppercase group-hover:text-black transition-colors duration-300">
                Inquire
              </span>
            </a>
          </div>

          {/* Mobile Menu Toggle Button with proper WCAG labels */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-primary focus:outline-none z-[60] relative p-1"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation-overlay"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Mobile Menu Overlay with role="region" */}
      <div
        ref={mobileMenuRef}
        id="mobile-navigation-overlay"
        role="region"
        aria-label="Mobile Navigation Menu"
        className={`fixed inset-0 bg-bg z-50 flex flex-col justify-center px-8 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col space-y-6 text-left">
          <div className="overflow-hidden">
            <div className="mobile-link">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display font-extrabold tracking-tight uppercase text-text-primary hover:text-accent transition-colors duration-300"
              >
                About
              </a>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="mobile-link">
              <a
                href="#services"
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display font-extrabold tracking-tight uppercase text-text-primary hover:text-accent transition-colors duration-300"
              >
                Services
              </a>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="mobile-link">
              <a
                href="#evolution"
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display font-extrabold tracking-tight uppercase text-text-primary hover:text-accent transition-colors duration-300"
              >
                Process
              </a>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="mobile-link">
              <a
                href="#work"
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display font-extrabold tracking-tight uppercase text-text-primary hover:text-accent transition-colors duration-300"
              >
                Projects
              </a>
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="mobile-link">
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="text-4xl font-display font-extrabold tracking-tight uppercase text-text-primary hover:text-accent transition-colors duration-300"
              >
                Testimonials
              </a>
            </div>
          </div>
          <div className="overflow-hidden pt-4">
            <div className="mobile-link">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block px-8 py-3 rounded-full border border-accent bg-accent text-black font-bold tracking-widest uppercase text-center"
              >
                Inquire
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
