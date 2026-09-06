"use client";

import { useEffect, useState } from "react";
import { Instagram, Play } from "lucide-react";

const INSTAGRAM_URL = "https://www.instagram.com/partytalk_events/";
const INSTAGRAM_HANDLE = "@partytalk_events";

// ── חיבור לפיד חי ─────────────────────────────────────────────
// 1. צרו חשבון חינמי ב-https://behold.so וחברו את האינסטגרם.
// 2. העתיקו את מזהה הפיד (feeds.behold.so/XXXXXXXX) והדביקו כאן:
const BEHOLD_FEED_ID = "c5pmaRiy3P17NQMaZnsE";

type IGItem = { image: string; alt: string; isVideo?: boolean };

// תמונות placeholder עד שמחברים את הפיד החי (שקופיות אינסטגרם אמיתיות שלנו)
const FALLBACK: IGItem[] = [
  { image: "/blog-images/present-at-your-wedding/cover.webp", alt: "פוסט אינסטגרם - איך לא להיעלם בחתונה" },
  { image: "/blog-images/wedding-day-4-things/cover.webp", alt: "פוסט אינסטגרם - 4 דברים על יום החתונה" },
  { image: "/blog-images/present-at-your-wedding/2.webp", alt: "פוסט אינסטגרם - תגנבו 5 דקות של שקט" },
  { image: "/blog-images/wedding-day-4-things/1.webp", alt: "פוסט אינסטגרם - הערב עובר מהר" },
  { image: "/blog-images/present-at-your-wedding/3.webp", alt: "פוסט אינסטגרם - תסתכלו על האנשים שלכם" },
  { image: "/blog-images/wedding-day-4-things/2.webp", alt: "פוסט אינסטגרם - מה אנשים אומרים עליכם" },
  { image: "/blog-images/present-at-your-wedding/4.webp", alt: "פוסט אינסטגרם - מי שיתעד את הרגעים" },
  { image: "/blog-images/wedding-day-4-things/3.webp", alt: "פוסט אינסטגרם - הרגעים הקטנים" },
];

function pickImage(p: any): string {
  return (
    p?.sizes?.medium?.mediaUrl ||
    p?.sizes?.small?.mediaUrl ||
    p?.thumbnailUrl ||
    p?.mediaUrl ||
    ""
  );
}

export default function InstagramFeed() {
  const [items, setItems] = useState<IGItem[]>(FALLBACK);

  useEffect(() => {
    if (!BEHOLD_FEED_ID) return;
    let alive = true;
    fetch(`https://feeds.behold.so/${BEHOLD_FEED_ID}`)
      .then((r) => r.json())
      .then((data) => {
        const raw = Array.isArray(data) ? data : data?.posts || [];
        const posts: IGItem[] = raw
          .slice(0, 8)
          .map((p: any) => ({
            image: pickImage(p),
            alt: p?.prunedCaption || p?.caption || "פוסט מאינסטגרם של PartyTalk",
            isVideo: p?.mediaType === "VIDEO",
          }))
          .filter((p: IGItem) => p.image);
        if (alive && posts.length) setItems(posts);
      })
      .catch(() => {
        /* נשארים על ה-FALLBACK */
      });
    return () => {
      alive = false;
    };
  }, []);

  const tile = (item: IGItem, i: number, extra: string) => (
    <a
      key={i}
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="עברו לעמוד האינסטגרם שלנו"
      className={`group relative aspect-square overflow-hidden rounded-xl bg-brand-coal ${extra}`}
    >
      <img
        src={item.image}
        alt={item.alt}
        loading="lazy"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      {item.isVideo && (
        <span className="absolute top-2 left-2 z-[2] w-7 h-7 rounded-full bg-black/55 backdrop-blur-sm flex items-center justify-center pointer-events-none">
          <Play className="w-3.5 h-3.5 text-white fill-white" />
        </span>
      )}
      <div className="absolute inset-0 bg-brand-ink/0 group-hover:bg-brand-ink/55 transition-colors duration-300 flex items-center justify-center">
        <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300" />
      </div>
    </a>
  );

  // עמודות אדפטיביות - תמיד 2 שורות מאוזנות (6 פוסטים → 3 בשורה, 8 → 4 בשורה)
  const cols = Math.max(2, Math.ceil(items.length / 2));

  return (
    <section id="instagram" className="relative pt-14 md:pt-24 pb-14 md:pb-24 bg-brand-ink overflow-hidden">
      <div className="absolute top-0 inset-x-0 gold-hairline" />
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(201,168,76,0.35) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <span className="text-brand-gold text-sm font-bold tracking-[0.3em] -me-[0.3em]">
              עקבו אחרינו
            </span>
          </div>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 font-display text-3xl md:text-5xl text-white hover:text-brand-gold-light transition-colors"
          >
            <Instagram className="w-7 h-7 md:w-9 md:h-9 text-brand-gold" />
            {INSTAGRAM_HANDLE}
          </a>
        </div>

        {/* Desktop - 2 balanced rows, adaptive columns */}
        <div
          className="hidden md:grid gap-3"
          style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
        >
          {items.map((item, i) => tile(item, i, ""))}
        </div>

        {/* Mobile - horizontal slider (~2.3 visible) */}
        <div className="md:hidden flex gap-3 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4">
          {items.map((item, i) =>
            tile(item, i, "snap-start shrink-0 basis-[43%]")
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-brand-gold-light to-brand-gold text-brand-ink border border-brand-red/40 px-7 py-3 rounded-full font-bold transition-all hover:brightness-105 hover:shadow-[0_0_24px_rgba(200,16,46,0.35)]"
          >
            <Instagram className="w-5 h-5" />
            עקבו אחרינו באינסטגרם
          </a>
        </div>
      </div>
    </section>
  );
}
