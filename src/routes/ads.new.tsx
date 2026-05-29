import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { categories } from "@/lib/mock";
import { PaymentModal } from "@/components/PaymentModal";
import { ImagePlus, X } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/ads/new")({
  head: () => ({ meta: [{ title: "Новое объявление — МоДелизМ Club" }] }),
  component: NewAdPage,
});

function NewAdPage() {
  const navigate = useNavigate();
  const [cat, setCat] = useState(categories[0]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [pay, setPay] = useState(false);

  const addPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const urls = files.slice(0, 10 - photos.length).map((f) => URL.createObjectURL(f));
    setPhotos([...photos, ...urls]);
  };

  return (
    <AppLayout rightColumn={false}>
      <div className="mx-auto max-w-2xl space-y-4">
        <header>
          <h1 className="font-display text-2xl font-bold">Новое объявление</h1>
          <p className="text-sm text-muted-foreground">Размещение — 20 ₽. Объявление пройдёт модерацию</p>
        </header>

        <form
          onSubmit={(e) => { e.preventDefault(); setPay(true); }}
          className="space-y-3 rounded-xl border bg-card p-4"
        >
          <Field label="Название"><input required className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary" placeholder="Двигатель ДВС 1:8" /></Field>
          <Field label="Описание"><textarea required rows={4} className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Цена, ₽"><input required type="number" min={0} className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary" /></Field>
            <Field label="Статус">
              <select className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
                <option>Продаю</option><option>Куплю</option><option>Обменяю</option>
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Категория">
              <select value={cat.id} onChange={(e) => setCat(categories.find((c) => c.id === e.target.value)!)} className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="Подкатегория">
              <select className="w-full rounded-lg border bg-background px-3 py-2 text-sm">
                {cat.subcategories.map((s) => <option key={s.id}>{s.name}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Город"><input required className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary" /></Field>
            <Field label="Контакт"><input required className="w-full rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary" placeholder="+7 ... или @telegram" /></Field>
          </div>

          <Field label="Способы доставки">
            <div className="flex flex-wrap gap-2 text-xs">
              {["Почта России", "СДЭК", "Яндекс Доставка", "Ozon", "Wildberries"].map((d) => (
                <label key={d} className="inline-flex items-center gap-1.5 rounded-lg border bg-background px-3 py-1.5 hover:bg-muted">
                  <input type="checkbox" defaultChecked={d === "СДЭК"} className="accent-primary" />{d}
                </label>
              ))}
            </div>
          </Field>

          <Field label={`Фото (${photos.length}/10)`}>
            <div className="flex flex-wrap gap-2">
              {photos.map((p, i) => (
                <div key={i} className="relative h-20 w-20 overflow-hidden rounded-lg border">
                  <img src={p} alt="" className="h-full w-full object-cover" />
                  <button type="button" onClick={() => setPhotos(photos.filter((_, j) => j !== i))} className="absolute right-0.5 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-black/60 text-white">
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              {photos.length < 10 && (
                <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border border-dashed text-xs text-muted-foreground hover:border-primary hover:text-primary">
                  <ImagePlus className="h-4 w-4" />
                  Добавить
                  <input type="file" accept="image/*" multiple onChange={addPhoto} className="hidden" />
                </label>
              )}
            </div>
          </Field>

          <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
            Оплатить и разместить — 20 ₽
          </button>
        </form>
      </div>

      <PaymentModal
        open={pay}
        onOpenChange={setPay}
        title="Размещение объявления"
        amount={20}
        onSuccess={() => { toast.success("Объявление отправлено на модерацию"); navigate({ to: "/ads" }); }}
      />
    </AppLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
