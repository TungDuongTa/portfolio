"use client";
import { useEffect, useState, useRef, type ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import type { LenisOptions } from "lenis";
import Menu from "./components/Menu/Menu";

type ClientLayoutProps = {
  children: ReactNode;
};

const easing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pageRef = useRef<HTMLDivElement | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollSettings: LenisOptions = isMobile
    ? {
        duration: 0.8,
        easing,
        gestureOrientation: "vertical",
        syncTouch: true,
        touchMultiplier: 1.5,
        infinite: false,
        lerp: 0.09,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
      }
    : {
        duration: 1.2,
        easing,
        gestureOrientation: "vertical",
        syncTouch: true,
        touchMultiplier: 2,
        infinite: false,
        lerp: 0.1,
        wheelMultiplier: 1,
        orientation: "vertical",
        smoothWheel: true,
      };

  return (
    <ReactLenis root options={scrollSettings}>
      <Menu pageRef={pageRef} />

      <div className="page" ref={pageRef}>
        {children}
      </div>
    </ReactLenis>
  );
}
