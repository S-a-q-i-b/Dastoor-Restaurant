import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import {
  FiArrowRight,
  FiArrowUpRight,
  FiClock,
  FiMapPin,
} from "react-icons/fi";

const address = "Khokherki, Sialkot Road, Gujranwala, Punjab, Pakistan";

const mapQuery = encodeURIComponent(address);

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapQuery}`;

const whatsappUrl =
  "https://wa.me/923144672379?text=" +
  encodeURIComponent(
    "Assalam-o-Alaikum Dastoor! I need help finding your restaurant.",
  );

export default function LocationSection() {
  return (
    <section
      id="location"
      className="relative overflow-hidden bg-[#f7f7f4] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div
          data-reveal
          className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#5146c8] sm:text-xs">
              <span className="h-px w-8 bg-[#5146c8]" />
              Find your way to Dastoor
            </p>

            <h2 className="mt-5 max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.055em] text-[#17172f] sm:text-5xl lg:text-6xl">
              Good food is worth{" "}
              <span className="text-[#5146c8]">finding.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Your next food stop is in Gujranwala. Find our location, plan your
              route and come hungry.
            </p>
          </div>

          {/* Map label */}
          <div className="pointer-events-none absolute left-4 top-10 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-md sm:left-[-17] sm:top-40">
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

          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#e5e2dc] bg-white px-4 py-2.5 text-xs font-bold text-slate-600">
            <FiMapPin className="text-[#5146c8]" size={15} />
            Khokherki · Gujranwala
          </div>
        </div>

        {/* Main content */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:gap-7">
          {/* Location information card */}
          <div
            data-reveal
            className="relative isolate flex flex-col overflow-hidden rounded-[2rem] border border-[#e8e6e1] bg-white p-6 shadow-[0_15px_50px_rgba(23,23,47,0.035)] sm:p-8 lg:p-9"
          >
            {/* Decorative glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 -z-10 h-64 w-64 rounded-full bg-[#eeecff] blur-3xl"
            />

            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#e7e3ff] bg-[#f5f3ff] px-3.5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-[#5146c8]">
                <FiMapPin size={13} />
                Our location
              </span>

              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eeecff] text-[#5146c8]">
                <FiArrowUpRight size={21} />
              </span>
            </div>

            <h3 className="mt-7 max-w-md text-3xl font-black leading-[1.04] tracking-[-0.05em] text-[#17172f] sm:text-4xl">
              Come by the <span className="text-[#5146c8]">Dastoor table.</span>
            </h3>

            <p className="mt-4 text-sm leading-7 text-slate-500">
              We're located in Khokherki on Sialkot Road, Gujranwala. Stop by
              for a meal, pick up your order or enjoy a relaxed dinner with
              family and friends.
            </p>

            {/* Address */}
            <div className="mt-8 rounded-2xl border border-[#eeedf3] bg-[#faf9ff] p-4 sm:p-5">
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#5146c8] shadow-sm">
                  <FiMapPin size={18} />
                </span>

                <div className="min-w-0">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#5146c8]">
                    Restaurant address
                  </p>

                  <p className="mt-2 text-sm font-bold leading-6 text-[#292653]">
                    {address}
                  </p>

                  <a
                    href={directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-xs font-black text-[#5146c8] transition-colors hover:text-[#2b2867] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8]"
                  >
                    Get directions
                    <FiArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>

            {/* Opening hours */}
            <div className="mt-4 flex items-start gap-3.5 rounded-2xl border border-[#eeedf3] p-4 sm:p-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f3f8] text-[#5146c8]">
                <FiClock size={18} />
              </span>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-500">
                  Opening hours
                </p>

                <p className="mt-2 text-sm font-bold text-[#292653]">
                  Daily · 11:00 AM – 11:00 PM
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Please confirm holiday timings before visiting.
                </p>
              </div>
            </div>

            {/* Bottom actions */}
            <div className="mt-auto pt-8">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-between gap-4 rounded-2xl bg-[#5146c8] px-5 py-4 text-white transition-[background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-[#4036af] hover:shadow-[0_12px_30px_rgba(81,70,200,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#5146c8]"
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                    <FiMapPin size={19} />
                  </span>

                  <span className="text-sm font-black">
                    Open in Google Maps
                  </span>
                </span>

                <FiArrowUpRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-3.5 text-xs font-black text-emerald-800 transition-colors duration-200 hover:bg-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-emerald-600"
              >
                <FaWhatsapp size={17} />
                Need directions? Chat with us
                <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Google Maps */}
          <div
            data-reveal
            className="group relative isolate min-h-[420px] overflow-hidden rounded-[2rem] border border-[#e8e6e1] bg-[#eeecff] shadow-[0_25px_70px_rgba(23,23,47,0.08)] sm:min-h-[500px] lg:min-h-full"
          >
            <iframe
              title="Map showing the Dastoor Restaurant area in Khokherki, Gujranwala"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* Directions shortcut */}
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl border border-white/60 bg-white/95 px-4 py-3 text-xs font-black text-[#5146c8] shadow-xl backdrop-blur-md transition-colors duration-200 hover:bg-[#eeecff] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5146c8] sm:bottom-6 sm:right-6"
            >
              Get directions
              <FiArrowUpRight size={15} />
            </a>
          </div>
        </div>

        {/* Footer note */}
        <div
          data-reveal
          className="mt-7 flex flex-col gap-3 border-t border-[#e6e3dc] pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs leading-6 text-slate-500 sm:text-sm">
            Make the trip. Bring the appetite.
          </p>

          <Link
            href="/contact"
            className="group inline-flex w-fit items-center gap-2 text-xs font-black text-[#5146c8] transition-colors hover:text-[#2b2867]"
          >
            Contact Dastoor
            <FiArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
