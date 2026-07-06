import type { AnimationItem } from "lottie-web";
import type { MutableRefObject, RefObject } from "react";

export type ShowreelFinaleRefs = {
  finale: RefObject<HTMLDivElement | null>;
  pull: RefObject<HTMLDivElement | null>;
  text: RefObject<HTMLDivElement | null>;
  heading: RefObject<HTMLHeadingElement | null>;
  lottie: RefObject<HTMLDivElement | null>;
};

export type FinaleScrollContext = {
  section: HTMLElement;
  refs: ShowreelFinaleRefs;
  scrollDirectionRef: RefObject<"up" | "down">;
  lottieAnimRef: MutableRefObject<AnimationItem | null>;
  vw: () => number;
  vh: () => number;
};
