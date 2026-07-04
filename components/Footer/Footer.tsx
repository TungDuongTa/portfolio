"use client";
import "./Footer.css";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Button from "../Button/Button";
import { IoMail } from "react-icons/io5";
import Copy from "../Copy/Copy";

gsap.registerPlugin(useGSAP);

class Particle {
  element: HTMLImageElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  rotationSpeed: number;

  constructor(element: Element) {
    this.element = element as HTMLImageElement;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.rotation = 0;
    this.rotationSpeed = 0;
  }

  update(gravity: number, friction: number) {
    this.vy += gravity;
    this.vx *= friction;
    this.vy *= friction;
    this.rotationSpeed *= friction;
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.rotationSpeed;
    this.element.style.transform = `translate(${this.x}px, ${this.y}px) rotate(${this.rotation}deg)`;
  }
}

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const explosionContainerRef = useRef<HTMLDivElement>(null);
  const [sydneyTime, setSydneyTime] = useState("");

  const config = {
    gravity: 0.25,
    friction: 0.99,
    imageSize: 300,
    horizontalForce: 20,
    verticalForce: 15,
    rotationSpeed: 10,
    resetDelay: 500,
  };

  const imageParticleCount = 10;
  const imagePaths = Array.from(
    { length: imageParticleCount },
    (_, i) => `/objects/obj-${i + 1}.png`,
  );

  useEffect(() => {
    const updateSydneyTime = () => {
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Australia/Sydney",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      const sydneyTimeString = formatter.format(new Date());
      setSydneyTime(sydneyTimeString);
    };

    updateSydneyTime();
    const timeInterval = setInterval(updateSydneyTime, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  useGSAP(
    () => {
      let hasExploded = false;
      let animationId: number | undefined;
      let checkTimeout: ReturnType<typeof setTimeout> | undefined;

      imagePaths.forEach((path) => {
        const img = new Image();
        img.src = path;
      });

      const getComputedImageSize = () => {
        const viewportWidth =
          typeof window !== "undefined" ? window.innerWidth : 1200;
        const viewportHeight =
          typeof window !== "undefined" ? window.innerHeight : 800;
        const baseOnWidth = Math.floor(viewportWidth * 0.18);
        const baseOnHeight = Math.floor(viewportHeight * 0.22);
        return Math.max(
          300,
          Math.min(config.imageSize, baseOnWidth, baseOnHeight),
        );
      };

      const createParticles = () => {
        const container = explosionContainerRef.current;
        if (!container) return;
        container.innerHTML = "";

        const particleSize = getComputedImageSize();
        container.style.setProperty("--particle-size", `${particleSize}px`);

        imagePaths.forEach((path) => {
          const particle = document.createElement("img");
          particle.src = path;
          particle.classList.add("explosion-particle-img");
          container.appendChild(particle);
        });
      };

      const explode = () => {
        if (hasExploded || !explosionContainerRef.current) return;

        hasExploded = true;
        createParticles();

        const particleElements = explosionContainerRef.current.querySelectorAll(
          ".explosion-particle-img",
        );
        const particles = Array.from(particleElements).map((element) => {
          const particle = new Particle(element);
          particle.vx = (Math.random() - 0.5) * config.horizontalForce;
          particle.vy = -config.verticalForce - Math.random() * 10;
          particle.rotationSpeed = (Math.random() - 0.5) * config.rotationSpeed;
          return particle;
        });

        const animate = () => {
          particles.forEach((particle) =>
            particle.update(config.gravity, config.friction),
          );
          animationId = requestAnimationFrame(animate);

          const container = explosionContainerRef.current;
          if (
            container &&
            particles.every(
              (particle) => particle.y > container.offsetHeight / 2,
            )
          ) {
            cancelAnimationFrame(animationId);
          }
        };

        animate();
      };

      const checkFooterPosition = () => {
        if (!footerRef.current) return;

        const footerRect = footerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        if (footerRect.top > viewportHeight + 100) {
          hasExploded = false;
        }

        if (!hasExploded && footerRect.top <= viewportHeight + 250) {
          explode();
        }
      };

      createParticles();
      setTimeout(checkFooterPosition, 500);

      const scrollHandler = () => {
        clearTimeout(checkTimeout);
        checkTimeout = setTimeout(checkFooterPosition, 5);
      };

      const resizeHandler = () => {
        const newSize = getComputedImageSize();
        if (explosionContainerRef.current) {
          explosionContainerRef.current.style.setProperty(
            "--particle-size",
            `${newSize}px`,
          );
        }
        hasExploded = false;
      };

      window.addEventListener("scroll", scrollHandler);
      window.addEventListener("resize", resizeHandler);

      return () => {
        window.removeEventListener("scroll", scrollHandler);
        window.removeEventListener("resize", resizeHandler);
        clearTimeout(checkTimeout);
        if (animationId !== undefined) {
          cancelAnimationFrame(animationId);
        }
        if (explosionContainerRef.current) {
          explosionContainerRef.current.innerHTML = "";
        }
      };
    },
    { scope: footerRef },
  );

  return (
    <footer ref={footerRef}>
      <div className="container">
        <div className="footer-header-content">
          <div className="footer-header">
            <Copy animateOnScroll={true} delay={0.2}>
              <h1>Let&apos;s build something that feels alive</h1>
            </Copy>
          </div>
          <div className="footer-link">
            <Button
              animateOnScroll={true}
              delay={0.5}
              variant="light"
              icon={IoMail}
              href="/contact"
            >
              Say Hello
            </Button>
          </div>
        </div>
        <div className="footer-byline">
          <div className="footer-time">
            <p>
              Sydney, NSW <span>{sydneyTime}</span>
            </p>
          </div>

          <div className="footer-author">I am available for work</div>

          <div className="footer-copyright">
            <p>&copy; Daniel Ta</p>
          </div>
        </div>
      </div>
      <div className="explosion-container" ref={explosionContainerRef}></div>
    </footer>
  );
};

export default Footer;
