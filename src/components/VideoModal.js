"use client";

import { useEffect } from "react";
import { FiX } from "react-icons/fi";

export default function VideoModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-stone-950/80 px-4 py-8 backdrop-blur-md"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close video"
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-white/25"
        >
          <FiX />
        </button>
        <div className="aspect-video">
          <iframe
            className="h-full w-full"
            src="https://www.youtube.com/embed/BxaATf3g0rw?autoplay=1&rel=0"
            title="Burger making video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
