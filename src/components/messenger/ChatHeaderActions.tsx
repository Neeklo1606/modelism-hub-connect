import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "@tanstack/react-router";
import { Phone, MoreHorizontal, Info, Search, Trash2, Ban, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  partnerId: string;
  partnerName: string;
}

export function ChatHeaderActions({ partnerId, partnerName }: Props) {
  const [open, setOpen] = useState(false);
  const [callOpen, setCallOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    if (!callOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCallOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [callOpen]);

  const goProfile = () => {
    setOpen(false);
    navigate({ to: "/user/$id", params: { id: partnerId } });
  };

  const block = () => {
    setOpen(false);
    toast.success(`${partnerName} заблокирован`);
  };

  const placeholder = (label: string) => () => {
    setOpen(false);
    toast(`${label}: будет доступно позже`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setCallOpen(true)}
        className="grid h-[36px] w-[36px] place-items-center rounded-full transition-colors hover:bg-[var(--background-surface)]"
        style={{ color: "var(--foreground-50)" }}
        aria-label="Позвонить"
      >
        <Phone size={18} />
      </button>

      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="grid h-[36px] w-[36px] place-items-center rounded-full transition-colors hover:bg-[var(--background-surface)]"
          style={{ color: "var(--foreground-50)" }}
          aria-label="Меню чата"
          aria-expanded={open}
        >
          <MoreHorizontal size={18} />
        </button>

        <AnimatePresence>
          {open && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, y: -6, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.96 }}
              transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-full z-[60] mt-[6px] w-[240px] overflow-hidden rounded-[12px] border"
              style={{
                background: "var(--background-elevated)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-float)",
              }}
            >
              <Item icon={Info} label="Информация" onClick={goProfile} />
              <Item icon={Search} label="Поиск в чате" onClick={placeholder("Поиск")} />
              <Item icon={Trash2} label="Очистить историю" onClick={placeholder("Очистка")} />
              <div className="border-t" style={{ borderColor: "var(--border)" }} />
              <Item icon={Ban} label="Заблокировать" onClick={block} danger />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {callOpen && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="fixed inset-0 z-[60]"
              style={{ background: "rgba(0,0,0,0.4)" }}
              onClick={() => setCallOpen(false)}
            />
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              role="dialog"
              aria-modal="true"
              className="fixed left-1/2 top-1/2 z-[60] w-[min(380px,90vw)] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[16px] border p-[24px]"
              style={{
                background: "var(--background-elevated)",
                borderColor: "var(--border)",
                boxShadow: "var(--shadow-float)",
              }}
            >
              <button
                type="button"
                onClick={() => setCallOpen(false)}
                className="absolute right-[12px] top-[12px] grid h-[32px] w-[32px] place-items-center rounded-full hover:bg-[var(--background-surface)]"
                style={{ color: "var(--foreground-50)" }}
                aria-label="Закрыть"
              >
                <X size={16} />
              </button>
              <div className="grid h-[56px] w-[56px] place-items-center rounded-full" style={{ background: "var(--accent-soft)", color: "var(--accent)" }}>
                <Phone size={26} />
              </div>
              <h3 className="mt-[16px] font-display text-[18px] font-bold" style={{ color: "var(--foreground)" }}>
                Звонки скоро появятся
              </h3>
              <p className="mt-[8px] text-[14px]" style={{ color: "var(--foreground-70)" }}>
                Голосовые и видеозвонки {partnerName} будут доступны в одном из ближайших обновлений.
              </p>
              <button
                type="button"
                onClick={() => setCallOpen(false)}
                className="mt-[20px] inline-flex h-[40px] items-center justify-center px-[18px] font-semibold"
                style={{ background: "var(--accent)", color: "white", borderRadius: 10, fontSize: 14 }}
              >
                Понятно
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function Item({
  icon: Icon,
  label,
  onClick,
  danger,
}: {
  icon: typeof Info;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      role="menuitem"
      type="button"
      onClick={onClick}
      className="flex w-full items-center gap-[10px] px-[14px] py-[10px] text-left text-[13px] transition-colors hover:bg-[var(--background-surface)]"
      style={{ color: danger ? "var(--error)" : "var(--foreground)" }}
    >
      <Icon className="h-[16px] w-[16px]" />
      {label}
    </button>
  );
}
