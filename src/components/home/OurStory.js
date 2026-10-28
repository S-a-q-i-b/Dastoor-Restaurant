"use client";

import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { FiArrowRight, FiArrowUpRight, FiMapPin } from "react-icons/fi";

const foodImages = {
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1200&q=85",
  shawarma:
    "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=800&q=85",
  fries:
    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85",
};

const cookingVideo =
  "https://videos.pexels.com/video-files/4661944/4661944-hd_1920_1080_30fps.mp4";

export default function OurStory() {
  const sectionRef = useRef(null);
  const artworkRef = useRef(null);
  const backgroundArtRef = useRef(null);
  const ringsRef = useRef(null);
  const burgerRef = useRef(null);
  const friesRef = useRef(null);
  const pointerRef = useRef(null);

  // SVG and food-art animations. GSAP context handles cleanup on unmount.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      // Rotate the orbit decoration.
      if (ringsRef.current) {
        gsap.to(ringsRef.current, {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 55,
          repeat: -1,
          ease: "none",
        });
      }

      // Gently float the background DASTOOR lettering.
      if (backgroundArtRef.current) {
        gsap.to(backgroundArtRef.current, {
          y: -12,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Floating burger illustration.
      if (burgerRef.current) {
        gsap.to(burgerRef.current, {
          y: -12,
          rotation: 3,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Floating fries photograph.
      if (friesRef.current) {
        gsap.to(friesRef.current, {
          y: 10,
          rotation: -3,
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Mouse-reactive background typography.
      if (artworkRef.current) {
        pointerRef.current = {
          x: gsap.quickTo(artworkRef.current, "x", {
            duration: 0.8,
            ease: "power3.out",
          }),
          y: gsap.quickTo(artworkRef.current, "y", {
            duration: 0.8,
            ease: "power3.out",
          }),
        };
      }
    }, section);

    return () => {
      ctx.revert();
      pointerRef.current = null;
    };
  }, []);

  const handlePointerMove = (event) => {
    if (
      event.pointerType !== "mouse" ||
      !pointerRef.current ||
      !sectionRef.current
    ) {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pointerRef.current.x(x * 16);
    pointerRef.current.y(y * 10);
  };

  const resetPointer = () => {
    pointerRef.current?.x(0);
    pointerRef.current?.y(0);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative isolate overflow-hidden bg-[#faf9f6] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36"
    >
      {/* Ambient background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_10%_20%,rgba(81,70,200,0.07),transparent_35%),radial-gradient(ellipse_at_90%_80%,rgba(201,197,255,0.18),transparent_35%)]"
      />

      {/* Cinematic SVG background */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 1200"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      >
        <defs>
          <linearGradient id="story-ink" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5146c8" />
            <stop offset="50%" stopColor="#9188ff" />
            <stop offset="100%" stopColor="#b9b2ff" />
          </linearGradient>

          <pattern
            id="story-dots"
            width="36"
            height="36"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.5" fill="#5146c8" fillOpacity="0.15" />
          </pattern>

          <radialGradient id="story-glow">
            <stop offset="0%" stopColor="#c9c5ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#c9c5ff" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect
          width="1600"
          height="1200"
          fill="url(#story-dots)"
          opacity="0.45"
        />

        <circle cx="1300" cy="280" r="320" fill="url(#story-glow)" />

        {/* This group is moved by the mouse-parallax handler. */}
        <g ref={artworkRef}>
          {/* Giant DASTOOR watermark: declared ref + GSAP float */}
          <g ref={backgroundArtRef} opacity="0.15">
            <text
              x="800"
              y="405"
              textAnchor="middle"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="230"
              fontWeight="900"
              letterSpacing="-12"
              fill="none"
              stroke="url(#story-ink)"
              strokeWidth="2"
            >
              DASTOOR
            </text>

            <path
              d="M180 455 Q800 510 1420 455"
              fill="none"
              stroke="url(#story-ink)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="5 13"
            />
          </g>

          {/* Background decorative rings */}
          <g
            transform="translate(1320 760)"
            fill="none"
            stroke="#5146c8"
            strokeWidth="2"
            opacity="0.12"
          >
            <circle r="100" strokeDasharray="4 12" />
            <circle r="150" strokeDasharray="1 15" />
            <circle r="200" />
          </g>

          {/* Hand-drawn burger */}
          <g
            transform="translate(1120 830) rotate(-12)"
            fill="none"
            stroke="url(#story-ink)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.24"
          >
            <path d="M20 95 C20 35 75 10 145 10 C215 10 270 35 270 95 Z" />
            <path d="M65 45 l8 -5 M105 30 l8 -4 M148 30 l8 -4 M190 44 l8 -5" />
            <path d="M18 108 L45 100 L68 111 L91 101 L115 111 L139 101 L163 111 L187 101 L211 111 L270 108" />
            <path d="M25 120 H265 L255 148 H35 Z" />
            <path d="M35 151 L80 151 L100 172 L138 151 L180 151 L202 172 L245 151" />
            <path d="M36 177 C48 200 90 208 145 208 C200 208 242 200 254 177 Z" />
          </g>

          {/* Ketchup bottle */}
          <g
            transform="translate(120 700) rotate(14)"
            fill="none"
            stroke="#5146c8"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.19"
          >
            <path d="M48 10 H91 V37 L108 57 V180 C108 198 95 210 78 210 H62 C45 210 32 198 32 180 V57 L48 37 Z" />
            <path d="M43 10 H96 M49 23 H90" />
            <rect x="44" y="83" width="52" height="56" rx="9" />
            <path d="M56 105 C60 94 80 94 84 105 C86 115 72 129 70 131 C68 129 54 115 56 105 Z" />
          </g>

          {/* Fries */}
          <g
            transform="translate(290 950) rotate(-15)"
            stroke="url(#story-ink)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.2"
          >
            <path
              d="M0 35 L15 -20 L34 31 L48 -30 L64 33 L80 -8 L95 37"
              fill="none"
            />
            <path
              d="M3 32 L94 32 L78 135 Q48 155 20 135 Z"
              fill="#c9c5ff"
              fillOpacity="0.15"
            />
          </g>

          {/* Decorative trails and sparkles */}
          <path
            d="M30 250 C220 145 350 205 440 280"
            fill="none"
            stroke="#5146c8"
            strokeWidth="2"
            strokeDasharray="5 12"
            opacity="0.15"
          />
          <path
            d="M970 1080 C1150 1010 1360 1050 1550 970"
            fill="none"
            stroke="#5146c8"
            strokeWidth="2"
            strokeDasharray="5 12"
            opacity="0.16"
          />
          <g
            stroke="#5146c8"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.24"
          >
            <path d="M1450 140 V170 M1435 155 H1465" />
            <path d="M100 480 V500 M90 490 H110" />
            <path d="M850 850 V872 M839 861 H861" />
          </g>
        </g>
      </svg>

      {/* Keep all interactive/content elements above background SVG */}
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section intro */}
        <div
          data-reveal
          className="mb-12 flex flex-col gap-6 sm:mb-16 lg:mb-20 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#5146c8] sm:text-xs">
              <span className="h-px w-8 bg-[#5146c8]" />
              More than just a meal
            </p>

            <h2 className="mt-5 text-5xl font-black leading-[0.94] tracking-[-0.065em] text-[#17172f] sm:text-6xl lg:text-8xl">
              Food brings us
              <span className="block text-[#5146c8]">to the table.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-8 text-slate-500 sm:text-base">
            Familiar flavors, satisfying comfort food and a place for people to
            come together. That is the feeling behind Dastoor.
          </p>
        </div>

        {/* Main story layout */}
        <div className="grid items-start gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          {/* Food photography collage */}
          <div className="relative pb-24 sm:pb-28">
            {/* Decorative orbit */}
            <svg
              aria-hidden="true"
              viewBox="0 0 500 500"
              className="pointer-events-none absolute -right-5 -top-10 z-0 h-40 w-40 text-[#5146c8]/20 sm:-right-8 sm:h-56 sm:w-56"
              fill="none"
            >
              <g ref={ringsRef} stroke="currentColor" strokeWidth="1">
                <circle cx="250" cy="250" r="80" strokeDasharray="4 9" />
                <circle cx="250" cy="250" r="130" strokeDasharray="1 12" />
                <circle cx="250" cy="250" r="180" />
              </g>
            </svg>

            {/* Main burger photo */}
            <div className="group relative z-10 h-[350px] overflow-hidden rounded-[2rem] bg-[#eeecff] shadow-[0_30px_80px_rgba(23,23,47,0.12)] sm:h-[520px] sm:rounded-[2.5rem] lg:h-[590px]">
              <Image
                src={foodImages.burger}
                alt="A freshly prepared burger"
                fill
                unoptimized
                sizes="(min-width: 1024px) 600px, (min-width: 640px) 80vw, 100vw"
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#17172f]/75 via-transparent to-[#17172f]/10" />

              <div className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/20 px-4 py-2.5 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md sm:left-7 sm:top-7 sm:text-[10px]">
                <span className="h-2 w-2 rounded-full bg-[#c9c5ff]" />
                The Dastoor mood
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-200">
                  Good food. Good tradition.
                </p>
                <p className="mt-3 max-w-md text-3xl font-black leading-[1.02] tracking-[-0.045em] sm:text-5xl">
                  Big flavor.
                  <span className="block text-[#c9c5ff]">Easy moments.</span>
                </p>
              </div>
            </div>

            {/* Floating shawarma photo */}
            <div className="group absolute -right-2 top-24 z-20 h-36 w-28 overflow-hidden rounded-[1.35rem] border-4 border-[#faf9f6] bg-white shadow-[0_18px_45px_rgba(23,23,47,0.18)] transition-transform duration-500 hover:-translate-y-2 sm:-right-5 sm:top-28 sm:h-52 sm:w-40 sm:rounded-[1.75rem] lg:-right-6">
              <Image
                src={foodImages.shawarma}
                alt="Fresh shawarma"
                fill
                unoptimized
                sizes="160px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-3 pt-8">
                <p className="text-[9px] font-black uppercase tracking-[0.13em] text-white sm:text-[10px]">
                  Fresh bites
                </p>
              </div>
            </div>

            {/* Floating fries photo */}
            <div
              ref={friesRef}
              className="group absolute bottom-40 left-3 z-20 h-28 w-28 overflow-hidden rounded-full border-4 border-[#faf9f6] bg-white shadow-[0_18px_40px_rgba(23,23,47,0.16)] transition-shadow duration-300 hover:shadow-[0_24px_48px_rgba(23,23,47,0.22)] sm:bottom-44 sm:left-5 sm:h-40 sm:w-40"
            >
              <Image
                src={foodImages.fries}
                alt="Golden crispy fries"
                fill
                unoptimized
                sizes="160px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Custom floating SVG burger */}
            <svg
              ref={burgerRef}
              aria-hidden="true"
              viewBox="0 0 240 180"
              className="pointer-events-none absolute -right-1 bottom-14 z-20 w-32 drop-shadow-[0_18px_20px_rgba(23,23,47,0.18)] sm:right-0 sm:bottom-12 sm:w-48"
              fill="none"
              stroke="#5146c8"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M38 74 C38 30 70 16 120 16 C170 16 202 30 202 74 Z"
                fill="#f2c78e"
              />
              <path
                d="M58 43 L64 39 M93 33 L99 30 M133 31 L139 34 M166 42 L172 46"
                stroke="#8e5631"
                strokeWidth="4"
              />
              <path
                d="M32 84 L57 78 L78 86 L100 78 L123 86 L146 78 L169 86 L192 78 L208 84"
                stroke="#4e8b44"
                strokeWidth="8"
              />
              <path
                d="M35 90 H205 L198 111 H42 Z"
                fill="#65402b"
                stroke="#65402b"
              />
              <path
                d="M42 111 L79 111 L95 128 L122 111 L156 111 L174 128 L197 111"
                fill="#f6cc40"
                stroke="#d9a51a"
              />
              <path
                d="M43 133 C54 151 85 158 120 158 C155 158 186 151 197 133 Z"
                fill="#e9b46d"
                stroke="#b87c38"
              />
            </svg>

            {/* Video card */}
            <div className="absolute -bottom-4 left-1/2 z-30 w-[90%] -translate-x-1/2 overflow-hidden rounded-[1.5rem] border-4 border-[#faf9f6] bg-[#17172f] shadow-[0_24px_55px_rgba(23,23,47,0.22)] sm:-bottom-6 sm:left-auto sm:right-6 sm:w-[73%] sm:translate-x-0 sm:rounded-[2rem]">
              <div className="relative h-40 sm:h-52">
                <video
                  src={cookingVideo}
                  poster={foodImages.burger}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Food preparation video"
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-[#17172f]/75 via-[#17172f]/15 to-transparent" />

                <div className="absolute inset-y-0 left-0 flex flex-col justify-center p-4 text-white sm:p-6">
                  <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-200 sm:text-[10px]">
                    Behind the flavor
                  </p>
                  <p className="mt-2 max-w-[190px] text-lg font-black leading-tight sm:text-2xl">
                    Made for the moments that matter.
                  </p>
                </div>

                <span className="absolute bottom-3 right-3 rounded-full border border-white/20 bg-black/25 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.15em] text-white backdrop-blur-md">
                  Food in motion
                </span>
              </div>
            </div>
          </div>

          {/* Brand story */}
          <div className="relative z-10 pt-12 lg:pt-5">
            <p
              data-reveal
              className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-[#5146c8] sm:text-xs"
            >
              <span className="h-px w-8 bg-[#5146c8]" />
              Our story
            </p>

            <h3
              data-reveal
              className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.06em] text-[#17172f] sm:text-5xl lg:text-6xl"
            >
              A local table with a little extra{" "}
              <span className="text-[#5146c8]">attitude.</span>
            </h3>

            <p
              data-reveal
              className="mt-7 text-sm leading-8 text-slate-500 sm:text-base"
            >
              Dastoor is built around a simple idea: make familiar food feel
              special. Think comfort-food favorites, bold flavors and a casual
              atmosphere that makes gathering around the table feel natural.
            </p>

            <p
              data-reveal
              className="mt-4 text-sm leading-8 text-slate-500 sm:text-base"
            >
              Whether it is a burger, pizza shared with friends, crispy chicken
              or a chilled shake, the spirit stays the same: good food, good
              tradition and a little more personality on every visit.
            </p>

            {/* Category tags */}
            <div data-reveal className="mt-7 flex flex-wrap gap-2">
              {["Burgers", "Pizza", "Chicken", "Shawarma", "Shakes"].map(
                (category) => (
                  <span
                    key={category}
                    className="rounded-full border border-[#e6e2f4] bg-white px-3.5 py-2 text-[10px] font-bold text-[#5146c8] shadow-sm sm:text-xs"
                  >
                    {category}
                  </span>
                ),
              )}
            </div>

            {/* Brand highlights */}
            <div
              data-reveal
              className="mt-9 grid grid-cols-3 gap-3 border-y border-[#e8e6e1] py-6"
            >
              <div>
                <p className="text-2xl font-black tracking-[-0.05em] text-[#17172f] sm:text-3xl">
                  100+
                </p>
                <p className="mt-2 text-[9px] font-black uppercase leading-5 tracking-[0.12em] text-slate-400 sm:text-[10px]">
                  Menu choices
                </p>
              </div>

              <div>
                <p className="text-2xl font-black tracking-[-0.05em] text-[#17172f] sm:text-3xl">
                  Local
                </p>
                <p className="mt-2 text-[9px] font-black uppercase leading-5 tracking-[0.12em] text-slate-400 sm:text-[10px]">
                  Gujranwala
                </p>
              </div>

              <div>
                <p className="text-2xl font-black tracking-[-0.05em] text-[#17172f] sm:text-3xl">
                  Daily
                </p>
                <p className="mt-2 text-[9px] font-black uppercase leading-5 tracking-[0.12em] text-slate-400 sm:text-[10px]">
                  Food moments
                </p>
              </div>
            </div>

            {/* Brand statement */}
            <div
              data-reveal
              className="mt-7 flex items-start gap-4 rounded-2xl border border-[#e9e5fb] bg-[#f3f1ff] p-4 sm:p-5"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#5146c8] shadow-sm">
                <FiMapPin size={19} />
              </span>

              <div>
                <p className="text-sm font-black text-[#292653]">
                  Rooted in Gujranwala.
                </p>
                <p className="mt-1 text-xs leading-6 text-slate-500 sm:text-sm">
                  A neighborhood destination for good food and good company.
                </p>
              </div>
            </div>

            {/* CTA buttons */}
            <div data-reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/about"
                className="dastoor-btn group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#5146c8] px-6 py-4 text-sm font-black text-white shadow-[0_12px_30px_rgba(81,70,200,0.17)] hover:bg-[#4036af] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8]"
              >
                Read our full story
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/menu"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl border border-[#e8e6e1] bg-white px-6 py-4 text-sm font-black text-[#292653] transition-colors duration-300 hover:border-[#cbc6f2] hover:bg-[#f3f1ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8]"
              >
                Explore menu
                <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom brand signature */}
        <div
          data-reveal
          className="mt-16 flex flex-col gap-3 border-t border-[#e8e6e1] pt-6 sm:mt-24 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            DASTOOR · GUJRANWALA
          </p>
          <p className="text-xs font-semibold text-slate-400">
            Good food. Good tradition.
          </p>
        </div>
      </div>
    </section>
  );
}
