import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { POSTS, getPost, type BlogBlock } from "../posts";
import BlogImage from "../BlogImage";
import ContactLink from "../../components/ContactLink";

const SITE_URL = "https://partytalk.co.il";

// ── Static export - prerender each article ────────────────────
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

// ── Per-article SEO metadata ──────────────────────────────────
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = `${SITE_URL}/blog/${post.slug}/`;
  return {
    title: `${post.title} | PartyTalk`,
    description: post.description,
    keywords: post.keywords.join(", "),
    alternates: { canonical: `/blog/${post.slug}/` },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      locale: "he_IL",
      publishedTime: post.date,
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Embed helper - Vimeo / YouTube → iframe src ───────────────
function toEmbedSrc(src: string) {
  const yt = src.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/
  );
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = src.match(/^https?:\/\/(?:www\.)?vimeo\.com\/(\d+)(?:\/(\w+))?/);
  if (vimeo)
    return `https://player.vimeo.com/video/${vimeo[1]}${vimeo[2] ? `?h=${vimeo[2]}` : ""}`;
  return src;
}

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-display text-2xl md:text-3xl text-white mt-12 mb-4 leading-snug">
          {block.text}
        </h2>
      );
    case "p":
      return (
        <p className="text-gray-300 text-lg leading-relaxed mb-5">{block.text}</p>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-r-2 border-brand-gold pr-5">
          <p className="font-display text-xl md:text-2xl text-brand-gold-light italic leading-relaxed">
            {block.text}
          </p>
        </blockquote>
      );
    case "list":
      return (
        <ul className="my-6 space-y-3 pr-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-300 text-lg leading-relaxed">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-gold" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "image":
      return (
        <figure className="my-8 flex flex-col items-center">
          <div
            className={`rounded-2xl p-[1.5px] bg-gradient-to-br from-brand-gold/70 via-white/10 to-brand-gold/30 shadow-[0_16px_50px_rgba(0,0,0,0.4)] w-full ${
              block.full ? "" : "max-w-sm"
            }`}
          >
            <BlogImage
              src={block.src}
              alt={block.alt}
              className="w-full h-auto object-cover rounded-2xl block"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-sm text-gray-500 mt-3">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "video":
      if (!block.src) return null;
      return (
        <figure className="my-8">
          <div
            className={`rounded-2xl overflow-hidden bg-black shadow-[0_16px_50px_rgba(0,0,0,0.4)] ${
              block.vertical ? "max-w-sm mx-auto" : ""
            }`}
            style={{ aspectRatio: block.vertical ? "9/16" : "16/9" }}
          >
            <iframe
              src={toEmbedSrc(block.src)}
              title={block.title || "PartyTalk video"}
              className="w-full h-full"
              frameBorder="0"
              loading="lazy"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </figure>
      );
  }
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${SITE_URL}${post.coverImage}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "PartyTalk" },
    publisher: {
      "@type": "Organization",
      name: "PartyTalk",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-tight.png` },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}/`,
    },
    keywords: post.keywords.join(", "),
  };

  return (
    <div className="min-h-screen bg-brand-ink text-white" dir="rtl">
      {/* בריחת < מונעת יציאה מתג הסקריפט אם תוכן פוסט יכיל אי-פעם "</script>" */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Header */}
      <header className="border-b border-white/10 py-4 px-4 sticky top-0 bg-brand-ink/85 backdrop-blur-xl z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/">
            <img src="/logo-tight.webp" alt="PartyTalk" className="h-10 w-auto" width={736} height={444} />
          </a>
          <a
            href="/blog/"
            className="text-sm text-gray-300 hover:text-brand-gold transition-colors"
          >
            ← כל המאמרים
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-gray-500 mb-6" aria-label="breadcrumb">
          <a href="/" className="hover:text-brand-gold transition-colors">דף הבית</a>
          <span className="mx-2">/</span>
          <a href="/blog/" className="hover:text-brand-gold transition-colors">בלוג</a>
        </nav>

        {/* Title */}
        <div className="flex items-center gap-3 text-xs text-brand-gold/80 mb-4">
          <span>{formatDate(post.date)}</span>
          <span className="w-1 h-1 rounded-full bg-brand-gold/50" />
          <span>{post.readingMinutes} דק׳ קריאה</span>
        </div>
        <h1 className="font-display text-3xl md:text-5xl text-white leading-tight mb-6">
          {post.title}
        </h1>
        <div className="gold-hairline mb-10" />

        {/* Body */}
        <article>
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </article>

        {/* CTA */}
        <div className="mt-14 rounded-3xl p-[1.5px] bg-gradient-to-br from-brand-gold/70 via-white/10 to-brand-gold/30">
          <div className="rounded-3xl bg-brand-coal p-8 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-white mb-3">
              רוצים מזכרת כזו מהאירוע שלכם?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto leading-relaxed">
              השאירו פרטים ונבנה יחד את הקריאטייב שמתאים בדיוק לאירוע שלכם.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/#contact"
                className="bg-gradient-to-b from-brand-gold-light to-brand-gold text-brand-ink border border-brand-red/40 px-7 py-3 rounded-full font-bold transition-all hover:brightness-105 hover:shadow-[0_0_24px_rgba(200,16,46,0.35)]"
              >
                שריינו את PartyTalk
              </a>
              <ContactLink
                href="https://wa.me/972542691416"
                method="whatsapp"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-7 py-3 rounded-full font-bold transition-all"
              >
                שלחו הודעה בוואטסאפ
              </ContactLink>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
