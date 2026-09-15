import { ArrowUpRight, Feather, Layers3, Quote, ScrollText } from "lucide-react";

export default function HistorianMonograph() {
  return (
    <section className="section-rule mx-auto max-w-7xl px-5 py-24 sm:px-8">
      <div className="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <div><p className="eyebrow mb-4">Curatorial note · 04</p><h2 className="display-serif max-w-xl text-5xl leading-[.95] text-[#f2eadc] sm:text-7xl">Read the<br /><em className="text-[#e0b45b]">landscape twice.</em></h2><div className="mt-8 flex gap-3 border-l border-[#9e3f2d] pl-5"><Quote size={20} className="shrink-0 text-[#e0b45b]" /><p className="max-w-md text-sm leading-7 text-[#c7aa78]">Once as a traveler—to notice distance, weather, and welcome. Then as a historian—to ask which states, migrations, and memories made that view possible.</p></div></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="border border-white/10 bg-[#1d2420] p-6 sm:col-span-2"><ScrollText className="mb-10 text-[#e0b45b]" size={25} /><p className="eyebrow mb-3">Archive / 01</p><h3 className="display-serif mb-3 text-3xl text-[#f2eadc]">History is not one straight line.</h3><p className="text-sm leading-7 text-[#c7aa78]">The historical section above follows Wikipedia’s concise account of the Xiongnu, the 1206 unification, Karakorum, the Yuan dynasty, and modern Mongolia. The dates are signposts—not a substitute for the archives.</p><a href="https://en.wikipedia.org/wiki/History_of_Mongolia" target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#e0b45b]">Open the historical source <ArrowUpRight size={13} /></a></div>
          <div className="border border-white/10 bg-[#263229] p-6"><Layers3 className="mb-9 text-[#c7aa78]" size={22} /><p className="eyebrow mb-3">Structure / 02</p><h3 className="display-serif mb-3 text-2xl text-[#f2eadc]">A civilization in layers</h3><p className="text-xs leading-6 text-[#c7aa78]">Ger, horse, route, monastery, capital: each layer changes how the steppe can be read.</p></div>
          <div className="border border-white/10 bg-[#263229] p-6"><Feather className="mb-9 text-[#c7aa78]" size={22} /><p className="eyebrow mb-3">Method / 03</p><h3 className="display-serif mb-3 text-2xl text-[#f2eadc]">Curiosity before certainty</h3><p className="text-xs leading-6 text-[#c7aa78]">Travel sources reveal what visitors notice. Historical sources help us ask what those impressions leave out.</p></div>
        </div>
      </div>
    </section>
  );
}
