import { ArrowUpRight, CircleDashed } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#101411] px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
        <div><div className="mb-3 flex items-center gap-2 text-[#e0b45b]"><CircleDashed size={16} /><span className="text-[10px] font-bold uppercase tracking-[.2em]">End of field notes</span></div><p className="display-serif max-w-md text-3xl leading-none text-[#f2eadc]">The horizon is an archive.</p><p className="mt-3 text-xs text-[#c7aa78]">Built as a responsive study of Mongolia with Next.js, Three.js, and GSAP.</p></div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 text-[10px] font-bold uppercase tracking-[.14em] text-[#c7aa78]"><a className="hover:text-[#e0b45b]" href="https://www.tripadvisor.com/Tourism-g293955-Mongolia-Vacations.html" target="_blank" rel="noreferrer">Tripadvisor travel guide <ArrowUpRight size={12} className="ml-1 inline" /></a><a className="hover:text-[#e0b45b]" href="https://en.wikipedia.org/wiki/History_of_Mongolia" target="_blank" rel="noreferrer">Wikipedia history <ArrowUpRight size={12} className="ml-1 inline" /></a></div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-4 text-[10px] uppercase tracking-[.12em] text-[#c7aa78]/55">A visual field guide · Mongolia · {new Date().getFullYear()}</div>
    </footer>
  );
}
