"use client";

import "./TableScene.css";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { deckA, deckB, type TableItem } from "./table-items";

gsap.registerPlugin(ScrollTrigger);

const PHRASE_A = "Front-End Systems & Visual Stories";
const PHRASE_B = "Scroll-Driven Creative Experiments";

function TableCard({ item, deck }: { item: TableItem; deck: "a" | "b" }) {
  return (
    <div
      data-deck={deck}
      className="table-scene__item"
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

export default function TableScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
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
      const section = sectionRef.current;
      if (!section) return;

      const itemsA = gsap.utils.toArray<HTMLElement>('[data-deck="a"]');
      const itemsB = gsap.utils.toArray<HTMLElement>('[data-deck="b"]');

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

      gsap.set(".table-scene__zoom", {
        scale: 0.5,
        borderRadius: 24,
        transformOrigin: "50% 50%",
      });
      gsap.set(".table-scene__surface", { scale: 1 });
      gsap.set(".table-scene__search", { opacity: 0, y: 24, scale: 0.9 });

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
          end: "+=500%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(".table-scene__zoom", {
        scale: 1,
        borderRadius: 0,
        ease: "power1.inOut",
        duration: 1.4,
      });

      tl.to(".table-scene__search", {
        opacity: 1,
        y: 0,
        scale: 1,
        ease: "power2.out",
        duration: 0.4,
      });
      tl.to(typing, {
        chars: PHRASE_A.length,
        ease: "none",
        duration: 0.6,
        onUpdate: renderTyped,
      });

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

      tl.to({}, { duration: 0.8 });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      aria-label="Featured work explorer"
      className="table-scene"
    >
      <div className="table-scene__zoom">
        <div className="table-scene__surface" role="presentation" />

        <div className="table-scene__items">
          {deckA.map((item, i) => (
            <TableCard key={`a-${i}`} item={item} deck="a" />
          ))}
          {deckB.map((item, i) => (
            <TableCard key={`b-${i}`} item={item} deck="b" />
          ))}
        </div>

        <div className="table-scene__vignette" />
      </div>

      <div className="table-scene__search">
        <div className="table-scene__search-box">
          <svg
            className="table-scene__search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <span className="table-scene__search-text" aria-live="polite">
            <span ref={typedRef} />
            <span className="table-scene__caret" aria-hidden="true" />
          </span>
          <kbd className="table-scene__kbd">{"↵"}</kbd>
        </div>
      </div>
    </section>
  );
}
