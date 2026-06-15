import { useState } from "react";
import type { Post } from "@/lib/mock";
import { userById } from "@/lib/mock";
import { Heart, MessageCircle, Share2, Eye, Bookmark } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export function PostCard({ post }: { post: Post }) {
  const author = userById(post.authorId);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(post.likes);

  const isLong = post.text.length > 160;
  const shown = !isLong || expanded ? post.text : post.text.slice(0, 160) + "…";

  return (
    <article className="overflow-hidden border bg-card sm:rounded-xl">
      <header className="flex items-center gap-3 p-4">
        <img src={author.avatar} alt={author.name} className="h-10 w-10 rounded-full" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{author.name}</span>
            {post.status === "moderation" && <StatusBadge variant="moderation">На модерации</StatusBadge>}
          </div>
          <div className="text-xs text-muted-foreground">{post.date} · {post.category}</div>
        </div>
      </header>

      <button
        type="button"
        onClick={() => isLong && setExpanded((v) => !v)}
        className="block w-full px-4 pb-3 text-left"
      >
        <h3 className="font-display text-base font-semibold">{post.title}</h3>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground">
                #{t}
              </span>
            ))}
          </div>
        )}
        <p className="mt-2 whitespace-pre-line text-sm text-foreground/85">{shown}</p>
        {isLong && (
          <span className="mt-1 inline-block text-xs font-medium text-primary">
            {expanded ? "Свернуть" : "Читать полностью"}
          </span>
        )}
      </button>

      {post.image && (
        <img src={post.image} alt={post.title} loading="lazy" className="aspect-[4/3] w-full object-cover sm:aspect-video" />
      )}

      <footer className="flex items-center gap-1 px-2 py-2 text-sm text-muted-foreground">
        <button
          onClick={() => { setLiked(!liked); setLikes(likes + (liked ? -1 : 1)); }}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 hover:bg-muted ${liked ? "text-primary" : ""}`}
        >
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} /> {likes}
        </button>
        <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 hover:bg-muted">
          <MessageCircle className="h-4 w-4" /> {post.comments}
        </button>
        <button
          onClick={() => setSaved((v) => !v)}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 hover:bg-muted ${saved ? "text-primary" : ""}`}
          title="Сохранить"
        >
          <Bookmark className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
        </button>
        <div className="ml-auto flex items-center gap-3 pr-2">
          <span className="hidden items-center gap-1 text-xs sm:flex">
            <Eye className="h-3.5 w-3.5" /> {post.views?.toLocaleString("ru-RU") ?? 0}
          </span>
          <button className="hidden items-center gap-1.5 rounded-md px-3 py-1.5 hover:bg-muted sm:flex">
            <Share2 className="h-4 w-4" /> Поделиться
          </button>
          <button className="rounded-md p-1.5 hover:bg-muted sm:hidden">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </article>
  );
}
