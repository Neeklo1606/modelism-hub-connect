import { banners } from "@/lib/mock";

export function AdBanner() {
  return (
    <div className="-mx-3 lg:mx-0">
      <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 lg:px-0 [scrollbar-width:thin]">
        {banners.map((b) => (
          <article
            key={b.id}
            className={`relative flex min-w-[85%] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-xl bg-gradient-to-br ${b.color} p-5 text-white shadow-sm sm:min-w-[420px]`}
          >
            <span className="absolute left-3 top-3 rounded-md bg-black/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider backdrop-blur">
              Реклама
            </span>
            <div className="mt-6">
              <h3 className="font-display text-lg font-bold sm:text-xl">{b.title}</h3>
              <p className="mt-1 text-sm text-white/85">{b.text}</p>
              <p className="mt-1 text-[11px] text-white/60">Срок размещения {b.until}</p>
            </div>
            <button className="mt-4 self-start rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-white/90">
              Подробнее
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
