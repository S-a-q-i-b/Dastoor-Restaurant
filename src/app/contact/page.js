"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiClock,
  FiMail,
  FiMapPin,
  FiMessageCircle,
  FiSend,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const ADDRESS = "Khokherki, Sialkot Road, Gujranwala, Punjab, Pakistan";
const PHONE_DISPLAY = "+92 314 4672379";
const WHATSAPP_NUMBER = "923144672379";
const MAP_QUERY = encodeURIComponent(ADDRESS);
const DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAP_QUERY}`;
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
const BASE_WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export default function ContactPage() {
  const heroRef = useRef(null);
  const watermarkRef = useRef(null);
  const orbitRef = useRef(null);
  const glowRef = useRef(null);
  const pointerRef = useRef(null);
  const [messageLink, setMessageLink] = useState("");

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      if (orbitRef.current) {
        gsap.to(orbitRef.current, {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 52,
          repeat: -1,
          ease: "none",
        });
      }

      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.85,
          scale: 1.12,
          transformOrigin: "50% 50%",
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (watermarkRef.current) {
        gsap.to(watermarkRef.current, {
          y: -8,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        pointerRef.current = {
          x: gsap.quickTo(watermarkRef.current, "x", {
            duration: 0.7,
            ease: "power3.out",
          }),
          y: gsap.quickTo(watermarkRef.current, "y", {
            duration: 0.7,
            ease: "power3.out",
          }),
        };
      }
    }, hero);

    return () => {
      ctx.revert();
      pointerRef.current = null;
    };
  }, []);

  const handleHeroPointerMove = (event) => {
    if (
      event.pointerType !== "mouse" ||
      !pointerRef.current ||
      !heroRef.current
    ) {
      return;
    }

    const rect = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pointerRef.current.x(x * 18);
    pointerRef.current.y(y * 10);
  };

  const handleHeroPointerLeave = () => {
    pointerRef.current?.x(0);
    pointerRef.current?.y(0);

    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        opacity: 0.12,
        scale: 1,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleHeroPointerEnter = () => {
    if (watermarkRef.current) {
      gsap.to(watermarkRef.current, {
        opacity: 0.19,
        scale: 1.015,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    const text = [
      "Assalam-o-Alaikum Dastoor! I'd like to get in touch.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      "",
      "Message:",
      message,
    ].join("\n");

    setMessageLink(`${BASE_WHATSAPP_URL}?text=${encodeURIComponent(text)}`);
  };

  return (
    <main className="overflow-hidden bg-[#f6f5fb] text-[#17172f]">
      {/* HERO */}
      <section
        ref={heroRef}
        onPointerMove={handleHeroPointerMove}
        onPointerEnter={handleHeroPointerEnter}
        onPointerLeave={handleHeroPointerLeave}
        className="relative isolate overflow-hidden bg-[#25215d] px-5 py-20 text-white sm:px-8 sm:py-24 lg:px-10 lg:py-28"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_80%_12%,rgba(145,136,255,0.24),transparent_33%),radial-gradient(ellipse_at_8%_90%,rgba(81,70,200,0.35),transparent_36%)]"
        />

        <div
          ref={glowRef}
          aria-hidden="true"
          className="pointer-events-none absolute -right-28 top-10 -z-10 h-72 w-72 rounded-full bg-[#8175ff]/20 blur-[90px] sm:h-96 sm:w-96"
        />

        {/* Oversized animated DASTOOR SVG watermark */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 280"
          preserveAspectRatio="xMidYMid meet"
          className="pointer-events-none absolute left-0 top-10 -z-10 h-auto w-full overflow-visible sm:top-14"
        >
          <defs>
            <linearGradient
              id="contact-watermark-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#c9c5ff" />
              <stop offset="55%" stopColor="#9188ff" />
              <stop offset="100%" stopColor="#5146c8" />
            </linearGradient>
          </defs>

          <g ref={watermarkRef} opacity="0.12">
            <text
              x="600"
              y="205"
              textAnchor="middle"
              fontFamily="Arial, Helvetica, sans-serif"
              fontSize="190"
              fontWeight="900"
              letterSpacing="-9"
              fill="none"
              stroke="url(#contact-watermark-gradient)"
              strokeWidth="1.8"
            >
              DASTOOR
            </text>
          </g>
        </svg>

        {/* Decorative orbit illustration */}
        <svg
          aria-hidden="true"
          viewBox="0 0 560 560"
          className="pointer-events-none absolute -right-24 top-8 -z-10 h-72 w-72 opacity-50 sm:-right-16 sm:h-[440px] sm:w-[440px] lg:right-8 lg:top-12 lg:h-[500px] lg:w-[500px]"
          fill="none"
        >
          <g ref={orbitRef} stroke="#c9c5ff" strokeWidth="1.2">
            <circle cx="280" cy="280" r="105" strokeDasharray="5 13" />
            <circle
              cx="280"
              cy="280"
              r="155"
              strokeDasharray="1 15"
              opacity="0.65"
            />
            <circle cx="280" cy="280" r="215" opacity="0.45" />
          </g>
          <path
            d="M280 42 V72 M265 57 H295"
            stroke="#c9c5ff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M474 280 H504 M489 265 V295"
            stroke="#c9c5ff"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="280" cy="280" r="5" fill="#c9c5ff" />
        </svg>

        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          <div data-page-intro>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#c9c5ff]" />
              <span className="text-[10px] font-black uppercase tracking-[0.24em] text-indigo-100 sm:text-xs">
                Contact Dastoor
              </span>
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.94] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
              Got a question?
              <span className="mt-2 block text-[#c9c5ff]">
                Let&apos;s talk.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-indigo-50/75 sm:text-base">
              Table questions, feedback, collaborations or a very serious burger
              emergency. Send us a message and let&apos;s make it easy.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href={`${BASE_WHATSAPP_URL}?text=${encodeURIComponent("Assalam-o-Alaikum Dastoor! I have a question.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#2b2867] transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-[#eeecff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <FaWhatsapp size={19} />
                Chat on WhatsApp
                <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/20 bg-white/[0.06] px-6 py-4 text-sm font-black text-white backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <FiMapPin size={18} />
                Find our place
                <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-indigo-100/65">
              <span className="inline-flex items-center gap-2">
                <FiMapPin className="text-[#c9c5ff]" /> Gujranwala, Pakistan
              </span>
              <span className="hidden h-1 w-1 rounded-full bg-white/30 sm:inline-block" />
              <span className="inline-flex items-center gap-2">
                <FiMessageCircle className="text-[#c9c5ff]" /> We&apos;re happy
                to help
              </span>
            </div>
          </div>

          {/* Contact hero visual */}
          <div className="relative mx-auto w-full max-w-[500px]" data-reveal>
            <div className="absolute -inset-5 rounded-[3rem] bg-[#8175ff]/15 blur-3xl" />

            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/15 bg-white/[0.07] p-3 shadow-[0_35px_100px_rgba(8,7,34,0.35)] backdrop-blur-sm sm:rounded-[2.75rem] sm:p-4">
              <div className="relative h-[280px] overflow-hidden rounded-[1.65rem] sm:h-[390px] sm:rounded-[2rem]">
                <Image
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1100&q=85"
                  alt="A freshly prepared burger at Dastoor"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 460px, (min-width: 640px) 500px, 90vw"
                  className="object-cover transition-transform duration-1000 hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#17172f]/90 via-[#17172f]/10 to-[#17172f]/10" />

                <div className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/20 px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md sm:left-6 sm:top-6 sm:text-[10px]">
                  Good food. Good tradition.
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-200">
                    Your local food spot
                  </p>
                  <h2 className="mt-2 max-w-sm text-3xl font-black leading-tight tracking-[-0.045em] sm:text-4xl">
                    Big cravings deserve a proper answer.
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-[1fr_auto] items-center gap-3 px-2 pb-2 pt-4 sm:px-3 sm:pb-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#c9c5ff]/15 text-[#c9c5ff]">
                    <FiMapPin size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-black text-white">
                      Khokherki, Gujranwala
                    </p>
                    <p className="mt-1 text-xs text-indigo-100/55">
                      Sialkot Road, Punjab
                    </p>
                  </div>
                </div>
                <a
                  href={DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open Dastoor directions in Google Maps"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                >
                  <FiArrowUpRight size={19} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PAGE BODY */}
      <section className="relative bg-[#f6f5fb] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-20 h-72 w-72 rounded-full bg-[#dedaff]/35 blur-[100px]"
        />

        <div className="relative mx-auto grid max-w-7xl items-start gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:gap-9">
          {/* Contact cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={`${BASE_WHATSAPP_URL}?text=${encodeURIComponent("Assalam-o-Alaikum Dastoor! I would like to get in touch.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-[1.8rem] border border-emerald-100 bg-white p-6 shadow-[0_12px_35px_rgba(23,23,47,0.035)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-[0_22px_55px_rgba(23,23,47,0.07)] sm:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-colors group-hover:bg-emerald-100">
                <FaWhatsapp size={23} />
              </span>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.17em] text-slate-400">
                WhatsApp / Contact
              </p>
              <p className="mt-2 text-lg font-black text-[#17172f]">
                {PHONE_DISPLAY}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Chat with us about the menu, an order or a question.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-black text-emerald-700">
                Start a conversation <FiArrowUpRight />
              </span>
            </a>

            <a
              href="mailto:hello@dastoor.pk"
              className="group rounded-[1.8rem] border border-[#e8e3ff] bg-white p-6 shadow-[0_12px_35px_rgba(23,23,47,0.035)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#cbc6f2] hover:shadow-[0_22px_55px_rgba(23,23,47,0.07)] sm:p-7"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f0eeff] text-[#5146c8] transition-colors group-hover:bg-[#e4e0ff]">
                <FiMail size={21} />
              </span>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.17em] text-slate-400">
                Email
              </p>
              <p className="mt-2 break-all text-lg font-black text-[#17172f]">
                hello@dastoor.pk
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                For feedback, partnerships and other enquiries.
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-black text-[#5146c8]">
                Write an email <FiArrowUpRight />
              </span>
            </a>

            <div className="rounded-[1.8rem] border border-[#e8e6e1] bg-[#fffefa] p-6 sm:col-span-2 sm:p-7 lg:col-span-1">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f3f0e7] text-[#5146c8]">
                <FiClock size={21} />
              </span>
              <p className="mt-6 text-[10px] font-black uppercase tracking-[0.17em] text-slate-400">
                Opening hours
              </p>
              <p className="mt-2 text-lg font-black text-[#17172f]">
                Daily · 11 AM – 11 PM
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Hours may vary on public holidays; please confirm before
                visiting.
              </p>
            </div>
          </div>

          {/* Message form */}
          <div
            data-reveal
            className="relative overflow-hidden rounded-[2rem] border border-white bg-white p-6 shadow-[0_25px_75px_rgba(43,40,103,0.075)] sm:p-9 lg:p-10"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#eeecff] blur-3xl"
            />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#5146c8] sm:text-xs">
                  Say hello
                </p>
                <h2 className="mt-3 text-3xl font-black tracking-[-0.055em] text-[#17172f] sm:text-4xl">
                  Tell us what&apos;s up.
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-slate-500">
                  Fill in the details and we&apos;ll prepare a message you can
                  send directly to Dastoor on WhatsApp.
                </p>
              </div>
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f0eeff] text-[#5146c8] sm:flex">
                <FiSend size={21} />
              </span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="relative mt-8 grid gap-5 sm:grid-cols-2"
            >
              <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                Your name
                <input
                  required
                  name="name"
                  autoComplete="name"
                  maxLength={100}
                  placeholder="What should we call you?"
                  className="min-w-0 rounded-2xl border border-[#e8e6e1] bg-[#fcfbff] px-4 py-4 text-sm font-semibold normal-case tracking-normal text-[#17172f] outline-none transition-colors placeholder:font-medium placeholder:text-slate-400 focus:border-[#8f86e8] focus:bg-white focus:ring-4 focus:ring-[#5146c8]/[0.07]"
                />
              </label>

              <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                Email address
                <input
                  required
                  type="email"
                  name="email"
                  autoComplete="email"
                  maxLength={160}
                  placeholder="you@example.com"
                  className="min-w-0 rounded-2xl border border-[#e8e6e1] bg-[#fcfbff] px-4 py-4 text-sm font-semibold normal-case tracking-normal text-[#17172f] outline-none transition-colors placeholder:font-medium placeholder:text-slate-400 focus:border-[#8f86e8] focus:bg-white focus:ring-4 focus:ring-[#5146c8]/[0.07]"
                />
              </label>

              <label className="grid gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 sm:col-span-2">
                Your message
                <textarea
                  required
                  name="message"
                  rows={5}
                  maxLength={3000}
                  placeholder="How can we help? Tell us a little about it..."
                  className="min-w-0 resize-y rounded-2xl border border-[#e8e6e1] bg-[#fcfbff] px-4 py-4 text-sm font-semibold normal-case leading-7 tracking-normal text-[#17172f] outline-none transition-colors placeholder:font-medium placeholder:text-slate-400 focus:border-[#8f86e8] focus:bg-white focus:ring-4 focus:ring-[#5146c8]/[0.07]"
                />
              </label>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#5146c8] px-6 py-4 text-xs font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_28px_rgba(81,70,200,0.18)] transition-[transform,background-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#4036af] hover:shadow-[0_16px_32px_rgba(81,70,200,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8] active:scale-[0.99]"
                >
                  Prepare WhatsApp message
                  <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="mt-3 text-xs leading-6 text-slate-400">
                  This form does not send or store your details. It prepares a
                  WhatsApp message for you to review and send.
                </p>

                {messageLink && (
                  <div
                    className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4"
                    role="status"
                  >
                    <p className="text-sm font-black text-emerald-900">
                      Your message is ready.
                    </p>
                    <p className="mt-1 text-xs leading-5 text-emerald-800/80">
                      Open WhatsApp to review the message, then tap Send to
                      contact Dastoor.
                    </p>
                    <a
                      href={messageLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-xs font-black text-white transition-colors hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                    >
                      <FaWhatsapp size={17} />
                      Open WhatsApp <FiArrowUpRight />
                    </a>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="relative overflow-hidden bg-[#eeecff] px-5 py-14 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-20 top-8 h-72 w-72 rounded-full bg-white/60 blur-[90px]"
        />

        <div className="relative mx-auto max-w-7xl">
          <div
            className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
            data-reveal
          >
            <div>
              <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-[#5146c8] sm:text-xs">
                <span className="h-px w-8 bg-[#5146c8]" />
                Come find us
              </p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-[#17172f] sm:text-5xl">
                Your table is around here.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
                Visit Dastoor in Khokherki on Sialkot Road, Gujranwala.
              </p>
            </div>

            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-3 rounded-2xl bg-[#201d53] px-5 py-4 text-xs font-black uppercase tracking-[0.12em] text-white transition-[transform,background-color] duration-300 hover:-translate-y-0.5 hover:bg-[#4036af] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8]"
            >
              <FiMapPin size={17} />
              Get directions
              <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>

          <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
            <div
              className="flex flex-col justify-between rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_15px_45px_rgba(43,40,103,0.05)] backdrop-blur-sm sm:p-8"
              data-reveal
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#eeecff] text-[#5146c8]">
                  <FiMapPin size={22} />
                </span>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.17em] text-[#5146c8]">
                  Dastoor Restaurant
                </p>
                <address className="mt-3 not-italic text-lg font-black leading-7 text-[#17172f] sm:text-xl">
                  Khokherki, Sialkot Road,
                  <br />
                  Gujranwala, Punjab,
                  <br />
                  Pakistan
                </address>
              </div>

              <div className="mt-8 border-t border-[#eeedf4] pt-5">
                <p className="text-xs leading-6 text-slate-500">
                  Need help finding the restaurant?
                </p>
                <a
                  href={`${BASE_WHATSAPP_URL}?text=${encodeURIComponent("Assalam-o-Alaikum Dastoor! Can you help me find your restaurant?")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-sm font-black text-[#5146c8] transition-colors hover:text-[#2b2867]"
                >
                  Message us <FiArrowRight />
                </a>
              </div>
            </div>

            <div
              className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-white/80 bg-[#ddd9f7] shadow-[0_25px_70px_rgba(43,40,103,0.08)] sm:min-h-[460px]"
              data-reveal
            >
              <iframe
                title="Map showing the Dastoor Restaurant area in Khokherki, Gujranwala"
                src={MAP_EMBED_URL}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />

              <div className="pointer-events-none absolute left-4 top-4 flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md sm:left-6 sm:top-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#5146c8] text-white">
                  <FiMapPin size={19} />
                </span>
                <div>
                  <p className="text-xs font-black text-[#17172f]">
                    Dastoor · Gujranwala
                  </p>
                  <p className="mt-1 text-[10px] text-slate-500">
                    Khokherki, Sialkot Road
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[#d8d3f1] pt-5 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>Dastoor · Gujranwala</span>
            <Link
              href="/menu"
              className="group inline-flex w-fit items-center gap-2 text-[#5146c8] transition-colors hover:text-[#2b2867]"
            >
              Still hungry? Explore the menu
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
