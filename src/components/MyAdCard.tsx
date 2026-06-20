import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Eye,
  Heart,
  MapPin,
  Pencil,
  Archive,
  Trash2,
  Upload,
  ImageOff,
  Clock,
} from "lucide-react";
import type { Ad } from "@/lib/mock";

export type MyAdStatus = "active" | "archived" | "moderation" | "rejected";

const STATUS_BADGE: Record<MyAdStatus, { bg: string; fg: string; border: string; label: string }> = {
  active:     { bg: "var(--success-soft)",   fg: "var(--success)",   border: "var(--success)",   label: "Активно"      },
  archived:   { bg: "var(--foreground-15)",  fg: "var(--foreground-50)", border: "var(--border)", label: "В архиве"    },
  moderation: { bg: "var(--warning-soft)",   fg: "var(--warning)",   border: "var(--warning)",   label: "На модерации" },
  rejected:   { bg: "var(--error-soft)",     fg: "var(--error)",     border: "var(--error)",     label: "Отклонено"    },
};

interface Props {
  ad: Ad;
  status: MyAdStatus;
  selected?: boolean;
  onSelect?: (id: string, checked: boolean) => void;
  onArchive?: (id: string) => void;
  onPublish?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function MyAdCard({ ad, status, selected, onSelect, onArchive, onPublish, onDelete }: Props) {
  const badge = STATUS_BADGE[status];
  const hero = ad.gallery?.[0] ?? ad.image;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.22, ease: [0.19, 1, 0.22, 1] }}
      className="flex items-stretch gap-[14px] p-[14px]"
      style={{
        background: "var(--background-surface)",
        border: `1px solid ${selected ? "var(--accent)" : "var(--border)"}`,
        borderRadius: "var(--r-card)",
        boxShadow: "var(--shadow-card)",
        transition: "border-color 180ms var(--ease-out-expo), box-shadow 180ms var(--ease-out-expo)",
      }}
    >
      {/* Select checkbox */}
      {onSelect && (
        <label
          className="flex items-start pt-[2px]"
          style={{ cursor: "pointer" }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="checkbox"
            checked={!!selected}
            onChange={(e) => onSelect(ad.id, e.target.checked)}
            className="h-[18px] w-[18px] cursor-pointer"
            style={{ accentColor: "var(--accent)" }}
            aria-label="Выбрать объявление"
          />
        </label>
      )}

      {/* Photo */}
      <Link
        to="/ads/$id"
        params={{ id: ad.id }}
        className="relative shrink-0 overflow-hidden"
        style={{
          width: 96,
          height: 96,
          borderRadius: "var(--r-card-sm)",
          background: "var(--background-surface-hover)",
        }}
      >
        {hero ? (
          <img src={hero} alt={ad.title} loading="lazy" className="h-full w-full object-cover" />
        ) : (
          <div className="grid h-full w-full place-items-center">
            <ImageOff size={22} style={{ color: "var(--foreground-30)" }} />
          </div>
        )}
      </Link>

      {/* Body */}
      <div className="flex min-w-0 flex-1 flex-col gap-[6px]">
        <div className="flex flex-wrap items-start justify-between gap-[8px]">
          <Link
            to="/ads/$id"
            params={{ id: ad.id }}
            className="text-[15px] font-semibold leading-[1.35] hover:underline"
            style={{
              color: "var(--foreground)",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {ad.title}
          </Link>
          <span
            className="inline-flex items-center whitespace-nowrap px-[10px] py-[3px] text-[11px] font-semibold"
            style={{
              background: badge.bg,
              color: badge.fg,
              border: `1px solid ${badge.border}`,
              borderRadius: "var(--r-pill)",
            }}
          >
            {badge.label}
          </span>
        </div>

        <div
          className="font-display text-[20px] font-bold leading-none"
          style={{ color: "var(--accent)" }}
        >
          {ad.price.toLocaleString("ru")} ₽
        </div>

        <div className="flex flex-wrap items-center gap-x-[14px] gap-y-[4px] text-[12px]" style={{ color: "var(--foreground-50)" }}>
          <span className="inline-flex items-center gap-[4px]"><MapPin size={12} /> {ad.city}</span>
          <span className="inline-flex items-center gap-[4px]"><Clock size={12} /> {ad.createdAt ?? "недавно"}</span>
          <span className="inline-flex items-center gap-[4px]"><Eye size={12} /> {ad.views ?? 0}</span>
          <span className="inline-flex items-center gap-[4px]"><Heart size={12} /> {ad.likes ?? 0}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 flex-col items-end justify-between gap-[6px]">
        <div className="flex items-center gap-[4px]">
          <Link
            to="/ads/$id"
            params={{ id: ad.id }}
            title="Редактировать"
            className="grid h-[34px] w-[34px] place-items-center transition-colors"
            style={{ color: "var(--foreground-50)", borderRadius: "var(--r-pill)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.background = "var(--accent-soft)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-50)"; e.currentTarget.style.background = "transparent"; }}
          >
            <Pencil size={16} />
          </Link>

          {status === "archived" || status === "rejected" ? (
            <button
              type="button"
              title="Опубликовать"
              onClick={() => onPublish?.(ad.id)}
              className="grid h-[34px] w-[34px] place-items-center transition-colors"
              style={{ color: "var(--foreground-50)", borderRadius: "var(--r-pill)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--success)"; e.currentTarget.style.background = "var(--success-soft)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-50)"; e.currentTarget.style.background = "transparent"; }}
            >
              <Upload size={16} />
            </button>
          ) : (
            <button
              type="button"
              title="Архивировать"
              onClick={() => onArchive?.(ad.id)}
              className="grid h-[34px] w-[34px] place-items-center transition-colors"
              style={{ color: "var(--foreground-50)", borderRadius: "var(--r-pill)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--warning)"; e.currentTarget.style.background = "var(--warning-soft)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-50)"; e.currentTarget.style.background = "transparent"; }}
            >
              <Archive size={16} />
            </button>
          )}

          <button
            type="button"
            title="Удалить"
            onClick={() => onDelete?.(ad.id)}
            className="grid h-[34px] w-[34px] place-items-center transition-colors"
            style={{ color: "var(--foreground-50)", borderRadius: "var(--r-pill)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "var(--error)"; e.currentTarget.style.background = "var(--error-soft)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "var(--foreground-50)"; e.currentTarget.style.background = "transparent"; }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
