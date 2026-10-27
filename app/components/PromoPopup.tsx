"use client";

import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { trackContactClick } from "../lib/analytics";

/**
 * פופאפ מבצע נובמבר/דצמבר — שתי הופעות לסשן:
 *   1. 1.5 שניות אחרי הכניסה
 *   2. 30 שניות אחרי הכניסה (אם נסגר בפעם הראשונה)
 * מי שלחץ על כפתור הוואטסאפ לא יראה אותו שוב באותו סשן.
 * לחיצה על ה-CTA נרשמת כ-contact_click ב-GA4, כמו שאר נקודות הוואטסאפ באתר.
 */

const WHATSAPP = "972542691416";
const WA_TEXT = encodeURIComponent(
  "היי! ראיתי את מבצע נובמבר-דצמבר באתר ואשמח לשמוע פרטים"
);

/* קריאה/כתיבה בטוחות ל-sessionStorage (מצב פרטי עלול לחסום) */
const getStage = (): number => {
  try {
    if (sessionStorage.getItem("pt-promo-cta")) return 99; /* לחץ וואטסאפ — סיימנו */
    return Number(sessionStorage.getItem("pt-promo-stage") || 0);
  } catch {
    return 0;
  }
};
const setStage = (n: number) => {
  try {
    sessionStorage.setItem("pt-promo-stage", String(n));
  } catch {}
};

export default function PromoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const stage = getStage();
    if (stage >= 2) return; /* שתי ההופעות מוצו (או שלחץ וואטסאפ) */

    const timers: ReturnType<typeof setTimeout>[] = [];

    /* הופעה ראשונה — 1.5 שניות */
    if (stage === 0) {
      timers.push(
        setTimeout(() => {
          setStage(1);
          setOpen(true);
        }, 1500)
      );
    }

    /* הופעה שנייה — 30 שניות מהכניסה לעמוד */
    timers.push(
      setTimeout(() => {
        if (getStage() >= 99) return; /* לחץ וואטסאפ בינתיים */
        setStage(2);
        setOpen(true);
      }, 30000)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  /* סגירה ב-Escape */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const close = () => {
    setOpen(false);
  };

  /* לחיצה על הוואטסאפ — לא מציגים שוב בסשן הזה */
  const onCta = () => {
    trackContactClick("whatsapp");
    try {
      sessionStorage.setItem("pt-promo-cta", "1");
    } catch {}
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="מבצעי נובמבר דצמבר"
    >
      {/* רקע כהה — לחיצה סוגרת */}
      <button
        aria-label="סגירת החלון"
        onClick={close}
        className="absolute inset-0 bg-black/75 backdrop-blur-sm cursor-default"
      />

      {/* הכרטיס — מסגרת זהב מדורגת בסגנון מסגרת הוידאו */}
      <div className="relative w-full max-w-md rounded-3xl p-[2px] bg-gradient-to-br from-brand-gold/80 via-brand-gold/20 to-brand-gold/60 shadow-[0_24px_80px_rgba(201,168,76,0.18)]">
        <div className="relative bg-gradient-to-b from-brand-coal to-brand-ink rounded-3xl px-6 py-8 md:px-8 text-center">
        {/* כפתור סגירה */}
        <button
          onClick={close}
          aria-label="סגור"
          className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* באדג' בסגנון ON AIR */}
        <span className="inline-flex items-center gap-2 border border-brand-gold/40 bg-white/[0.04] rounded-full px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand-gold-light mb-5">
          <span className="rec-dot" aria-hidden="true" />
          לזמן מוגבל
        </span>

        {/* כותרת */}
        <h2 className="font-display text-3xl md:text-4xl text-white leading-tight mb-3">
          מבצעים נובמבר / דצמבר
          <br />
          <span className="gold-shimmer">לתאריכים אחרונים!</span>
        </h2>

        <p className="text-gray-400 text-sm md:text-base mb-7 leading-relaxed">
          נשארו תאריכים בודדים - דברו איתנו עכשיו ושריינו את PartyTalk לאירוע
          שלכם
        </p>

        {/* CTA — וואטסאפ */}
        <a
          href={`https://wa.me/${WHATSAPP}?text=${WA_TEXT}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onCta}
          className="inline-flex items-center justify-center gap-2.5 w-full bg-gradient-to-b from-green-500 to-green-600 text-white font-bold text-lg px-7 py-4 rounded-full shadow-[0_10px_34px_rgba(34,197,94,0.4)] transition-all hover:-translate-y-0.5 hover:brightness-105 active:brightness-95"
        >
          <MessageCircle className="w-6 h-6" />
          דברו איתנו בוואטסאפ
        </a>

        <button
          onClick={close}
          className="mt-4 text-xs text-gray-500 hover:text-gray-300 transition-colors underline-offset-2 hover:underline"
        >
          לא עכשיו, תודה
        </button>
        </div>
      </div>
    </div>
  );
}
