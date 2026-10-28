"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FiArrowRight, FiArrowUpRight, FiShoppingBag } from "react-icons/fi";

const steps = [
  {
    number: "01",
    title: "Pick your craving",
    text: "Browse the menu and build your table around what sounds good right now.",
    tag: "EXPLORE",
  },
  {
    number: "02",
    title: "Order your way",
    text: "Choose the option that suits you and keep your food experience simple.",
    tag: "YOUR ORDER",
  },
  {
    number: "03",
    title: "Fresh to the pass",
    text: "The kitchen gets moving, prepares your food and gets your order ready.",
    tag: "FRESH PREP",
  },
  {
    number: "04",
    title: "Dig in",
    text: "Your cravings have met their match. Now comes the best part.",
    tag: "ENJOY",
  },
];

const foodPhotos = {
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=85",
  fries:
    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=85",
  fastFood:
    "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=85",
};

export default function Process() {
  const sectionRef = useRef(null);
  const artworkRef = useRef(null);
  const ringsRef = useRef(null);
  const burgerRef = useRef(null);
  const ketchupRef = useRef(null);
  const burgerPhotoRef = useRef(null);
  const friesPhotoRef = useRef(null);
  const motionRef = useRef(null);

  // GSAP background animation.
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      // Slow orbit.
      if (ringsRef.current) {
        gsap.to(ringsRef.current, {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 48,
          repeat: -1,
          ease: "none",
        });
      }

      // Floating SVG burger.
      if (burgerRef.current) {
        gsap.to(burgerRef.current, {
          y: -13,
          rotation: 2,
          transformOrigin: "50% 50%",
          duration: 3.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Ketchup bottle doodle.
      if (ketchupRef.current) {
        gsap.to(ketchupRef.current, {
          y: 12,
          rotation: -4,
          transformOrigin: "50% 50%",
          duration: 4.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Slow photo drift.
      if (burgerPhotoRef.current) {
        gsap.to(burgerPhotoRef.current, {
          y: -9,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (friesPhotoRef.current) {
        gsap.to(friesPhotoRef.current, {
          y: 10,
          duration: 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // Pointer-responsive SVG parallax.
      if (artworkRef.current) {
        motionRef.current = {
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
      motionRef.current = null;
    };
  }, []);

  const handlePointerMove = (event) => {
    // Desktop mouse only; keep mobile touch interactions simple.
    if (
      event.pointerType !== "mouse" ||
      !motionRef.current ||
      !sectionRef.current
    ) {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    motionRef.current.x(x * 18);
    motionRef.current.y(y * 12);
  };

  const resetPointer = () => {
    motionRef.current?.x(0);
    motionRef.current?.y(0);
  };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetPointer}
      className="relative isolate overflow-hidden bg-[#211e55] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      {/* ===================================
          BACKGROUND FOOD PHOTOGRAPHY
      ==================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        {/* Burger photography */}
        <div
          ref={burgerPhotoRef}
          className="absolute -right-12 top-8 h-52 w-52 rotate-12 overflow-hidden rounded-[2rem] border border-white/15 opacity-20 shadow-2xl sm:right-8 sm:top-10 sm:h-72 sm:w-72 lg:right-20 lg:h-80 lg:w-80"
        >
          <Image
            src={foodPhotos.burger}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 288px, 208px"
            className="object-cover"
          />
        </div>

        {/* Fries photography */}
        <div
          ref={friesPhotoRef}
          className="absolute -bottom-10 -left-12 h-48 w-48 -rotate-12 overflow-hidden rounded-[2rem] border border-white/10 opacity-20 shadow-2xl sm:bottom-8 sm:left-6 sm:h-64 sm:w-64 lg:left-16 lg:h-72 lg:w-72"
        >
          <Image
            src={foodPhotos.fries}
            alt=""
            fill
            unoptimized
            sizes="(min-width: 1024px) 288px, (min-width: 640px) 256px, 192px"
            className="object-cover"
          />
        </div>

        {/* Burger / sauce food photo */}
        <div className="absolute bottom-24 right-[14%] hidden h-36 w-44 rotate-6 overflow-hidden rounded-3xl border border-white/10 opacity-[0.12] md:block lg:right-[25%] lg:h-44 lg:w-52">
          <Image
            src={foodPhotos.fastFood}
            alt=""
            fill
            unoptimized
            sizes="208px"
            className="object-cover"
          />
        </div>

        {/* Readability overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#211e55]/65 via-[#211e55]/80 to-[#211e55]/95" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(129,117,255,0.2),transparent_36%),radial-gradient(ellipse_at_8%_85%,rgba(81,70,200,0.25),transparent_34%)]" />
      </div>

      {/* ===================================
          DECORATIVE SVG ARTWORK
      ==================================== */}

      <svg
        aria-hidden="true"
        viewBox="0 0 1600 850"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full overflow-hidden"
      >
        <defs>
          <linearGradient
            id="process-line-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#d6d0ff" />
            <stop offset="100%" stopColor="#8175ff" />
          </linearGradient>

          <pattern
            id="process-dot-pattern"
            width="34"
            height="34"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="#c9c5ff" fillOpacity="0.2" />
          </pattern>
        </defs>

        <rect
          width="1600"
          height="850"
          fill="url(#process-dot-pattern)"
          opacity="0.35"
        />

        <g ref={artworkRef}>
          {/* Orbit rings */}
          <g
            ref={ringsRef}
            transform="translate(1260 180)"
            fill="none"
            stroke="url(#process-line-gradient)"
            strokeWidth="1.5"
            opacity="0.4"
          >
            <circle r="110" strokeDasharray="4 12" />
            <circle r="155" strokeDasharray="1 15" />
            <circle r="200" strokeOpacity="0.6" />
          </g>

          {/* Hand-drawn burger */}
          <g
            ref={burgerRef}
            transform="translate(1080 300)"
            fill="none"
            stroke="#d6d0ff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            opacity="0.72"
          >
            {/* Top bun */}
            <path d="M20 100 C20 40 75 12 145 12 C215 12 270 40 270 100 Z" />

            {/* Sesame seeds */}
            <path d="M75 50 l8 -5 M113 35 l8 -4 M153 35 l8 -4 M195 50 l8 -5" />

            {/* Lettuce */}
            <path d="M18 112 L45 106 L66 115 L87 106 L110 115 L133 106 L157 115 L181 106 L205 115 L230 106 L270 112" />

            {/* Patty */}
            <path d="M24 122 H266 V148 H24 Z" />

            {/* Cheese */}
            <path d="M36 150 L78 150 L100 170 L137 150 L183 150 L205 170 L242 150" />

            {/* Bottom bun */}
            <path d="M26 172 C26 197 65 210 145 210 C225 210 264 197 264 172 Z" />
          </g>

          {/* Ketchup bottle illustration */}
          <g
            ref={ketchupRef}
            transform="translate(330 430) rotate(-13)"
            fill="none"
            stroke="#ff9f9f"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.68"
          >
            <path d="M55 5 H95 V35 L111 55 V180 C111 197 98 209 81 209 H69 C52 209 39 197 39 180 V55 L55 35 Z" />

            {/* Bottle cap */}
            <path d="M48 6 H102 M56 17 H94" />

            {/* Ketchup label */}
            <rect x="50" y="84" width="50" height="53" rx="9" />

            <path d="M62 106 C65 96 82 96 86 106 C88 114 81 124 74 128 C67 124 60 114 62 106 Z" />

            {/* Bottle shine */}
            <path d="M52 63 V75 M52 151 V173" strokeWidth="3" />
          </g>

          {/* Motion trails */}
          <path
            d="M80 270 C210 205 300 235 390 285"
            fill="none"
            stroke="#c9c5ff"
            strokeWidth="2"
            strokeDasharray="5 12"
            opacity="0.25"
          />

          <path
            d="M1190 610 C1310 560 1440 590 1540 650"
            fill="none"
            stroke="#c9c5ff"
            strokeWidth="2"
            strokeDasharray="5 12"
            opacity="0.25"
          />
        </g>
      </svg>

      {/* ===================================
          CONTENT
      ==================================== */}

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div data-reveal className="max-w-3xl">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full bg-[#c9c5ff]" />

            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-indigo-100 sm:text-xs">
              How it works
            </p>
          </div>

          <h2 className="mt-7 text-4xl font-black leading-[0.98] tracking-[-0.06em] sm:text-5xl lg:text-7xl">
            From craving
            <span className="block text-[#c9c5ff]">to table.</span>
          </h2>

          <p className="mt-5 max-w-xl text-sm leading-7 text-indigo-50/75 sm:text-base sm:leading-8">
            No complicated steps. Find what you love, decide how to order and
            get ready for a proper Dastoor food moment.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.number}
              data-reveal
              className="group relative overflow-hidden rounded-[1.8rem] border border-white/[0.13] bg-[#ffffff]/[0.065] p-6 backdrop-blur-md transition-[transform,background-color,border-color,box-shadow] duration-300 hover:-translate-y-2 hover:border-white/25 hover:bg-white/[0.11] hover:shadow-[0_25px_60px_rgba(12,10,43,0.2)] sm:p-7"
            >
              {/* Card hover glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#8c80ff]/15 blur-3xl transition-opacity duration-300 group-hover:opacity-100"
              />

              <div className="relative flex items-center justify-between gap-4">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-[#c9c5ff]/65">
                  STEP {step.number}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] text-indigo-100 transition-[background-color,color,transform] duration-300 group-hover:rotate-6 group-hover:bg-[#c9c5ff] group-hover:text-[#2b2867]">
                  <FiArrowUpRight size={19} />
                </span>
              </div>

              {/* Visual step connector */}
              <div className="relative mt-7 flex items-center gap-2">
                <span className="h-1.5 w-10 rounded-full bg-[#a9a0ff] transition-all duration-300 group-hover:w-16" />

                <span className="h-1 w-1 rounded-full bg-white/35" />
                <span className="h-1 w-1 rounded-full bg-white/20" />
                <span className="h-1 w-1 rounded-full bg-white/10" />
              </div>

              <h3 className="relative mt-6 text-xl font-black tracking-[-0.035em] text-white sm:text-2xl">
                {step.title}
              </h3>

              <p className="relative mt-3 min-h-[84px] text-sm leading-7 text-indigo-50/65">
                {step.text}
              </p>

              <div className="relative mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-[9px] font-black uppercase tracking-[0.19em] text-indigo-200/65">
                  {step.tag}
                </span>

                <span className="text-lg font-black tracking-tight text-white/15 transition-colors duration-300 group-hover:text-[#c9c5ff]">
                  {step.number}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          data-reveal
          className="mt-8 flex flex-col gap-5 rounded-[1.8rem] border border-white/10 bg-white/[0.045] p-5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#c9c5ff]/10 text-[#c9c5ff]">
              <FiShoppingBag size={22} />
            </span>

            <div>
              <p className="text-sm font-black text-white sm:text-base">
                Ready for your next craving?
              </p>

              <p className="mt-1 text-xs leading-5 text-indigo-100/60 sm:text-sm">
                Explore the menu and find your next favorite.
              </p>
            </div>
          </div>

          <Link
            href="/menu"
            className="group inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-xs font-black uppercase tracking-[0.13em] text-[#2b2867] transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#c9c5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-fit"
          >
            Explore menu
            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Brand signature */}
        <div className="mt-8 flex flex-col gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-indigo-100/35 sm:flex-row sm:items-center sm:justify-between">
          <span>DASTOOR · GUJRANWALA</span>
          <span>Good food. Good tradition.</span>
        </div>
      </div>
    </section>
  );
}
