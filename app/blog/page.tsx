import type { Metadata } from "next";
import { POSTS } from "./posts";
import BlogImage from "./BlogImage";
import ContactLink from "../components/ContactLink";

export const metadata: Metadata = {
  title: "הבלוג של PartyTalk | טיפים, השראה וזיכרון מהאירוע",
  description:
    "הבלוג של פארטיטוק - כל מה שכדאי לדעת על מראיינת לאירוע, עמדת צילום לאירועים, אטרקציות מיוחדות ויצירת זיכרון אמיתי מהאירוע שלכם.",
  keywords:
    "בלוג פארטיטוק, מראיינת לאירוע, עמדת צילום לאירועים, אטרקציה מיוחדת, זיכרון מהאירוע, אטרקציה לחתונה",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "הבלוג של PartyTalk | טיפים, השראה וזיכרון מהאירוע",
    description:
      "כל מה שכדאי לדעת על מראיינת לאירוע, עמדת צילום לאירועים ויצירת זיכרון אמיתי מהאירוע שלכם.",
    locale: "he_IL",
    type: "website",
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("he-IL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-brand-ink text-white" dir="rtl">
      {/* Header */}
      <header className="border-b border-white/10 py-4 px-4 sticky top-0 bg-brand-ink/85 backdrop-blur-xl z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <a href="/">
            <img src="/logo-tight.webp" alt="PartyTalk" className="h-10 w-auto" width={736} height={444} />
          </a>
          <a
            href="/"
            className="text-sm text-gray-300 hover:text-brand-gold transition-colors"
          >
            ← חזרה לדף הבית
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden grain">
        <div
          className="absolute inset-0 opacity-25 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 50% 60% at 50% 0%, rgba(201,168,76,0.4) 0%, transparent 60%)",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 pt-16 pb-12 text-center">
          <div className="mb-5">
            <span className="text-brand-gold text-sm font-bold tracking-[0.3em] -me-[0.3em]">
              הבלוג שלנו
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl text-white leading-tight mb-5">
            השראה, טיפים וזיכרון מהאירוע
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            כל מה שכדאי לדעת על מראיינת לאירוע, עמדת צילום לאירועים ואיך יוצרים
            מזכרת שתישאר לכל החיים.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <main className="max-w-5xl mx-auto px-4 pb-24">
        <div className="grid gap-8 sm:grid-cols-2">
          {POSTS.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl p-[1.5px] bg-gradient-to-br from-brand-gold/60 via-white/10 to-brand-gold/25 hover:from-brand-gold/90 hover:to-brand-gold/50 transition-all hover:-translate-y-1 shadow-[0_16px_50px_rgba(0,0,0,0.4)]"
            >
              <article className="rounded-3xl overflow-hidden bg-brand-coal h-full flex flex-col">
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  <BlogImage
                    src={post.coverImage}
                    alt={post.coverAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
                  <p className="text-gray-400 text-sm leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-brand-gold font-bold text-sm">
                    קראו עוד ←
                  </span>
                </div>
              </article>
            </a>
          ))}
        </div>

        {/* CTA - funnel to lead form */}
        <div className="mt-16 rounded-3xl p-[1.5px] bg-gradient-to-br from-brand-gold/70 via-white/10 to-brand-gold/30">
          <div className="rounded-3xl bg-brand-coal p-8 md:p-10 text-center">
            <h2 className="font-display text-2xl md:text-3xl text-white mb-3">
              רוצים מזכרת כזו מהאירוע שלכם?
            </h2>
            <p className="text-gray-400 mb-6 max-w-xl mx-auto leading-relaxed">
              השאירו פרטים ונחזור אליכם עם כל הפרטים על פארטיטוק - האטרקציה שתגרום לכל
              האורחים שלכם לדבר.
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
