"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowDown, BookOpen, MapPin } from "lucide-react";

const TRIPADVISOR_HERO_IMAGE = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/57/99/c7/caption.jpg?w=1600&h=-1&s=1";

export default function HeroHeader() {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro
      .from(".hero-kicker", { autoAlpha: 0, y: 16, duration: .7 })
      .from(".hero-title", { autoAlpha: 0, y: 34, duration: 1.05 }, "-=.4")
      .from(".hero-copy", { autoAlpha: 0, y: 20, duration: .7 }, "-=.5")
      .from(".hero-stamp", { autoAlpha: 0, scale: .85, duration: .7 }, "-=.35");
  }, { scope: heroRef });

  return (
    <section id="top" ref={heroRef} className="relative flex min-h-[720px] items-end overflow-hidden px-5 pb-16 pt-36 sm:px-8 lg:min-h-[820px] lg:pb-24">
      <div className="hero-image absolute inset-0" style={{ backgroundImage: `url(${TRIPADVISOR_HERO_IMAGE})` }} />
      <div className="grain absolute inset-0 z-[1]" />
      <div className="absolute inset-x-0 bottom-0 z-[2] h-48 bg-gradient-to-t from-[#141816] to-transparent" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-end">
        <div className="max-w-4xl">
          <div className="hero-kicker eyebrow mb-5 flex items-center gap-3">
            <span className="h-px w-10 bg-[#e0b45b]" />
            A historian&apos;s field journal · central asia
          </div>
          <h1 className="hero-title display-serif max-w-4xl text-6xl leading-[.88] text-[#f2eadc] sm:text-8xl lg:text-[9.7rem]">
            The land<br />between <em className="text-[#e0b45b]">sky</em><br />and steppe.
          </h1>
          <div className="hero-copy mt-8 max-w-xl border-l-2 border-[#e0b45b] pl-5 text-sm leading-7 text-[#f2eadc]/80 sm:text-base">
            I came to Mongolia looking for an empire. I found a living architecture, a landscape that remembers, and a culture built to move with the seasons.
          </div>
          <a href="#3d-ger" className="hero-copy mt-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[.18em] text-[#e0b45b] transition-colors hover:text-white">
            Enter the ger study <ArrowDown size={15} />
          </a>
        </div>

        <aside className="hero-stamp floating-card border border-[#e8dfcf]/30 bg-[#141816]/75 p-5 backdrop-blur-md">
          <div className="mb-8 flex items-center justify-between text-[#c7aa78]">
            <BookOpen size={17} />
            <span className="text-[10px] font-bold uppercase tracking-[.16em]">Plate 01 / 06</span>
          </div>
          <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.13em] text-[#e0b45b]"><MapPin size={14} /> Mongolia</div>
          <p className="display-serif text-2xl leading-tight text-[#f2eadc]">A country read through its horizons.</p>
          <div className="mt-8 border-t border-white/15 pt-4 text-[10px] leading-5 text-[#c7aa78]">Travel notes anchored in the destinations highlighted by TripAdvisor&apos;s Mongolia guide.</div>
        </aside>
      </div>
    </section>
  );
}
