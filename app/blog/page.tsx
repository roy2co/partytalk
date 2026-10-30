import type { Metadata } from "next";
import { POSTS } from "./posts";
import BlogGrid from "./BlogGrid";
import ContactLink from "../components/ContactLink";

// החדש ראשון - בתאריך זהה, מה שנוסף אחרון למערך מופיע קודם
const SORTED_POSTS = [...POSTS]
  .reverse()
  .sort((a, b) => b.date.localeCompare(a.date));

export const metadata: Metadata = {
  title: "הבלוג של PartyTalk | טיפים, השראה וזיכרון מהאירוע",
  description:
    "הבלוג של פארטיטוק - כל מה שכדאי לדעת על מראיינת לאירוע, עמדת צילום לאירועים, אטרקציות מיוחדות ויצירת זיכרון אמיתי מהאירוע שלכם.",
  keywords:
    "בלוג פארטיטוק, מראיינת לאירוע, עמדת צילום לאירועים, אטרקציה מיוחדת, זיכרון מהאירוע, אטרקציה לחתונה",
  alternates: { canonical: "/blog/" },
  openGraph: {
    title: "הבלוג של PartyTalk | טיפים, השראה וזיכרון מהאירוע",
    description:
      "כל מה שכדאי לדעת על מראיינת לאירוע, עמדת צילום לאירועים ויצירת זיכרון אמיתי מהאירוע שלכם.",
    locale: "he_IL",
    type: "website",
  },
};

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
        <BlogGrid
          posts={SORTED_POSTS.map(
            ({ slug, topic, title, date, readingMinutes, coverImage, coverAlt, excerpt }) => ({
              slug, topic, title, date, readingMinutes, coverImage, coverAlt, excerpt,
            })
          )}
        />

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
