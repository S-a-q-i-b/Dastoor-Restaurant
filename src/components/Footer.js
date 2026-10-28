"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const address = "Khokherki, Sialkot Road, Gujranwala, Punjab, Pakistan";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent(address);

const whatsappUrl =
  "https://wa.me/923144672379?text=" +
  encodeURIComponent(
    "Assalam-o-Alaikum Dastoor! I'd like to know more about your menu."
  );

const links = [
  { label: "Home", href: "/" },
  { label: "Explore the menu", href: "/menu" },
  { label: "Our story", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Find us", href: "/#location" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const watermarkRef = useRef(null);
  const ringsRef = useRef(null);
  const glowRef = useRef(null);
  const motionRef = useRef(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const footer = footerRef.current;
    if (!footer) return undefined;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mediaQuery.matches;

    const ctx = gsap.context(() => {
      if (watermarkRef.current && !mediaQuery.matches) {
        motionRef.current = {
          moveX: gsap.quickTo(watermarkRef.current, "x", {
            duration: 0.7,
            ease: "power3.out",
          }),
          moveY: gsap.quickTo(watermarkRef.current, "y", {
            duration: 0.7,
            ease: "power3.out",
          }),
        };
      }

      if (mediaQuery.matches) return;

      if (ringsRef.current) {
        gsap.to(ringsRef.current, {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 48,
          repeat: -1,
          ease: "none",
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.8,
          scale: 1.12,
          transformOrigin: "50% 50%",
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, footer);

    return () => {
      ctx.revert();
      motionRef.current = null;
    };
  }, []);

  const handleMouseEnter = () => {
    if (!watermarkRef.current || reducedMotionRef.current) return;

    gsap.to(watermarkRef.current, {
      opacity: 0.23,
      scale: 1.025,
      transformOrigin: "50% 50%",
      duration: 0.55,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseMove = (event) => {
    if (
      reducedMotionRef.current ||
      !footerRef.current ||
      !motionRef.current
    ) {
      return;
    }

    const bounds = footerRef.current.getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;

    motionRef.current.moveX(x * 22);
    motionRef.current.moveY(y * 12);
  };

  const handleMouseLeave = () => {
    motionRef.current?.moveX(0);
    motionRef.current?.moveY(0);

    if (!watermarkRef.current || reducedMotionRef.current) return;

    gsap.to(watermarkRef.current, {
      opacity: 0.12,
      scale: 1,
      transformOrigin: "50% 50%",
      duration: 0.65,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <footer
      ref={footerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative isolate overflow-hidden border-t border-white/10 bg-[#201d53] text-indigo-50"
    >
      {/* Ambient SVG background */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 760"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      >
        <defs>
          <radialGradient id="footer-glow-gradient">
            <stop offset="0%" stopColor="#8478ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#5146c8" stopOpacity="0" />
          </radialGradient>
          <pattern
            id="footer-dot-pattern"
            width="32"
            height="32"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1" fill="#c9c5ff" fillOpacity="0.12" />
          </pattern>
        </defs>

        <circle
          ref={glowRef}
          cx="1250"
          cy="170"
          r="270"
          fill="url(#footer-glow-gradient)"
        />
        <rect width="1600" height="760" fill="url(#footer-dot-pattern)" />

        <g
          ref={ringsRef}
          opacity="0.32"
          fill="none"
          stroke="#b9b2ff"
          strokeWidth="1"
        >
          <circle cx="1260" cy="180" r="100" strokeDasharray="4 12" />
          <circle cx="1260" cy="180" r="145" strokeDasharray="1 15" />
          <circle cx="1260" cy="180" r="190" strokeOpacity="0.45" />
        </g>

        <path
          d="M 0 620 Q 400 540 800 650 T 1600 580"
          fill="none"
          stroke="#c9c5ff"
          strokeOpacity="0.08"
          strokeWidth="1.5"
        />
      </svg>

      {/* Responsive giant DASTOOR watermark */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 390"
        preserveAspectRatio="xMidYMid meet"
        className="pointer-events-none absolute left-0 top-8 z-0 h-auto w-full overflow-visible sm:top-6"
      >
        <defs>
          <linearGradient
            id="footer-word-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#c9c5ff" />
            <stop offset="48%" stopColor="#9188ff" />
            <stop offset="100%" stopColor="#5146c8" />
          </linearGradient>
        </defs>

        <g ref={watermarkRef} opacity="0.12">
          <text
            x="800"
            y="285"
            textAnchor="middle"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="250"
            fontWeight="900"
            letterSpacing="-10"
            textLength="1390"
            lengthAdjust="spacingAndGlyphs"
            fill="url(#footer-word-gradient)"
            stroke="#c9c5ff"
            strokeWidth="1"
            paintOrder="stroke"
          >
            DASTOOR
          </text>
        </g>
      </svg>

      {/* Footer content */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-16 lg:px-10 lg:py-20">
        {/* Brand introduction */}
        <div
          data-reveal
          className="flex flex-col gap-6 border-b border-white/10 pb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div>
              <Link
                href="/"
                aria-label="Dastoor Restaurant home"
                className="group inline-flex w-fit items-center gap-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c9c5ff]"
              >
                <Image
                  src="/dastoor-logo.svg"
                  alt="Dastoor Restaurant"
                  width={160}
                  height={52}
                  priority
                  unoptimized
                  className="h-10 w-auto shrink-0 transition-transform duration-300 group-hover:scale-[1.03] sm:h-12"
                />

                <span className="-ml-30 sm:-ml-30">
                  <span className="block text-3xl font-black tracking-[-0.06em] text-white sm:text-4xl">
                    Dastoor
                  </span>

                  <span className="mt-1 block text-[9px] font-black uppercase tracking-[0.2em] text-indigo-200/70 sm:text-[10px]">
                    Good food. Good tradition.
                  </span>
                </span>
              </Link>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-indigo-100/65">
              A casual place for bold burgers, cheesy pizzas, crispy chicken and
              memorable meals made for sharing.
            </p>
          </div>

          {/* WhatsApp CTA */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Dastoor on WhatsApp"
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.08] px-5 py-4 text-white transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-400/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-300"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300 transition-transform duration-300 group-hover:scale-105">
              <FaWhatsapp size={23} />
            </span>
            <span>
              <span className="block text-sm font-black">Let's talk food.</span>
              <span className="mt-1 block text-xs text-indigo-100/60">
                Chat with us on WhatsApp
              </span>
            </span>
            <FiArrowUpRight
              size={18}
              className="ml-2 text-emerald-200 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        {/* Footer columns */}
        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.15fr_0.7fr_1fr] lg:gap-14 lg:py-14">
          <div data-reveal>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-200/60">
              The Dastoor feeling
            </p>
            <h2 className="mt-4 max-w-sm text-2xl font-black leading-tight tracking-[-0.045em] text-white sm:text-3xl">
              Make room for something delicious.
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-7 text-indigo-100/60">
              From a quick bite to a proper family meal, discover something
              worth coming back for.
            </p>
            <Link
              href="/menu"
              className="group mt-6 inline-flex items-center gap-2 text-sm font-black text-[#c9c5ff] transition-colors duration-200 hover:text-white"
            >
              Discover our menu
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <nav data-reveal aria-label="Footer navigation">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-200/60">
              Explore
            </p>
            <div className="mt-5 grid gap-1">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex w-fit items-center gap-2 rounded-lg py-2 text-sm font-medium text-indigo-100/70 transition-colors duration-200 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9c5ff]"
                >
                  <span className="w-4 text-[10px] font-bold text-indigo-200/40 transition-colors group-hover:text-[#c9c5ff]">
                    0{index + 1}
                  </span>
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          <div data-reveal>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-indigo-200/60">
              Visit Dastoor
            </p>
            <div className="mt-5 space-y-5 text-sm leading-6 text-indigo-100/65">
              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 rounded-lg transition-colors hover:text-white"
              >
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-indigo-100 transition-colors group-hover:bg-white/10">
                  <FiMapPin size={17} />
                </span>
                <span>
                  <span className="block font-bold text-white">
                    Find our location
                  </span>
                  <span className="mt-1 block">
                    Khokherki, Sialkot Road,
                    <br />
                    Gujranwala, Punjab, Pakistan
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-[#c9c5ff]">
                    Open Google Maps
                    <FiArrowUpRight />
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-indigo-100">
                  <FiClock size={17} />
                </span>
                <span>
                  <span className="block font-bold text-white">
                    Opening hours
                  </span>
                  <span className="mt-1 block">
                    Daily · 11:00 AM – 11:00 PM
                  </span>
                  <span className="mt-1 block text-xs text-indigo-100/40">
                    Holiday timings may vary.
                  </span>
                </span>
              </div>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg transition-colors hover:text-white"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-emerald-300 transition-colors group-hover:bg-emerald-400/10">
                  <FaWhatsapp size={18} />
                </span>
                <span>
                  <span className="block font-bold text-white">WhatsApp</span>
                  <span className="mt-1 block">+92 314 4672379</span>
                </span>
                <FiArrowUpRight className="ml-auto text-indigo-200/50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom signature */}
        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-indigo-200/45">
            © {new Date().getFullYear()} Dastoor Restaurant
          </p>
          <p className="text-xs font-semibold text-indigo-100/55">
            Good food. Good tradition.
          </p>
        </div>
      </div>
    </footer>
  );
}
