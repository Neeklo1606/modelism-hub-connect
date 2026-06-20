import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Gift } from "lucide-react";
import { toast } from "sonner";
import { AppLayout } from "@/components/layout/AppLayout";
import { PaymentModal } from "@/components/PaymentModal";
import { subscriptionPlans, type SubscriptionPlan } from "@/lib/mock";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "Подписка — МоДЕЛИЗМ Club" }] }),
  component: SubscriptionPage,
});

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

function SubscriptionPage() {
  const [pay, setPay] = useState<SubscriptionPlan | null>(null);
  const [promo, setPromo] = useState("");

  return (
    <AppLayout rightColumn={false}>
      <div className="mx-auto w-full max-w-[960px]">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          <span
            className="inline-block uppercase"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              letterSpacing: "2px",
              color: "var(--foreground-50)",
              padding: "4px 12px",
              background: "var(--accent-soft)",
              borderRadius: "var(--r-tag)",
            }}
          >
            ТАРИФЫ
          </span>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "var(--fs-h2)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--foreground)",
              marginTop: "16px",
            }}
          >
            Выберите подписку
          </h1>
          <p
            style={{
              fontSize: "var(--fs-body-lg)",
              lineHeight: 1.6,
              color: "var(--foreground-70)",
              maxWidth: "600px",
              marginTop: "12px",
            }}
          >
            Присоединяйтесь к сообществу моделистов. Все тарифы включают доступ к чатам, публикациям и объявлениям.
          </p>
        </motion.div>

        {/* Tariff grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
          style={{ gap: "16px", marginTop: "32px" }}
        >
          {subscriptionPlans.map((p) => (
            <TariffCard key={p.id} plan={p} onSelect={() => setPay(p)} />
          ))}
        </motion.div>

        {/* Promocode */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} style={{ marginTop: "32px", maxWidth: "480px", display: "flex", gap: "12px" }}>
          <input
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
            placeholder="Введите промокод"
            className="flex-1 outline-none"
            style={{
              height: "48px",
              background: "var(--background-elevated)",
              border: "1.5px solid var(--border)",
              borderRadius: "var(--r-input)",
              padding: "0 16px",
              fontSize: "14px",
              color: "var(--foreground)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--accent)";
              e.currentTarget.style.boxShadow = "var(--shadow-glow-accent)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <button
            onClick={() => {
              if (!promo.trim()) return toast.error("Введите промокод");
              toast.success("Промокод применён! Скидка 20%");
            }}
            style={{
              height: "48px",
              padding: "0 24px",
              background: "var(--foreground)",
              color: "var(--background)",
              fontWeight: 600,
              fontSize: "14px",
              borderRadius: "var(--r-button)",
            }}
            className="transition-opacity hover:opacity-80"
          >
            Применить
          </button>
        </motion.div>

        {/* One-time ad */}
        <div style={{ marginTop: "48px", paddingTop: "32px", borderTop: "1px solid var(--border)" }}>
          <div
            className="flex flex-col items-start gap-[16px] md:flex-row md:items-center md:justify-between"
            style={{
              background: "var(--background-elevated)",
              borderRadius: "var(--r-card-lg)",
              padding: "24px",
            }}
          >
            <div>
              <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "var(--fs-h4)", color: "var(--foreground)" }}>
                Только объявления
              </h4>
              <p style={{ fontSize: "14px", color: "var(--foreground-50)", marginTop: "4px", maxWidth: "440px" }}>
                Разовое размещение одного объявления. Без подписки, без обязательств.
              </p>
            </div>
            <div className="text-right">
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "28px", color: "var(--foreground)" }}>
                100 ₽
              </div>
              <button
                onClick={() => setPay({ id: "single", name: "Разовое объявление", price: 100, periodLabel: "1 размещение", features: [] })}
                style={{
                  marginTop: "8px",
                  width: "140px",
                  height: "40px",
                  background: "var(--accent)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "13px",
                  borderRadius: "var(--r-button)",
                }}
                className="transition-colors"
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--accent-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--accent)")}
              >
                Разместить
              </button>
            </div>
          </div>
        </div>

        {/* Free ad counter */}
        <div
          style={{
            marginTop: "32px",
            background: "var(--accent-soft)",
            borderRadius: "var(--r-card)",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <Gift size={24} style={{ color: "var(--accent)", flexShrink: 0 }} />
          <div style={{ fontSize: "14px", fontWeight: 500, color: "var(--foreground)", flex: "0 0 auto" }} className="hidden sm:block">
            Осталось <b>3</b> бесплатных размещения в этом месяце
          </div>
          <div style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }} className="sm:hidden">
            3 из 5 размещений
          </div>
          <div style={{ flex: 1, height: "6px", background: "var(--background-surface)", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: "60%", background: "var(--accent)", borderRadius: "3px" }} />
          </div>
        </div>
      </div>

      <PaymentModal
        open={!!pay}
        onOpenChange={(v) => !v && setPay(null)}
        title={pay ? `Оплата тарифа «${pay.name}»` : ""}
        amount={pay?.price ?? 0}
      />
    </AppLayout>
  );
}

function TariffCard({ plan, onSelect }: { plan: SubscriptionPlan; onSelect: () => void }) {
  const isBest = plan.isBestValue;
  const accentBtn = plan.accent || plan.isPopular || plan.isBestValue;

  return (
    <motion.article
      variants={fadeInUp}
      className="relative flex flex-col gpu-accelerated"
      style={{
        background: isBest
          ? "linear-gradient(135deg, var(--accent-soft) 0%, var(--background-elevated) 40%)"
          : "var(--background-elevated)",
        border: isBest ? "2px solid var(--accent)" : "1px solid var(--border)",
        borderRadius: "var(--r-card)",
        padding: "24px 20px",
        overflow: "hidden",
      }}
    >
      {isBest && (
        <span
          className="absolute uppercase"
          style={{
            top: "16px",
            right: "16px",
            background: "var(--accent)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "11px",
            letterSpacing: "1px",
            padding: "4px 10px",
            borderRadius: "var(--r-tag)",
          }}
        >
          Лучший выбор
        </span>
      )}

      <h3 style={{ fontWeight: isBest ? 700 : 600, fontSize: "18px", color: isBest ? "var(--accent)" : "var(--foreground)" }}>
        {plan.name}
        {plan.isPopular && (
          <span
            style={{
              fontSize: "10px",
              fontWeight: 500,
              background: "var(--accent-soft)",
              color: "var(--accent)",
              padding: "2px 8px",
              borderRadius: "var(--r-tag)",
              marginLeft: "8px",
            }}
          >
            Популярный
          </span>
        )}
      </h3>

      <div style={{ marginTop: "12px", display: "flex", alignItems: "baseline", gap: "4px", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "36px", color: isBest ? "var(--accent)" : "var(--foreground)" }}>
          {plan.price} ₽
        </span>
        <span style={{ fontSize: "14px", color: "var(--foreground-50)" }}>/ {plan.periodLabel}</span>
      </div>
      {plan.savingsLabel && (
        <span
          style={{
            display: "inline-block",
            background: "var(--success-soft)",
            color: "var(--success)",
            fontSize: "11px",
            fontWeight: 600,
            padding: "2px 6px",
            borderRadius: "var(--r-tag)",
            marginTop: "6px",
            width: "fit-content",
          }}
        >
          {plan.savingsLabel}
        </span>
      )}

      <ul style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        {plan.features.map((f) => (
          <li key={f} style={{ display: "flex", gap: "8px", alignItems: "flex-start", fontSize: "13px", color: "var(--foreground-70)" }}>
            <Check size={14} style={{ color: "var(--success)", flexShrink: 0, marginTop: "3px" }} />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onSelect}
        style={{
          marginTop: "20px",
          width: "100%",
          height: isBest ? "48px" : "44px",
          background: accentBtn ? "var(--accent)" : "transparent",
          color: accentBtn ? "#fff" : "var(--foreground)",
          border: accentBtn ? "none" : "1.5px solid var(--border)",
          fontWeight: isBest ? 700 : 600,
          fontSize: isBest ? "15px" : "14px",
          borderRadius: "var(--r-button)",
          boxShadow: isBest ? "var(--shadow-glow-accent)" : "none",
          transition: "background 200ms ease, border-color 200ms ease",
        }}
        onMouseEnter={(e) => {
          if (accentBtn) e.currentTarget.style.background = "var(--accent-hover)";
          else {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.background = "var(--accent-soft)";
          }
        }}
        onMouseLeave={(e) => {
          if (accentBtn) e.currentTarget.style.background = "var(--accent)";
          else {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "transparent";
          }
        }}
      >
        Выбрать
      </motion.button>
    </motion.article>
  );
}
