"use client";

import "./Showreel.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { deckA, deckB, deckC, type TableItem } from "../TableScene/table-items";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PHRASE_A = "Is Dan a hard-working developer?";
const PHRASE_B = "Dan must be passionate about many thing right?";
const PHRASE_C = "Ready for Dan to light up your workspace?";

const TOTAL_FRAMES = 7;
const FRAME_INTERVAL = 500;

function TableCard({ item, deck }: { item: TableItem; deck: "a" | "b" | "c" }) {
  return (
    <div
      data-deck={deck}
      className="showreel-item"
      style={{
        top: `${item.top}%`,
        left: `${item.left}%`,
        width: `${item.width}%`,
        zIndex: item.z,
        ["--rest-rotate" as string]: `${item.rotate}deg`,
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={item.src} alt={item.alt} draggable={false} />
    </div>
  );
}

const Showreel = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const finaleRef = useRef<HTMLHeadingElement>(null);
  const finaleSplitRef = useRef<SplitText | null>(null);
  const [currentFrame, setCurrentFrame] = useState(1);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    lenis.on("scroll", ScrollTrigger.update);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
    };
  }, [lenis]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1000px)", () => {
        const section = sectionRef.current;
        if (!section) return;

        const itemsA = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll('[data-deck="a"]'),
        );
        const itemsB = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll('[data-deck="b"]'),
        );
        const itemsC = gsap.utils.toArray<HTMLElement>(
          section.querySelectorAll('[data-deck="c"]'),
        );

        const vw = () => window.innerWidth;
        const vh = () => window.innerHeight;

        const flyVector = (el: HTMLElement, magnitude: number) => {
          const rect = el.getBoundingClientRect();
          const cx = rect.left + rect.width / 2 - vw() / 2;
          const cy = rect.top + rect.height / 2 - vh() / 2;
          const len = Math.max(Math.hypot(cx, cy), 1);
          return {
            x: (cx / len) * magnitude * vw(),
            y: (cy / len) * magnitude * vh(),
          };
        };

        const flownOut = (el: HTMLElement, magnitude: number) => {
          const v = flyVector(el, magnitude);
          return {
            x: v.x,
            y: v.y,
            scale: 2.2,
            rotateZ: "+=25",
            opacity: 0,
            filter: "blur(6px)",
          };
        };

        itemsA.forEach((el) => {
          gsap.set(el, { rotate: gsap.getProperty(el, "--rest-rotate") });
          gsap.set(el, flownOut(el, 1.4));
        });
        itemsB.forEach((el) => {
          gsap.set(el, { rotate: gsap.getProperty(el, "--rest-rotate") });
          gsap.set(el, flownOut(el, 1.4));
        });
        itemsC.forEach((el) => {
          gsap.set(el, { rotate: gsap.getProperty(el, "--rest-rotate") });
          gsap.set(el, flownOut(el, 1.4));
        });

        gsap.set(".showreel-container", {
          scale: 0.75,
          borderRadius: "2rem",
          transformOrigin: "50% 50%",
        });
        gsap.set(".showreel-backdrop", { opacity: 0 });
        gsap.set(".showreel-search", { opacity: 0, y: 24, scale: 0.9 });
        gsap.set(".showreel-finale", { opacity: 0, visibility: "hidden" });
        gsap.set(".showreel-dark-bg", { opacity: 0 });

        if (finaleRef.current) {
          finaleSplitRef.current = SplitText.create(finaleRef.current, {
            type: "lines",
            mask: "lines",
            linesClass: "showreel-finale-line++",
            lineThreshold: 0.1,
          });
          gsap.set(finaleSplitRef.current.lines, { y: "100%" });
        }

        const frameTimeline = gsap.timeline({ repeat: -1 });
        for (let i = 1; i <= TOTAL_FRAMES; i++) {
          frameTimeline.add(
            () => setCurrentFrame(i),
            (i - 1) * (FRAME_INTERVAL / 1000),
          );
        }

        const typing = { chars: 0, phrase: PHRASE_A };
        const renderTyped = () => {
          if (typedRef.current) {
            typedRef.current.textContent = typing.phrase.slice(
              0,
              Math.round(typing.chars),
            );
          }
        };
        renderTyped();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=820%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        const zoomDuration = 1.4;
        tl.to(
          ".showreel-container",
          {
            scale: 1,
            borderRadius: 0,
            ease: "power1.inOut",
            duration: zoomDuration,
          },
          0,
        );

        tl.add(() => frameTimeline.kill(), zoomDuration);

        tl.to(
          ".showreel-backdrop",
          {
            opacity: 1,
            ease: "power1.inOut",
            duration: 0.6,
          },
          zoomDuration,
        );

        tl.to(
          ".showreel-search",
          {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 0.4,
          },
          zoomDuration + 0.2,
        );
        tl.to(
          typing,
          {
            chars: PHRASE_A.length,
            ease: "none",
            duration: 0.6,
            onUpdate: renderTyped,
          },
          zoomDuration + 0.3,
        );

        const deckAStart = tl.duration() - 0.5;
        itemsA.forEach((el, i) => {
          tl.to(
            el,
            {
              x: 0,
              y: 0,
              scale: 1,
              rotateZ: "-=25",
              opacity: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              duration: 1,
            },
            deckAStart + i * 0.07,
          );
        });

        tl.to({}, { duration: 0.4 });

        const deckAOut = tl.duration();
        itemsA.forEach((el, i) => {
          const v = flyVector(el, 1.5);
          tl.to(
            el,
            {
              x: v.x,
              y: v.y,
              scale: 2.4,
              rotateZ: "+=" + gsap.utils.random(-30, 30, 1),
              opacity: 0,
              filter: "blur(8px)",
              ease: "power2.in",
              duration: 1,
            },
            deckAOut + i * 0.06,
          );
        });

        tl.to(
          typing,
          {
            chars: 0,
            ease: "none",
            duration: 0.35,
            onUpdate: renderTyped,
          },
          deckAOut + 0.3,
        );
        tl.set(typing, { phrase: PHRASE_B }, deckAOut + 0.66);
        tl.to(
          typing,
          {
            chars: PHRASE_B.length,
            ease: "none",
            duration: 0.5,
            onUpdate: renderTyped,
          },
          deckAOut + 0.7,
        );

        const deckBIn = deckAOut + 0.9;
        itemsB.forEach((el, i) => {
          tl.to(
            el,
            {
              x: 0,
              y: 0,
              scale: 1,
              rotateZ: "-=25",
              opacity: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              duration: 1,
            },
            deckBIn + i * 0.07,
          );
        });

        tl.to({}, { duration: 0.4 });

        const deckBOut = tl.duration();
        itemsB.forEach((el, i) => {
          const v = flyVector(el, 1.5);
          tl.to(
            el,
            {
              x: v.x,
              y: v.y,
              scale: 2.4,
              rotateZ: "+=" + gsap.utils.random(-30, 30, 1),
              opacity: 0,
              filter: "blur(8px)",
              ease: "power2.in",
              duration: 1,
            },
            deckBOut + i * 0.06,
          );
        });

        tl.to(
          typing,
          {
            chars: 0,
            ease: "none",
            duration: 0.35,
            onUpdate: renderTyped,
          },
          deckBOut + 0.3,
        );
        tl.set(typing, { phrase: PHRASE_C }, deckBOut + 0.66);
        tl.to(
          typing,
          {
            chars: PHRASE_C.length,
            ease: "none",
            duration: 0.5,
            onUpdate: renderTyped,
          },
          deckBOut + 0.7,
        );

        const deckCIn = deckBOut + 0.9;
        itemsC.forEach((el, i) => {
          tl.to(
            el,
            {
              x: 0,
              y: 0,
              scale: 1,
              rotateZ: "-=25",
              opacity: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              duration: 1,
            },
            deckCIn + i * 0.07,
          );
        });

        tl.to({}, { duration: 0.8 });

        const transitionStart = tl.duration();
        itemsC.forEach((el, i) => {
          const v = flyVector(el, 1.5);
          tl.to(
            el,
            {
              x: v.x,
              y: v.y,
              scale: 2.4,
              rotateZ: "+=" + gsap.utils.random(-30, 30, 1),
              opacity: 0,
              filter: "blur(8px)",
              ease: "power2.in",
              duration: 0.9,
            },
            transitionStart + i * 0.05,
          );
        });

        tl.to(
          ".showreel-container",
          {
            scale: 1.12,
            y: "-8%",
            opacity: 0,
            filter: "blur(14px)",
            ease: "power2.in",
            duration: 0.9,
          },
          transitionStart,
        );
        tl.to(
          ".showreel-search",
          {
            opacity: 0,
            y: -48,
            scale: 0.85,
            ease: "power2.in",
            duration: 0.7,
          },
          transitionStart,
        );
        tl.to(
          [".showreel-backdrop", ".showreel-vignette"],
          {
            opacity: 0,
            ease: "power2.in",
            duration: 0.6,
          },
          transitionStart,
        );
        tl.to(
          ".showreel-dark-bg",
          {
            opacity: 1,
            ease: "power2.inOut",
            duration: 0.9,
          },
          transitionStart,
        );
        tl.to(
          section,
          {
            backgroundColor: "#1a1614",
            ease: "power2.inOut",
            duration: 0.9,
          },
          transitionStart,
        );

        const ctaStart = transitionStart + 0.55;
        tl.set(".showreel-finale", { visibility: "visible" }, ctaStart);
        tl.to(".showreel-finale", { opacity: 1, duration: 0.2 }, ctaStart);

        if (finaleSplitRef.current) {
          tl.to(
            finaleSplitRef.current.lines,
            {
              y: "0%",
              duration: 0.9,
              stagger: 0.12,
              ease: "power4.out",
            },
            ctaStart + 0.05,
          );
        }

        tl.to({}, { duration: 0.6 });

        const refreshHandler = () => ScrollTrigger.refresh();
        window.addEventListener("orientationchange", refreshHandler);
        window.addEventListener("resize", refreshHandler);
        const onLoad = () => ScrollTrigger.refresh();
        window.addEventListener("load", onLoad, { passive: true });

        return () => {
          frameTimeline.kill();
          finaleSplitRef.current?.revert();
          finaleSplitRef.current = null;
          window.removeEventListener("orientationchange", refreshHandler);
          window.removeEventListener("resize", refreshHandler);
          window.removeEventListener("load", onLoad);
        };
      });

      mm.add("(max-width: 999px)", () => {
        const section = sectionRef.current;
        if (section) {
          gsap.set(section, { clearProps: "all" });
        }
        gsap.set(".showreel-container", { clearProps: "all" });
        ScrollTrigger.refresh();
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Showreel and featured work"
      className="showreel"
    >
      <div className="showreel-container">
        <div className="showreel-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/showreel/showreel-frame-${currentFrame}.jpg`}
            alt="Showreel frame"
          />
        </div>

        <div className="showreel-backdrop" aria-hidden="true" />

        <div className="showreel-items">
          {deckA.map((item, i) => (
            <TableCard key={`a-${i}`} item={item} deck="a" />
          ))}
          {deckB.map((item, i) => (
            <TableCard key={`b-${i}`} item={item} deck="b" />
          ))}
          {deckC.map((item, i) => (
            <TableCard key={`c-${i}`} item={item} deck="c" />
          ))}
        </div>

        <div className="showreel-vignette" aria-hidden="true" />
      </div>

      <div className="showreel-dark-bg" aria-hidden="true" />

      <div className="showreel-search">
        <div className="showreel-search-box">
          <svg
            className="showreel-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="showreel-search-text" aria-live="polite">
            <span ref={typedRef} />
            <span className="showreel-caret" aria-hidden="true" />
          </span>
          <kbd className="showreel-kbd">{"↵"}</kbd>
        </div>
      </div>

      <div className="showreel-finale">
        <h2 ref={finaleRef} className="showreel-finale-heading">
          <span className="showreel-finale-prompt">Just please say</span>
          <span className="showreel-finale-yes">YES</span>
        </h2>
      </div>
    </section>
  );
};

export default Showreel;
