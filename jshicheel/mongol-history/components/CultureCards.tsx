"use client";
/* External source imagery is intentionally rendered as plain img elements so the CDN can fail over cleanly. */
/* eslint-disable @next/next/no-img-element */

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, Compass, MapPin } from "lucide-react";

const FALLBACK_IMAGE = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Mongolian_Ger.jpg/1280px-Mongolian_Ger.jpg";
const DESTINATIONS = [
  { title: "Gobi Desert", place: "Өмнөговь", type: "Desert / expedition", text: "TripAdvisor’s guide points travelers toward a southern landscape where dunes, fossil country, and camel routes share the same horizon.", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/57/9a/45/caption.jpg?w=900&h=600&s=1" },
  { title: "Gorkhi-Terelj", place: "Улаанбаатарын ойролцоо", type: "National park", text: "Granite formations, open grassland, and an easy first encounter with the steppe make Terelj a popular gateway from Ulaanbaatar.", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/57/9a/63/caption.jpg?w=900&h=600&s=1" },
  { title: "Khongoryn Els", place: "Говийн элсэн манхан", type: "Sand dunes", text: "The “Singing Sands” are listed among Mongolia’s essential places to experience scale, wind, and the movement of desert light.", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/57/9a/90/caption.jpg?w=900&h=600&s=1" },
  { title: "Khövsgöl Nuur", place: "Хөвсгөл нуур", type: "Lake / north", text: "Far north, the lake offers a counterpoint to the Gobi: clear water, taiga edges, and a slower pastoral rhythm.", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2a/57/9b/08/caption.jpg?w=900&h=600&s=1" },
];

export default function CultureCards() {
  const sectionRef = useRef<HTMLElement>(null);
  useGSAP(() => { gsap.from(".destination-card", { y: 30, autoAlpha: 0, duration: .75, stagger: .12, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } }); }, { scope: sectionRef });

  return (
    <section id="field-guide" ref={sectionRef} className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="eyebrow mb-4">Field guide · 03</p><h2 className="display-serif text-5xl leading-none text-[#f2eadc] sm:text-7xl">Four ways into<br /><em className="text-[#e0b45b]">the country.</em></h2></div><p className="max-w-sm text-sm leading-6 text-[#c7aa78]">A travel reading list drawn from Tripadvisor&apos;s Mongolia destination overview: wilderness first, then the human scale of place.</p></div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {DESTINATIONS.map((destination, index) => <article key={destination.title} className="destination-card group relative min-h-[410px] overflow-hidden border border-white/10 bg-[#263229]">
          <img src={destination.image} alt={`${destination.title} in Mongolia`} className="absolute inset-0 h-full w-full object-cover opacity-65 transition duration-700 group-hover:scale-105 group-hover:opacity-80" onError={(event) => { event.currentTarget.src = FALLBACK_IMAGE; }} />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141816] via-[#141816]/35 to-transparent" />
          <div className="relative flex min-h-[410px] flex-col justify-between p-5"><div className="flex justify-between text-[#e0b45b]"><span className="text-[10px] font-bold uppercase tracking-[.16em]">0{index + 1}</span><Compass size={16} /></div><div><div className="mb-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] text-[#e0b45b]"><MapPin size={12} /> {destination.type}</div><h3 className="display-serif text-3xl leading-none text-[#f2eadc]">{destination.title}</h3><p className="mt-2 text-xs font-bold text-[#c7aa78]">{destination.place}</p><p className="mt-4 text-xs leading-5 text-[#e8dfcf]/75">{destination.text}</p><a href="https://www.tripadvisor.com/Tourism-g293955-Mongolia-Vacations.html" target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#e0b45b]">Tripadvisor guide <ArrowUpRight size={13} /></a></div></div>
        </article>)}
      </div>
      <p className="mt-5 text-[10px] leading-5 text-[#c7aa78]/70">Destination names and categories are based on the <a className="underline underline-offset-2" href="https://www.tripadvisor.com/Tourism-g293955-Mongolia-Vacations.html" target="_blank" rel="noreferrer">Tripadvisor Mongolia travel guide</a>. Images are loaded from Tripadvisor&apos;s public media CDN when available and fall back to a Wikimedia Commons ger photograph.</p>
    </section>
  );
}
