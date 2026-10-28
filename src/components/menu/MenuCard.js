"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/CartProvider";
import { useEffect, useRef, useState } from "react";
import { FiArrowUpRight, FiCheck, FiPlus, FiStar } from "react-icons/fi";

export default function MenuCard({ item }) {
  const { addItem } = useCart();

  const [added, setAdded] = useState(false);
  const timeoutRef = useRef(null);

  const price = Number(item.price);
  const formattedPrice = Number.isFinite(price)
    ? price.toLocaleString("en-PK")
    : item.price;

  const hasRating =
    item.rating !== undefined &&
    item.rating !== null &&
    Number.isFinite(Number(item.rating));

  const handleAdd = () => {
    addItem(item);

    setAdded(true);

    // Reset the previous timer if the customer clicks again.
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setAdded(false);
      timeoutRef.current = null;
    }, 1300);
  };

  // Prevent a dangling timer after unmount.
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <article
      data-gsap-card
      data-reveal
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#e8e6e1] bg-white shadow-[0_10px_40px_rgba(28,28,56,0.045)] transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-1 hover:border-[#cbc6f2] hover:shadow-[0_28px_70px_rgba(81,70,200,0.12)] sm:rounded-[2rem]"
    >
      {/* Product image */}
      <div className="relative aspect-[1.08] overflow-hidden bg-[#eeecff]">
        <Image
          src={item.image}
          alt={`${item.name}${item.category ? ` - ${item.category}` : ""}`}
          fill
          unoptimized
          loading="lazy"
          sizes="(min-width: 1280px) 290px, (min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />

        {/* Cinematic image treatment */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17172f]/65 via-[#17172f]/5 to-black/[0.04] opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        />

        {/* Top badge */}
        <span className="absolute left-3 top-3 rounded-full border border-white/60 bg-white/95 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-[#292653] shadow-sm sm:left-4 sm:top-4 sm:text-[10px]">
          {item.badge || "Dastoor pick"}
        </span>

        {/* Category */}
        {item.category && (
          <span className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-[#17172f]/50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.14em] text-white backdrop-blur-md sm:bottom-4 sm:left-4">
            {item.category}
          </span>
        )}

        {/* Image corner detail */}
        <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md transition-[background-color,transform] duration-300 group-hover:rotate-6 group-hover:bg-white/20 sm:bottom-4 sm:right-4">
          <FiArrowUpRight size={17} />
        </span>
      </div>

      {/* Product details */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-black leading-tight tracking-[-0.025em] text-[#17172f] transition-colors duration-300 group-hover:text-[#5146c8] sm:text-lg">
            {item.name}
          </h3>

          <span className="shrink-0 rounded-full border border-[#e5e1ff] bg-[#f3f1ff] px-3 py-1.5 text-[10px] font-black text-[#5146c8] sm:text-xs">
            Rs. {formattedPrice}
          </span>
        </div>

        {/* Rating: show only when supplied by the product data */}
        <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.11em] text-slate-400">
          <FiStar
            aria-hidden="true"
            className="shrink-0 fill-[#5146c8] text-[#5146c8]"
          />

          {hasRating ? (
            <>
              <span>{Number(item.rating).toFixed(1)}</span>

              {item.reviewCount != null && (
                <>
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  <span>{item.reviewCount} reviews</span>
                </>
              )}
            </>
          ) : (
            <span>Made for your cravings</span>
          )}
        </div>

        {/* Description */}
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-500">
          {item.description}
        </p>

        {/* Product metadata */}
        <div className="mt-5 flex items-center justify-between border-t border-[#eeedf3] pt-4">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-slate-400">
            Dastoor selection
          </span>

          <span className="text-[10px] font-bold text-[#5146c8]">
            Fresh choice
          </span>
        </div>

        {/* Add to cart: deliberately glint-free */}
        <button
          type="button"
          onClick={handleAdd}
          aria-label={
            added ? `${item.name} added to cart` : `Add ${item.name} to cart`
          }
          className={`mt-4 flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-4 py-3.5 text-[10px] font-black uppercase tracking-[0.14em] text-white shadow-[0_8px_24px_rgba(81,70,200,0.13)] transition-[background-color,transform,box-shadow] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8] active:scale-[0.99] ${
            added
              ? "bg-emerald-600 shadow-emerald-900/10"
              : "bg-[#5146c8] hover:bg-[#4036af] hover:shadow-[0_12px_28px_rgba(81,70,200,0.2)]"
          }`}
        >
          {added ? (
            <>
              <FiCheck size={16} />
              Added to cart
            </>
          ) : (
            <>
              <FiPlus size={16} className="transition-transform duration-200" />
              Add to cart
            </>
          )}
        </button>

        {/* Accessible status announcement */}
        <span className="sr-only" aria-live="polite" aria-atomic="true">
          {added ? `${item.name} added to cart.` : ""}
        </span>
      </div>
    </article>
  );
}
