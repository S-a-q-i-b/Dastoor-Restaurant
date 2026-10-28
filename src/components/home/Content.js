import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";

const categories = [
  {
    title: "Burgers",
    description: "Juicy stacks, crunchy edges and signature sauces.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    number: "01",
    accent: "from-[#312e81]/70",
  },
  {
    title: "Pizza",
    description: "Cheesy, loaded and baked hot for the table.",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=85",
    number: "02",
    accent: "from-[#312e81]/70",
  },
  {
    title: "Chicken",
    description: "Crispy bites, saucy wings and hearty plates.",
    image:
      "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=900&q=85",
    number: "03",
    accent: "from-[#312e81]/70",
  },
  {
    title: "Shakes",
    description: "Cold, creamy and made for the final sip.",
    image:
      "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=85",
    number: "04",
    accent: "from-[#312e81]/70",
  },
];

export default function Content() {
  return (
    <section
      id="menu"
      className="relative overflow-hidden bg-[#faf9f6] px-5 py-20 sm:px-8 sm:py-24 lg:px-10 lg:py-28"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section heading */}
        <div
          className="flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between"
          data-reveal
        >
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.25em] text-[#5146c8] sm:text-xs">
              <span className="h-px w-8 bg-[#5146c8]" />
              Explore the menu
            </div>

            <h2 className="mt-5 text-4xl font-black leading-[1.02] tracking-[-0.06em] text-[#17172f] sm:text-5xl lg:text-6xl">
              Come hungry.
              <span className="mt-1 block text-[#5146c8]">
                Leave happy.
              </span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-slate-500 sm:text-base sm:leading-8">
              From stacked burgers to cheesy pizza and creamy shakes,
              discover your next favorite and let the cravings lead.
            </p>
          </div>

          {/* View all */}
          <Link
            href="/menu"
            className="dastoor-btn group inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-[#e5e2dc] bg-white px-5 py-3.5 text-xs font-black uppercase tracking-[0.13em] text-[#292653] transition duration-300 hover:-translate-y-1 hover:border-[#cbc6f2] hover:bg-[#eeecff] hover:shadow-lg hover:shadow-[#5146c8]/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8]"
          >
            View full menu

            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#eeecff] text-[#5146c8] transition-colors duration-300 group-hover:bg-[#5146c8] group-hover:text-white">
              <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </span>
          </Link>
        </div>

        {/* Category cards */}
        <div className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={`/menu?category=${encodeURIComponent(category.title)}`}
              aria-label={`Explore ${category.title} on the menu`}
              data-reveal
              className="group relative overflow-hidden rounded-[1.8rem] border border-[#e9e6df] bg-white transition duration-500 hover:-translate-y-2 hover:border-[#cfc9ff] hover:shadow-[0_28px_70px_rgba(43,40,103,0.10)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5146c8] sm:rounded-[2rem]"
            >
              {/* Image */}
              <div className="relative h-[250px] overflow-hidden bg-[#eeecff] sm:h-[270px] lg:h-[250px] xl:h-[280px]">
                <Image
                  src={category.image}
                  alt={`${category.title} food`}
                  fill
                  unoptimized
                  sizes="(min-width: 1280px) 290px, (min-width: 1024px) 23vw, (min-width: 640px) 45vw, 90vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Cinematic image overlay */}
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 bg-gradient-to-t ${category.accent} via-transparent to-black/10 opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
                />

                {/* Number */}
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/15 text-[10px] font-black tracking-wider text-white backdrop-blur-md transition duration-300 group-hover:rotate-6 group-hover:bg-white group-hover:text-[#2b2867]">
                  {category.number}
                </span>

                {/* Image title */}
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <span className="inline-flex rounded-full border border-white/25 bg-white/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] text-white backdrop-blur-md">
                    Discover
                  </span>

                  <h3 className="mt-3 text-3xl font-black tracking-[-0.045em] text-white sm:text-4xl">
                    {category.title}
                  </h3>
                </div>
              </div>

              {/* Card content */}
              <div className="p-5 sm:p-6">
                <p className="min-h-[48px] text-sm leading-6 text-slate-500">
                  {category.description}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-[#eeedf1] pt-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#5146c8]">
                    Explore category
                  </span>

                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f0ff] text-[#5146c8] transition duration-300 group-hover:bg-[#5146c8] group-hover:text-white">
                    <FiArrowUpRight
                      size={19}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom note */}
        <div
          data-reveal
          className="mt-9 flex flex-col gap-3 border-t border-[#e8e5de] pt-6 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="text-xs leading-6 text-slate-500 sm:text-sm">
            Different cravings. One place to find your next favorite.
          </p>

          <Link
            href="/menu"
            className="group inline-flex w-fit items-center gap-2 text-xs font-black text-[#5146c8] transition-colors hover:text-[#2b2867]"
          >
            Discover everything

            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
