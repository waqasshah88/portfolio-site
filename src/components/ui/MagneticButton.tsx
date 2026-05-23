"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  range?: number; // Distance in px where magnet starts pulling
  strength?: number; // Intensity of the pull (0.1 to 1)
}

export default function MagneticButton({
  children,
  range = 40,
  strength = 0.35,
  className = "",
  ...props
}: MagneticButtonProps) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    // Create GSAP context for proper animation cleanup behaviour
    const ctx = gsap.context(() => {});

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      // Distance from mouse to center
      const distX = e.clientX - btnCenterX;
      const distY = e.clientY - btnCenterY;
      const distance = Math.hypot(distX, distY);

      if (distance < range) {
        if (!isHovered) setIsHovered(true);

        // Pull button and children slightly
        ctx.add(() => {
          gsap.to(btn, {
            x: distX * strength,
            y: distY * strength,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      } else {
        if (isHovered) {
          setIsHovered(false);
          // Snap back
          ctx.add(() => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.3)",
            });
          });
        }
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      ctx.add(() => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.3)",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
      ctx.revert(); // Revert context to clean up memory layout
    };
  }, [isHovered, range, strength]);

  return (
    <button
      ref={btnRef}
      type="button"
      className={`relative inline-flex items-center justify-center transition-colors duration-300 will-change-transform ${className}`}
      {...props}
    >
      {/* Inner hover fill background */}
      <span className="absolute inset-0 bg-accent rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 origin-center -z-10" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
