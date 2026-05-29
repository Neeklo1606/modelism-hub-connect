import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { tariffs } from "@/lib/mock";
import { Check } from "lucide-react";
import { PaymentModal } from "@/components/PaymentModal";
import type { Tariff } from "@/lib/mock";

export const Route = createFileRoute("/subscription")({
  head: () => ({ meta: [{ title: "Подписка — МоДелизМ Club" }] }),
  component: SubscriptionPage,
});

function SubscriptionPage() {
  const [pay, setPay] = useState<Tariff | null>(null);
  return (
    <AppLayout rightColumn={false}>
      <div className="space-y-6">
        <header className="text-center">
          <h1 className="font-display text-3xl font-bold">Подписка</h1>
          <p className="mt-1 text-sm text-muted-foreground">Полный доступ ко всем функциям сообщества</p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tariffs.map((t) => (
            <article key={t.id} className={`relative flex flex-col rounded-2xl border bg-card p-5 ${t.popular ? "border-primary shadow-lg" : ""}`}>
              {t.popular && <span className="absolute -top-2 left-4 rounded-full bg-primary px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary-foreground">Популярный</span>}
              <h3 className="font-display text-lg font-semibold">{t.name}</h3>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold">{t.price}</span>
                <span className="text-sm text-muted-foreground">₽ / {t.period}</span>
              </div>
              <ul className="mt-4 space-y-1.5 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />{f}</li>
                ))}
              </ul>
              <button
                onClick={() => setPay(t)}
                className={`mt-5 rounded-lg py-2 text-sm font-medium ${t.popular ? "bg-primary text-primary-foreground hover:opacity-90" : "border hover:bg-muted"}`}
              >
                Выбрать
              </button>
            </article>
          ))}
        </div>
      </div>
      <PaymentModal
        open={!!pay}
        onOpenChange={(v) => !v && setPay(null)}
        title={`Подписка «${pay?.name}»`}
        amount={pay?.price ?? 0}
      />
    </AppLayout>
  );
}
