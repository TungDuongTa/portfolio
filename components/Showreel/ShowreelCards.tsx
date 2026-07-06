import { useEffect, useState } from "react";
import { getShowreelDecks, type TableItem } from "../TableScene/table-items";
import type { RefObject } from "react";

const MOBILE_BREAKPOINT = 999;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isMobile;
}

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

type ShowreelCardsProps = {
  currentFrame: number;
  typedRef: RefObject<HTMLSpanElement | null>;
};

export default function ShowreelCards({
  currentFrame,
  typedRef,
}: ShowreelCardsProps) {
  const isMobile = useIsMobile();
  const { a: deckAItems, b: deckBItems, c: deckCItems } =
    getShowreelDecks(isMobile);

  return (
    <>
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
          {deckAItems.map((item, i) => (
            <TableCard key={`a-${i}`} item={item} deck="a" />
          ))}
          {deckBItems.map((item, i) => (
            <TableCard key={`b-${i}`} item={item} deck="b" />
          ))}
          {deckCItems.map((item, i) => (
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
    </>
  );
}
