import { useState } from "react";
import { ImagePlus, Send } from "lucide-react";
import { toast } from "sonner";
import { categories, me } from "@/lib/mock";

export function CreatePostForm({ onCreate }: { onCreate?: (text: string, cat: string) => void }) {
  const [text, setText] = useState("");
  const [cat, setCat] = useState(categories[0].name);

  const submit = () => {
    if (!text.trim()) {
      toast.error("Введите текст публикации");
      return;
    }
    onCreate?.(text, cat);
    toast.success("Публикация отправлена на модерацию");
    setText("");
  };

  return (
    <div className="rounded-xl border bg-card p-4">
      <div className="flex gap-3">
        <img src={me.avatar} alt="" className="h-10 w-10 rounded-full" />
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что нового в проекте?"
          rows={2}
          className="min-h-[44px] flex-1 resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
        />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted">
          <ImagePlus className="h-3.5 w-3.5" /> Фото
        </button>
        <select
          value={cat}
          onChange={(e) => setCat(e.target.value)}
          className="rounded-lg border bg-background px-3 py-1.5 text-xs"
        >
          {categories.map((c) => <option key={c.id}>{c.name}</option>)}
        </select>
        <button onClick={submit} className="ml-auto inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90">
          <Send className="h-3.5 w-3.5" /> Опубликовать
        </button>
      </div>
    </div>
  );
}
