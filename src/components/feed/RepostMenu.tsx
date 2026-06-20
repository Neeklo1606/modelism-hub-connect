import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repeat2, Share2, MessageSquare, Link2, Check } from "lucide-react";

interface Props {
  reposted: boolean;
  count: number;
  onRepost: () => void;
}

export function RepostMenu({ reposted, count, onRepost }: Props) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const copyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-[6px] rounded-[10px] px-[10px] py-[6px] text-[13px] transition-colors"
        style={{
          color: reposted ? "var(--accent)" : "var(--foreground-70)",
          background: open ? "var(--background-surface)" : "transparent",
        }}
      >
        <Repeat2 className="h-[16px] w-[16px]" />
        {count > 0 && <span>{count}</span>}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full left-0 z-30 mb-[8px] w-[220px] overflow-hidden rounded-[12px] border"
            style={{
              background: "var(--background-elevated)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-float)",
            }}
          >
            <button
              onClick={() => {
                onRepost();
                setOpen(false);
              }}
              className="flex w-full items-center gap-[10px] px-[14px] py-[10px] text-left text-[13px] transition-colors hover:bg-[var(--background-surface)]"
              style={{ color: "var(--foreground)" }}
            >
              <Repeat2 className="h-[16px] w-[16px]" style={{ color: "var(--accent)" }} />
              {reposted ? "Отменить репост" : "Репост в ленту"}
            </button>
            <button
              className="flex w-full items-center gap-[10px] px-[14px] py-[10px] text-left text-[13px] hover:bg-[var(--background-surface)]"
              style={{ color: "var(--foreground)" }}
            >
              <MessageSquare className="h-[16px] w-[16px]" style={{ color: "var(--foreground-70)" }} />
              Отправить в сообщения
            </button>
            <button
              onClick={copyLink}
              className="flex w-full items-center gap-[10px] px-[14px] py-[10px] text-left text-[13px] hover:bg-[var(--background-surface)]"
              style={{ color: "var(--foreground)" }}
            >
              {copied ? (
                <Check className="h-[16px] w-[16px]" style={{ color: "var(--success)" }} />
              ) : (
                <Link2 className="h-[16px] w-[16px]" style={{ color: "var(--foreground-70)" }} />
              )}
              {copied ? "Скопировано" : "Скопировать ссылку"}
            </button>
            <div className="border-t" style={{ borderColor: "var(--border)" }} />
            <button
              className="flex w-full items-center gap-[10px] px-[14px] py-[10px] text-left text-[13px] hover:bg-[var(--background-surface)]"
              style={{ color: "var(--foreground)" }}
            >
              <Share2 className="h-[16px] w-[16px]" style={{ color: "var(--foreground-70)" }} />
              Внешние сети
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
