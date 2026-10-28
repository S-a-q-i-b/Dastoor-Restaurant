"use client";

import { useCart } from "@/components/cart/CartProvider";
import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheck,
  FiChevronRight,
  FiClock,
  FiMapPin,
  FiMinus,
  FiPlus,
  FiShoppingBag,
  FiTrash2,
  FiTruck,
} from "react-icons/fi";

const formatPrice = (amount) => Number(amount || 0).toLocaleString("en-PK");

function normalizeImageSource(source) {
  if (typeof source === "string") return source.trim() || null;
  if (source && typeof source === "object") {
    return (
      source.url ||
      source.src ||
      source.secure_url ||
      source.path ||
      source.image ||
      null
    );
  }
  return null;
}

function getFoodImageSources(item) {
  const imageFields = [
    item?.image,
    item?.imageUrl,
    item?.image_url,
    item?.thumbnail,
    item?.photo,
    item?.picture,
    item?.src,
    ...(Array.isArray(item?.images)
      ? item.images
      : item?.images
        ? [item.images]
        : []),
    ...(Array.isArray(item?.gallery)
      ? item.gallery
      : item?.gallery
        ? [item.gallery]
        : []),
    ...(Array.isArray(item?.media)
      ? item.media
      : item?.media
        ? [item.media]
        : []),
  ];

  const itemImages = imageFields
    .map(normalizeImageSource)
    .filter((src) => typeof src === "string" && src.length > 0);

  // Category-specific photo fallbacks cover older saved cart entries that do not
  // contain the image field. The item's own image is always tried first.
  const description =
    `${item?.category || ""} ${item?.name || ""}`.toLowerCase();
  let fallbackImage =
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=720&q=85";

  if (/burger|sandwich|zinger/.test(description)) {
    fallbackImage =
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=720&q=85";
  } else if (/pizza/.test(description)) {
    fallbackImage =
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=720&q=85";
  } else if (/fries|side|potato/.test(description)) {
    fallbackImage =
      "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=720&q=85";
  } else if (/chicken|broast|wings|nugget|fried/.test(description)) {
    fallbackImage =
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=720&q=85";
  } else if (/drink|beverage|juice|shake|tea|coffee|soda/.test(description)) {
    fallbackImage =
      "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=720&q=85";
  } else if (/dessert|sweet|cake|ice cream|brownie/.test(description)) {
    fallbackImage =
      "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=720&q=85";
  }

  return [...new Set([...itemImages, fallbackImage])];
}

function FoodImage({ item }) {
  const sources = getFoodImageSources(item);
  const [failedSources, setFailedSources] = useState([]);
  const activeSource = sources.find((src) => !failedSources.includes(src));

  useEffect(() => {
    setFailedSources([]);
  }, [item?.id, sources.join("|")]);

  if (!activeSource) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#f2f0ff] via-[#faf9f6] to-[#e6e2ff]">
        <svg
          aria-hidden="true"
          viewBox="0 0 120 100"
          className="h-20 w-24 text-[#5146c8]"
        >
          <ellipse
            cx="60"
            cy="78"
            rx="38"
            ry="7"
            fill="currentColor"
            opacity=".1"
          />
          <circle
            cx="60"
            cy="48"
            r="34"
            fill="#fff"
            stroke="#d9d4ff"
            strokeWidth="2"
          />
          <circle
            cx="60"
            cy="48"
            r="25"
            fill="#f0eeff"
            stroke="#bcb5f6"
            strokeWidth="1.5"
          />
          <path
            d="M43 50c4-13 26-17 34-3 5 10-5 20-15 19-8-1-14-6-15-13"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <circle cx="48" cy="37" r="2.5" fill="#e7a45e" />
          <circle cx="70" cy="59" r="3" fill="#74a36c" />
        </svg>
      </div>
    );
  }

  return (
    <img
      src={activeSource}
      alt={item?.name ? `${item.name} food photo` : "Selected dish"}
      loading="lazy"
      onError={() => {
        setFailedSources((current) =>
          current.includes(activeSource) ? current : [...current, activeSource],
        );
      }}
      className="relative z-[1] h-full w-full object-cover transition duration-700 group-hover:scale-105"
    />
  );
}

function OrderArtwork({ success = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 440 330"
      fill="none"
      className="h-auto w-full overflow-visible"
    >
      <defs>
        <linearGradient
          id="order-art-gradient"
          x1="65"
          y1="40"
          x2="360"
          y2="290"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#C8C3FF" />
          <stop offset="1" stopColor="#5146C8" />
        </linearGradient>
        <linearGradient
          id="order-art-plate"
          x1="100"
          y1="80"
          x2="330"
          y2="260"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFFFFF" />
          <stop offset="1" stopColor="#EAE7FF" />
        </linearGradient>
      </defs>
      <g data-gsap-orbit>
        <circle
          cx="222"
          cy="164"
          r="126"
          stroke="#DCD8F8"
          strokeWidth="1.5"
          strokeDasharray="3 9"
        />
        <circle cx="222" cy="164" r="151" stroke="#E8E5F4" strokeWidth="1" />
        <circle cx="348" cy="125" r="7" fill="#5146C8" />
        <circle cx="102" cy="245" r="4" fill="#AAA3F2" />
        <path
          d="M315 54C343 72 364 96 375 126"
          stroke="#AAA3F2"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M67 199C72 226 86 249 107 266"
          stroke="#AAA3F2"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      <g data-gsap-float>
        <ellipse
          cx="221"
          cy="274"
          rx="112"
          ry="16"
          fill="#211E4C"
          fillOpacity=".08"
        />
        <circle
          cx="220"
          cy="157"
          r="103"
          fill="url(#order-art-gradient)"
          fillOpacity=".11"
        />
        <circle
          cx="220"
          cy="157"
          r="91"
          fill="url(#order-art-plate)"
          stroke="#FFFFFF"
          strokeWidth="5"
        />
        <circle cx="220" cy="157" r="72" stroke="#D7D2F2" strokeWidth="1.5" />
        <path
          d="M178 155C184 131 207 115 233 120C256 124 272 143 269 165C266 188 246 204 224 202C204 201 188 188 182 171"
          stroke="url(#order-art-gradient)"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M202 145C211 135 226 133 237 140C248 147 251 160 245 171C239 182 224 187 213 181"
          stroke="#5146C8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path d="M148 87L158 74L168 87L158 100L148 87Z" fill="#5146C8" />
        <path d="M290 211L297 202L304 211L297 220L290 211Z" fill="#AAA3F2" />
        <path
          d="M111 132L116 119L121 132L134 137L121 142L116 155L111 142L98 137L111 132Z"
          fill="#B7B0FF"
        />
        <path
          d="M324 177L328 167L332 177L342 181L332 185L328 195L324 185L314 181L324 177Z"
          fill="#5146C8"
        />
      </g>
      <g transform="translate(310 232) rotate(8)">
        <rect x="0" y="0" width="62" height="65" rx="13" fill="#211E4C" />
        <path
          d="M17 20V15C17 7.8 22.8 2 30 2C37.2 2 43 7.8 43 15V20"
          stroke="#C8C3FF"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M22 31H40M22 40H35"
          stroke="#FFFFFF"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
      {success && (
        <g>
          <path
            d="M74 86L78 75L82 86L93 90L82 94L78 105L74 94L63 90L74 86Z"
            fill="#5146C8"
          />
          <circle cx="352" cy="61" r="5" fill="#AAA3F2" />
        </g>
      )}
    </svg>
  );
}

function OrderSuccess({ pageRef }) {
  return (
    <main
      ref={pageRef}
      className="relative min-h-[85vh] overflow-hidden bg-[#f7f6f2] px-5 py-12 text-[#17172f] sm:px-8 sm:py-20"
    >
      <div className="pointer-events-none absolute -right-28 -top-24 h-80 w-80 rounded-full bg-[#e9e6ff] blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-[#efede7] blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 rounded-[2rem] border border-[#e8e5de] bg-white/85 p-6 shadow-[0_30px_100px_rgba(35,31,76,.08)] backdrop-blur sm:p-10 lg:grid-cols-[1fr_.88fr] lg:gap-12 lg:p-14">
        <div className="relative z-10" data-gsap-success>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#ded9ff] bg-[#f2f0ff] px-3 py-2 text-[10px] font-black uppercase tracking-[.18em] text-[#5146c8]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#5146c8]" /> Dastoor
            order desk
          </span>
          <div
            className="mt-8 flex h-16 w-16 items-center justify-center rounded-[1.35rem] bg-[#5146c8] text-3xl text-white shadow-[0_14px_28px_rgba(81,70,200,.23)]"
            data-gsap-success-mark
          >
            <FiCheck />
          </div>
          <p className="mt-8 text-[11px] font-black uppercase tracking-[.22em] text-[#5146c8]">
            Order received
          </p>
          <h1 className="mt-3 max-w-xl text-4xl font-black leading-[.96] tracking-[-.065em] sm:text-6xl">
            Good taste.
            <br />
            <span className="text-[#5146c8]">Coming right up.</span>
          </h1>
          <p className="mt-6 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
            Your demo order has been confirmed on this screen. This is a
            front-end flow only — no order was sent to a restaurant and no
            payment was processed.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/menu"
              className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#5146c8] px-6 py-4 text-sm font-black text-white transition hover:bg-[#4035b3]"
            >
              Order something else{" "}
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[#e5e2dc] px-6 py-4 text-sm font-black text-[#252345] transition hover:border-[#c7c1ff] hover:bg-[#f8f7ff]"
            >
              <FiArrowLeft /> Back home
            </Link>
          </div>
          <p className="mt-7 text-[10px] font-bold uppercase tracking-[.16em] text-slate-400">
            Good food. Good tradition.
          </p>
        </div>
        <div
          className="relative mx-auto w-full max-w-[430px]"
          data-gsap-success-art
        >
          <div className="absolute inset-12 rounded-full bg-[#f0eeff] blur-2xl" />
          <div className="relative">
            <OrderArtwork success />
          </div>
          <div className="absolute bottom-3 left-1 rounded-2xl border border-[#e9e5de] bg-white px-4 py-3 shadow-[0_12px_30px_rgba(35,31,76,.08)] sm:bottom-7 sm:left-0">
            <p className="text-[9px] font-black uppercase tracking-[.16em] text-slate-400">
              Made with care
            </p>
            <p className="mt-1 text-sm font-black text-[#17172f]">
              A little Dastoor magic.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function OrderPage() {
  const { cart, updateQty, removeItem, subtotal, delivery, total, clearCart } =
    useCart();
  const [placed, setPlaced] = useState(false);
  const pageRef = useRef(null);

  const itemCount = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);

  useEffect(() => {
    const scope = pageRef.current;
    if (!scope) return undefined;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return undefined;

    const ctx = gsap.context(() => {
      const hero = scope.querySelectorAll("[data-gsap-hero]");
      const items = scope.querySelectorAll("[data-gsap-item]");
      const checkout = scope.querySelector("[data-gsap-checkout]");
      const orbit = scope.querySelector("[data-gsap-orbit]");
      const floatArt = scope.querySelector("[data-gsap-float]");
      const success = scope.querySelector("[data-gsap-success]");
      const successMark = scope.querySelector("[data-gsap-success-mark]");
      const successArt = scope.querySelector("[data-gsap-success-art]");

      if (hero.length) {
        gsap.from(hero, {
          y: 22,
          opacity: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }

      if (items.length) {
        gsap.from(items, {
          y: 20,
          opacity: 0,
          duration: 0.58,
          stagger: 0.09,
          delay: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }

      if (checkout) {
        gsap.from(checkout, {
          y: 24,
          opacity: 0,
          duration: 0.75,
          delay: 0.16,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }

      if (orbit) {
        gsap.to(orbit, {
          rotation: 360,
          transformOrigin: "50% 50%",
          duration: 48,
          repeat: -1,
          ease: "none",
        });
      }

      if (floatArt) {
        gsap.to(floatArt, {
          y: -7,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      if (success) {
        gsap.from(success, {
          y: 22,
          opacity: 0,
          duration: 0.75,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }

      if (successMark) {
        gsap.from(successMark, {
          scale: 0.65,
          rotation: -12,
          opacity: 0,
          duration: 0.65,
          delay: 0.18,
          ease: "back.out(1.7)",
          clearProps: "transform,opacity",
        });
      }

      if (successArt) {
        gsap.from(successArt, {
          x: 18,
          opacity: 0,
          duration: 0.9,
          delay: 0.16,
          ease: "power3.out",
          clearProps: "transform,opacity",
        });
      }
    }, scope);

    return () => ctx.revert();
  }, [placed, cart.length]);

  const submitOrder = (event) => {
    event.preventDefault();
    if (!cart.length) return;
    setPlaced(true);
    clearCart();
  };

  if (placed) return <OrderSuccess pageRef={pageRef} />;

  return (
    <main
      ref={pageRef}
      className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#17172f]"
    >
      <section className="relative overflow-hidden border-b border-[#e7e4dc] bg-[#f7f6f2] px-5 pb-10 pt-7 sm:px-8 sm:pb-14 sm:pt-9 lg:px-10 lg:pb-16">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#eae7ff] opacity-70 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <div
            className="flex items-center justify-between gap-4"
            data-gsap-hero
          >
            <Link
              href="/menu"
              className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[.16em] text-slate-500 transition hover:text-[#5146c8] sm:text-xs"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e3e0d8] bg-white transition group-hover:border-[#c9c3ff] group-hover:bg-[#f0eeff]">
                <FiArrowLeft />
              </span>
              Back to menu
            </Link>
            <div className="hidden items-center gap-2 rounded-full border border-[#e4e0d8] bg-white/80 px-3 py-2 text-[9px] font-black uppercase tracking-[.16em] text-slate-500 sm:inline-flex">
              <FiMapPin className="text-[#5146c8]" /> Gujranwala · Order studio
            </div>
          </div>

          <div className="mt-10 grid items-center gap-6 md:mt-12 md:grid-cols-[1.05fr_.8fr] lg:mt-14">
            <div className="relative z-10" data-gsap-hero>
              <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.24em] text-[#5146c8] sm:text-xs">
                <span className="h-px w-7 bg-[#5146c8]" /> The Dastoor order
                desk
              </p>
              <h1 className="mt-5 max-w-3xl text-5xl font-black leading-[.89] tracking-[-.075em] sm:text-6xl lg:text-[5.8rem]">
                Your cart.
                <br />
                <span className="text-[#5146c8]">Your ritual.</span>
              </h1>
              <p className="mt-6 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                One last look before the good stuff gets going. Make it yours,
                check the details, then place your demo order.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e1d9] bg-white px-3.5 py-2.5 text-[10px] font-bold text-slate-600">
                  <FiShoppingBag className="text-[#5146c8]" /> {itemCount}{" "}
                  {itemCount === 1 ? "item" : "items"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#e5e1d9] bg-white px-3.5 py-2.5 text-[10px] font-bold text-slate-600">
                  <FiTruck className="text-[#5146c8]" />{" "}
                  {delivery === 0 && subtotal > 0
                    ? "Free delivery"
                    : "Delivery from Rs. 149"}
                </span>
              </div>
            </div>

            <div
              className="relative mx-auto w-full max-w-[400px] md:-my-4 md:justify-self-end"
              data-gsap-hero
            >
              <div className="absolute inset-12 rounded-full bg-[#e8e5ff] blur-3xl" />
              <div className="relative">
                <OrderArtwork />
              </div>
              <div className="absolute bottom-4 right-0 rounded-2xl border border-[#e8e5de] bg-white/95 px-4 py-3 shadow-[0_12px_32px_rgba(35,31,76,.08)] backdrop-blur sm:right-2">
                <p className="text-[9px] font-black uppercase tracking-[.15em] text-slate-400">
                  Current total
                </p>
                <p className="mt-1 text-xl font-black tracking-[-.04em] text-[#17172f]">
                  Rs. {formatPrice(total)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-7 px-5 py-9 sm:px-8 sm:py-12 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-10 lg:px-10 lg:py-14">
        <div className="min-w-0">
          <div
            className="mb-5 flex items-end justify-between gap-4"
            data-gsap-hero
          >
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#5146c8]">
                01 / Your selection
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-[-.055em] sm:text-3xl">
                The good stuff.
              </h2>
            </div>
            <p className="pb-1 text-[10px] font-bold uppercase tracking-[.12em] text-slate-400">
              {cart.length} {cart.length === 1 ? "dish" : "dishes"}
            </p>
          </div>

          {!cart.length ? (
            <div
              className="relative overflow-hidden rounded-[2rem] border border-dashed border-[#d8d3c9] bg-white px-6 py-12 text-center sm:px-10 sm:py-16"
              data-gsap-item
            >
              <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#f0eeff] blur-2xl" />
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-[1.4rem] bg-[#f0eeff] text-2xl text-[#5146c8]">
                <FiShoppingBag />
              </div>
              <p className="relative mt-6 text-[10px] font-black uppercase tracking-[.2em] text-[#5146c8]">
                Nothing on the table yet
              </p>
              <h3 className="relative mt-2 text-2xl font-black tracking-[-.05em] sm:text-3xl">
                Your next favourite is on the menu.
              </h3>
              <p className="relative mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                Take a look around, pick a dish or two, and they’ll show up here
                ready for checkout.
              </p>
              <Link
                href="/menu"
                className="group relative mt-7 inline-flex items-center gap-3 rounded-2xl bg-[#5146c8] px-6 py-4 text-xs font-black uppercase tracking-[.12em] text-white transition hover:bg-[#4035b3]"
              >
                Explore the menu{" "}
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>
              <svg
                aria-hidden="true"
                viewBox="0 0 120 60"
                className="pointer-events-none absolute bottom-4 right-5 w-24 text-[#d7d2f2] sm:bottom-7 sm:right-8 sm:w-28"
              >
                <path
                  d="M4 46C24 8 45 8 62 31S92 54 116 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="4 7"
                  fill="none"
                />
                <circle cx="4" cy="46" r="3" fill="#5146C8" />
                <circle cx="116" cy="12" r="3" fill="#5146C8" />
              </svg>
            </div>
          ) : (
            <div className="grid gap-3.5">
              {cart.map((item, index) => (
                <article
                  key={item.id}
                  data-gsap-item
                  className="group relative flex gap-3.5 overflow-hidden rounded-[1.65rem] border border-[#e7e4dc] bg-white p-3.5 transition duration-300 hover:border-[#d0caf8] hover:shadow-[0_18px_45px_rgba(35,31,76,.06)] sm:gap-5 sm:p-4"
                >
                  <div className="relative h-[108px] w-[108px] shrink-0 overflow-hidden rounded-[1.15rem] bg-[#f0eeff] sm:h-32 sm:w-32 sm:rounded-[1.3rem]">
                    <FoodImage item={item} />
                    <span className="absolute bottom-2 left-2 z-10 rounded-full bg-white/90 px-2 py-1 text-[8px] font-black uppercase tracking-[.12em] text-[#5146c8] backdrop-blur">
                      Dastoor pick
                    </span>
                  </div>

                  <div className="flex min-w-0 flex-1 flex-col justify-between py-0.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-[9px] font-black uppercase tracking-[.16em] text-[#5146c8]">
                          {item.category || "Made with care"}
                        </p>
                        <h3 className="mt-1.5 line-clamp-2 text-base font-black leading-tight tracking-[-.035em] text-[#17172f] sm:text-lg">
                          {item.name}
                        </h3>
                        {item.description ? (
                          <p className="mt-1.5 hidden max-w-xl line-clamp-2 text-xs leading-5 text-slate-400 sm:block">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-transparent text-slate-400 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400"
                      >
                        <FiTrash2 />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-wrap items-end justify-between gap-3">
                      <div className="inline-flex items-center rounded-full border border-[#e7e4dc] bg-[#faf9f6] p-1">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          aria-label={`Decrease ${item.name} quantity`}
                          className="flex h-8 w-8 items-center justify-center rounded-full text-slate-600 transition hover:bg-[#eeecff] hover:text-[#5146c8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5146c8]"
                        >
                          <FiMinus size={13} />
                        </button>
                        <span
                          aria-live="polite"
                          className="w-8 text-center text-xs font-black tabular-nums"
                        >
                          {item.qty}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label={`Increase ${item.name} quantity`}
                          className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#5146c8] shadow-sm transition hover:bg-[#5146c8] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#5146c8]"
                        >
                          <FiPlus size={13} />
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="text-[9px] font-bold uppercase tracking-[.12em] text-slate-400">
                          Line total
                        </p>
                        <p className="mt-0.5 text-sm font-black tracking-[-.025em] text-[#17172f] sm:text-base">
                          Rs.{" "}
                          {formatPrice(
                            Number(item.price || 0) * Number(item.qty || 0),
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <Link
                href="/menu"
                className="group mt-1 inline-flex w-fit items-center gap-2 px-1 py-2 text-[10px] font-black uppercase tracking-[.15em] text-slate-500 transition hover:text-[#5146c8]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#e0dcd3] bg-white transition group-hover:border-[#cbc5ff] group-hover:bg-[#f0eeff]">
                  <FiPlus />
                </span>
                Add something else{" "}
                <FiChevronRight className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          )}
        </div>

        <aside
          data-gsap-checkout
          className="relative h-fit overflow-hidden rounded-[2rem] bg-[#201d48] p-5 text-white shadow-[0_22px_60px_rgba(32,29,72,.14)] sm:p-7 lg:sticky lg:top-6"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 300 260"
            className="pointer-events-none absolute -right-20 -top-20 w-64 text-white/[.07]"
          >
            <circle
              cx="150"
              cy="130"
              r="64"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
            />
            <circle
              cx="150"
              cy="130"
              r="91"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="3 8"
            />
            <circle
              cx="150"
              cy="130"
              r="118"
              stroke="currentColor"
              strokeWidth="1"
              fill="none"
            />
            <path
              d="M150 26V234M46 130H254"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>

          <div className="relative">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[10px] font-black uppercase tracking-[.2em] text-[#c8c3ff]">
                02 / Checkout
              </p>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[.07] text-lg text-[#c8c3ff]">
                <FiShoppingBag />
              </span>
            </div>
            <h2 className="mt-4 text-3xl font-black leading-[.95] tracking-[-.06em] sm:text-4xl">
              Let’s lock
              <br />
              it in.
            </h2>
            <p className="mt-3 max-w-xs text-xs leading-6 text-white/55">
              Where should we send your Dastoor favourites?
            </p>

            <form onSubmit={submitOrder} className="mt-7 grid gap-3.5">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                <label className="grid gap-1.5">
                  <span className="pl-1 text-[9px] font-black uppercase tracking-[.14em] text-white/55">
                    Your name
                  </span>
                  <input
                    required
                    disabled={!cart.length}
                    name="name"
                    autoComplete="name"
                    placeholder="Full name"
                    className="min-w-0 rounded-xl border border-white/10 bg-white/[.07] px-3.5 py-3.5 text-xs text-white outline-none transition placeholder:text-white/30 focus:border-[#a9a1ff] focus:bg-white/[.1] disabled:cursor-not-allowed disabled:opacity-40"
                  />
                </label>
                <label className="grid gap-1.5">
                  <span className="pl-1 text-[9px] font-black uppercase tracking-[.14em] text-white/55">
                    Phone number
                  </span>
                  <input
                    required
                    disabled={!cart.length}
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    placeholder="03xx xxxxxxx"
                    className="min-w-0 rounded-xl border border-white/10 bg-white/[.07] px-3.5 py-3.5 text-xs text-white outline-none transition placeholder:text-white/30 focus:border-[#a9a1ff] focus:bg-white/[.1] disabled:cursor-not-allowed disabled:opacity-40"
                  />
                </label>
              </div>

              <label className="grid gap-1.5">
                <span className="pl-1 text-[9px] font-black uppercase tracking-[.14em] text-white/55">
                  Delivery address
                </span>
                <input
                  required
                  disabled={!cart.length}
                  name="address"
                  autoComplete="street-address"
                  placeholder="House, street, nearby landmark"
                  className="rounded-xl border border-white/10 bg-white/[.07] px-3.5 py-3.5 text-xs text-white outline-none transition placeholder:text-white/30 focus:border-[#a9a1ff] focus:bg-white/[.1] disabled:cursor-not-allowed disabled:opacity-40"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="pl-1 text-[9px] font-black uppercase tracking-[.14em] text-white/55">
                  Area
                </span>
                <select
                  disabled={!cart.length}
                  name="area"
                  defaultValue="Gujranwala"
                  className="rounded-xl border border-white/10 bg-[#292653] px-3.5 py-3.5 text-xs text-white outline-none transition focus:border-[#a9a1ff] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <option value="Gujranwala">Gujranwala</option>
                  <option value="Nearby area">Nearby area</option>
                </select>
              </label>

              <label className="grid gap-1.5">
                <span className="pl-1 text-[9px] font-black uppercase tracking-[.14em] text-white/55">
                  A note for the kitchen{" "}
                  <span className="font-medium normal-case tracking-normal text-white/30">
                    · optional
                  </span>
                </span>
                <textarea
                  disabled={!cart.length}
                  name="note"
                  rows={2}
                  placeholder="Anything we should know?"
                  className="resize-none rounded-xl border border-white/10 bg-white/[.07] px-3.5 py-3.5 text-xs text-white outline-none transition placeholder:text-white/30 focus:border-[#a9a1ff] focus:bg-white/[.1] disabled:cursor-not-allowed disabled:opacity-40"
                />
              </label>

              <div className="my-1 border-t border-dashed border-white/15" />
              <div className="grid gap-3 text-xs">
                <div className="flex items-center justify-between text-white/55">
                  <span>Food subtotal</span>
                  <span className="font-bold tabular-nums text-white">
                    Rs. {formatPrice(subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-white/55">
                  <span className="inline-flex items-center gap-2">
                    <FiTruck className="text-[#c8c3ff]" /> Delivery
                  </span>
                  <span className="font-bold tabular-nums text-white">
                    {subtotal === 0
                      ? "—"
                      : delivery === 0
                        ? "Free"
                        : `Rs. ${formatPrice(delivery)}`}
                  </span>
                </div>
                <div className="mt-1 flex items-end justify-between gap-3 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-[.16em] text-[#c8c3ff]">
                      Total to pay
                    </p>
                    <p className="mt-1 text-[10px] text-white/40">
                      Final demo total
                    </p>
                  </div>
                  <p className="text-2xl font-black tracking-[-.05em] tabular-nums sm:text-3xl">
                    Rs. {formatPrice(total)}
                  </p>
                </div>
              </div>

              <button
                disabled={!cart.length}
                type="submit"
                className="group mt-2 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#c8c3ff] px-5 py-4 text-[10px] font-black uppercase tracking-[.16em] text-[#211e4c] transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Place demo order{" "}
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
              <p className="flex items-start justify-center gap-2 px-2 text-center text-[9px] leading-5 text-white/40">
                <FiClock className="mt-0.5 shrink-0" /> Demo checkout only — no
                payment or restaurant order is submitted.
              </p>
            </form>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-[9px] font-bold uppercase tracking-[.12em] text-white/35">
              <span>Good food.</span>
              <span className="h-1 w-1 rounded-full bg-[#a9a1ff]" />
              <span>Good tradition.</span>
            </div>
          </div>
        </aside>
      </section>

      <footer className="border-t border-[#e7e4dc] px-5 py-5 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-[9px] font-bold uppercase tracking-[.14em] text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <span>Dastoor · Good food. Good tradition.</span>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 transition hover:text-[#5146c8]"
          >
            Still deciding? Explore the menu <FiArrowRight />
          </Link>
        </div>
      </footer>
    </main>
  );
}
