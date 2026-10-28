"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FiArrowDownRight,
  FiArrowRight,
  FiArrowUpRight,
  FiHeart,
  FiMapPin,
  FiPlay,
  FiStar,
} from "react-icons/fi";

// Run GSAP layout measurements before paint in the browser to avoid a pinning jump.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const foodGallery = [
  {
    title: "The burger moment",
    category: "BURGERS",
    description: "Stacked high, loaded up, and made for serious cravings.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Pizza for the table",
    category: "PIZZA",
    description: "A shareable classic with plenty of room for your favorites.",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Crunch time",
    category: "SIDES",
    description:
      "Golden fries and little extras that never stay on the side for long.",
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Something sweet",
    category: "SHAKES & DESSERTS",
    description: "A chilled, creamy finish for the end of a very good meal.",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1400&q=85",
  },
];

const values = [
  {
    number: "01",
    title: "Fresh first",
    text: "Ingredients stay simple, prep stays focused, and every order gets the attention it deserves.",
  },
  {
    number: "02",
    title: "Big flavor",
    text: "Sauces, seasoning, texture and a little attitude do the heavy lifting. Bland is not invited.",
  },
  {
    number: "03",
    title: "Made to share",
    text: "A table full of different cravings is still one good reason to sit down together.",
  },
];

const storyCards = [
  {
    number: "01",
    eyebrow: "THE CLASSIC",
    title: "The burger chapter.",
    description:
      "A proper stack, a good sauce, and absolutely no need to overthink lunch.",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1000&q=85",
    kind: "image",
  },
  {
    number: "02",
    eyebrow: "FROM THE KITCHEN",
    title: "Good food in motion.",
    description:
      "A little look at the prep, the pace and the craft behind a meal.",
    video:
      "https://videos.pexels.com/video-files/4661944/4661944-hd_1920_1080_30fps.mp4",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85",
    kind: "video",
  },
  {
    number: "03",
    eyebrow: "PASS IT AROUND",
    title: "Pizza is better together.",
    description:
      "A shared table, a few extra slices, and one more reason to stay a while.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=85",
    kind: "image",
  },
  {
    number: "04",
    eyebrow: "THE LAST SIP",
    title: "Leave room for sweet.",
    description:
      "Creamy shakes and sweet finishes for the final chapter of the meal.",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=1000&q=85",
    kind: "image",
  },
];

const kitchenVideo =
  "https://videos.pexels.com/video-files/4661944/4661944-hd_1920_1080_30fps.mp4";

export default function AboutPage() {
  const [activeFood, setActiveFood] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const rootRef = useRef(null);
  const heroArtworkRef = useRef(null);
  const heroRingRef = useRef(null);
  const galleryImageRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalViewportRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const pointerMotionRef = useRef(null);
  const storyVideoRef = useRef(null);

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    gsap.registerPlugin(ScrollTrigger);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      if (heroArtworkRef.current) {
        gsap.to(heroArtworkRef.current, {
          y: -12,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
        pointerMotionRef.current = {
          x: gsap.quickTo(heroArtworkRef.current, "x", {
            duration: 0.75,
            ease: "power3.out",
          }),
          y: gsap.quickTo(heroArtworkRef.current, "y", {
            duration: 0.75,
            ease: "power3.out",
          }),
        };
      }

      if (heroRingRef.current) {
        gsap.to(heroRingRef.current, {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 50,
          repeat: -1,
          ease: "none",
        });
      }

      // Keep horizontal scrolling native on small screens. On desktop,
      // vertical page scroll drives the rail horizontally to the left.
      mm.add("(min-width: 1024px)", () => {
        const section = horizontalSectionRef.current;
        const viewport = horizontalViewportRef.current;
        const track = horizontalTrackRef.current;
        if (!section || !viewport || !track) return;

        const distance = () =>
          Math.max(0, track.scrollWidth - viewport.clientWidth);
        if (distance() <= 0) return;

        viewport.style.overflowX = "hidden";
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: section,
            pinSpacing: true,
            scrub: true,
            invalidateOnRefresh: true,
            anticipatePin: 1,
            fastScrollEnd: true,
          },
        });

        // Measure before the browser paints, so the rail is pinned from the first frame.
        // `scrub: true` keeps the horizontal movement locked to the scroll with no 1s lag.
        ScrollTrigger.refresh();

        return () => {
          viewport.style.overflowX = "";
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    }, root);

    return () => {
      pointerMotionRef.current = null;
      mm.revert();
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (!galleryImageRef.current) return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) return;

    gsap.fromTo(
      galleryImageRef.current,
      { opacity: 0.4, scale: 1.035 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
        overwrite: true,
      },
    );
  }, [activeFood]);

  const handleHeroPointerMove = (event) => {
    if (
      event.pointerType !== "mouse" ||
      !pointerMotionRef.current ||
      !rootRef.current
    ) {
      return;
    }

    const hero = rootRef.current.querySelector("[data-about-hero]");
    if (!hero) return;
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    pointerMotionRef.current.x(x * 18);
    pointerMotionRef.current.y(y * 12);
  };

  const resetHeroPointer = () => {
    pointerMotionRef.current?.x(0);
    pointerMotionRef.current?.y(0);
  };

  const toggleKitchenVideo = async () => {
    const video = storyVideoRef.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setVideoPlaying(true);
      } catch {
        setVideoPlaying(false);
      }
    } else {
      video.pause();
      setVideoPlaying(false);
    }
  };

  return (
    <main ref={rootRef} className="overflow-x-clip bg-[#faf9f6] text-[#17172f]">
      {/* HERO — dark editorial, custom SVG and interactive watermark */}
      <section
        data-about-hero
        onPointerMove={handleHeroPointerMove}
        onPointerLeave={resetHeroPointer}
        className="relative isolate overflow-hidden bg-[#211e55] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-32"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_82%_18%,rgba(129,117,255,0.24),transparent_30%),radial-gradient(circle_at_8%_95%,rgba(81,70,200,0.28),transparent_35%)]"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 1600 700"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full"
        >
          <defs>
            <linearGradient id="about-ink" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9c5ff" />
              <stop offset="55%" stopColor="#9188ff" />
              <stop offset="100%" stopColor="#5146c8" />
            </linearGradient>
            <pattern
              id="about-dots"
              width="34"
              height="34"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1.2" fill="#c9c5ff" fillOpacity="0.17" />
            </pattern>
          </defs>
          <rect width="1600" height="700" fill="url(#about-dots)" />
          <g ref={heroArtworkRef} opacity="0.13">
            <text
              x="800"
              y="420"
              textAnchor="middle"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="245"
              fontWeight="900"
              letterSpacing="-12"
              fill="none"
              stroke="url(#about-ink)"
              strokeWidth="2"
            >
              DASTOOR
            </text>
            <path
              d="M160 470 Q800 520 1440 470"
              fill="none"
              stroke="url(#about-ink)"
              strokeWidth="3"
              strokeDasharray="5 13"
            />
            <g
              ref={heroRingRef}
              transform="translate(1290 175)"
              fill="none"
              stroke="#c9c5ff"
              strokeWidth="1.5"
            >
              <circle r="76" strokeDasharray="4 12" />
              <circle r="116" strokeDasharray="1 13" />
              <circle r="156" />
            </g>
            {/* Outline burger */}
            <g
              transform="translate(1110 390) rotate(-9)"
              fill="none"
              stroke="#c9c5ff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 65 C18 22 62 8 112 8 C162 8 206 22 206 65 Z" />
              <path d="M52 31 l8 -4 M88 23 l8 -4 M126 24 l8 4 M163 34 l8 3" />
              <path d="M12 75 L42 69 L63 77 L84 69 L106 77 L127 69 L149 77 L173 69 L212 75" />
              <path d="M20 84 H204 L194 106 H30 Z" />
              <path d="M28 111 C45 132 82 136 112 136 C142 136 179 132 196 111 Z" />
            </g>
            {/* Sauce bottle */}
            <g
              transform="translate(250 370) rotate(12)"
              fill="none"
              stroke="#ffb4b4"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M42 5 H78 V28 L91 46 V145 C91 160 81 170 66 170 H54 C39 170 29 160 29 145 V46 L42 28 Z" />
              <path d="M37 5 H83 M44 15 H76" />
              <rect x="39" y="67" width="42" height="43" rx="7" />
            </g>
          </g>
        </svg>

        <div className="relative z-10 mx-auto grid max-w-7xl items-end gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <div data-reveal>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#c9c5ff]" />
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-indigo-100 sm:text-xs">
                The Dastoor story
              </span>
            </div>

            <h1 className="mt-8 max-w-5xl text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-7xl lg:text-[6.7rem]">
              A neighborhood table.
              <span className="mt-3 block text-[#c9c5ff]">
                A whole lot of flavor.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-sm leading-8 text-indigo-50/75 sm:text-base sm:leading-8">
              Dastoor brings familiar comfort food, bold cravings and good
              company together. Come for what sounds good; stay for the moment
              around the table.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/menu"
                className="dastoor-btn group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#2b2867] transition-colors hover:bg-[#c9c5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore the menu
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href="#the-dastoor-way"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/20 bg-white/[0.04] px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Take a look around <FiArrowDownRight />
              </a>
            </div>
          </div>

          <div
            data-reveal
            className="relative rounded-[2rem] border border-white/12 bg-white/[0.06] p-6 backdrop-blur-md sm:p-8"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-[0.23em] text-indigo-200/75">
                Made for food people
              </span>
              <FiStar className="text-xl text-[#c9c5ff]" />
            </div>
            <p className="mt-9 text-3xl font-black leading-tight tracking-[-0.045em] sm:text-4xl">
              Good food tastes better{" "}
              <span className="text-[#c9c5ff]">together.</span>
            </p>
            <div className="my-7 h-px bg-white/12" />
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5146c8]">
                <FiMapPin />
              </span>
              <div>
                <p className="font-bold">Rooted in Gujranwala</p>
                <p className="mt-1 text-sm leading-6 text-indigo-100/65">
                  Khokherki · Sialkot Road
                </p>
              </div>
            </div>
            <div className="mt-5 flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <FiHeart className="text-[#c9c5ff]" />
              </span>
              <div>
                <p className="font-bold">
                  A little something for every craving
                </p>
                <p className="mt-1 text-sm leading-6 text-indigo-100/65">
                  Burgers, pizza, chicken, wraps, shakes and more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LONG-FORM STORY */}
      <section
        id="the-dastoor-way"
        className="relative overflow-hidden px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-10 h-96 w-96 rounded-full bg-[#eae7ff]/65 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-20">
          <div data-reveal className="relative">
            <div className="absolute -inset-5 rounded-[3rem] bg-[#e9e6fa]/60 blur-2xl" />
            <div className="group relative h-[390px] overflow-hidden rounded-[2rem] bg-[#2b2867] shadow-[0_35px_90px_rgba(24,24,23,0.14)] sm:h-[560px] sm:rounded-[2.5rem]">
              <video
                src={kitchenVideo}
                poster={foodGallery[0].image}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Food preparation video"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17172f]/80 via-transparent to-black/10" />
              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.19em] text-white backdrop-blur-md sm:left-7 sm:top-7">
                <span className="h-2 w-2 rounded-full bg-[#c9c5ff]" /> A little
                behind the scenes
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
                <p className="text-[10px] font-black uppercase tracking-[0.23em] text-indigo-200">
                  The rhythm of the kitchen
                </p>
                <p className="mt-3 max-w-md text-3xl font-black leading-tight tracking-[-0.045em] sm:text-4xl">
                  Every craving starts with a good idea.
                </p>
              </div>
            </div>
            <div className="relative -mt-5 ml-auto mr-4 w-[72%] overflow-hidden rounded-[1.6rem] border-4 border-[#faf9f6] bg-white shadow-xl sm:-mt-8 sm:mr-8">
              <div className="group relative h-36 overflow-hidden sm:h-44">
                <img
                  src={foodGallery[1].image}
                  alt="Pizza prepared for sharing"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#17172f]/60 to-transparent" />
                <p className="absolute bottom-4 left-4 text-sm font-black text-white sm:text-base">
                  Pass another slice.
                </p>
              </div>
            </div>
          </div>

          <div data-reveal>
            <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#5146c8] sm:text-xs">
              <span className="h-px w-8 bg-[#5146c8]" /> Our point of view
            </p>
            <h2 className="mt-5 text-4xl font-black leading-[1.01] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Familiar favorites.{" "}
              <span className="text-[#5146c8]">A fresh attitude.</span>
            </h2>
            <p className="mt-7 text-sm leading-8 text-slate-600 sm:text-base">
              Tradition does not have to stand still. For us, it means keeping
              the simple pleasure of gathering around food while giving the
              experience its own modern, casual energy.
            </p>
            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              Sometimes that means a burger with all the right textures.
              Sometimes it is a pizza in the middle of the table, crispy sides
              for sharing, or a cold shake saved for last. The details change
              with the craving; the feeling stays familiar.
            </p>
            <p className="mt-4 text-sm leading-8 text-slate-600 sm:text-base">
              Dastoor is built for regular days that deserve a little upgrade:
              quick meetups, family meals, friend catch-ups and the spontaneous
              food run that becomes the highlight of the day.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {values.map((value) => (
                <article
                  key={value.number}
                  className="group rounded-2xl border border-[#e8e5f0] bg-white/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#cbc6f2] hover:shadow-lg hover:shadow-[#5146c8]/[0.06] sm:p-5"
                >
                  <span className="text-[10px] font-black tracking-[0.18em] text-[#9188ff]">
                    {value.number}
                  </span>
                  <h3 className="mt-4 text-base font-black">{value.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-slate-500">
                    {value.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE FOOD GALLERY — hover or focus a category to swap image */}
      <section className="relative overflow-hidden bg-[#f0eefb] px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-white/70 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl">
          <div
            data-reveal
            className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#5146c8] sm:text-xs">
                <span className="h-px w-8 bg-[#5146c8]" /> A few things we love
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-7xl">
                Take a closer <span className="text-[#5146c8]">look.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-slate-600">
              Hover over a favorite — or tap it on mobile — to change the big
              picture.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:mt-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            <div className="group relative min-h-[360px] overflow-hidden rounded-[2rem] bg-[#2b2867] shadow-[0_28px_70px_rgba(43,40,103,0.15)] sm:min-h-[520px] sm:rounded-[2.5rem]">
              <img
                key={foodGallery[activeFood].image}
                ref={galleryImageRef}
                src={foodGallery[activeFood].image}
                alt={foodGallery[activeFood].title}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17172f]/85 via-[#17172f]/5 to-[#17172f]/10" />
              <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/20 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md sm:left-7 sm:top-7 sm:text-[10px]">
                {foodGallery[activeFood].category}
              </div>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-9">
                <p className="text-3xl font-black leading-tight tracking-[-0.045em] text-white sm:text-5xl">
                  {foodGallery[activeFood].title}
                </p>
                <p className="mt-3 max-w-lg text-sm leading-7 text-white/75 sm:text-base">
                  {foodGallery[activeFood].description}
                </p>
                <Link
                  href="/menu"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.15em] text-white hover:text-[#c9c5ff]"
                >
                  Find it on the menu <FiArrowUpRight />
                </Link>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {foodGallery.map((food, index) => (
                <button
                  key={food.title}
                  type="button"
                  onMouseEnter={() => setActiveFood(index)}
                  onFocus={() => setActiveFood(index)}
                  onClick={() => setActiveFood(index)}
                  aria-pressed={activeFood === index}
                  className={`group flex items-center gap-4 rounded-[1.5rem] border p-3 text-left transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5146c8] sm:p-4 lg:rounded-[1.7rem] ${activeFood === index ? "border-[#5146c8]/30 bg-white shadow-[0_14px_35px_rgba(81,70,200,0.10)]" : "border-white/80 bg-white/55 hover:border-[#d4cff5] hover:bg-white"}`}
                >
                  <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#e8e5f5] sm:h-24 sm:w-24">
                    <img
                      src={food.image}
                      alt=""
                      loading="lazy"
                      className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-110 ${activeFood === index ? "scale-105" : ""}`}
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[9px] font-black uppercase tracking-[0.18em] text-[#5146c8]">
                      {food.category}
                    </span>
                    <span className="mt-2 block text-base font-black tracking-tight text-[#17172f] sm:text-lg">
                      {food.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {food.description}
                    </span>
                  </span>
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${activeFood === index ? "bg-[#5146c8] text-white" : "bg-white text-[#5146c8] group-hover:bg-[#eeecff]"}`}
                  >
                    <FiArrowUpRight />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PINNED HORIZONTAL STORY RAIL — desktop scroll moves the cards left */}
      <section
        ref={horizontalSectionRef}
        className="relative bg-[#211e55] py-16 text-white sm:py-20 lg:flex lg:min-h-[100svh] lg:flex-col lg:justify-center lg:py-12"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 1600 700"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
        >
          <defs>
            <pattern
              id="about-rail-dots"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="2" cy="2" r="1" fill="#c9c5ff" fillOpacity="0.2" />
            </pattern>
            <radialGradient id="about-rail-glow">
              <stop offset="0%" stopColor="#7166ff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#7166ff" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="1600" height="700" fill="url(#about-rail-dots)" />
          <circle cx="1250" cy="130" r="380" fill="url(#about-rail-glow)" />
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-9 flex flex-col gap-5 md:flex-row md:items-end md:justify-between lg:mb-10">
            <div data-reveal>
              <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-indigo-200 sm:text-xs">
                <span className="h-px w-8 bg-[#c9c5ff]" /> A story in moments
              </p>
              <h2 className="mt-4 text-4xl font-black leading-[1.0] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                Keep the good stuff{" "}
                <span className="text-[#c9c5ff]">coming.</span>
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-indigo-100/65">
              On desktop, keep scrolling to travel through the story. On mobile,
              swipe the cards sideways.
            </p>
          </div>
        </div>

        <div
          ref={horizontalViewportRef}
          className="relative z-10 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-hidden"
        >
          <div
            ref={horizontalTrackRef}
            className="flex w-max gap-4 px-5 sm:gap-5 sm:px-8 lg:gap-6 lg:px-[max(2.5rem,calc((100vw-80rem)/2))]"
          >
            {storyCards.map((card) => (
              <article
                key={card.number}
                className="group relative h-[390px] w-[82vw] max-w-[390px] shrink-0 overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#302b70] sm:h-[450px] sm:w-[55vw] sm:max-w-[450px] sm:rounded-[2rem] lg:h-[430px] lg:w-[430px]"
              >
                {card.kind === "video" ? (
                  <video
                    src={card.video}
                    poster={card.image}
                    muted
                    loop
                    autoPlay
                    playsInline
                    preload="metadata"
                    aria-label="Cooking footage"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <img
                    src={card.image}
                    alt={card.title}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#17172f]/95 via-[#17172f]/15 to-black/10" />
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-white backdrop-blur-md">
                  <span>{card.number}</span>
                  <span className="h-1 w-1 rounded-full bg-[#c9c5ff]" />
                  {card.eyebrow}
                </div>
                {card.kind === "video" && (
                  <span className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-md">
                    <FiPlay />
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <h3 className="text-2xl font-black tracking-[-0.045em] text-white sm:text-3xl">
                    {card.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-7 text-white/70">
                    {card.description}
                  </p>
                  <Link
                    href="/menu"
                    className="mt-5 inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.17em] text-[#c9c5ff] transition-colors hover:text-white"
                  >
                    Explore the menu <FiArrowRight />
                  </Link>
                </div>
              </article>
            ))}
            <div className="flex h-[390px] w-[80vw] max-w-[350px] shrink-0 flex-col justify-between rounded-[1.8rem] border border-white/10 bg-white/[0.06] p-6 sm:h-[450px] sm:rounded-[2rem] sm:p-8 lg:h-[430px]">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#c9c5ff]">
                <FiHeart size={23} />
              </span>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200/70">
                  Your table is waiting
                </p>
                <h3 className="mt-4 text-3xl font-black leading-tight tracking-[-0.05em] sm:text-4xl">
                  Make it a Dastoor moment.
                </h3>
                <Link
                  href="/menu"
                  className="dastoor-btn mt-6 inline-flex items-center gap-3 rounded-xl bg-white px-5 py-3.5 text-xs font-black text-[#2b2867] hover:bg-[#c9c5ff]"
                >
                  View menu <FiArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <p className="relative z-10 mx-auto mt-5 w-full max-w-7xl px-5 text-[9px] font-bold uppercase tracking-[0.17em] text-indigo-100/40 sm:px-8 lg:px-10">
          Scroll to explore · Dastoor, Gujranwala
        </p>
      </section>

      {/* VIDEO FEATURE */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-10 lg:py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-10 rounded-[2rem] border border-[#e8e5ef] bg-white p-5 shadow-[0_25px_80px_rgba(43,40,103,0.06)] sm:rounded-[2.5rem] sm:p-8 lg:grid-cols-[1fr_0.85fr] lg:gap-14 lg:p-12">
          <div
            data-reveal
            className="relative overflow-hidden rounded-[1.7rem] bg-[#211e55]"
          >
            <div className="relative aspect-video">
              <video
                ref={storyVideoRef}
                src={kitchenVideo}
                poster={foodGallery[2].image}
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Dastoor food preparation feature"
                onPlay={() => setVideoPlaying(true)}
                onPause={() => setVideoPlaying(false)}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17172f]/65 to-transparent" />
              <button
                type="button"
                onClick={toggleKitchenVideo}
                aria-label={
                  videoPlaying ? "Pause kitchen video" : "Play kitchen video"
                }
                className="absolute bottom-4 left-4 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/25 px-4 py-3 text-xs font-black text-white backdrop-blur-md transition-colors hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:bottom-6 sm:left-6"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2b2867]">
                  {videoPlaying ? "Ⅱ" : <FiPlay className="ml-0.5" />}
                </span>
                {videoPlaying ? "Pause the moment" : "Play the moment"}
              </button>
            </div>
          </div>
          <div data-reveal>
            <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-[#5146c8] sm:text-xs">
              <span className="h-px w-8 bg-[#5146c8]" /> A closer look
            </p>
            <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.055em] sm:text-5xl">
              The little details make the{" "}
              <span className="text-[#5146c8]">difference.</span>
            </h2>
            <p className="mt-6 text-sm leading-8 text-slate-600 sm:text-base">
              A good food experience is a mix of flavors, textures, timing and
              the people you share it with. The kitchen video gives a small
              glimpse of food preparation; the real story happens at your table.
            </p>
            <Link
              href="/menu"
              className="dastoor-btn group mt-7 inline-flex items-center gap-3 rounded-2xl bg-[#5146c8] px-6 py-4 text-sm font-black text-white transition-colors hover:bg-[#4036af]"
            >
              Find your favorite{" "}
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROMISE */}
      <section className="relative overflow-hidden bg-[#f0eefb] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <svg
          aria-hidden="true"
          viewBox="0 0 1600 400"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute left-0 top-0 h-auto w-full opacity-[0.07]"
        >
          <text
            x="800"
            y="225"
            textAnchor="middle"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="205"
            fontWeight="900"
            letterSpacing="-10"
            fill="none"
            stroke="#5146c8"
            strokeWidth="2"
          >
            GOOD TRADITION
          </text>
        </svg>
        <div className="relative mx-auto max-w-7xl">
          <div data-reveal className="max-w-3xl">
            <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#5146c8] sm:text-xs">
              <span className="h-px w-8 bg-[#5146c8]" /> What matters to us
            </p>
            <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
              Come for the food.{" "}
              <span className="block text-[#5146c8]">
                Stay for the feeling.
              </span>
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {values.map((value) => (
              <article
                key={value.number}
                data-reveal
                className="group rounded-[1.8rem] border border-white bg-white/80 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#cbc6f2] hover:shadow-xl hover:shadow-[#5146c8]/[0.06] sm:p-8"
              >
                <span className="text-5xl font-black tracking-[-0.08em] text-[#d8d3ff] transition-colors duration-300 group-hover:text-[#5146c8]">
                  {value.number}
                </span>
                <h3 className="mt-7 text-2xl font-black tracking-[-0.04em]">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {value.text}
                </p>
                <div className="mt-7 h-1 w-10 rounded-full bg-[#d8d3ff] transition-all duration-300 group-hover:w-16 group-hover:bg-[#5146c8]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
        <div
          data-reveal
          className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#211e55] px-6 py-12 text-white sm:rounded-[2.5rem] sm:px-10 sm:py-16 lg:px-16 lg:py-20"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-28 -z-10 h-80 w-80 rounded-full bg-[#7166ff]/25 blur-[80px]"
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 900 300"
            className="pointer-events-none absolute right-0 top-0 -z-10 h-full max-w-[65%] opacity-[0.12]"
          >
            <text
              x="450"
              y="180"
              textAnchor="middle"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="145"
              fontWeight="900"
              letterSpacing="-8"
              fill="none"
              stroke="#c9c5ff"
              strokeWidth="2"
            >
              EAT WELL
            </text>
          </svg>
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.24em] text-indigo-200 sm:text-xs">
                Your next chapter starts here
              </p>
              <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.06em] sm:text-5xl lg:text-6xl">
                Ready to make it a Dastoor day?
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-7 text-indigo-100/70 sm:text-base">
                Browse the menu, find your craving and bring good food to the
                table.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link
                href="/menu"
                className="dastoor-btn group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#2b2867] transition-colors hover:bg-[#c9c5ff]"
              >
                Explore menu{" "}
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/[0.05] px-6 py-4 text-sm font-black text-white transition-colors hover:bg-white/10"
              >
                Get in touch <FiArrowUpRight />
              </Link>
            </div>
          </div>
          <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-indigo-100/45 sm:flex-row sm:items-center sm:justify-between">
            <span>DASTOOR · GUJRANWALA</span>
            <span>Good food. Good tradition.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
