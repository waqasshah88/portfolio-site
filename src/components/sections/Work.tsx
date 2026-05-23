"use client";

import React, { useRef } from "react";
import { useGSAP } from "@/hooks/useGSAP";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxImage from "@/components/ui/ParallaxImage";
import { useLenis } from "@/hooks/useLenis";

interface Campaign {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  tags: string[];
  link: string;
}

const campaignsData: Campaign[] = [
  {
    id: "01",
    title: "NÉBULA",
    subtitle: "Project: Immersive 3D WebGL",
    desc: "An interactive, GPU-accelerated WebGL playground designed for a luxury fashion house, featuring custom GLSL shaders and fluid particle physics.",
    image: "/projects/nebula.png",
    tags: ["Next.js 14", "Three.js", "GLSL Shaders", "Awwwards SOTD"],
    link: "#",
  },
  {
    id: "02",
    title: "AETHER",
    subtitle: "Project: Headless Storefront",
    desc: "A lightning-fast headless e-commerce storefront integrated with Shopify Buy SDK, showcasing instant page transitions and zero layout shifts.",
    image: "/projects/aether.png",
    tags: ["GraphQL API", "Shopify Headless", "Tailwind CSS", "Lighthouse 99+"],
    link: "#",
  },
  {
    id: "03",
    title: "VORTEX",
    subtitle: "Project: Audio Brand Experience",
    desc: "A generative kinetic promotional web showcase syncing real-time Web Audio API sound analysis nodes with smooth SVG path morphs.",
    image: "/projects/vortex.png",
    tags: ["Web Audio API", "GSAP Timeline", "SVG Morphing", "Creative Design"],
    link: "#",
  },
  {
    id: "04",
    title: "ONYX",
    subtitle: "Project: Interactive Portfolio",
    desc: "A dark-mode-first luxury media platform built with custom smooth gestures, Lenis scrolling timeline, and optimized image assets load.",
    image: "/projects/onyx.png",
    tags: ["Mobile Responsive", "Framer Motion", "Lenis Scroll", "Fluid UI"],
    link: "#",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // state refs to manage custom mouse drag horizontal scroll behaviour
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startY = useRef(0);
  const totalDragDistance = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    // Only drag on desktop/min-width 768px viewports and left-click (button 0)
    if (window.innerWidth < 768 || e.button !== 0) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startY.current = e.clientY;
    totalDragDistance.current = 0;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;

    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;

    // track cumulative drag movement distance to suppress click triggers on links
    totalDragDistance.current += Math.abs(deltaX) + Math.abs(deltaY);

    const speedMultiplier = 1.3;
    const scrollDelta = -deltaX * speedMultiplier;

    if (lenis) {
      lenis.scrollTo(lenis.scroll + scrollDelta, { immediate: true });
    } else {
      window.scrollBy(0, scrollDelta);
    }

    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    // intercept click bubbling if we actually dragged the viewport
    if (totalDragDistance.current > 5) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTimeout(() => {
      totalDragDistance.current = 0;
    }, 50);
  };

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      if (!sectionRef.current || !triggerRef.current) return;

      const totalWidth = sectionRef.current.scrollWidth - window.innerWidth;

      // Pin the container and scroll horizontally
      gsap.to(sectionRef.current, {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${sectionRef.current?.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Animated header reveal
      gsap.fromTo(
        ".work-header",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: triggerRef.current,
            start: "top 40%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    return () => {
      mm.revert();
    };
  }, { scope: triggerRef });

  return (
    <div ref={triggerRef} id="work" className="relative w-full bg-bg border-b border-border overflow-hidden">
      {/* Mobile Header */}
      <div className="md:hidden px-6 pt-20 pb-4">
        <span className="text-xs font-sans font-semibold tracking-widest text-accent uppercase block mb-2">
          Selected Projects
        </span>
        <h2 className="text-3xl font-display font-extrabold tracking-tight uppercase text-text-primary">
          Digital Landmarks
        </h2>
      </div>

      {/* Horizontal Container for Desktop / Vertical Scroll container for Mobile */}
      <div
        ref={sectionRef}
        data-cursor="drag"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        onClickCapture={handleClickCapture}
        className="flex flex-col md:flex-row md:h-screen items-center md:items-stretch py-10 md:py-0 px-6 md:px-20 gap-16 md:gap-24 w-full md:w-max will-change-transform select-none"
      >
        {/* Intro Card (Desktop Only) */}
        <div className="hidden md:flex flex-col justify-center w-[400px] shrink-0 work-header">
          <span className="text-xs font-sans font-semibold tracking-widest text-accent uppercase mb-4">
            Selected Projects
          </span>
          <h2 className="text-5xl xl:text-6xl font-display font-extrabold tracking-tight uppercase text-text-primary leading-[1.05] mb-6">
            CREATIVE<br />DIGITAL<br />LANDMARKS
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-sm">
            A curated showcase of our custom-coded visual platforms combining WebGL particle dynamics, headless architectures, and fluid interactive animations.
          </p>
        </div>

        {/* Projects Loop */}
        {campaignsData.map((project) => (
          <div
            key={project.id}
            className="project-card flex flex-col justify-center w-full max-w-[500px] md:w-[650px] md:max-w-none shrink-0 group select-none"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] w-full bg-surface border border-border rounded-2xl overflow-hidden mb-6 transition-colors duration-500 group-hover:border-accent/30">
              <ParallaxImage
                src={project.image}
                alt={project.title}
                fill
                priority={project.id === "01"}
                className="w-full h-full"
                imageClassName="group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Corner Tag */}
              <div className="absolute top-4 right-4 bg-bg/85 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-border text-[10px] font-sans font-bold tracking-widest text-text-secondary uppercase">
                {project.id}
              </div>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="text-xs font-sans font-medium text-accent mb-2 tracking-wide uppercase">
                {project.subtitle}
              </span>
              <h3 className="text-3xl font-display font-black text-text-primary mb-3 uppercase tracking-tight group-hover:text-accent transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-6 max-w-lg">
                {project.desc}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-sans font-semibold tracking-wider uppercase text-text-primary/70 bg-white/5 border border-white/10 px-3 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
