import gsap from "gsap";
import lottie from "lottie-web";
import type { FinaleScrollContext } from "../showreelFinale.types";

const DUCK_PIXELS_PER_FRAME = 3;
const LOTTIE_PATH = "/showreel/duck.json";
const LOTTIE_GAP_DESKTOP = 28;
const LOTTIE_GAP_MOBILE = 14;
const PAD_RIGHT_DESKTOP = 48;
const PAD_RIGHT_MOBILE = 16;
const PULL_DURATION = 2;
const SKEW_PULL = 15;
const SKEW_PUSH = -15;
const SKEW_SETTLE = -5;
const SETTLE_TRIGGER = 0.995;
const SETTLE_RESET = 0.97;

export function createFinaleController(ctx: FinaleScrollContext) {
  const { section, refs, scrollDirectionRef, lottieAnimRef, vw, vh } = ctx;

  let fullTextWidth = 0;
  let justTextWidth = 0;
  let skewTo: gsap.QuickToFunc | null = null;
  let settleTween: gsap.core.Timeline | null = null;
  let inSettleZone = false;
  let teardownResize: (() => void) | null = null;

  const initSkew = () => {
    const heading = refs.heading.current;
    if (!heading || skewTo) return;

    skewTo = gsap.quickTo(heading, "skewX", {
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const resetSkew = () => {
    skewTo = null;
    settleTween?.kill();
    settleTween = null;
  };

  const runSettleBounce = (heading: HTMLElement) => {
    resetSkew();
    gsap.killTweensOf(heading, "skewX");

    settleTween = gsap
      .timeline()
      .to(heading, {
        skewX: SKEW_SETTLE,
        duration: 0.12,
        ease: "power2.out",
      })
      .to(heading, {
        skewX: 0,
        duration: 0.4,
        ease: "power2.out",
      });
  };

  const updatePullLayout = (progress: number) => {
    const finalePull = refs.pull.current;
    const finaleHeading = refs.heading.current;
    const lottieEl = refs.lottie.current;

    if (!finalePull || !finaleHeading || !fullTextWidth || !justTextWidth) {
      return;
    }

    const lottieW = lottieEl?.offsetWidth ?? 0;
    const isMobile = vw() < 1000;
    const lottieGap = isMobile ? LOTTIE_GAP_MOBILE : LOTTIE_GAP_DESKTOP;
    const padRight = isMobile ? PAD_RIGHT_MOBILE : PAD_RIGHT_DESKTOP;
    const startVisibleW = lottieW + lottieGap + justTextWidth;
    const fullTotalW = lottieW + lottieGap + fullTextWidth;
    const startLeft = vw() - padRight - startVisibleW;
    const endLeft = (vw() - fullTotalW) / 2;
    const left = startLeft + progress * (endLeft - startLeft);

    gsap.set(finalePull, { left });

    const lottieAnim = lottieAnimRef.current;
    if (lottieAnim && lottieAnim.totalFrames > 0 && lottieEl) {
      const pullScrollPx = progress * vh() * 1.1;
      const frame =
        Math.floor(pullScrollPx / DUCK_PIXELS_PER_FRAME) %
        lottieAnim.totalFrames;
      lottieAnim.goToAndStop(frame, true);

      const pulling = scrollDirectionRef.current === "down";
      gsap.set(lottieEl, {
        rotateY: pulling ? -180 : 0,
      });
    }

    if (progress >= SETTLE_TRIGGER) {
      if (!inSettleZone) {
        inSettleZone = true;
        runSettleBounce(finaleHeading);
      }
      return;
    }

    if (progress < SETTLE_RESET) {
      if (inSettleZone) {
        inSettleZone = false;
        resetSkew();
        gsap.killTweensOf(finaleHeading, "skewX");
        gsap.set(finaleHeading, { skewX: 0 });
      }

      const pulling = scrollDirectionRef.current === "down";
      initSkew();
      skewTo?.(pulling ? SKEW_PULL : SKEW_PUSH);
    }
  };

  const measureFinaleText = () => {
    const finaleHeading = refs.heading.current;
    if (!finaleHeading) return;

    fullTextWidth = finaleHeading.offsetWidth;

    const measureEl = document.createElement("span");
    measureEl.textContent = "Just";
    const headingStyle = window.getComputedStyle(finaleHeading);
    measureEl.style.cssText = `
      position: absolute;
      visibility: hidden;
      white-space: nowrap;
      font-family: ${headingStyle.fontFamily};
      font-size: ${headingStyle.fontSize};
      font-weight: ${headingStyle.fontWeight};
      letter-spacing: ${headingStyle.letterSpacing};
      text-transform: ${headingStyle.textTransform};
    `;
    section.appendChild(measureEl);
    justTextWidth = measureEl.offsetWidth;
    section.removeChild(measureEl);

    inSettleZone = false;
    resetSkew();
    gsap.set(finaleHeading, { skewX: 0 });
    updatePullLayout(0);
  };

  const setup = () => {
    gsap.set(".showreel-finale", { opacity: 0, visibility: "hidden" });
    measureFinaleText();

    const lottieEl = refs.lottie.current;
    if (lottieEl) {
      lottieAnimRef.current = lottie.loadAnimation({
        container: lottieEl,
        path: LOTTIE_PATH,
        renderer: "svg",
        autoplay: false,
        loop: false,
      });
    }

    const onResize = () => measureFinaleText();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    teardownResize = () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  };

  const cleanup = () => {
    teardownResize?.();
    teardownResize = null;
    resetSkew();
    inSettleZone = false;
    lottieAnimRef.current?.destroy();
    lottieAnimRef.current = null;
  };

  const appendToTimeline = (tl: gsap.core.Timeline, ctaStart: number) => {
    const root = refs.finale.current;
    if (!root) return;

    tl.set(root, { visibility: "visible" }, ctaStart);
    tl.to(root, { opacity: 1, duration: 0.2 }, ctaStart);
    tl.add(measureFinaleText, ctaStart);

    const pullProxy = { t: 0 };
    tl.to(
      pullProxy,
      {
        t: 1,
        duration: PULL_DURATION,
        ease: "none",
        onUpdate: () => {
          updatePullLayout(pullProxy.t);
        },
      },
      ctaStart + 0.1,
    );

    tl.to({}, { duration: 0.5 });
  };

  return { setup, cleanup, appendToTimeline };
}
