"use client";

import { useEffect, useState } from "react";
import BlogImage from "./BlogImage";
import { TOPICS, type BlogPost, type BlogTopic } from "./posts";

type CardPost = Pick<
  BlogPost,
  "slug" | "topic" | "title" | "date" | "readingMinutes" | "coverImage" | "coverAlt" | "excerpt"
>;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function topicLabel(id: BlogTopic) {
  return TOPICS.find((t) => t.id === id)?.label ?? "";
}

// סינון לפי נושא - נשמר בכתובת (?topic=weddings) כדי שאפשר יהיה לשתף קישור ישיר לנושא
export default function BlogGrid({ posts }: { posts: CardPost[] }) {
  const [topic, setTopic] = useState<BlogTopic | "all">("all");

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("topic");
    if (t && TOPICS.some((x) => x.id === t)) setTopic(t as BlogTopic);
  }, []);

  const choose = (t: BlogTopic | "all") => {
    setTopic(t);
    const url = t === "all" ? "/blog/" : `/blog/?topic=${t}`;
    window.history.replaceState(null, "", url);
  };

  // מציגים רק נושאים שיש בהם מאמרים
  const chips = [
    { id: "all" as const, label: "הכל", count: posts.length },
    ...TOPICS.map((t) => ({
      id: t.id,
      label: t.label,
      count: posts.filter((p) => p.topic === t.id).length,
    })).filter((t) => t.count > 0),
  ];

  const shown = topic === "all" ? posts : posts.filter((p) => p.topic === topic);

  return (
    <>
      <nav aria-label="סינון לפי נושא" className="flex flex-wrap justify-center gap-2.5 mb-10">
        {chips.map((c) => {
          const active = c.id === topic;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => choose(c.id)}
              aria-pressed={active}
              className={`rounded-full px-5 py-2 text-sm font-bold border transition-all ${
                active
                  ? "bg-gradient-to-b from-brand-gold-light to-brand-gold text-brand-ink border-brand-gold"
                  : "border-brand-gold/40 text-gray-200 hover:border-brand-gold hover:text-brand-gold-light"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </nav>

      <div className="grid gap-8 sm:grid-cols-2">
        {shown.map((post) => (
          <a
            key={post.slug}
            href={`/blog/${post.slug}/`}
            className="group rounded-3xl p-[1.5px] bg-gradient-to-br from-brand-gold/60 via-white/10 to-brand-gold/25 hover:from-brand-gold/90 hover:to-brand-gold/50 transition-all hover:-translate-y-1 shadow-[0_16px_50px_rgba(0,0,0,0.4)]"
          >
            <article className="rounded-3xl overflow-hidden bg-brand-coal h-full flex flex-col">
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <BlogImage
                  src={post.coverImage}
                  alt={post.coverAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 rounded-full bg-brand-ink/80 backdrop-blur px-3 py-1 text-xs font-bold text-brand-gold-light border border-brand-gold/40">
                  {topicLabel(post.topic)}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-xs text-brand-gold/80 mb-3">
                  <span>{formatDate(post.date)}</span>
                  <span className="w-1 h-1 rounded-full bg-brand-gold/50" />
                  <span>{post.readingMinutes} דק׳ קריאה</span>
                </div>
                <h2 className="font-display text-xl md:text-2xl text-white leading-snug mb-3 group-hover:text-brand-gold-light transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">{post.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-brand-gold font-bold text-sm">
                  קראו עוד ←
                </span>
              </div>
            </article>
          </a>
        ))}
      </div>
    </>
  );
}
