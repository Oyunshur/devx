"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, BookOpen, Crown, Flag, Mountain, ScrollText } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Era = { date: string; title: string; body: string; tag: string; icon: typeof Crown; source: string; sourceLabel: string };
const ERAS: Era[] = [
  { date: "3rd c. BCE – 1st c. CE", title: "Xiongnu statehood", body: "The Xiongnu empire marks the beginning of statehood in the territory of present-day Mongolia. Its political and military world shaped the eastern Eurasian steppe long before the Mongol Empire.", tag: "Ancient steppe", icon: Mountain, source: "https://en.wikipedia.org/wiki/History_of_Mongolia#Xiongnu_(209_BC_%E2%80%93_93_AD)", sourceLabel: "History of Mongolia · Wikipedia" },
  { date: "1206", title: "A nation becomes an empire", body: "At a kurultai, Temüjin was proclaimed Genghis Khan and united the Mongol tribes. The new order reorganized steppe society and created the foundation for a transcontinental empire.", tag: "The great unification", icon: Crown, source: "https://en.wikipedia.org/wiki/Mongol_Empire#United_Mongol_Empire_(1206%E2%80%931260)", sourceLabel: "Mongol Empire · Wikipedia" },
  { date: "1235", title: "Karakorum rises", body: "Ögedei Khan established Karakorum as the imperial capital. The city became a meeting place for merchants, envoys, artisans, and religious communities from across Eurasia.", tag: "Imperial infrastructure", icon: ScrollText, source: "https://en.wikipedia.org/wiki/History_of_Mongolia#Mongol_Empire", sourceLabel: "History of Mongolia · Wikipedia" },
  { date: "1271–1368", title: "The Yuan dynasty", body: "Kublai Khan established the Yuan dynasty in China. After the Yuan fell in 1368, the Mongol court retreated to the plateau and the Northern Yuan period began.", tag: "A connected world", icon: BookOpen, source: "https://en.wikipedia.org/wiki/Mongol_Empire#Yuan_dynasty", sourceLabel: "Mongol Empire · Wikipedia" },
  { date: "1911 → 1990", title: "Independence, then democracy", body: "Mongolia declared independence from the Qing in 1911. The 1990 democratic revolution led to a multiparty system, a new constitution in 1992, and a transition to a market economy.", tag: "Modern Mongolia", icon: Flag, source: "https://en.wikipedia.org/wiki/History_of_Mongolia#Modern_period", sourceLabel: "History of Mongolia · Wikipedia" },
];

export default function TimelineSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(1);
  const era = ERAS[active];

  useGSAP(() => {
    gsap.from(".history-reveal", { y: 28, autoAlpha: 0, duration: .75, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 76%" } });
  }, { scope: sectionRef });

  return (
    <section id="timeline" ref={sectionRef} className="section-rule mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="history-reveal mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div><p className="eyebrow mb-4">Chronology · 02</p><h2 className="display-serif max-w-3xl text-5xl leading-[.95] text-[#f2eadc] sm:text-7xl">A history with<br /><em className="text-[#e0b45b]">many beginnings.</em></h2></div>
        <p className="max-w-md text-sm leading-7 text-[#c7aa78]">The word “Mongolia” contains more than one timeline. Here is a short reading route through the states, cities, and political turns that shaped the plateau.</p>
      </div>

      <div className="history-reveal grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="relative">
          <div className="absolute bottom-4 left-[15px] top-4 w-px bg-gradient-to-b from-[#e0b45b] via-[#e0b45b]/35 to-transparent" />
          <div className="space-y-2">
            {ERAS.map((item, index) => { const Icon = item.icon; return <button key={item.date} onClick={() => setActive(index)} className={`group relative flex w-full items-start gap-4 p-3 text-left transition-colors ${active === index ? "bg-[#e0b45b]/10" : "hover:bg-white/[.035]"}`}><span className={`relative z-10 mt-1 grid h-5 w-5 place-items-center rounded-full border ${active === index ? "border-[#e0b45b] bg-[#e0b45b] text-[#141816]" : "border-[#c7aa78]/45 bg-[#141816] text-[#c7aa78]"}`}><Icon size={11} /></span><span><span className={`block text-[10px] font-bold uppercase tracking-[.14em] ${active === index ? "text-[#e0b45b]" : "text-[#c7aa78]"}`}>{item.date}</span><span className="mt-1 block text-sm font-bold text-[#e8dfcf]">{item.title}</span></span></button>; })}
          </div>
        </div>

        <article className="relative min-h-[380px] overflow-hidden border border-white/10 bg-[#1d2420] p-6 sm:p-10">
          <div className="pattern-lines absolute inset-0 opacity-60" />
          <div className="relative flex h-full flex-col justify-between gap-12">
            <div className="flex items-start justify-between gap-4"><span className="border border-[#9e3f2d] px-3 py-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#e8dfcf]">{era.tag}</span><span className="display-serif text-6xl text-white/[.06] sm:text-8xl">0{active + 1}</span></div>
            <div className="max-w-2xl"><p className="mb-4 font-mono text-sm text-[#e0b45b]">{era.date}</p><h3 className="display-serif mb-5 text-4xl leading-none text-[#f2eadc] sm:text-6xl">{era.title}</h3><p className="max-w-xl text-sm leading-7 text-[#e8dfcf]/75 sm:text-base">{era.body}</p></div>
            <a href={era.source} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 self-start border-b border-[#c7aa78]/50 pb-1 text-[10px] font-bold uppercase tracking-[.14em] text-[#c7aa78] hover:text-[#e0b45b]">Read source · {era.sourceLabel} <ArrowUpRight size={13} /></a>
          </div>
        </article>
      </div>
      <p className="history-reveal mt-5 text-[10px] leading-5 text-[#c7aa78]/70">Historical summary adapted from Wikipedia pages on the <a className="underline underline-offset-2" href="https://en.wikipedia.org/wiki/History_of_Mongolia" target="_blank" rel="noreferrer">History of Mongolia</a> and the <a className="underline underline-offset-2" href="https://en.wikipedia.org/wiki/Mongol_Empire" target="_blank" rel="noreferrer">Mongol Empire</a>. Dates and framing are intentionally concise for this visual field guide.</p>
    </section>
  );
}
