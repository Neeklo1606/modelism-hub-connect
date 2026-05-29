import { useState, useEffect } from "react";
import { banners } from "@/lib/mock";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function AdBanner() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 6000);
    return () => clearInterval(t);
  }, []);
  const b = banners[idx];
  return (
    <div className={`relative overflow-hidden rounded-xl bg-gradient-to-r ${b.color} text-white shadow-sm`}>
      <div className="absolute right-3 top-3 rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider backdrop-blur">Реклама</div>
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h3 className="font-display text-lg font-bold sm:text-xl">{b.title}</h3>
          <p className="mt-1 text-sm text-white/85">{b.text}</p>
          <p className="mt-1 text-[11px] text-white/60">Срок размещения {b.until}</p>
        </div>
        <button className="self-start rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-white/90 sm:self-auto">
          {b.cta}
        </button>
      </div>
      <div className="absolute bottom-2 left-2 flex gap-1">
        {banners.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-white" : "w-1.5 bg-white/40"}`} />
        ))}
      </div>
      <button onClick={() => setIdx((i) => (i - 1 + banners.length) % banners.length)} className="absolute left-1 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-1 hover:bg-white/20 sm:block">
        <ChevronLeft className="h-4 w-4" />
      </button>
      <button onClick={() => setIdx((i) => (i + 1) % banners.length)} className="absolute right-1 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-1 hover:bg-white/20 sm:block">
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
