"use client";

import React, { useEffect, useRef, useState } from "react";

// my magic LERP factor for smooth cursor tracking
const LERP_FACTOR = 0.08;

const lerp = (start: number, end: number, amt: number) => {
  return (1 - amt) * start + amt * end
};

export default function CursorFollower() {
  const ringElRef = useRef<HTMLDivElement>(null);
  const dotElRef = useRef<HTMLDivElement>(null);
  const dragTextElRef = useRef<HTMLDivElement>(null);

  const mouseRef = useRef({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const dotRef = useRef({ x: 0, y: 0 });
  const scaleRef = useRef(1);
  const opacityRef = useRef(0);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      // this took me way too long — firefox doesn't fire resize on mobile
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      setIsMobile(isTouch);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (isMobile) return () => {};

    // hide native cursor for bespoke follow colour/effects
    document.body.classList.add("cursor-none-all");
    const style = document.createElement("style");
    style.innerHTML = `
      .cursor-none-all, .cursor-none-all * {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      if (opacityRef.current === 0) {
        // initialise position immediately so it doesn't animate from (0,0)
        ringRef.current.x = e.clientX;
        ringRef.current.y = e.clientY;
        dotRef.current.x = e.clientX;
        dotRef.current.y = e.clientY;
        opacityRef.current = 1;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest(
        "a, button, input, select, textarea, [role='button'], .interactive"
      );
      const dragArea = target.closest("[data-cursor]");

      if (dragArea) {
        scaleRef.current = 3.0
        const cursorText = dragArea.getAttribute("data-cursor") || "DRAG";
        if (dragTextElRef.current) {
          dragTextElRef.current.textContent = cursorText.toUpperCase();
          dragTextElRef.current.style.opacity = "1";
        }
      } else if (interactive) {
        scaleRef.current = 2.2
        if (dragTextElRef.current) {
          dragTextElRef.current.style.opacity = "0";
        }
      } else {
        scaleRef.current = 1
        if (dragTextElRef.current) {
          dragTextElRef.current.style.opacity = "0";
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const relatedTarget = e.relatedTarget as HTMLElement;
      if (!relatedTarget) {
        scaleRef.current = 1;
        if (dragTextElRef.current) {
          dragTextElRef.current.style.opacity = "0";
        }
        return;
      }

      const interactive = relatedTarget.closest(
        "a, button, input, select, textarea, [role='button'], .interactive"
      );
      const dragArea = relatedTarget.closest("[data-cursor]");

      if (dragArea) {
        scaleRef.current = 3.0;
        const cursorText = dragArea.getAttribute("data-cursor") || "DRAG";
        if (dragTextElRef.current) {
          dragTextElRef.current.textContent = cursorText.toUpperCase();
          dragTextElRef.current.style.opacity = "1";
        }
      } else if (interactive) {
        scaleRef.current = 2.2;
        if (dragTextElRef.current) {
          dragTextElRef.current.style.opacity = "0";
        }
      } else {
        scaleRef.current = 1;
        if (dragTextElRef.current) {
          dragTextElRef.current.style.opacity = "0";
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mouseout", handleMouseOut, { passive: true });

    let rafId: number;
    const updateCursor = () => {
      // outer ring uses the custom LERP factor
      ringRef.current.x = lerp(ringRef.current.x, mouseRef.current.x, LERP_FACTOR);
      ringRef.current.y = lerp(ringRef.current.y, mouseRef.current.y, LERP_FACTOR);

      // inner dot has very little lag
      dotRef.current.x = lerp(dotRef.current.x, mouseRef.current.x, 0.45);
      dotRef.current.y = lerp(dotRef.current.y, mouseRef.current.y, 0.45);

      if (ringElRef.current) {
        ringElRef.current.style.transform = `translate3d(${ringRef.current.x}px, ${ringRef.current.y}px, 0) translate(-50%, -50%) scale(${scaleRef.current})`;
        ringElRef.current.style.opacity = `${opacityRef.current}`;
      }
      if (dotElRef.current) {
        dotElRef.current.style.transform = `translate3d(${dotRef.current.x}px, ${dotRef.current.y}px, 0) translate(-50%, -50%)`;
        dotElRef.current.style.opacity = `${opacityRef.current}`;
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId);
      document.body.classList.remove("cursor-none-all");
      if (style.parentNode) {
        style.parentNode.removeChild(style);
      }
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        ref={ringElRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-[9999] mix-blend-difference will-change-transform transition-colors duration-300 flex items-center justify-center"
      >
        <span
          ref={dragTextElRef}
          style={{ opacity: 0 }}
          className="text-[8px] font-display font-bold tracking-widest text-white select-none pointer-events-none transition-opacity duration-300 uppercase leading-none mt-[1px]"
        >
          DRAG
        </span>
      </div>

      {/* Inner Dot */}
      <div
        ref={dotElRef}
        style={{ opacity: 0 }}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-accent rounded-full pointer-events-none z-[9999] mix-blend-difference will-change-transform"
      />
    </>
  );
}
