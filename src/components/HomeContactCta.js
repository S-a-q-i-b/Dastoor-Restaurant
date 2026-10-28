import Link from "next/link";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiMapPin,
  FiShoppingBag,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const whatsappUrl =
  "https://wa.me/923144672379?text=" +
  encodeURIComponent(
    "Assalam-o-Alaikum Dastoor! I'd like to explore your menu and place an order."
  );

export default function HomeContactCta() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-white px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div
        data-reveal
        className="relative isolate mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#2b2867] px-6 py-10 text-white shadow-[0_30px_90px_rgba(43,40,103,0.12)] sm:rounded-[2.5rem] sm:px-10 sm:py-14 lg:px-16 lg:py-16"
      >
        {/* Background atmosphere */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_15%,rgba(137,126,255,0.27),transparent_32%),radial-gradient(circle_at_10%_100%,rgba(81,70,200,0.35),transparent_35%)]"
        />

        {/* Decorative rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 -z-10 h-72 w-72 rounded-full border border-white/[0.09] sm:-right-20 sm:h-96 sm:w-96"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-16 -z-10 h-56 w-56 rounded-full border border-white/[0.07] sm:h-72 sm:w-72"
        />

        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">

          {/* Main message */}
          <div className="relative">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#b9b2ff]" />

              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-100 sm:text-xs">
                Still hungry?
              </p>
            </div>

            <h2 className="mt-7 max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.06em] sm:mt-8 sm:text-5xl lg:text-7xl">
              Your next favorite meal is{" "}
              <span className="text-[#c9c5ff]">one click away.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-indigo-50/75 sm:mt-6 sm:text-base sm:leading-8">
              Browse the menu, pick your favorites, and make your next
              food run a Dastoor run. Good food is calling.
            </p>

            {/* Location */}
            <div className="mt-7 inline-flex items-center gap-2 text-xs font-semibold text-indigo-100/65">
              <FiMapPin className="text-[#c9c5ff]" size={15} />
              Khokherki · Gujranwala
            </div>
          </div>

          {/* Action panel */}
          <div className="relative">
            <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.055] p-4 shadow-2xl shadow-black/10 backdrop-blur-sm sm:p-5">

              <p className="px-2 pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-200/70">
                Make your next move
              </p>

              {/* Primary CTA */}
              <Link
                href="/menu"
                className="dastoor-btn group flex items-center justify-between gap-4 rounded-2xl bg-white px-5 py-5 text-[#2b2867] transition-colors duration-300 hover:bg-[#eeecff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eeecff] text-[#5146c8] transition-colors duration-300 group-hover:bg-[#dcd7ff]">
                    <FiArrowRight size={21} />
                  </span>

                  <span>
                    <span className="block text-sm font-black sm:text-base">
                      Explore the menu
                    </span>

                    <span className="mt-1 block text-xs text-slate-500">
                      Find your next favorite
                    </span>
                  </span>
                </span>

                <FiArrowUpRight
                  size={20}
                  className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {/* Cart CTA */}
              <Link
                href="/order"
                className="dastoor-btn group mt-3 flex items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/[0.04] px-5 py-5 text-white transition-colors duration-300 hover:border-white/30 hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-6"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#c9c5ff] transition-colors duration-300 group-hover:bg-white/15">
                    <FiShoppingBag size={21} />
                  </span>

                  <span>
                    <span className="block text-sm font-black sm:text-base">
                      Your cart awaits
                    </span>

                    <span className="mt-1 block text-xs text-indigo-100/60">
                      Review your order
                    </span>
                  </span>
                </span>

                <FiArrowUpRight
                  size={20}
                  className="shrink-0 text-indigo-100/70 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {/* WhatsApp CTA */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 flex items-center justify-between gap-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/[0.08] px-5 py-5 text-white transition-[background-color,border-color] duration-300 hover:border-emerald-300/40 hover:bg-emerald-400/[0.14] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300 sm:px-6"
                aria-label="Contact Dastoor on WhatsApp"
              >
                <span className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300 transition-transform duration-300 group-hover:scale-105">
                    <FaWhatsapp size={23} />
                  </span>

                  <span>
                    <span className="block text-sm font-black sm:text-base">
                      Let's talk food.
                    </span>

                    <span className="mt-1 block text-xs text-emerald-100/65">
                      Message us on WhatsApp
                    </span>
                  </span>
                </span>

                <FiArrowUpRight
                  size={20}
                  className="shrink-0 text-emerald-200 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </div>

            {/* Small caption */}
            <p className="mt-4 text-center text-[10px] leading-5 text-indigo-100/45">
              Great cravings deserve great food.
            </p>
          </div>
        </div>

        {/* Bottom brand signature */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-5 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-100/55">
            DASTOOR · GUJRANWALA
          </p>

          <p className="text-xs text-indigo-100/45">
            Good food. Good tradition.
          </p>
        </div>
      </div>
    </section>
  );
}
