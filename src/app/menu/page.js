"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import MenuCard from "@/components/menu/MenuCard";
import { categories, menuItems } from "@/data/menu";
import { useEffect, useMemo, useState } from "react";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiSearch,
  FiShoppingBag,
  FiSliders,
  FiX,
} from "react-icons/fi";

const foodVisuals = {
  burger:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=85",
  pizza:
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=700&q=85",
  fries:
    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=500&q=85",
  shake:
    "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=500&q=85",
};

export default function MenuPage() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const { itemCount } = useCart();

  const categoryOptions = useMemo(() => {
    const source =
      Array.isArray(categories) && categories.length
        ? categories
        : menuItems.map((item) => item.category).filter(Boolean);

    return [
      "All",
      ...Array.from(
        new Set(source.filter((category) => category && category !== "All")),
      ),
    ];
  }, []);

  useEffect(() => {
    const category = new URLSearchParams(window.location.search).get(
      "category",
    );

    if (category && categoryOptions.includes(category)) {
      setActive(category);
    }
  }, [categoryOptions]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    const results = menuItems.filter((item) => {
      const categoryMatch = active === "All" || item.category === active;
      const searchableText =
        `${item.name ?? ""} ${item.description ?? ""} ${item.category ?? ""}`.toLowerCase();
      const queryMatch = !q || searchableText.includes(q);

      return categoryMatch && queryMatch;
    });

    if (sortBy === "price-low") {
      results.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortBy === "price-high") {
      results.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    } else if (sortBy === "name") {
      results.sort((a, b) =>
        String(a.name ?? "").localeCompare(String(b.name ?? "")),
      );
    }

    return results;
  }, [active, query, sortBy]);

  const clearFilters = () => {
    setActive("All");
    setQuery("");
    setSortBy("recommended");
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#17172f]">
      {/* =====================================
          CINEMATIC HERO
      ====================================== */}
      <section className="relative isolate overflow-hidden bg-[#211e55] text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(145,136,255,0.24),transparent_28%),radial-gradient(circle_at_15%_90%,rgba(81,70,200,0.35),transparent_34%)]"
        />
        <div
          aria-hidden="true"
          className="soft-grid pointer-events-none absolute inset-0 opacity-40"
        />
        <svg
          aria-hidden="true"
          viewBox="0 0 1500 650"
          preserveAspectRatio="xMidYMid slice"
          className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        >
          <defs>
            <linearGradient
              id="menu-outline-gradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#d9d4ff" />
              <stop offset="100%" stopColor="#8e83ff" />
            </linearGradient>
          </defs>
          <text
            x="770"
            y="520"
            textAnchor="middle"
            fontFamily="Arial, Helvetica, sans-serif"
            fontSize="300"
            fontWeight="900"
            letterSpacing="-15"
            fill="none"
            stroke="url(#menu-outline-gradient)"
            strokeWidth="2"
          >
            MENU
          </text>
          <circle
            cx="1240"
            cy="130"
            r="100"
            fill="none"
            stroke="#c9c5ff"
            strokeDasharray="4 12"
          />
          <circle
            cx="1240"
            cy="130"
            r="145"
            fill="none"
            stroke="#c9c5ff"
            strokeDasharray="1 15"
          />
          <path
            d="M55 470 C220 390 320 425 430 480 S650 540 760 485"
            fill="none"
            stroke="#c9c5ff"
            strokeWidth="2"
            strokeDasharray="5 13"
          />
        </svg>

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:px-10 lg:py-24">
          <div data-page-intro className="relative z-10">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.22em] text-indigo-100 backdrop-blur-md sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#c9c5ff]" />
              The Dastoor menu
            </div>

            <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[0.92] tracking-[-0.065em] sm:text-6xl md:text-7xl lg:text-[6.4rem]">
              Find your
              <span className="block text-[#c9c5ff]">next obsession.</span>
            </h1>

            <p className="mt-6 max-w-xl text-sm leading-8 text-indigo-50/75 sm:text-base">
              Big burgers, loaded pizza, crispy chicken, creamy shakes and
              everything in between. Follow your craving and find your next
              Dastoor favorite.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="#menu-catalogue"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-sm font-black text-[#2b2867] transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-[#c9c5ff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                Explore the dishes
                <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <Link
                href="/order"
                className="group inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.06] px-6 py-4 text-sm font-black text-white backdrop-blur-md transition-[transform,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <FiShoppingBag size={17} />
                Your order
                <span className="rounded-full bg-white/15 px-2 py-0.5 text-[10px]">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4 border-t border-white/10 pt-6">
              <div>
                <p className="text-2xl font-black tracking-tight">
                  {menuItems.length}+
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-indigo-100/55">
                  Menu choices
                </p>
              </div>
              <span className="hidden h-9 w-px bg-white/15 sm:block" />
              <div>
                <p className="text-2xl font-black tracking-tight">
                  {categoryOptions.length - 1}
                </p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-indigo-100/55">
                  Categories
                </p>
              </div>
              <span className="hidden h-9 w-px bg-white/15 sm:block" />
              <div>
                <p className="text-2xl font-black tracking-tight">Your mood</p>
                <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.16em] text-indigo-100/55">
                  Your kind of food
                </p>
              </div>
            </div>
          </div>

          {/* Food collage */}
          <div className="relative mx-auto h-[330px] w-full max-w-[540px] sm:h-[460px] lg:h-[540px]">
            <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 sm:h-[390px] sm:w-[390px]" />
            <div className="absolute left-1/2 top-1/2 h-[220px] w-[220px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] shadow-[0_0_100px_rgba(145,136,255,0.16)] sm:h-[320px] sm:w-[320px]" />

            <div className="absolute left-1/2 top-1/2 h-[245px] w-[245px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[2rem] border-4 border-white/15 bg-white/10 shadow-[0_35px_90px_rgba(0,0,0,0.3)] sm:h-[340px] sm:w-[340px] sm:rounded-[2.5rem]">
              <Image
                src={foodVisuals.burger}
                alt="Dastoor-style burger"
                fill
                priority
                unoptimized
                sizes="(min-width: 640px) 340px, 245px"
                className="object-cover transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#17172f]/65 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="text-[9px] font-black uppercase tracking-[0.22em] text-indigo-100">
                  Dastoor favorites
                </p>
                <p className="mt-2 text-2xl font-black tracking-[-0.04em] text-white sm:text-3xl">
                  Big flavor.
                </p>
              </div>
            </div>

            <div className="absolute right-0 top-5 h-24 w-24 rotate-6 overflow-hidden rounded-[1.4rem] border-4 border-[#211e55] shadow-2xl sm:right-0 sm:top-8 sm:h-36 sm:w-36 sm:rounded-[1.8rem]">
              <Image
                src={foodVisuals.pizza}
                alt="Freshly baked pizza"
                fill
                unoptimized
                sizes="144px"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-7 left-0 h-24 w-24 -rotate-12 overflow-hidden rounded-full border-4 border-[#211e55] shadow-2xl sm:bottom-12 sm:left-1 sm:h-36 sm:w-36">
              <Image
                src={foodVisuals.fries}
                alt="Golden fries"
                fill
                unoptimized
                sizes="144px"
                className="object-cover"
              />
            </div>

            <div className="absolute bottom-8 right-2 h-20 w-20 rotate-6 overflow-hidden rounded-2xl border-4 border-[#211e55] shadow-2xl sm:bottom-5 sm:right-6 sm:h-28 sm:w-28">
              <Image
                src={foodVisuals.shake}
                alt="Creamy milkshake"
                fill
                unoptimized
                sizes="112px"
                className="object-cover"
              />
            </div>

            <div className="absolute left-1/2 top-2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-[#302b70]/90 px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-[#c9c5ff] shadow-xl backdrop-blur-md sm:top-4 sm:px-5 sm:py-2.5">
              Made for your mood
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          FILTER BAR
      ====================================== */}
      <section className="sticky top-[72px] z-30 border-b border-[#e8e5ed] bg-white/95 backdrop-blur-2xl sm:top-[78px]">
        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 items-center gap-2">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eeecff] text-[#5146c8]">
                  <FiSliders size={18} />
                </span>
                <div>
                  <p className="text-xs font-black text-[#17172f]">
                    Find your flavor
                  </p>
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    Filter by category or search a dish
                  </p>
                </div>
              </div>

              <div className="flex w-full items-center gap-3 rounded-2xl border border-[#e8e6e1] bg-[#faf9f6] px-4 py-3 transition-colors focus-within:border-[#bcb4ff] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#5146c8]/[0.06] lg:max-w-[360px]">
                <FiSearch className="shrink-0 text-slate-400" size={18} />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search burgers, pizza, shakes..."
                  aria-label="Search menu dishes"
                  className="min-w-0 flex-1 bg-transparent text-xs font-semibold text-slate-800 outline-none placeholder:text-slate-400"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-[#eeecff] hover:text-[#5146c8]"
                  >
                    <FiX size={15} />
                  </button>
                )}
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categoryOptions.map((category) => {
                const selected = active === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActive(category)}
                    aria-pressed={selected}
                    className={`shrink-0 rounded-full border px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.12em] transition-[background-color,border-color,color,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5146c8] ${
                      selected
                        ? "border-[#5146c8] bg-[#5146c8] text-white shadow-[0_8px_20px_rgba(81,70,200,0.18)]"
                        : "border-[#e8e6e1] bg-white text-slate-500 hover:border-[#cbc6f2] hover:bg-[#f3f1ff] hover:text-[#5146c8]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          MENU CATALOGUE
      ====================================== */}
      <main
        id="menu-catalogue"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-20"
      >
        <div className="mb-8 flex flex-col gap-5 border-b border-[#e8e5ed] pb-7 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-[#5146c8]">
              <span className="h-px w-7 bg-[#5146c8]" />
              {active === "All"
                ? "The complete collection"
                : `Explore ${active}`}
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] text-[#17172f] sm:text-4xl lg:text-5xl">
              {active === "All"
                ? "Choose your craving."
                : `${active}, your way.`}
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              Showing{" "}
              <span className="font-black text-[#292653]">
                {filtered.length}
              </span>{" "}
              of {menuItems.length} dishes
              {query.trim() ? ` matching “${query.trim()}”` : ""}.
            </p>
          </div>

          <label className="flex w-full items-center gap-3 rounded-xl border border-[#e8e6e1] bg-white px-4 py-3 text-xs font-bold text-slate-500 sm:w-fit">
            <FiSliders size={15} className="text-[#5146c8]" />
            <span className="whitespace-nowrap">Sort by</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort menu items"
              className="min-w-0 flex-1 cursor-pointer bg-transparent text-xs font-black text-[#292653] outline-none sm:w-36 sm:flex-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A–Z</option>
            </select>
          </label>
        </div>

        {filtered.length > 0 ? (
          <div className="grid items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((item) => (
              <MenuCard
                key={item.id ?? `${item.category}-${item.name}`}
                item={item}
              />
            ))}
          </div>
        ) : (
          <div className="relative isolate overflow-hidden rounded-[2rem] border border-dashed border-[#d8d3ee] bg-white px-6 py-16 text-center sm:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(81,70,200,0.08),transparent_55%)]"
            />
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#eeecff] text-[#5146c8]">
              <FiSearch size={27} />
            </span>
            <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-[#5146c8]">
              No matches this time
            </p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.04em] text-[#17172f] sm:text-3xl">
              Try another craving.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-slate-500">
              Change your search or category and explore more of the Dastoor
              menu.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-[#5146c8] px-5 py-3.5 text-xs font-black text-white transition-colors duration-200 hover:bg-[#4036af] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8]"
            >
              Clear all filters
              <FiArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Bottom call to action */}
        <div className="mt-14 overflow-hidden rounded-[2rem] bg-[#eeecff] p-6 sm:mt-20 sm:p-9 lg:p-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#5146c8]">
                Make it a Dastoor day
              </p>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.045em] text-[#17172f] sm:text-3xl">
                Found your favorites?
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-slate-600">
                Head to your order and get everything ready for your next food
                moment.
              </p>
            </div>
            <Link
              href="/order"
              className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-[#5146c8] px-6 py-4 text-sm font-black text-white transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-[#4036af] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8]"
            >
              <FiShoppingBag size={17} />
              View your order
              <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
