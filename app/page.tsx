"use client";
import "./home.css";
import Button from "@/components/Button/Button";
import Copy from "@/components/Copy/Copy";
import Preloader, { isInitialLoad } from "@/components/Preloader/Preloader";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "@/components/Footer/Footer";
import Showreel from "@/components/Showreel/Showreel";
export default function Home() {
  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    const onLoad = () => ScrollTrigger.refresh(true);
    window.addEventListener("load", onLoad, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
    };
  }, []);
  return (
    <>
      <Preloader />
      <section className="hero">
        <div className="container">
          <div className="hero-content-main">
            <div className="hero-header">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 5.75 : 0.75}>
                <h1 className="hero-header-title">Hi there,</h1>
                <h1 className="">My name is Daniel</h1>
              </Copy>
            </div>

            <div className="hero-footer-outer">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 6.35 : 1.65}>
                <p className="sm">&copy; Daniel</p>
                <p className="sm">( Portfolio 101 )</p>
              </Copy>
            </div>

            <div className="hero-footer">
              <Copy animateOnScroll={false} delay={isInitialLoad ? 6.05 : 1.15}>
                <p className="lg">
                  {/* I build visuals, stories, and systems for people who like
                  their creativity a little unpredictable.  */}
                  I&apos;m a front-end developer who builds systems and stories
                  with creativity that is a little unpredictable.
                </p>
              </Copy>

              <Button delay={isInitialLoad ? 6.35 : 1.55} href="/studio">
                Explore the Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Showreel />
      <section className="featured-work">
        <div className="container">
          <div className="featured-work-header-content">
            <div className="featured-work-header">
              <Copy animateOnScroll={true} delay={0.25}>
                <h1>Featured Work</h1>
              </Copy>
            </div>

            <div className="arrow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 32 32"
                fill="none"
                className="icon"
              >
                <path
                  d="M16 26.6665L16 5.33317"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M22.6667 19.9999L16 26.6665L9.33337 19.9998"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </div>

            <div className="featured-work-header-copy">
              <Copy animateOnScroll={true} delay={0.25}>
                <p className="lg">
                  From motion to concept, pieces born from quiet sketches, late
                  nights, and just the right amount of chaos.
                </p>
              </Copy>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
