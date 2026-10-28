"use client";

import VideoModal from "@/components/VideoModal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowRight, FiMapPin, FiPlay, FiStar } from "react-icons/fi";

const floatingFood = [
  {
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=85",
    label: "Signature Burger",
    position: "left-[1%] top-[13%] -rotate-12",
  },
  {
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=85",
    label: "Loaded Pizza",
    position: "right-[2%] top-[9%] rotate-12",
  },
  {
    image:
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=85",
    label: "Crispy Fries",
    position: "left-[3%] bottom-[16%] rotate-12",
  },
  {
    image:
      "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=400&q=85",
    label: "Fresh Shawarma",
    position: "right-[1%] bottom-[17%] -rotate-12",
  },
];

const stats = [
  { value: "4.9", label: "Customer love", icon: "star" },
  { value: "30 min", label: "Average delivery" },
  { value: "100%", label: "Fresh ingredients" },
];

export default function Hero() {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <>
      <section
        id="home"
        className="hero-shell relative isolate overflow-hidden bg-[#2b2867] text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 12%, rgba(255,255,255,0.16), transparent 25%), radial-gradient(circle at 15% 88%, rgba(124,107,255,0.26), transparent 30%)",
          }}
        />

        <div
          aria-hidden="true"
          className="soft-grid pointer-events-none absolute inset-0 opacity-30"
        />

        <div className="mx-auto grid min-h-[calc(100svh-78px)] max-w-7xl items-center gap-5 px-5 py-12 sm:gap-8 sm:px-8 sm:py-16 lg:grid-cols-[1.03fr_0.97fr] lg:gap-4 lg:px-10 lg:py-20">
          <div className="relative z-10" data-page-intro>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100 backdrop-blur-md sm:text-xs">
              <FiMapPin className="shrink-0 text-[#c9c5ff]" />
              Khokherki · Gujranwala
            </div>

            <p className="mt-7 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200 sm:mt-9 sm:text-xs">
              Dastoor Restaurant
            </p>

            {/* Hero headline */}
            <h1 className="mt-4 max-w-4xl text-[3.35rem] font-black leading-[0.91] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-[6.2rem] xl:text-[6.8rem]">
              Good food.
              <span className="mt-2 block text-[#c9c5ff]">Good tradition.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-indigo-50/75 sm:mt-7 sm:text-base sm:leading-8">
              Loaded burgers, bubbling pizza, crispy chicken, creamy pasta and
              chilled shakes — Dastoor is built for the cravings that deserve a
              proper table.
            </p>

            {/* Action buttons */}
            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <Link
                href="/menu"
                className="dastoor-btn group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#2b2867] shadow-[0_18px_40px_rgba(13,10,53,0.28)] transition duration-300 hover:-translate-y-1 hover:bg-[#c9c5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore the menu
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={() => setVideoOpen(true)}
                className="dastoor-btn group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.07] px-6 py-4 text-sm font-black text-white backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:bg-white/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 transition-transform duration-300 group-hover:scale-110">
                  <FiPlay className="ml-0.5" />
                </span>
                How it works
              </button>
            </div>

            {/* Quick stats */}
            <div className="mt-9 grid max-w-2xl grid-cols-2 gap-3 sm:mt-11 sm:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur-md transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.1]"
                  data-reveal
                >
                  <div className="flex items-center gap-2 text-xl font-black tracking-tight sm:text-2xl">
                    {stat.icon === "star" && (
                      <FiStar
                        aria-hidden="true"
                        className="fill-[#c9c5ff] text-[#c9c5ff]"
                      />
                    )}

                    {stat.value}
                  </div>

                  <p className="mt-1.5 text-[9px] font-bold uppercase leading-5 tracking-[0.12em] text-indigo-200/70 sm:text-[10px]">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Floating food composition
              Ab mobile par bhi visible hai. */}
          <div
            className="relative mx-auto mt-4 h-[390px] w-full max-w-[440px] sm:mt-2 sm:h-[510px] sm:max-w-[540px] lg:mt-0 lg:h-[620px] lg:max-w-[620px]"
            aria-hidden="true"
          >
            {/* Outer orbit */}
            <div className="absolute left-1/2 top-1/2 h-[285px] w-[285px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-[410px] sm:w-[410px] lg:h-[520px] lg:w-[520px]" />

            {/* Inner orbit */}
            <div className="absolute left-1/2 top-1/2 h-[238px] w-[238px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] shadow-[0_0_100px_rgba(124,107,255,0.2)] sm:h-[330px] sm:w-[330px] lg:h-[410px] lg:w-[410px]" />

            {/* Main burger */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div
                data-gsap-float
                className="flex h-[225px] w-[225px] items-center justify-center rounded-full border border-white/30 bg-[#eeecff] shadow-[0_35px_80px_rgba(13,10,53,0.35)] sm:h-[275px] sm:w-[275px] lg:h-[340px] lg:w-[340px]"
              >
                <div className="relative h-[78%] w-[78%] overflow-hidden rounded-full shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=85"
                    alt="Signature burger"
                    fill
                    priority
                    unoptimized
                    sizes="(min-width: 1024px) 265px, (min-width: 640px) 215px, 175px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Floating food cards */}
            {floatingFood.map((food) => (
              <div
                key={food.label}
                className={`absolute z-20 ${food.position}`}
              >
                <div
                  data-gsap-float
                  className="relative h-[76px] w-[76px] overflow-hidden rounded-[1.25rem] border-[3px] border-[#eeecff] bg-white shadow-[0_15px_35px_rgba(13,10,53,0.3)] transition duration-300 hover:scale-110 sm:h-28 sm:w-28 sm:rounded-[1.6rem] sm:border-4 lg:h-32 lg:w-32"
                >
                  <Image
                    src={food.image}
                    alt={food.label}
                    fill
                    unoptimized
                    loading="lazy"
                    sizes="(min-width: 1024px) 128px, (min-width: 640px) 112px, 76px"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}

            {/* Floating caption */}
            <div
              className="absolute bottom-1 left-1/2 z-30 w-[210px] -translate-x-1/2 rounded-2xl border border-white/15 bg-[#201d53]/90 p-4 text-center shadow-2xl backdrop-blur-xl sm:bottom-5 sm:w-[240px]"
              data-reveal
            >
              <p className="text-[9px] font-black uppercase tracking-[0.2em] text-indigo-200/70">
                Tonight at Dastoor
              </p>

              <p className="mt-1.5 text-sm font-black text-white sm:text-base">
                Fresh off the grill.
              </p>
            </div>
          </div>
        </div>
      </section>

      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
    </>
  );
}
