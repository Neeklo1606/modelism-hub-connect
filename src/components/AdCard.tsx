import { useState } from "react";
import type { Ad } from "@/lib/mock";
import { StatusBadge } from "@/components/StatusBadge";
import { MapPin, Truck, MessageSquare } from "lucide-react";

export function AdCard({ ad }: { ad: Ad }) {
  const [showContact, setShowContact] = useState(false);
  const variant = ad.status === "Продаю" ? "sell" : ad.status === "Куплю" ? "buy" : "trade";
  return (
    <article className="overflow-hidden rounded-xl border bg-card transition-shadow hover:shadow-md">
      <div className="aspect-[4/3] bg-muted">
        <img src={ad.image} alt={ad.title} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 text-sm font-medium">{ad.title}</h3>
          <StatusBadge variant={variant}>{ad.status}</StatusBadge>
        </div>
        <div className="mt-2 font-display text-lg font-bold">{ad.price.toLocaleString("ru")} ₽</div>
        <div className="mt-1 text-[11px] text-muted-foreground">{ad.category} · {ad.subcategory}</div>
        <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ad.city}</span>
          <span className="flex items-center gap-1"><Truck className="h-3 w-3" />{ad.delivery.join(", ")}</span>
        </div>
        <div className="mt-3 flex gap-2">
          <button className="flex flex-1 items-center justify-center gap-1 rounded-lg bg-primary px-2 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">
            <MessageSquare className="h-3.5 w-3.5" /> Написать
          </button>
          <button onClick={() => setShowContact(!showContact)} className="flex-1 rounded-lg border px-2 py-1.5 text-xs hover:bg-muted">
            {showContact ? ad.contact : "Показать контакт"}
          </button>
        </div>
      </div>
    </article>
  );
}
