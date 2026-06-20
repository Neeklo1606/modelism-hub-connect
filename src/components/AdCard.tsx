import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Truck, Bookmark, Eye, Heart, Clock, Tag } from "lucide-react";
import type { Ad } from "@/lib/mock";

const STATUS_STYLE: Record<Ad["status"], { bg: string; fg: string; label: string }> = {
  "Продаю":  { bg: "var(--accent-soft)",  fg: "var(--accent)",  label: "Продаю"  },
  "Куплю":   { bg: "var(--info-soft)",    fg: "var(--info)",    label: "Куплю"   },
  "Обменяю": { bg: "var(--warning-soft)", fg: "var(--warning)", label: "Обмен"   },
};

interface Props {
  ad: Ad;
  state?: "default" | "moderation" | "rejected";
}

export function AdCard({ ad, state = "default" }: Props) {
  const [saved, setSaved] = useState(false);
  const status = STATUS_STYLE[ad.status];
  const moderated = state === "moderation";
  const rejected = state === "rejected";

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-full"
      style={{ opacity: moderated ? 0.65 : 1 }}
    >
      <Link
        to="/ads/$id"
        params={{ id: ad.id }}
        className="flex h-full flex-col overflow-hidden transition-shadow gpu-accelerated"
        style={{
          background: "var(--background-elevated)",
          border: `1px solid ${rejected ? "var(--error)" : "var(--border)"}`,
          borderRadius: "var(--r-card)",
          boxShadow: "var(--shadow-card)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-card-hover)")}
        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "var(--shadow-card)")}
      >
        {/* Image */}
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: "4 / 3", background: "var(--background-surface)" }}>
          <motion.img
            src={ad.image}
            alt={ad.title}
            loading="lazy"
            width={800}
            height={600}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Status badge */}
          <span
            className="absolute left-[12px] top-[12px] inline-flex items-center gap-[6px] px-[10px] py-[5px] text-[11px] font-semibold uppercase tracking-wider"
            style={{ background: status.bg, color: status.fg, borderRadius: "var(--r-pill)", backdropFilter: "blur(6px)" }}
          >
            <Tag size={11} strokeWidth={2.5} />
            {status.label}
          </span>

          {/* Moderation badge */}
          {moderated && (
            <span
              className="absolute right-[12px] top-[12px] px-[10px] py-[5px] text-[11px] font-semibold"
              style={{ background: "var(--warning-soft)", color: "var(--warning)", borderRadius: "var(--r-pill)" }}
            >
              На модерации
            </span>
          )}
          {rejected && (
            <span
              className="absolute right-[12px] top-[12px] px-[10px] py-[5px] text-[11px] font-semibold"
              style={{ background: "var(--error-soft)", color: "var(--error)", borderRadius: "var(--r-pill)" }}
            >
              Отклонено
            </span>
          )}

          {/* Bookmark */}
          <button
            type="button"
            onClick={(e) => { e.preventDefault(); setSaved((v) => !v); }}
            aria-label="Сохранить"
            className="absolute bottom-[12px] right-[12px] grid h-[36px] w-[36px] place-items-center transition-transform"
            style={{
              background: "var(--background-elevated)",
              borderRadius: "var(--r-pill)",
              boxShadow: "var(--shadow-card)",
              color: saved ? "var(--accent)" : "var(--foreground-70)",
            }}
          >
            <Bookmark size={16} fill={saved ? "currentColor" : "none"} strokeWidth={2} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-[10px] p-[16px]">
          <h3
            className="text-[15px] font-semibold leading-[1.35]"
            style={{ color: "var(--foreground)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}
          >
            {ad.title}
          </h3>

          <div className="font-display text-[22px] font-bold leading-none" style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}>
            {ad.price.toLocaleString("ru")} ₽
          </div>

          <div className="text-[12px]" style={{ color: "var(--foreground-50)" }}>
            {ad.category} · {ad.subcategory}
            {ad.condition && <> · <span style={{ color: "var(--foreground-70)" }}>{ad.condition}</span></>}
          </div>

          <div className="flex flex-wrap items-center gap-x-[14px] gap-y-[6px] text-[12px]" style={{ color: "var(--foreground-70)" }}>
            <span className="inline-flex items-center gap-[4px]"><MapPin size={12} />{ad.city}</span>
            <span className="inline-flex items-center gap-[4px]"><Truck size={12} />{ad.delivery[0]}{ad.delivery.length > 1 && ` +${ad.delivery.length - 1}`}</span>
          </div>

          <div
            className="mt-auto flex items-center justify-between pt-[10px] text-[11px]"
            style={{ color: "var(--foreground-50)", borderTop: "1px solid var(--border)" }}
          >
            <div className="flex items-center gap-[12px]">
              <span className="inline-flex items-center gap-[4px]"><Eye size={11} />{ad.views ?? 0}</span>
              <span className="inline-flex items-center gap-[4px]"><Heart size={11} />{ad.likes ?? 0}</span>
            </div>
            <span className="inline-flex items-center gap-[4px]"><Clock size={11} />{ad.createdAt ?? "недавно"}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
