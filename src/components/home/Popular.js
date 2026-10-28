"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowRight,
  FiCheck,
  FiHeart,
  FiPlus,
  FiStar,
} from "react-icons/fi";

const popularItems = [
  {
    id: 101,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    badge: "Most loved",
    name: "Dastoor Signature Burger",
    description: "Double patty, fresh veggies and signature sauce.",
    price: 699,
    category: "Burgers",
  },
  {
    id: 102,
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=85",
    badge: "Trending",
    name: "Loaded Cheese Pizza",
    description: "Extra cheese, chicken and our house seasoning.",
    price: 1099,
    category: "Pizza",
  },
  {
    id: 103,
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85",
    badge: "Best seller",
    name: "Crispy Chicken",
    description: "Golden crispy chicken with a signature dip.",
    price: 599,
    category: "Chicken",
  },
];

export default function Popular() {
  const { addItem } = useCart();

  const [added, setAdded] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const timeoutRef = useRef(null);

  // Clean up the feedback timer when the component unmounts.
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleAdd = (item) => {
    addItem(item);

    setAdded(item.id);

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setAdded(null);
      timeoutRef.current = null;
    }, 1400);
  };

  const toggleFavorite = (itemId) => {
    setFavorites((current) =>
      current.includes(itemId)
        ? current.filter((id) => id !== itemId)
        : [...current, itemId]
    );
  };

  return (
    <section className="bg-[#f7f7f4] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          data-reveal
        >
          <div>
            <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#5146c8] sm:text-xs">
              <span className="h-px w-8 bg-[#5146c8]" />
              Customer favorites
            </p>

            <h2 className="mt-4 text-4xl font-black tracking-[-0.055em] text-[#17172f] sm:text-5xl lg:text-6xl">
              The Dastoor hits.
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              The plates people keep coming back for, built to be messy
              in the best possible way.
            </p>
          </div>

          <Link
            href="/menu"
            className="group inline-flex w-fit items-center gap-2 py-2 text-xs font-black uppercase tracking-[0.15em] text-slate-700 transition-colors duration-300 hover:text-[#5146c8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8]"
          >
            See everything

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Product cards */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
          {popularItems.map((item) => {
            const isAdded = added === item.id;
            const isFavorite = favorites.includes(item.id);

            return (
              <article
                key={item.id}
                data-gsap-card
                data-reveal
                className="group overflow-hidden rounded-[2rem] border border-[#e8e6e1] bg-white transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:border-[#cbc6f2] hover:shadow-[0_30px_70px_rgba(81,70,200,0.12)]"
              >
                {/* Product image */}
                <div className="relative h-64 overflow-hidden bg-[#eeecff] sm:h-72">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17172f]/60 via-transparent to-black/[0.06]"
                  />

                  {/* Product badge */}
                  <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/95 px-3.5 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-[#17172f] shadow-sm sm:text-[10px]">
                    {item.badge}
                  </span>

                  {/* Favorite button */}
                  <button
                    type="button"
                    onClick={() => toggleFavorite(item.id)}
                    aria-label={
                      isFavorite
                        ? `Remove ${item.name} from favorites`
                        : `Add ${item.name} to favorites`
                    }
                    aria-pressed={isFavorite}
                    className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white shadow-sm backdrop-blur-md transition-[background-color,color,transform] duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-95 ${
                      isFavorite
                        ? "bg-[#5146c8] text-white"
                        : "bg-[#17172f]/35 hover:bg-[#5146c8]"
                    }`}
                  >
                    <FiHeart
                      size={18}
                      className={
                        isFavorite
                          ? "fill-current"
                          : "fill-transparent"
                      }
                    />
                  </button>

                  {/* Bottom image label */}
                  <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between gap-3 text-white">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/80">
                      Dastoor selection
                    </span>

                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-md">
                      <FiArrowRight className="-rotate-45 transition-transform duration-300 group-hover:rotate-0" />
                    </span>
                  </div>
                </div>

                {/* Product information */}
                <div className="p-5 sm:p-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.17em] text-[#5146c8]">
                    {item.category}
                  </span>

                  <div className="mt-2 flex items-start justify-between gap-3">
                    <h3 className="text-lg font-black leading-tight tracking-[-0.025em] text-[#17172f] sm:text-xl">
                      {item.name}
                    </h3>

                    <p className="shrink-0 whitespace-nowrap text-sm font-black text-[#5146c8] sm:text-base">
                      Rs. {item.price.toLocaleString("en-PK")}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    <FiStar className="fill-[#5146c8] text-[#5146c8]" />
                    <span>Customer favorite</span>

                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                    <span>Fresh daily</span>
                  </div>

                  <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>

                  {/* Add to cart
                      Intentionally NOT using dastoor-btn:
                      avoids its global glint/shine effect. */}
                  <button
                    type="button"
                    onClick={() => handleAdd(item)}
                    className={`relative mt-6 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-5 py-4 text-xs font-black uppercase tracking-[0.14em] text-white before:content-none after:content-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8] active:scale-[0.99] ${
                      isAdded
                        ? "bg-emerald-600"
                        : "bg-[#5146c8] hover:bg-[#4036af]"
                    } transition-[background-color,transform] duration-200`}
                    aria-live="polite"
                  >
                    {isAdded ? (
                      <>
                        <FiCheck size={16} />
                        Added to cart
                      </>
                    ) : (
                      <>
                        <FiPlus size={16} />
                        Add to cart
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom link */}
        <div
          data-reveal
          className="mt-10 flex flex-col gap-3 border-t border-[#e5e2dc] pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs leading-6 text-slate-500 sm:text-sm">
            Found your favorite? There is more on the menu.
          </p>

          <Link
            href="/menu"
            className="group inline-flex w-fit items-center gap-2 text-xs font-black text-[#5146c8] transition-colors hover:text-[#2b2867]"
          >
            Explore the full menu

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
