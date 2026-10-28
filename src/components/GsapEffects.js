"use client";

import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect, useState } from "react";

export default function GsapEffects() {
  const [ready, setReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!ready || !window.gsap) return undefined;
    const gsap = window.gsap;
    const revealed = new Set();
    const triggers = [];

    const intro = document.querySelectorAll("[data-page-intro]");
    gsap.fromTo(
      intro,
      { y: 34, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        stagger: 0.08,
        ease: "power3.out",
        overwrite: true,
      },
    );

    document.querySelectorAll("[data-reveal]").forEach((element) => {
      const from = { y: 44, opacity: 0 };
      const to = {
        y: 0,
        opacity: 1,
        duration: 0.75,
        ease: "power3.out",
        overwrite: true,
      };
      gsap.set(element, from);
      const trigger = () => {
        if (revealed.has(element)) return;
        revealed.add(element);
        gsap.to(element, to);
      };
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9)
        trigger();
      else {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                trigger();
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.12 },
        );
        observer.observe(element);
        triggers.push(() => observer.disconnect());
      }
    });

    document.querySelectorAll("[data-gsap-card]").forEach((element, index) => {
      const onEnter = () =>
        gsap.to(element, {
          y: -7,
          rotateX: 0.7,
          duration: 0.35,
          ease: "power2.out",
        });
      const onLeave = () =>
        gsap.to(element, {
          y: 0,
          rotateX: 0,
          duration: 0.45,
          ease: "power2.out",
        });
      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
      triggers.push(() => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      });
      if (index < 4)
        gsap.from(element, {
          scale: 0.985,
          duration: 0.7,
          ease: "power3.out",
          delay: index * 0.05,
        });
    });

    document.querySelectorAll("[data-gsap-float]").forEach((element, index) => {
      const tween = gsap.to(element, {
        y: index % 2 ? 13 : -13,
        rotate: index % 2 ? -1.4 : 1.4,
        duration: 3.5 + index * 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      triggers.push(() => tween.kill());
    });

    const smoothScroll = (event) => {
      const link = event.target.closest("a[href^='#'], a[href^='/#']");
      if (!link) return;
      const href = link.getAttribute("href");
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      const target = document.querySelector(hash);
      if (!target) return;
      if (href.startsWith("#") || window.location.pathname === "/") {
        event.preventDefault();
        const start = { y: window.scrollY };
        const end = Math.max(
          0,
          target.getBoundingClientRect().top + window.scrollY - 90,
        );
        gsap.to(start, {
          y: end,
          duration: 1,
          ease: "power4.inOut",
          onUpdate: () => window.scrollTo(0, start.y),
        });
        window.history.replaceState({}, "", href);
      }
    };
    document.addEventListener("click", smoothScroll);

    return () => {
      document.removeEventListener("click", smoothScroll);
      triggers.forEach((cleanup) => cleanup());
      document
        .querySelectorAll("[data-reveal]")
        .forEach((element) => gsap.killTweensOf(element));
    };
  }, [pathname, ready]);

  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js"
      strategy="afterInteractive"
      onLoad={() => setReady(true)}
    />
  );
}
