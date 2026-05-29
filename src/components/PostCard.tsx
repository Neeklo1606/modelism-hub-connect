import { useState } from "react";
import type { Post } from "@/lib/mock";
import { userById } from "@/lib/mock";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export function PostCard({ post }: { post: Post }) {
  const author = userById(post.authorId);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  return (
    <article className="rounded-xl border bg-card">
      <header className="flex items-center gap-3 p-4">
        <img src={author.avatar} alt={author.name} className="h-10 w-10 rounded-full" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm">{author.name}</span>
            {post.status === "moderation" && <StatusBadge variant="moderation">На модерации</StatusBadge>}
          </div>
          <div className="text-xs text-muted-foreground">{post.date} · {post.category}</div>
        </div>
      </header>
      <div className="px-4 pb-3">
        <h3 className="font-display text-base font-semibold">{post.title}</h3>
        <p className="mt-1 text-sm text-foreground/85">{post.text}</p>
      </div>
      {post.image && (
        <img src={post.image} alt={post.title} loading="lazy" className="aspect-[4/3] w-full object-cover sm:aspect-video" />
      )}
      <footer className="flex items-center gap-1 px-2 py-2 text-sm text-muted-foreground">
        <button onClick={() => { setLiked(!liked); setLikes(likes + (liked ? -1 : 1)); }} className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 hover:bg-muted ${liked ? "text-primary" : ""}`}>
          <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} /> {likes}
        </button>
        <button className="flex items-center gap-1.5 rounded-md px-3 py-1.5 hover:bg-muted">
          <MessageCircle className="h-4 w-4" /> {post.comments}
        </button>
        <button className="ml-auto flex items-center gap-1.5 rounded-md px-3 py-1.5 hover:bg-muted">
          <Share2 className="h-4 w-4" /> Поделиться
        </button>
      </footer>
    </article>
  );
}
