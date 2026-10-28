"use client";

import { useCart } from "@/components/cart/CartProvider";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiClock,
  FiMapPin,
  FiMenu,
  FiShoppingBag,
  FiX,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const links = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const whatsappUrl =
  "https://wa.me/923144672379?text=" +
  encodeURIComponent(
    "Assalam-o-Alaikum Dastoor! I'd like to explore your menu and place an order."
  );

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const { itemCount } = useCart();
  const pathname = usePathname();

  const closeMenu = () => setOpen(false);

  // Close mobile navigation after a route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lightweight scroll progress indicator.
  useEffect(() => {
    let frame = null;

    const updateProgress = () => {
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      const progress =
        documentHeight > 0
          ? window.scrollY / documentHeight
          : 0;

      setScrollProgress(Math.min(1, Math.max(0, progress)));
      frame = null;
    };

    const handleScroll = () => {
      if (frame !== null) return;

      frame = window.requestAnimationFrame(updateProgress);
    };

    updateProgress();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
    };
  }, []);

  const isActive = (href) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const cartCount = itemCount > 99 ? "99+" : itemCount;

  return (
    <header className="sticky top-0 z-50 border-b border-[#e9e7f2]/90 bg-white/90 shadow-[0_6px_30px_rgba(23,23,47,0.045)] backdrop-blur-2xl">

      {/* Premium scroll progress */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-[#eeecff]"
      >
        <div
          className="h-full origin-left bg-gradient-to-r from-[#5146c8] via-[#9188ff] to-[#34d399]"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      {/* Main navigation */}
      <div className="mx-auto flex min-h-[72px] max-w-7xl items-center justify-between gap-3 px-4 sm:min-h-[78px] sm:px-6 lg:px-8">

        {/* Brand */}
        <Link
          href="/"
          onClick={closeMenu}
          aria-label="Dastoor home"
          className="group relative z-10 shrink-0 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8]"
        >
          <Image
            src="/dastoor-logo.svg"
            alt="Dastoor Restaurant"
            width={160}
            height={52}
            priority
            unoptimized
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-[1.03] sm:h-12"
          />
        </Link>

        {/* Desktop navigation */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-1 rounded-2xl border border-[#efedf7] bg-[#faf9ff]/80 p-1 lg:flex"
        >
          {links.map((link) => {
            const active = isActive(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link rounded-xl px-3.5 py-2.5 text-xs font-bold transition-colors duration-200 xl:px-4 xl:text-sm ${
                  active
                    ? "bg-[#eeecff] text-[#5146c8]"
                    : "text-slate-600 hover:bg-white hover:text-[#5146c8]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">

          {/* Location badge */}
          <div className="hidden items-center gap-2.5 rounded-2xl border border-[#e9e7e2] bg-[#faf9f6] px-3.5 py-2.5 xl:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#eeecff] text-[#5146c8]">
              <FiMapPin size={17} />
            </span>

            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.15em] text-[#5146c8]">
                Find us in
              </p>

              <p className="mt-1 text-xs font-bold text-[#292653]">
                Gujranwala
              </p>
            </div>
          </div>

          {/* Desktop WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Dastoor on WhatsApp"
            className="group hidden items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-xs font-black text-emerald-800 transition-[transform,background-color,border-color] duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:inline-flex"
          >
            <FaWhatsapp
              size={18}
              className="transition-transform duration-200 group-hover:rotate-[-10deg] group-hover:scale-110"
            />

            <span>WhatsApp</span>

            <FiArrowUpRight
              size={14}
              className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>

          {/* Mobile WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact Dastoor on WhatsApp"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 transition-colors duration-200 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 sm:hidden"
          >
            <FaWhatsapp size={20} />
          </a>

          {/* Desktop order CTA */}
          <Link
            href="/order"
            onClick={closeMenu}
            className="dastoor-btn group hidden items-center gap-2 rounded-2xl bg-[#5146c8] px-4 py-3 text-xs font-black text-white shadow-[0_8px_24px_rgba(81,70,200,0.2)] hover:bg-[#4036af] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5146c8] sm:inline-flex"
          >
            <FiShoppingBag
              size={16}
              className="transition-transform duration-200 group-hover:-rotate-6"
            />

            Order

            <span
              className={`flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] ${
                itemCount > 0
                  ? "bg-white text-[#5146c8]"
                  : "bg-white/20 text-white"
              }`}
            >
              {cartCount}
            </span>
          </Link>

          {/* Mobile cart */}
          <Link
            href="/order"
            onClick={closeMenu}
            aria-label={`Open order, ${itemCount} items in cart`}
            className="group relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#e9e7e2] bg-white text-slate-700 transition-colors duration-200 hover:border-[#cbc6f2] hover:bg-[#eeecff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5146c8] sm:hidden"
          >
            <FiShoppingBag
              size={19}
              className="transition-transform duration-200 group-hover:-rotate-6"
            />

            <span
              key={itemCount}
              className="absolute -right-1.5 -top-1.5 flex min-h-5 min-w-5 animate-[cart-pop_250ms_ease-out] items-center justify-center rounded-full bg-[#5146c8] px-1 text-[9px] font-black text-white"
            >
              {cartCount}
            </span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#e9e7e2] bg-white text-xl text-slate-800 transition-colors duration-200 hover:border-[#cbc6f2] hover:bg-[#eeecff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5146c8] lg:hidden"
          >
            <span
              key={open ? "close" : "menu"}
              className="animate-[cart-pop_180ms_ease-out]"
            >
              {open ? <FiX size={20} /> : <FiMenu size={20} />}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile navigation */}
      <div
        id="mobile-navigation"
        aria-hidden={!open}
        inert={!open}
        className={`grid overflow-hidden border-t border-[#e9e7f2] bg-white transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="relative isolate overflow-hidden px-4 py-5 sm:px-6">

            {/* Subtle mobile-menu decoration */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-12 -top-12 -z-10 h-40 w-40 rounded-full bg-[#eeecff] blur-3xl"
            />

            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.24em] text-[#5146c8]">
                  Explore Dastoor
                </p>

                <p className="mt-1.5 text-xs text-slate-500">
                  Good food. Good tradition.
                </p>
              </div>

              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eeecff] text-[#5146c8]">
                <FiArrowUpRight size={19} />
              </span>
            </div>

            <nav
              aria-label="Mobile navigation"
              className="grid gap-1"
            >
              {links.map((link, index) => {
                const active = isActive(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    style={{ transitionDelay: open ? `${index * 35}ms` : "0ms" }}
                    className={`group flex items-center justify-between rounded-2xl border px-4 py-3.5 transition-[background-color,border-color,color] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5146c8] ${
                      active
                        ? "border-[#e0dcff] bg-[#f3f1ff] text-[#5146c8]"
                        : "border-transparent text-slate-700 hover:border-[#eeecff] hover:bg-[#faf9ff] hover:text-[#5146c8]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-xl text-[10px] font-black ${
                          active
                            ? "bg-[#5146c8] text-white"
                            : "bg-[#f2f1f7] text-slate-500 group-hover:bg-[#eeecff] group-hover:text-[#5146c8]"
                        }`}
                      >
                        0{index + 1}
                      </span>

                      <span className="text-sm font-bold">
                        {link.label}
                      </span>
                    </span>

                    <FiArrowUpRight
                      size={17}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </Link>
                );
              })}
            </nav>

            {/* WhatsApp CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-4 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 transition-colors duration-200 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5146c8]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-emerald-600 shadow-sm">
                  <FaWhatsapp size={23} />
                </span>

                <span>
                  <span className="block text-sm font-black">
                    Let's talk food.
                  </span>

                  <span className="mt-1 block text-xs text-emerald-800/70">
                    Chat with us on WhatsApp
                  </span>
                </span>
              </span>

              <FiArrowUpRight size={19} />
            </a>

            {/* Mobile order card */}
            <Link
              href="/order"
              onClick={closeMenu}
              className="dastoor-btn mt-3 flex items-center justify-between rounded-2xl bg-[#2b2867] p-4 text-white hover:bg-[#4036af] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5146c8]"
            >
              <span className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
                  <FiShoppingBag size={21} />
                </span>

                <span>
                  <span className="block text-sm font-black">
                    Your next meal awaits.
                  </span>

                  <span className="mt-1 block text-xs text-indigo-100/70">
                    View your order and cart
                  </span>
                </span>
              </span>

              <span className="flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-xs font-black text-[#5146c8]">
                {cartCount}
                <FiArrowRight />
              </span>
            </Link>

            {/* Location footer */}
            <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#eeedf4] pt-4 text-xs text-slate-500">
              <FiMapPin className="text-[#5146c8]" />

              <span>Khokherki, Gujranwala</span>

              <span className="h-1 w-1 rounded-full bg-slate-300" />

              <span>Dastoor Restaurant</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
