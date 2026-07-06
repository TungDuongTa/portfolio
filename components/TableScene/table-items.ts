export type TableItem = {
  src: string;
  alt: string;
  top: number;
  left: number;
  width: number;
  rotate: number;
  z: number;
  shadow?: boolean;
};

/** Deck A — perimeter ring: frames the search, sparse center */
export const deckA: TableItem[] = [
  { src: "/table-scene/photo-1.png", alt: "Fashion portrait", top: -10, left: 4, width: 16, rotate: -12, z: 4 },
  { src: "/table-scene/photo-2.png", alt: "Street style photo", top: -8, left: 22, width: 15, rotate: 8, z: 5 },
  { src: "/table-scene/film-1.png", alt: "Film strip", top: -9, left: 42, width: 12, rotate: 16, z: 3 },
  { src: "/table-scene/photo-3.png", alt: "Clothing flat lay", top: -7, left: 58, width: 17, rotate: -9, z: 6 },
  { src: "/table-scene/photo-4.png", alt: "Garments magazine", top: -10, left: 76, width: 16, rotate: 14, z: 4 },
  { src: "/table-scene/photo-5.png", alt: "Streetwear zine", top: -6, left: 90, width: 14, rotate: -18, z: 3 },
  { src: "/table-scene/photo-6.png", alt: "Sneakers photo", top: 14, left: 86, width: 15, rotate: 11, z: 5 },
  { src: "/table-scene/paper-1.png", alt: "Research paper", top: 30, left: 84, width: 17, rotate: -7, z: 7 },
  { src: "/table-scene/photo-2.png", alt: "Street style", top: 46, left: 88, width: 14, rotate: 20, z: 4 },
  { src: "/table-scene/photo-1.png", alt: "Fashion portrait", top: 60, left: 78, width: 16, rotate: -11, z: 6 },
  { src: "/table-scene/photo-3.png", alt: "Flat lay", top: 58, left: 58, width: 17, rotate: 9, z: 5 },
  { src: "/table-scene/photo-5.png", alt: "Zine cover", top: 62, left: 38, width: 16, rotate: -14, z: 8 },
  { src: "/table-scene/photo-6.png", alt: "Sneakers", top: 56, left: 18, width: 15, rotate: 7, z: 4 },
  { src: "/table-scene/photo-4.png", alt: "Magazine", top: 60, left: 2, width: 17, rotate: -16, z: 6 },
  { src: "/table-scene/film-1.png", alt: "Film strip", top: 42, left: -3, width: 12, rotate: 12, z: 3 },
  { src: "/table-scene/photo-1.png", alt: "Portrait", top: 26, left: 0, width: 16, rotate: -8, z: 5 },
  { src: "/table-scene/paper-1.png", alt: "Fashion research", top: 10, left: -2, width: 18, rotate: 10, z: 7 },
  { src: "/table-scene/photo-3.png", alt: "Peek center", top: 34, left: 40, width: 13, rotate: -5, z: 2 },
];

/** Deck B — left stack: dense column on the left, sparse right */
export const deckB: TableItem[] = [
  { src: "/table-scene/photo-5.png", alt: "Streetwear zine", top: -8, left: 2, width: 21, rotate: -10, z: 3 },
  { src: "/table-scene/photo-6.png", alt: "Sneakers close up", top: 4, left: 8, width: 22, rotate: 8, z: 5 },
  { src: "/table-scene/photo-4.png", alt: "Garments magazine", top: 16, left: -2, width: 20, rotate: -14, z: 4 },
  { src: "/table-scene/paper-1.png", alt: "Research paper", top: 10, left: 20, width: 19, rotate: 11, z: 6 },
  { src: "/table-scene/photo-1.png", alt: "Fashion portrait", top: 28, left: 4, width: 21, rotate: -7, z: 7 },
  { src: "/table-scene/film-1.png", alt: "Film strip", top: 24, left: 24, width: 14, rotate: 18, z: 5 },
  { src: "/table-scene/photo-3.png", alt: "Moodboard flat lay", top: 40, left: 0, width: 20, rotate: 9, z: 8 },
  { src: "/table-scene/photo-2.png", alt: "Street style", top: 36, left: 18, width: 18, rotate: -12, z: 6 },
  { src: "/table-scene/photo-6.png", alt: "Sneakers", top: 52, left: 6, width: 19, rotate: 6, z: 4 },
  { src: "/table-scene/photo-5.png", alt: "Zine", top: 48, left: 26, width: 17, rotate: -15, z: 9 },
  { src: "/table-scene/photo-4.png", alt: "Magazine", top: 62, left: 12, width: 18, rotate: 13, z: 5 },
  { src: "/table-scene/photo-1.png", alt: "Portrait accent", top: 2, left: 52, width: 15, rotate: -8, z: 4 },
  { src: "/table-scene/photo-3.png", alt: "Flat lay accent", top: -6, left: 70, width: 16, rotate: 12, z: 5 },
  { src: "/table-scene/film-1.png", alt: "Film accent", top: 12, left: 76, width: 13, rotate: -20, z: 3 },
  { src: "/table-scene/photo-2.png", alt: "Urban style", top: 30, left: 68, width: 17, rotate: 7, z: 6 },
  { src: "/table-scene/photo-6.png", alt: "Street sneakers", top: 50, left: 74, width: 16, rotate: -11, z: 7 },
  { src: "/table-scene/paper-1.png", alt: "Paper accent", top: 58, left: 58, width: 18, rotate: 15, z: 4 },
  { src: "/table-scene/photo-4.png", alt: "Magazine corner", top: 64, left: 82, width: 15, rotate: -9, z: 5 },
];

/** Deck C — diagonal sweep: top-left → bottom-right cascade */
export const deckC: TableItem[] = [
  { src: "/table-scene/photo-2.png", alt: "Street style photo", top: -9, left: -2, width: 17, rotate: -11, z: 4 },
  { src: "/table-scene/photo-4.png", alt: "Garments magazine", top: 0, left: 10, width: 18, rotate: 13, z: 5 },
  { src: "/table-scene/film-1.png", alt: "Film strip", top: 8, left: 22, width: 13, rotate: -16, z: 3 },
  { src: "/table-scene/photo-6.png", alt: "Sneakers photo", top: 16, left: 34, width: 16, rotate: 9, z: 6 },
  { src: "/table-scene/photo-1.png", alt: "Fashion portrait", top: 24, left: 44, width: 17, rotate: -8, z: 7 },
  { src: "/table-scene/photo-3.png", alt: "Clothing flat lay", top: 32, left: 52, width: 16, rotate: 12, z: 8 },
  { src: "/table-scene/paper-1.png", alt: "Research paper", top: 40, left: 60, width: 18, rotate: -6, z: 5 },
  { src: "/table-scene/photo-5.png", alt: "Streetwear zine", top: 48, left: 68, width: 17, rotate: 14, z: 6 },
  { src: "/table-scene/photo-2.png", alt: "Street photo", top: 56, left: 76, width: 16, rotate: -13, z: 7 },
  { src: "/table-scene/photo-6.png", alt: "Sneakers", top: 62, left: 84, width: 15, rotate: 10, z: 5 },
  { src: "/table-scene/photo-4.png", alt: "Magazine offset", top: 6, left: 30, width: 15, rotate: 7, z: 4 },
  { src: "/table-scene/film-1.png", alt: "Film offset", top: 20, left: 42, width: 12, rotate: -19, z: 3 },
  { src: "/table-scene/photo-1.png", alt: "Portrait offset", top: 34, left: 64, width: 16, rotate: 11, z: 9 },
  { src: "/table-scene/photo-5.png", alt: "Zine offset", top: 46, left: 78, width: 14, rotate: -7, z: 4 },
  { src: "/table-scene/photo-3.png", alt: "Top-right lone", top: -7, left: 72, width: 16, rotate: 18, z: 5 },
  { src: "/table-scene/paper-1.png", alt: "Top-right paper", top: 4, left: 86, width: 15, rotate: -12, z: 4 },
  { src: "/table-scene/photo-6.png", alt: "Bottom-left lone", top: 58, left: 2, width: 17, rotate: 8, z: 6 },
  { src: "/table-scene/photo-2.png", alt: "Bottom-left style", top: 64, left: 14, width: 15, rotate: -14, z: 5 },
];

type TableItemLayout = Pick<TableItem, "top" | "left" | "width" | "rotate" | "z">;

function withLayout(deck: TableItem[], layouts: TableItemLayout[]): TableItem[] {
  return deck.map((item, i) => ({ ...item, ...layouts[i] }));
}

/** Mobile A — ring around edges */
const layoutAMobile: TableItemLayout[] = [
  { top: -10, left: -8, width: 40, rotate: -12, z: 4 },
  { top: -8, left: 24, width: 38, rotate: 10, z: 5 },
  { top: -9, left: 52, width: 36, rotate: -8, z: 6 },
  { top: -7, left: 74, width: 34, rotate: 14, z: 4 },
  { top: 8, left: 78, width: 36, rotate: -11, z: 7 },
  { top: 24, left: 76, width: 38, rotate: 9, z: 5 },
  { top: 42, left: 80, width: 35, rotate: -15, z: 6 },
  { top: 58, left: 68, width: 37, rotate: 12, z: 8 },
  { top: 62, left: 42, width: 39, rotate: -9, z: 5 },
  { top: 60, left: 16, width: 38, rotate: 7, z: 7 },
  { top: 64, left: -6, width: 36, rotate: -13, z: 4 },
  { top: 44, left: -10, width: 37, rotate: 11, z: 6 },
  { top: 26, left: -8, width: 40, rotate: -7, z: 5 },
  { top: 10, left: -6, width: 38, rotate: 15, z: 8 },
  { top: 32, left: 28, width: 32, rotate: -5, z: 2 },
  { top: 36, left: 50, width: 30, rotate: 6, z: 3 },
  { top: 18, left: 38, width: 31, rotate: -4, z: 2 },
  { top: 48, left: 54, width: 29, rotate: 8, z: 3 },
];

/** Mobile B — tall left stack */
const layoutBMobile: TableItemLayout[] = [
  { top: -8, left: -10, width: 44, rotate: -10, z: 3 },
  { top: 4, left: -4, width: 46, rotate: 8, z: 5 },
  { top: 16, left: -8, width: 42, rotate: -14, z: 4 },
  { top: 10, left: 22, width: 40, rotate: 11, z: 6 },
  { top: 28, left: -6, width: 45, rotate: -7, z: 7 },
  { top: 24, left: 26, width: 38, rotate: 16, z: 5 },
  { top: 40, left: -10, width: 43, rotate: 9, z: 8 },
  { top: 36, left: 20, width: 41, rotate: -12, z: 6 },
  { top: 52, left: -4, width: 44, rotate: 6, z: 4 },
  { top: 48, left: 28, width: 39, rotate: -15, z: 9 },
  { top: 62, left: 2, width: 42, rotate: 13, z: 5 },
  { top: 0, left: 58, width: 36, rotate: -8, z: 4 },
  { top: -6, left: 72, width: 34, rotate: 12, z: 5 },
  { top: 14, left: 68, width: 37, rotate: -18, z: 3 },
  { top: 30, left: 62, width: 38, rotate: 7, z: 6 },
  { top: 50, left: 70, width: 36, rotate: -11, z: 7 },
  { top: 58, left: 54, width: 40, rotate: 15, z: 4 },
  { top: 66, left: 76, width: 32, rotate: -9, z: 5 },
];

/** Mobile C — diagonal band */
const layoutCMobile: TableItemLayout[] = [
  { top: -8, left: -10, width: 40, rotate: -11, z: 4 },
  { top: 2, left: 6, width: 38, rotate: 13, z: 5 },
  { top: 12, left: 18, width: 36, rotate: -14, z: 3 },
  { top: 22, left: 30, width: 39, rotate: 9, z: 6 },
  { top: 32, left: 42, width: 37, rotate: -11, z: 8 },
  { top: 42, left: 52, width: 38, rotate: 14, z: 5 },
  { top: 52, left: 62, width: 36, rotate: -8, z: 7 },
  { top: 62, left: 72, width: 40, rotate: 11, z: 6 },
  { top: 68, left: 58, width: 35, rotate: -13, z: 5 },
  { top: 8, left: 28, width: 34, rotate: 7, z: 4 },
  { top: 18, left: 40, width: 33, rotate: -19, z: 3 },
  { top: 38, left: 64, width: 36, rotate: 10, z: 9 },
  { top: 48, left: 76, width: 34, rotate: -7, z: 4 },
  { top: -6, left: 68, width: 37, rotate: 18, z: 5 },
  { top: 4, left: 82, width: 32, rotate: -12, z: 4 },
  { top: 58, left: -6, width: 38, rotate: 8, z: 6 },
  { top: 64, left: 10, width: 36, rotate: -14, z: 5 },
  { top: 26, left: 54, width: 31, rotate: 6, z: 3 },
];

export const deckAMobile = withLayout(deckA, layoutAMobile);
export const deckBMobile = withLayout(deckB, layoutBMobile);
export const deckCMobile = withLayout(deckC, layoutCMobile);

export function getShowreelDecks(isMobile: boolean) {
  if (isMobile) {
    return { a: deckAMobile, b: deckBMobile, c: deckCMobile };
  }
  return { a: deckA, b: deckB, c: deckC };
}
