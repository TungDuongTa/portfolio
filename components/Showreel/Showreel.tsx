"use client";

import "./Showreel.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import type { AnimationItem } from "lottie-web";
import ShowreelCards from "./ShowreelCards";
import ShowreelFinale from "./ShowreelFinale";
import { useShowreelTimeline } from "./hooks/useShowreelTimeline";
import type { ShowreelFinaleRefs } from "./showreelFinale.types";

gsap.registerPlugin(ScrollTrigger);

const Showreel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const finaleRef = useRef<HTMLDivElement>(null);
  const finalePullRef = useRef<HTMLDivElement>(null);
  const finaleTextRef = useRef<HTMLDivElement>(null);
  const finaleHeadingRef = useRef<HTMLHeadingElement>(null);
  const lottieRef = useRef<HTMLDivElement>(null);
  const lottieAnimRef = useRef<AnimationItem | null>(null);
  const scrollDirectionRef = useRef<"up" | "down">("down");
  const lastScrollRef = useRef(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const lenis = useLenis();

  const finaleRefs: ShowreelFinaleRefs = {
    finale: finaleRef,
    pull: finalePullRef,
    text: finaleTextRef,
    heading: finaleHeadingRef,
    lottie: lottieRef,
  };

  useEffect(() => {
    if (!lenis) return;

    const onScroll = ({ scroll }: { scroll: number }) => {
      scrollDirectionRef.current =
        scroll > lastScrollRef.current ? "down" : "up";
      lastScrollRef.current = scroll;
      ScrollTrigger.update();
    };

    lenis.on("scroll", onScroll);

    return () => {
      lenis.off("scroll", onScroll);
    };
  }, [lenis]);

  useShowreelTimeline({
    sectionRef,
    typedRef,
    finaleRefs,
    scrollDirectionRef,
    lottieAnimRef,
    setCurrentFrame,
  });

  return (
    <section
      ref={sectionRef}
      aria-label="Showreel and featured work"
      className="showreel"
    >
      <ShowreelCards currentFrame={currentFrame} typedRef={typedRef} />
      <ShowreelFinale refs={finaleRefs} />
    </section>
  );
};

export default Showreel;
