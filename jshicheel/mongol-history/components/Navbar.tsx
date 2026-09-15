"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  ["Ger anatomy", "#3d-ger"],
  ["History", "#timeline"],
  ["Field guide", "#field-guide"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#141816]/75 px-5 py-4 backdrop-blur-xl sm:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <a href="#top" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-[#e0b45b]/70 text-sm text-[#e0b45b]">ᠮ</span>
          <span>
            <span className="block text-[11px] font-bold uppercase tracking-[.24em] text-[#e8dfcf]">Field notes</span>
            <span className="block text-[10px] tracking-[.14em] text-[#c7aa78]">MONGOLIA · 2026</span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-xs font-bold uppercase tracking-[.16em] text-[#c7aa78] md:flex">
          {NAV_ITEMS.map(([label, href]) => (
            <a key={href} href={href} className="transition-colors hover:text-[#e0b45b]">{label}</a>
          ))}
          <a className="border border-[#e0b45b]/60 px-4 py-2 text-[#e0b45b] transition-colors hover:bg-[#e0b45b] hover:text-[#141816]" href="https://www.tripadvisor.com/Tourism-g293955-Mongolia-Vacations.html" target="_blank" rel="noreferrer">Travel source ↗</a>
        </nav>

        <button className="grid h-10 w-10 place-items-center border border-white/10 text-[#e8dfcf] md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>

      {open && (
        <nav className="mx-auto mt-4 grid max-w-7xl gap-1 border-t border-white/10 pt-3 text-xs font-bold uppercase tracking-[.16em] text-[#c7aa78] md:hidden">
          {NAV_ITEMS.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} className="px-2 py-3 hover:text-[#e0b45b]">{label}</a>
          ))}
          <a className="px-2 py-3 text-[#e0b45b]" href="https://www.tripadvisor.com/Tourism-g293955-Mongolia-Vacations.html" target="_blank" rel="noreferrer">Travel source ↗</a>
        </nav>
      )}
    </header>
  );
}
