import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Marquee from "@/components/sections/Marquee";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Evolution from "@/components/sections/Evolution";
import Work from "@/components/sections/Work";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* Frosted Glass Navigation Bar */}
      <Navbar />

      <main className="relative flex flex-col items-center justify-between w-full min-h-screen">
        
        {/* Three.js Interactive Particle Canvas & Cyclic Heading */}
        <Hero />

        {/* CSS Performance Marquee */}
        <Marquee />

        {/* Word-by-word opacity scroll scrub, stats counting tweens */}
        <About />

        {/* Capabilities Grid with SVG border draw effects */}
        <Services />

        {/* Centerpiece sticky timeline and mobile accordion fallback */}
        <Evolution />

        {/* GSAP Pinned horizontal case study cards */}
        <Work />

        {/* SVG clip-path autoticking slide carousel */}
        <Testimonials />

        {/* Floating labels, type chips, and magnetic buttons */}
        <Contact />

      </main>

      {/* Large Let's Talk CTA Footer with noise overlay */}
      <Footer />
    </>
  );
}
