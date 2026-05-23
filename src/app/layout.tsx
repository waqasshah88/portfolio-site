import type { Metadata } from "next";
import { Syne, Space_Grotesk } from "next/font/google";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CursorFollower from "@/components/ui/CursorFollower";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Waqas Shah // Senior Creative Engineer & Developer",
  description: "Personal portfolio of Waqas Shah, a senior creative engineer specializing in custom Next.js web applications, WebGL animations, and high-performance interactive interfaces.",
  metadataBase: new URL("https://waqasshah88.github.io"),
  openGraph: {
    title: "Waqas Shah // Senior Creative Engineer & Developer",
    description: "Personal portfolio of Waqas Shah, a senior creative engineer specializing in custom Next.js web applications, WebGL animations, and high-performance interactive interfaces.",
    url: "https://waqasshah88.github.io",
    siteName: "Waqas Shah",
    images: [
      {
        url: "/projects/nebula.png",
        width: 1200,
        height: 630,
        alt: "Waqas Shah Selected Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waqas Shah // Senior Creative Engineer & Developer",
    description: "Personal portfolio of Waqas Shah, a senior creative engineer specializing in custom Next.js web applications, WebGL animations, and high-performance interactive interfaces.",
    images: ["/projects/nebula.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased bg-bg text-text-primary selection:bg-accent selection:text-black">
        {/* Global Noise Overlay */}
        <div className="noise-overlay" />
        
        {/* Smooth Scroll and Custom Cursor Contexts */}
        <SmoothScrollProvider>
          <CursorFollower />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
