"use client";
import "./Menu.css";
import { useRef, useState, useEffect, type RefObject } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { useViewTransition } from "@/hooks/useViewTransition";
import Link from "next/link";

gsap.registerPlugin(useGSAP, SplitText);

type MenuLinkContainer = HTMLDivElement & {
  _mouseEnterHandler?: () => void;
  _mouseLeaveHandler?: () => void;
};

type MenuProps = {
  pageRef: RefObject<HTMLDivElement | null>;
};

const Menu = ({ pageRef }: MenuProps) => {
  void pageRef;
  const navToggleRef = useRef<HTMLDivElement | null>(null);
  const menuOverlayRef = useRef<HTMLDivElement | null>(null);
  const menuImageRef = useRef<HTMLImageElement | null>(null);
  const menuLinksWrapperRef = useRef<HTMLDivElement | null>(null);
  const linkHighlighterRef = useRef<HTMLDivElement | null>(null);
  const menuLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const menuLinkContainersRef = useRef<(MenuLinkContainer | null)[]>([]);
  const openLabelRef = useRef<HTMLParagraphElement | null>(null);
  const closeLabelRef = useRef<HTMLParagraphElement | null>(null);
  const menuColsRef = useRef<(HTMLDivElement | null)[]>([]);

  const splitTextInstances = useRef<SplitText[]>([]);
  const menuColSplitTextInstances = useRef<SplitText[]>([]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuAnimating, setIsMenuAnimating] = useState(false);

  const lenis = useLenis();

  const { navigateWithTransition } = useViewTransition();

  const menuItems = [
    { label: "Home", route: "/" },
    { label: "Work", route: "/work" },
    { label: "Studio", route: "/studio" },
    { label: "Stories", route: "/stories" },
    { label: "Contact", route: "/contact" },
  ];

  const currentX = useRef(0);
  const targetX = useRef(0);
  const lerpFactor = 0.05;

  const currentHighlighterX = useRef(0);
  const targetHighlighterX = useRef(0);
  const currentHighlighterWidth = useRef(0);
  const targetHighlighterWidth = useRef(0);

  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMenuOpen) return;

    const menuCols = menuColsRef.current;
    if (!menuCols || menuCols.length === 0) return;

    menuColSplitTextInstances.current.forEach((split) => split.revert());
    menuColSplitTextInstances.current = [];

    menuCols.forEach((col) => {
      if (!col) return;

      const elements = col.querySelectorAll("p, a");

      elements.forEach((el: Element) => {
        const split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "split-line",
        });

        menuColSplitTextInstances.current.push(split);

        gsap.set(split.lines, { y: "100%" });
      });
    });
  }, [isMenuOpen]);

  useGSAP(
    () => {
      const menuLinks = menuLinksRef.current;
      const menuOverlay = menuOverlayRef.current;
      const menuLinksWrapper = menuLinksWrapperRef.current;
      const linkHighlighter = linkHighlighterRef.current;
      const menuImage = menuImageRef.current;
      const menuLinkContainers = menuLinkContainersRef.current;

      if (!menuOverlay || !menuLinksWrapper || !linkHighlighter || !menuImage) {
        return;
      }

      splitTextInstances.current.forEach((split) => split.revert());
      splitTextInstances.current = [];

      menuLinks.forEach((link) => {
        if (!link) return;

        const chars = link.querySelectorAll("span");
        chars.forEach((char: Element, charIndex: number) => {
          const split = new SplitText(char, { type: "chars" });
          splitTextInstances.current.push(split);
          split.chars.forEach((char) => {
            char.classList.add("char");
          });
          if (charIndex === 1) {
            gsap.set(split.chars, { y: "110%" });
          }
        });
      });

      gsap.set(menuImage, { y: 0, scale: 0.5, opacity: 0.25 });
      gsap.set(menuLinks, { y: "150%" });
      gsap.set(linkHighlighter, { y: "150%" });

      const defaultLinkText = menuLinksWrapper.querySelector<HTMLElement>(
        ".menu-link:first-child a span",
      );
      if (defaultLinkText) {
        const linkWidth = defaultLinkText.offsetWidth;
        linkHighlighter.style.width = linkWidth + "px";
        currentHighlighterWidth.current = linkWidth;
        targetHighlighterWidth.current = linkWidth;

        const defaultLinkTextElement =
          menuLinksWrapper.querySelector<HTMLElement>(".menu-link:first-child");
        if (defaultLinkTextElement) {
          const linkRect = defaultLinkTextElement.getBoundingClientRect();
          const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();
          const initialX = linkRect.left - menuWrapperRect.left;
          currentHighlighterX.current = initialX;
          targetHighlighterX.current = initialX;
        }
      }

      const handleMouseMove = (e: MouseEvent) => {
        if (window.innerWidth < 1000) return;

        const mouseX = e.clientX;
        const viewportWidth = window.innerWidth;
        const menuLinksWrapperWidth = menuLinksWrapper.offsetWidth;

        const maxMoveLeft = 0;
        const maxMoveRight = viewportWidth - menuLinksWrapperWidth;

        const sensitivityRange = viewportWidth * 0.5;
        const startX = (viewportWidth - sensitivityRange) / 2;
        const endX = startX + sensitivityRange;

        let mousePercentage;
        if (mouseX <= startX) {
          mousePercentage = 0;
        } else if (mouseX >= endX) {
          mousePercentage = 1;
        } else {
          mousePercentage = (mouseX - startX) / sensitivityRange;
        }

        targetX.current =
          maxMoveLeft + mousePercentage * (maxMoveRight - maxMoveLeft);
      };

      menuLinkContainers.forEach((link) => {
        if (!link) return;

        const handleMouseEnter = () => {
          if (window.innerWidth < 1000) return;

          const linkCopy = link.querySelectorAll("a span");
          if (!linkCopy || linkCopy.length < 2) return;

          const visibleCopy = linkCopy[0];
          const animatedCopy = linkCopy[1];

          const visibleChars = visibleCopy.querySelectorAll(".char");
          gsap.to(visibleChars, {
            y: "-110%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const animatedChars = animatedCopy.querySelectorAll(".char");
          gsap.to(animatedChars, {
            y: "0%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const linkRect = link.getBoundingClientRect();
          const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();

          targetHighlighterX.current = linkRect.left - menuWrapperRect.left;

          const linkCopyElement = link.querySelector<HTMLElement>("a span");
          targetHighlighterWidth.current = linkCopyElement
            ? linkCopyElement.offsetWidth
            : link.offsetWidth;
        };

        const handleMouseLeave = () => {
          if (window.innerWidth < 1000) return;

          const linkCopy = link.querySelectorAll("a span");
          if (!linkCopy || linkCopy.length < 2) return;

          const visibleCopy = linkCopy[0];
          const animatedCopy = linkCopy[1];

          const animatedChars = animatedCopy.querySelectorAll(".char");
          gsap.to(animatedChars, {
            y: "110%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });

          const visibleChars = visibleCopy.querySelectorAll(".char");
          gsap.to(visibleChars, {
            y: "0%",
            stagger: 0.05,
            duration: 0.5,
            ease: "expo.inOut",
          });
        };

        link.addEventListener("mouseenter", handleMouseEnter);
        link.addEventListener("mouseleave", handleMouseLeave);

        link._mouseEnterHandler = handleMouseEnter;
        link._mouseLeaveHandler = handleMouseLeave;
      });

      const handleMenuLinksWrapperMouseLeave = () => {
        const defaultLinkText = menuLinksWrapper.querySelector(
          ".menu-link:first-child",
        );
        if (!defaultLinkText) return;

        const defaultLinkTextSpan =
          defaultLinkText.querySelector<HTMLElement>("a span");
        if (!defaultLinkTextSpan) return;

        const linkRect = defaultLinkText.getBoundingClientRect();
        const menuWrapperRect = menuLinksWrapper.getBoundingClientRect();

        targetHighlighterX.current = linkRect.left - menuWrapperRect.left;
        targetHighlighterWidth.current = defaultLinkTextSpan.offsetWidth;
      };

      menuOverlay.addEventListener("mousemove", handleMouseMove);
      menuLinksWrapper.addEventListener(
        "mouseleave",
        handleMenuLinksWrapperMouseLeave,
      );

      const animate = () => {
        currentX.current += (targetX.current - currentX.current) * lerpFactor;
        currentHighlighterX.current +=
          (targetHighlighterX.current - currentHighlighterX.current) *
          lerpFactor;
        currentHighlighterWidth.current +=
          (targetHighlighterWidth.current - currentHighlighterWidth.current) *
          lerpFactor;

        gsap.to(menuLinksWrapper, {
          x: currentX.current,
          duration: 0.3,
          ease: "power4.out",
        });

        gsap.to(linkHighlighter, {
          x: currentHighlighterX.current,
          width: currentHighlighterWidth.current,
          duration: 0.3,
          ease: "power4.out",
        });

        animationFrameRef.current = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        menuOverlay.removeEventListener("mousemove", handleMouseMove);
        menuLinksWrapper.removeEventListener(
          "mouseleave",
          handleMenuLinksWrapperMouseLeave,
        );

        menuLinkContainers.forEach((link) => {
          if (!link) return;
          const mouseEnterHandler = link._mouseEnterHandler;
          const mouseLeaveHandler = link._mouseLeaveHandler;
          if (mouseEnterHandler)
            link.removeEventListener("mouseenter", mouseEnterHandler);
          if (mouseLeaveHandler)
            link.removeEventListener("mouseleave", mouseLeaveHandler);
        });

        splitTextInstances.current.forEach((split) => {
          if (split && split.revert) split.revert();
        });
        splitTextInstances.current = [];
      };
    },
    { scope: menuOverlayRef },
  );

  useEffect(() => {
    if (!lenis) return;
    if (isMenuOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [lenis, isMenuOpen]);

  const toggleMenu = () => {
    if (isMenuAnimating) return;
    setIsMenuAnimating(true);

    const menuOverlay = menuOverlayRef.current;
    const menuImage = menuImageRef.current;
    const menuLinks = menuLinksRef.current;
    const linkHighlighter = linkHighlighterRef.current;
    const menuLinksWrapper = menuLinksWrapperRef.current;
    const openLabel = openLabelRef.current;
    const closeLabel = closeLabelRef.current;
    const menuCols = menuColsRef.current;

    if (
      !menuOverlay ||
      !menuImage ||
      !linkHighlighter ||
      !menuLinksWrapper ||
      !openLabel ||
      !closeLabel
    ) {
      return;
    }

    if (!isMenuOpen) {
      gsap.to(openLabel, {
        y: "-100%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(closeLabel, {
        y: "-100%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "expo.out",
        onComplete: () => {
          gsap.set(".menu-link", { overflow: "visible" });

          setIsMenuOpen(true);
          setIsMenuAnimating(false);
        },
      });

      gsap.to(menuImage, {
        scale: 1,
        opacity: 1,
        duration: 1.5,
        ease: "expo.out",
      });

      gsap.to(menuLinks, {
        y: "0%",
        duration: 1.25,
        stagger: 0.1,
        delay: 0.25,
        ease: "expo.out",
      });

      gsap.to(linkHighlighter, {
        y: "0%",
        duration: 1,
        delay: 1,
        ease: "expo.out",
      });

      menuCols.forEach((col) => {
        if (!col) return;

        const splitLines = col.querySelectorAll(".split-line");

        gsap.to(splitLines, {
          y: "0%",
          duration: 1,
          stagger: 0.05,
          delay: 0.5,
          ease: "expo.out",
        });
      });
    } else {
      gsap.to(openLabel, {
        y: "0%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(closeLabel, {
        y: "0%",
        duration: 1,
        ease: "power3.out",
      });

      gsap.to(menuImage, {
        y: "-25svh",
        opacity: 0.5,
        duration: 1.25,
        ease: "expo.out",
      });

      menuCols.forEach((col) => {
        if (!col) return;

        const splitLines = col.querySelectorAll(".split-line");

        gsap.to(splitLines, {
          y: "-100%",
          duration: 1,
          stagger: 0,
          ease: "expo.out",
        });
      });

      gsap.to(menuOverlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1.25,
        ease: "expo.out",
        onComplete: () => {
          gsap.set(menuOverlay, {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          });
          gsap.set(menuLinks, { y: "150%" });
          gsap.set(linkHighlighter, { y: "150%" });
          gsap.set(menuImage, { y: "0", scale: 0.5, opacity: 0.25 });
          gsap.set(".menu-link", { overflow: "hidden" });

          menuCols.forEach((col) => {
            if (!col) return;
            const splitLines = col.querySelectorAll(".split-line");
            gsap.set(splitLines, { y: "100%" });
          });

          gsap.set(menuLinksWrapper, { x: 0 });
          currentX.current = 0;
          targetX.current = 0;

          setIsMenuOpen(false);
          setIsMenuAnimating(false);
        },
      });
    }
  };

  return (
    <>
      <nav>
        <div className="nav-logo">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              const currentPath = window.location.pathname;
              if (currentPath === "/") {
                return;
              }
              navigateWithTransition("/", isMenuOpen ? toggleMenu : undefined);
            }}
          >
            <img src="/logo.svg" alt="" />
          </Link>
        </div>

        <div className="nav-toggle" ref={navToggleRef} onClick={toggleMenu}>
          <div className="nav-toggle-wrapper">
            <p ref={openLabelRef} className="open-label">
              Menu
            </p>

            <p ref={closeLabelRef} className="close-label">
              Close
            </p>
          </div>
        </div>
      </nav>

      <div className="menu-overlay" ref={menuOverlayRef}>
        <div className="menu-content">
          <div
            className="menu-col"
            ref={(el) => {
              menuColsRef.current[0] = el;
            }}
          >
            <div className="menu-content-group">
              <p>&copy; Daniel Ta</p>
              <p>Front-end Developer</p>
              <p>Sydney</p>
            </div>

            <div className="menu-content-group">
              <p>Say Hello</p>
              <p>duongtatung@gmail.com</p>
            </div>

            <div className="menu-content-group">
              <p>Have a chat</p>
              <p>+61 406 400 348</p>
            </div>
          </div>
          <div
            className="menu-col"
            ref={(el) => {
              menuColsRef.current[1] = el;
            }}
          >
            <div className="menu-content-group">
              <a
                href="https://www.facebook.com/tung.duong.809378/"
                target="_blank"
              >
                Facebook
              </a>

              <a
                href="https://www.linkedin.com/in/tung-duong-ta-52b9b3287/"
                target="_blank"
              >
                LinkedIn
              </a>
            </div>

            <div className="menu-content-group">
              <p>Language</p>
              <p>Human</p>
            </div>

            <div className="menu-content-group">
              <p>Am i cool?</p>
              <p>Yes</p>
            </div>
          </div>
        </div>

        <div className="menu-img">
          <img ref={menuImageRef} src="/menu/menu_img.jpg" alt="" />
        </div>

        <div className="menu-links-wrapper" ref={menuLinksWrapperRef}>
          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className="menu-link"
              ref={(el) => {
                menuLinkContainersRef.current[index] = el;
              }}
              onClick={(e) => {
                e.preventDefault();
                const currentPath = window.location.pathname;
                if (currentPath === item.route) {
                  if (isMenuOpen) {
                    toggleMenu();
                  }
                  return;
                }
                navigateWithTransition(
                  item.route,
                  isMenuOpen ? toggleMenu : undefined,
                );
              }}
            >
              <a
                href={item.route}
                ref={(el) => {
                  menuLinksRef.current[index] = el;
                }}
              >
                <span>{item.label}</span>
                <span>{item.label}</span>
              </a>
            </div>
          ))}

          <div className="link-highlighter" ref={linkHighlighterRef}></div>
        </div>
      </div>
    </>
  );
};

export default Menu;
