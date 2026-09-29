"use client";

import { useState, useEffect, useRef } from "react";
import Script from "next/script";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import InstagramFeed from "./components/InstagramFeed";
import { trackLead, trackContactClick } from "./lib/analytics";
import {
  Phone,
  Mail,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  Heart,
  Calendar,
  Building2,
  Star,
  Gift,
  Mic,
  CheckCircle,
  Users,
  DollarSign,
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Sparkles,
} from "lucide-react";

// ── Constants ─────────────────────────────────────────────────
const PHONE = "054-269-1416";
const WHATSAPP = "972542691416";
const EMAIL = "infopartytalk@gmail.com";
const FOUNDERS_IMAGE =
  "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68ebeb1326fab4fb52e122fc/3fe7931fd_Screenshot2025-10-18at174056.png";
const VIMEO_URL =
  "https://player.vimeo.com/video/1150853178?h=6fe43b156e&autoplay=0";

// ── Utilities ─────────────────────────────────────────────────
function goTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 90;
  window.scrollTo({ top, behavior: "smooth" });
}

const fadeUp = {
  hidden: { y: 28, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

// ── Shared: Section Title ─────────────────────────────────────
function SectionTitle({
  kicker,
  title,
  subtitle,
}: {
  kicker: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-16 relative z-10">
      {/* Kicker - הריווח הרחב עושה את העבודה; -me מנטרל את הרווח הנגרר לאיזון אופטי */}
      <div className="mb-5">
        <span className="text-brand-gold text-sm font-bold tracking-[0.3em] -me-[0.3em]">
          {kicker}
        </span>
      </div>
      <h2 className="font-display text-4xl md:text-6xl mb-6 text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg max-w-2xl mx-auto leading-relaxed text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────
const NAV = [
  { id: "about", label: "מי אנחנו" },
  { id: "what-is", label: "מה זה PartyTalk" },
  { id: "events", label: "לאיזה אירועים" },
  { id: "reviews", label: "ביקורות" },
  { id: "contact", label: "צור קשר" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-brand-ink/85 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/40"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <img
            src="/logo-tight.webp"
            alt="PartyTalk Logo"
            className="h-9 md:h-11 w-auto"
            width={736}
            height={444}
          />

          {/* Mobile CTA - כפתור זהב תמידי במרכז ההדר (רק מובייל) */}
          <a
            href="#contact"
            className="md:hidden bg-gradient-to-b from-brand-gold-light to-brand-gold text-brand-ink border border-brand-red/40 px-4 py-2 rounded-full font-bold text-sm shadow-[0_4px_16px_rgba(200,16,46,0.25)] transition-all active:brightness-95 whitespace-nowrap"
          >
            צרו קשר עכשיו
          </a>

          {/* Desktop */}
          <nav className="hidden md:flex items-center gap-7" aria-label="ניווט ראשי">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className="text-gray-300 hover:text-brand-gold transition-colors font-medium text-sm"
              >
                {n.label}
              </a>
            ))}
            <a
              href="/blog/"
              className="text-gray-300 hover:text-brand-gold transition-colors font-medium text-sm"
            >
              בלוג
            </a>
            <a
              href="#contact"
              className="bg-gradient-to-b from-brand-gold-light to-brand-gold text-brand-ink border border-brand-red/40 px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:brightness-105 hover:shadow-[0_0_22px_rgba(200,16,46,0.3)]"
            >
              שריינו את PartyTalk
            </a>
          </nav>

          {/* Mobile - details/summary, no React state */}
          <details className="group md:hidden relative">
            <summary
              className="list-none p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="תפריט"
            >
              <Menu className="w-6 h-6 group-open:hidden" />
              <X className="w-6 h-6 hidden group-open:block" />
            </summary>

            {/* Dropdown menu */}
            <div className="absolute left-0 top-12 w-[92vw] bg-brand-ink/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/60 p-4 space-y-1">
              {NAV.map((n) => (
                <a
                  key={n.id}
                  href={`#${n.id}`}
                  className="block w-full text-right px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-brand-gold rounded-xl transition-colors font-medium text-base"
                >
                  {n.label}
                </a>
              ))}
              <a
                href="/blog/"
                className="block w-full text-right px-4 py-3 text-gray-200 hover:bg-white/10 hover:text-brand-gold rounded-xl transition-colors font-medium text-base"
              >
                בלוג
              </a>
              <a
                href="#contact"
                className="block w-full text-center mt-2 bg-gradient-to-b from-brand-gold-light to-brand-gold text-brand-ink border border-brand-red/40 px-5 py-3 rounded-xl font-bold transition-all hover:brightness-105 hover:shadow-[0_0_20px_rgba(200,16,46,0.3)]"
              >
                שריינו את PartyTalk
              </a>
            </div>
          </details>
        </div>
      </div>

      {/* Scroll progress - gold hairline */}
      <motion.div
        className="absolute bottom-0 right-0 left-0 h-[2px] bg-gradient-to-l from-brand-gold via-brand-gold-light to-brand-gold"
        style={{ scaleX: progress, transformOrigin: "100% 50%" }}
      />
    </header>
  );
}

// ── Hero ──────────────────────────────────────────────────────
const HERO_STATS = [
  { value: "14+", label: "שנות ניסיון בהפקות ואירועים" },
  { value: "2,500+", label: "אורחים שרואיינו באירועים" },
  { value: "100%", label: "קריאטייב בהתאמה אישית מלאה" },
];

const FLOATING_QUESTIONS = [
  { text: "ספרו פדיחה מהעבר על החתן 🎤", className: "top-[24%] right-[6%] float-slow" },
  { text: "איזה זיכרון ילדות יש לכם עם הכלה?", className: "top-[40%] left-[5%] float-slower" },
  { text: "מה הברכה שלכם לזוג? ❤️", className: "bottom-[22%] right-[10%] float-slower" },
];

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-ink grain">
      {/* Spotlights */}
      <div
        className="absolute inset-0 spot-pulse"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 55% 45% at 22% 65%, rgba(200,16,46,0.55) 0%, transparent 60%), radial-gradient(ellipse 55% 45% at 78% 35%, rgba(201,168,76,0.45) 0%, transparent 60%)",
        }}
      />
      {/* Stage light from above */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 45% 55% at 50% -10%, rgba(243,229,184,0.5) 0%, transparent 65%)",
        }}
      />
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* Bottom fade into next section */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-brand-ink to-transparent z-[2]" />

      {/* Floating interview questions - desktop only */}
      {FLOATING_QUESTIONS.map((q, i) => (
        <div
          key={i}
          className={`rise-in hidden lg:block absolute z-[3] ${q.className}`}
          style={
            {
              "--rise-from": "20px",
              "--rise-dur": "0.8s",
              "--rise-delay": `${1.1 + i * 0.3}s`,
            } as React.CSSProperties
          }
        >
          <div className="bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-2xl rounded-bl-sm px-5 py-3 text-gray-200 text-sm shadow-2xl shadow-black/40">
            {q.text}
          </div>
        </div>
      ))}

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center pt-20 md:pt-32 pb-10">
        <div className="rise-in">
          {/* ON AIR badge */}
          <div className="flex justify-center mb-4 md:mb-8">
            <span className="inline-flex items-center gap-2 md:gap-2.5 border border-brand-gold/40 bg-white/[0.04] backdrop-blur-sm rounded-full px-4 md:px-5 py-1.5 md:py-2 text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.25em] text-brand-gold-light">
              <span className="rec-dot" aria-hidden="true" />
              ON AIR - מהאירוע שלכם
            </span>
          </div>

          {/* Logo - מוסתר במובייל (כבר קיים בהדר, מפנה מקום לסרטון), גדול בדסקטופ */}
          <div className="hidden md:flex justify-center md:mb-8">
            <img
              src="/logo-tight.webp"
              alt="PartyTalk"
              className="h-14 md:h-44 w-auto"
              width={736}
              height={444}
              fetchPriority="high"
              style={{
                filter: "drop-shadow(0 6px 32px rgba(201,168,76,0.4))",
              }}
            />
          </div>

          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-7xl text-white leading-[1.15] mb-3 md:mb-7">
            האטרקציה שתגרום
            <br />
            <span className="gold-shimmer">לכל האורחים שלכם לדבר</span>
          </h1>

          {/* Sub - שורה חדה אחת במובייל, מלא בדסקטופ */}
          <p className="md:hidden text-sm text-gray-300 mb-5 max-w-md mx-auto leading-relaxed">
            מראיינת וצלם מראיינים את האורחים - ואתם מקבלים סרטון מרגש לכל החיים
          </p>
          <p className="hidden md:block text-base md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            עמדת צילום בסגנון ראיון טלוויזיוני שתיצור שואו ותגניב את האורחים שלכם,
            <br />
            <span className="text-gray-400">
              ולכם תשאיר קפסולת זמן מצולמת לכל החיים
            </span>
          </p>

          {/* ── סרטון ההירו ── */}
          {/* מובייל: סרטון אנכי מלא (9:16), בלי חיתוך, אוטופליי מושתק (background=1) */}
          <div className="md:hidden relative mx-auto w-full max-w-[210px] mb-5">
            <div className="rounded-2xl p-[2px] bg-gradient-to-br from-brand-gold/80 via-brand-gold/20 to-brand-gold/60 shadow-[0_16px_50px_rgba(201,168,76,0.22)]">
              <div
                className="rounded-2xl overflow-hidden bg-black relative"
                style={{ aspectRatio: "9/16" }}
              >
                <iframe
                  src="https://player.vimeo.com/video/1216351590?h=5adf3d7f79&background=1"
                  title="PartyTalk - הסרטון שלנו"
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ display: "block" }}
                />
              </div>
            </div>
            <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-white/15 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-white pointer-events-none">
              <span className="rec-dot" aria-hidden="true" />
              REC
            </div>
          </div>

          {/* דסקטופ: הסרטון האנכי המלא (9:16) */}
          <div className="hidden md:block relative mx-auto w-full max-w-[300px] mb-8">
            <div className="rounded-3xl p-[2px] bg-gradient-to-br from-brand-gold/80 via-brand-gold/20 to-brand-gold/60 shadow-[0_24px_80px_rgba(201,168,76,0.18)]">
              <div
                className="rounded-3xl overflow-hidden bg-black relative"
                style={{ aspectRatio: "9/16" }}
              >
                <iframe
                  src="https://player.vimeo.com/video/1216351590?h=5adf3d7f79"
                  title="PartyTalk - הסרטון שלנו"
                  className="w-full h-full"
                  frameBorder="0"
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ display: "block" }}
                />
              </div>
            </div>
            <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 bg-black/70 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest text-white pointer-events-none">
              <span className="rec-dot" aria-hidden="true" />
              REC
            </div>
          </div>

          {/* Quote - הטקסט הזהוב (דסקטופ בלבד; מוסתר במובייל לטובת CTA מעל הקפל) */}
          <p className="hidden md:block font-display text-brand-gold/90 italic text-base md:text-lg mb-6 max-w-xl mx-auto leading-relaxed">
            &ldquo;כל כך הרבה השקעה באירוע שלכם כדי שהאורחים יזכרו כמה טוב היה - אבל מה עם הזיכרון שלכם?&rdquo;
          </p>

          {/* CTA מובייל: וואטסאפ ירוק גדול ודומיננטי (חיכוך נמוך לקהל טיקטוק) */}
          <a
            href={`https://wa.me/${WHATSAPP}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackContactClick("whatsapp")}
            className="md:hidden flex items-center justify-center gap-2.5 w-full max-w-xs mx-auto bg-gradient-to-b from-green-500 to-green-600 text-white px-7 py-4 rounded-full font-bold text-lg shadow-[0_10px_34px_rgba(34,197,94,0.4)] transition-all active:brightness-95"
          >
            <MessageCircle className="w-6 h-6" />
            דברו איתנו בוואטסאפ
          </a>

          {/* CTA דסקטופ: כפתור הזהב לשריון (טופס) */}
          <div className="hidden md:flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#contact"
              className="bg-gradient-to-b from-brand-gold-light to-brand-gold text-brand-ink border border-brand-red/40 px-7 py-3 rounded-full font-bold text-base shadow-[0_8px_30px_rgba(200,16,46,0.22)] transition-all hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_12px_42px_rgba(200,16,46,0.38)] text-center"
            >
              שריינו את PartyTalk לאירוע שלכם
            </a>
          </div>

          {/* Stats strip */}
          <div className="mt-14 grid grid-cols-3 gap-3 sm:gap-6 max-w-3xl mx-auto">
            {HERO_STATS.map((s, i) => (
              <div
                key={i}
                className="rise-in border-t border-brand-gold/30 pt-4"
                style={
                  {
                    "--rise-from": "16px",
                    "--rise-dur": "0.6s",
                    "--rise-delay": `${0.6 + i * 0.15}s`,
                  } as React.CSSProperties
                }
              >
                <div className="font-display text-3xl md:text-4xl text-brand-gold-light mb-1">
                  {s.value}
                </div>
                <div className="text-gray-400 text-xs md:text-sm leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
            className="mt-8 flex justify-center text-brand-gold/50 cursor-pointer"
            onClick={() => goTo("about")}
          >
            <ChevronDown className="w-8 h-8" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ── Broadcast Ticker ──────────────────────────────────────────
const TICKER_ITEMS = [
  "חתונות",
  "ימי הולדת עגולים",
  "אירועי חברה ועמותות",
  "בר / בת מצווה",
  "ראיון טלוויזיוני לאורחים",
  "קפסולת זמן מצולמת",
  "מזכרת לכל החיים",
];

function Ticker() {
  return (
    <div
      className="relative bg-brand-ink border-y border-brand-gold/25 py-4 overflow-hidden"
      dir="ltr"
      aria-hidden="true"
    >
      <div className="ticker-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className="flex items-center">
                <span className="text-brand-gold-light/90 font-medium text-sm md:text-base whitespace-nowrap px-6">
                  {item}
                </span>
                <span className="text-brand-gold/60 text-xs">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Video Feature (סרטון אנכי ממוקד: כותרת זהב + נגן + כפתור) ──
// תומך גם ב-Vimeo וגם ב-YouTube. הנגן נטען רק כשמתקרב למסך (ביצועים).
function VideoFeature({
  title,
  vimeo,
  youtube,
}: {
  title: string;
  vimeo?: { id: string; hash: string };
  youtube?: string;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const src = vimeo
    ? `https://player.vimeo.com/video/${vimeo.id}?h=${vimeo.hash}`
    : `https://www.youtube.com/embed/${youtube}`;

  return (
    <section className="relative py-5 md:py-20 bg-brand-ink overflow-hidden">
      {/* Gold glow */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(201,168,76,0.35) 0%, transparent 60%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto px-4 text-center">
        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl md:text-4xl text-brand-gold-light leading-snug mb-5 md:mb-8">
          {title}
        </h3>

        {/* Vertical video - gold frame + REC badge */}
        <div
          ref={ref}
          className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px] mb-6 md:mb-8"
        >
          <div className="rounded-3xl p-[2px] bg-gradient-to-br from-brand-gold/80 via-brand-gold/20 to-brand-gold/60 shadow-[0_24px_80px_rgba(201,168,76,0.18)]">
            <div
              className="rounded-3xl overflow-hidden bg-black relative"
              style={{ aspectRatio: "9/16" }}
            >
              {visible && (
                <iframe
                  title={title}
                  src={src}
                  className="w-full h-full"
                  frameBorder="0"
                  loading="lazy"
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                  sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                  referrerPolicy="strict-origin-when-cross-origin"
                  style={{ display: "block" }}
                />
              )}
            </div>
          </div>
          {/* REC badge */}
          <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 bg-black/70 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest text-white pointer-events-none">
            <span className="rec-dot" aria-hidden="true" />
            REC
          </div>
        </div>

        {/* CTA - כפתור שריון לצור קשר, מתחת לכל סרטון */}
        <a
          href="#contact"
          className="inline-block bg-gradient-to-b from-brand-gold-light to-brand-gold text-brand-ink border border-brand-red/40 px-7 py-3 rounded-full font-bold text-base shadow-[0_8px_30px_rgba(200,16,46,0.22)] transition-all hover:-translate-y-1 hover:brightness-105 hover:shadow-[0_12px_42px_rgba(200,16,46,0.38)]"
        >
          שריינו את PartyTalk לאירוע שלכם
        </a>
      </div>
    </section>
  );
}

// ── About ─────────────────────────────────────────────────────
function About() {
  /* טעינת נגן Vimeo רק כשנכנס למסך - מונע גניבת פוקוס וקפיצת גלילה */
  const [videoVisible, setVideoVisible] = useState(false);
  useEffect(() => {
    const el = document.getElementById("vimeo-video");
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVideoVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative pt-14 md:pt-24 pb-14 md:pb-24 bg-brand-ink overflow-hidden">
      {/* Side glow */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 40% 50% at 100% 30%, rgba(201,168,76,0.35) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div id="about" />
          <SectionTitle kicker="הסיפור שלנו" title="מי אנחנו" />

          <div className="grid lg:grid-cols-2 gap-14 items-center max-w-6xl mx-auto">
            {/* Text */}
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                אנחנו <span className="font-bold text-brand-gold-light">קים ורועי</span> וכשהתחתנו לא ראינו בשוק שום אטרקציה שדיברה אלינו. הכל היה נראה לנו נדוש, חרוש ורגיל.
                ובינינו? אחרי כל ההוצאות המטורפות על החתונה שרובן היו בעיקר כדי שלאורחים יהיה אירוע בלתי נשכח, חשבנו על זה שגם לנו מגיעה מזכרת מהיום הזה.
              </p>
              <p>
                רועי, עם ניסיון של <span className="font-bold text-brand-gold-light">14 שנים בתחום ההפקות והאירועים</span>, וקים עם רקע עשיר בתחקירנות, יחסי ציבור, הגשת פינות וכתבות שטח ב<span className="font-bold text-brand-gold-light">ערוץ מסחרי גדול</span> -
                בערב אחד על בקבוק יין יצרנו את הרעיון הגאוני של party talk.
              </p>
              <p>
                עמדת צילום בסגנון ראיון טלוויזיוני שמראיינת את האורחים באירוע ויוצרת להם חוויה שהם לא רגילים לראות בשום אירוע.
                כשהסלבס הכי חשובים שעליהם מדברים בערב הזה - זה בעלי האירוע.
              </p>
              <p>
                לאירוע מגיעים צלם ומראיינת מקצועיים ואחרי תחקיר מעמיק עליכם, בונים קריאטייב בהתאמה אישית ובאירוע עצמו מראיינים את האורחים שלכם עליכם -
                עם שאלות נוסטלגיות, מצחיקות, מרגשות, ברכות, סיפורים ופדיחות מהעבר. כדי שלא תפספסו את האנשים שהכי חשובים לכם ותזכו במזכרת שהיא <span className="font-bold text-brand-gold">timeless</span>.
              </p>
              <p>
                וכך יצרנו קטגוריה חדשה לגמרי: <span className="font-bold text-brand-gold-light">עמדת ראיונות טלוויזיונית לאירועים</span>. הרעיון, היכולות של רועי בהפקות ושל קים בתחקיר וטלוויזיה - כל אלה נפגשו כאן לראשונה, והפכו את פארטיטוק <span className="font-bold text-brand-gold-light">לאטרקציה המקורית</span> שכולם מכירים.
              </p>
            </div>

            {/* Video - gold frame + REC badge (בגודל אחיד עם שאר הסרטונים) */}
            <div className="relative mx-auto w-full max-w-[260px] sm:max-w-[300px]">
              <div
                className="rounded-3xl p-[2px] bg-gradient-to-br from-brand-gold/80 via-brand-gold/20 to-brand-gold/60 shadow-[0_24px_80px_rgba(201,168,76,0.18)]"
              >
                <div
                  id="vimeo-video"
                  className="rounded-3xl overflow-hidden bg-black relative"
                  style={{ aspectRatio: "9/16" }}
                >
                  {videoVisible && (
                    <iframe
                      title="PartyTalk - הסרטון שלנו"
                      src={VIMEO_URL}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                      referrerPolicy="strict-origin-when-cross-origin"
                      style={{ display: "block" }}
                    />
                  )}
                </div>
              </div>
              {/* REC badge */}
              <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-2 bg-black/70 backdrop-blur-sm border border-white/15 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-widest text-white pointer-events-none">
                <span className="rec-dot" aria-hidden="true" />
                REC
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── What Is PartyTalk ─────────────────────────────────────────
const WHAT_ITEMS: {
  icon: React.ReactNode;
  title: string;
  content: string;
  cta?: { href: string; label: string };
}[] = [
  {
    icon: <Gift className="w-5 h-5 text-brand-gold" />,
    title: "מה מקבלים?",
    content:
      "לפני האירוע תקבלו שאלון ונעשה זום היכרות להתאמה אישית. ביום האירוע יגיעו מראיינת וצלם וניצור את הקסם של פארטי טוק. תוך 72 שעות תקבלו גלריה מרגשת עם כל הראיונות והברכות באיכות גבוהה. ניתן להוסיף גם סרט היילייטס קצר וסרט ערוך עם כל המשתתפים - שבו האורחים מדברים, צוחקים ומתרגשים בשבילכם!",
  },
  {
    icon: <Mic className="w-5 h-5 text-brand-gold" />,
    title: "איזה שאלות שואלים?",
    content:
      "זה השלב שלכם לשחרר לנו ולסמוך על הקריאטייב שלנו! אבל בכל אופן אם חשוב לכם לדעת, אנחנו שואלים גם שאלות מצחיקות, גם מרגשות, גם נוסטלגיות וגם בהתאמה אישית אליכם. וכן, גם ברכות יהיו שם.",
  },
  {
    icon: <Star className="w-5 h-5 text-brand-gold" />,
    title: "למי זה מתאים?",
    content:
      "לכל מי שרוצה לקבל מזכרת ייחודית, מרגשת ומצחיקה מאירוע שהוא פסגה בחיים! הרי בינינו, כמה הזדמנויות עוד יהיו לכם לראות את כל האנשים שאתם הכי אוהבים במקום אחד ולשמוע אותם מדברים עליכם?",
  },
  {
    icon: <Users className="w-5 h-5 text-brand-gold" />,
    title: "מה מיוחד באטרקציה?",
    content:
      "בניגוד לאטרקציות אחרות שאתם משלמים עליהם בעיקר עבור האורחים שסופן להיגמר באותו הערב, פארטי טוק נותן לכם גם את ה- דבר המגניב והייחודי הזה שכל האורחים שלכם ידברו עליו ומעל להכל - מעניק לכם זיכרון חי שאפשר לחזור אליו שוב ושוב.",
  },
  {
    icon: <DollarSign className="w-5 h-5 text-brand-gold" />,
    title: "מה העלויות?",
    content:
      "יש מגוון חבילות והמחירים משתנים בהתאם לסוג האירוע - להצעת מחיר מהירה השאירו פרטים או פנו בWhatsApp.",
    cta: { href: "#contact", label: "קח אותי להשארת פרטים" },
  },
];

function WhatYouGet() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="relative pt-14 md:pt-24 pb-14 md:pb-24 bg-brand-coal overflow-hidden">
      <div className="absolute top-0 inset-x-0 gold-hairline" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div id="what-is" />
          <SectionTitle
            kicker="החוויה"
            title="מה יש ב- PartyTalk"
            subtitle="כל מה שחשוב לדעת על החוויה הייחודית שלנו"
          />

          {/* Accordion - clean, right-aligned */}
          <div className="flex flex-col gap-3">
            {WHAT_ITEMS.map((item, i) => {
              const isOpen = openIdx === i;
              return (
                <div
                  key={i}
                  className={`rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                    isOpen
                      ? "border-brand-gold/60 bg-white/[0.06] shadow-[0_12px_48px_rgba(201,168,76,0.1)]"
                      : "border-white/10 bg-white/[0.03] hover:border-brand-gold/40 hover:bg-white/[0.05]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`what-panel-${i}`}
                    className="w-full flex items-center gap-4 p-5 text-right"
                  >
                    <span
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                        isOpen
                          ? "bg-brand-gold/15 border-brand-gold/50"
                          : "bg-brand-gold/5 border-brand-gold/20"
                      }`}
                    >
                      {item.icon}
                    </span>
                    <h3 className="flex-1 font-bold text-lg text-white">
                      {item.title}
                    </h3>
                    <span
                      className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "border-brand-gold/60 text-brand-gold rotate-180"
                          : "border-white/15 text-gray-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`what-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="mx-5 gold-hairline opacity-50" />
                        <div className="px-5 pt-4 pb-6 sm:pr-20">
                          <p className="text-gray-300 leading-relaxed">
                            {item.content}
                          </p>
                          {item.cta && (
                            <a
                              href={item.cta.href}
                              className="mt-4 bg-gradient-to-b from-brand-gold-light to-brand-gold text-brand-ink border border-brand-red/40 px-6 py-2.5 rounded-full font-bold transition-all inline-block hover:brightness-105 hover:shadow-[0_0_22px_rgba(200,16,46,0.3)]"
                            >
                              {item.cta.label}
                            </a>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Events ────────────────────────────────────────────────────
const EVENTS = [
  {
    icon: <Heart className="w-10 h-10" />,
    title: "חתונות",
    desc: "מזכרת מרגשת ומצחיקה מהיום הכי חשוב בחיים שלכם",
    points: [
      "ראיונות מצחיקים ומרגשים וקלילים",
      "ברכות וסיפורים מהמשפחה והחברים",
      "מזכרת בוידאו לכל החיים",
    ],
    grad: "from-rose-500 to-red-600",
  },
  {
    icon: <Calendar className="w-10 h-10" />,
    title: "ימי הולדת 30+",
    desc: "יום הולדת עגול מעולם לא היה מיוחד מזה",
    points: [
      "ברכות ואיחולים מהאורחים",
      "זכרונות נוסטלגים משותפים",
      "רגעים מצחיקים ובלתי נשכחים",
    ],
    grad: "from-amber-500 to-orange-500",
  },
  {
    icon: <Building2 className="w-10 h-10" />,
    title: "אירועים עסקיים / חברה / עמותות",
    desc: "לחוויה מיוחדת באירוע וליצירת תוכן המתאים למיתוג מעסיק וחיזוק התדמית",
    points: [
      "חיזוק קשרי צוות ההנהלה והעובדים",
      "שאלות מותאמות ספציפית לארגון",
      "תיעוד מקצועי וחוויתי לחברה",
    ],
    grad: "from-blue-500 to-indigo-600",
  },
];

function Events() {
  return (
    <section className="relative pt-14 md:pt-24 pb-14 md:pb-24 bg-brand-ink overflow-hidden grain">
      <div className="absolute top-0 inset-x-0 gold-hairline" />
      {/* Center glow */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(200,16,46,0.4) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 relative z-[2]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div id="events" />
          <SectionTitle kicker="האירועים" title="לאיזה אירועים PartyTalk מתאים?" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {EVENTS.map((ev, i) => (
              <motion.div
                key={i}
                initial={{ y: 24, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="group bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:border-brand-gold/50 hover:bg-white/[0.07] hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)] transition-all duration-300 text-center"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${ev.grad} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg mx-auto group-hover:scale-110 transition-transform duration-300`}
                >
                  {ev.icon}
                </div>
                <h3 className="font-display text-2xl text-white mb-3">{ev.title}</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">{ev.desc}</p>
                <ul className="space-y-2.5 text-right">
                  {ev.points.map((p, j) => (
                    <li key={j} className="flex items-center gap-3 text-gray-300 text-sm">
                      <CheckCircle className="w-4 h-4 text-brand-gold flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Reviews ───────────────────────────────────────────────────
const REVIEW_IMAGES = Array.from({ length: 21 }, (_, i) => `/reviews/review-${i + 1}.webp`);

function Reviews() {
  return (
    <section className="relative pt-14 md:pt-24 pb-14 md:pb-24 bg-brand-coal overflow-hidden" aria-label="ביקורות לקוחות">
      <div className="absolute top-0 inset-x-0 gold-hairline" />
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div id="reviews" />
          <SectionTitle
            kicker="לקוחות מספרים"
            title="ביקורות"
            subtitle="מה אומרים הלקוחות שלנו על החוויה של פארטיטוק"
          />

          {/* כפתור ביקורות mit4mit */}
          <div className="flex justify-center mb-10 -mt-8">
            <a
              href="https://www.mit4mit.co.il/biz/105426"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-brand-gold-light border border-white/15 hover:border-brand-gold/50 bg-white/[0.04] rounded-full px-5 py-2.5 transition-all"
            >
              <Star className="w-4 h-4 text-brand-gold" />
              הצגת ביקורות ב mit4mit
            </a>
          </div>

          {/* ── Mobile: קרוסלה ── */}
          <div className="md:hidden relative max-w-sm mx-auto mb-16" dir="ltr">
            <div
              className="overflow-hidden rounded-2xl shadow-2xl shadow-black/50 bg-white/[0.04] border border-white/10"
              style={{ height: "480px" }}
            >
              <div
                id="reviews-track"
                className="flex h-full"
                style={{ transition: "transform 0.5s ease-in-out" }}
              >
                {REVIEW_IMAGES.map((src, i) => (
                  <div
                    key={i}
                    className="w-full h-full flex-shrink-0 flex items-center justify-center p-4"
                  >
                    <img
                      src={src}
                      alt={`ביקורת לקוח ${i + 1}`}
                      className="max-w-full max-h-full object-contain rounded-xl"
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
            <button id="reviews-prev" aria-label="קודם" className="absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-ink border border-brand-gold/40 shadow-lg flex items-center justify-center text-brand-gold hover:bg-brand-red hover:border-brand-red hover:text-white transition-all text-xl font-bold z-10">‹</button>
            <button id="reviews-next" aria-label="הבא" className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-ink border border-brand-gold/40 shadow-lg flex items-center justify-center text-brand-gold hover:bg-brand-red hover:border-brand-red hover:text-white transition-all text-xl font-bold z-10">›</button>
            <div className="flex justify-center gap-2 mt-5">
              {REVIEW_IMAGES.map((_, i) => (
                <button key={i} className="reviews-dot w-3 h-3 rounded-full transition-all duration-300" style={{ background: i === 0 ? "#C8102E" : "#4B5563" }} aria-label={`ביקורת ${i + 1}`} />
              ))}
            </div>
          </div>

          {/* ── Desktop: slider 4 בשורה ── */}
          <div className="hidden md:block relative mb-16" dir="ltr">
            {/* Viewport */}
            <div className="overflow-hidden rounded-2xl">
              <div
                id="reviews-track-desktop"
                className="flex"
                style={{ transition: "transform 0.5s ease-in-out" }}
              >
                {REVIEW_IMAGES.map((src, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 flex items-center justify-center p-3"
                    style={{ width: "25%" }}
                  >
                    <img
                      src={src}
                      alt={`ביקורת לקוח ${i + 1}`}
                      className="max-w-full object-contain rounded-xl shadow-xl shadow-black/40"
                      style={{ maxHeight: "340px" }}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Prev */}
            <button
              id="reviews-prev-desktop"
              aria-label="קודם"
              className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-ink border border-brand-gold/40 shadow-xl flex items-center justify-center text-brand-gold hover:bg-brand-red hover:border-brand-red hover:text-white transition-all text-2xl font-bold z-10"
            >‹</button>

            {/* Next */}
            <button
              id="reviews-next-desktop"
              aria-label="הבא"
              className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-brand-ink border border-brand-gold/40 shadow-xl flex items-center justify-center text-brand-gold hover:bg-brand-red hover:border-brand-red hover:text-white transition-all text-2xl font-bold z-10"
            >›</button>

            {/* Progress dots - per page of 4 */}
            <div id="reviews-dots-desktop" className="flex justify-center gap-2 mt-5">
              {Array.from({ length: Math.ceil(REVIEW_IMAGES.length / 4) }).map((_, i) => (
                <button
                  key={i}
                  className="reviews-dot-desktop w-3 h-3 rounded-full transition-all duration-300"
                  style={{ background: i === 0 ? "#C8102E" : "#4B5563" }}
                  aria-label={`עמוד ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Quote + Founders image */}
          <blockquote className="text-center mb-12">
            <span className="font-display text-brand-gold/40 text-6xl leading-none block mb-2" aria-hidden="true">&rdquo;</span>
            <p className="font-display text-gray-300 italic text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
              כל כך הרבה השקעה באירוע שלכם כדי שהאורחים יזכרו כמה טוב היה - אבל מה עם הזיכרון שלכם?
            </p>
            <footer className="mt-4 font-bold text-brand-gold text-lg not-italic">
              - קים ורועי, מייסדי PartyTalk
            </footer>
          </blockquote>

          <div className="rounded-3xl p-[2px] bg-gradient-to-br from-brand-gold/70 via-white/10 to-brand-gold/40 max-w-3xl mx-auto shadow-[0_24px_80px_rgba(0,0,0,0.5)]">
            <div className="rounded-3xl overflow-hidden">
              <img
                src={FOUNDERS_IMAGE}
                alt="קים ורועי - מייסדי PartyTalk"
                className="w-full h-auto object-cover block"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────
const EVENT_TYPES = [
  "בר / בת מצווה",
  "חתונה",
  "אירוע עסקי / חברה / עמותה",
  "ימי הולדת",
  "אחר",
];

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [phoneError, setPhoneError] = useState("");
  const dateRef = useRef<HTMLInputElement>(null);
  const datePhRef = useRef<HTMLSpanElement>(null);

  /* מסמן מתי השדה ריק. התצוגה בפועל נקבעת ב-CSS (.date-ph) שמציג את
     הכיתוב רק במכשירי מגע - ראה ההסבר ב-globals.css.
     ברגע שהמשתמש נוגע בשדה מסתירים, כי אז נחשפים חלקי התאריך הנייטיביים
     וגם קלט חלקי כמו dd/07/2026 מחזיר value ריק. */
  useEffect(() => {
    const inp = dateRef.current;
    const ph = datePhRef.current;
    if (!inp || !ph) return;
    let touched = false;
    const update = () => {
      const empty = !inp.value && !touched && document.activeElement !== inp;
      ph.classList.toggle("is-empty", empty);
    };
    const markTouched = () => {
      touched = true;
      update();
    };
    update();
    inp.addEventListener("focus", markTouched);
    inp.addEventListener("input", markTouched);
    inp.addEventListener("change", markTouched);
    return () => {
      inp.removeEventListener("focus", markTouched);
      inp.removeEventListener("input", markTouched);
      inp.removeEventListener("change", markTouched);
    };
  }, []);

  const validatePhone = (phone: string) => {
    const digits = phone.replace(/\D/g, "");
    return digits.length === 10;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    /* תיקון 2 - ולידציית טלפון */
    const phone = (data.get("phone") as string) || "";
    if (!validatePhone(phone)) {
      setPhoneError("נא להזין מספר של 10 ספרות");
      return;
    }
    setPhoneError("");
    setStatus("sending");

    /* כותרת ההגשה ב-Netlify = שם + טלפון (במקום שדה ריק) */
    const name = (data.get("name") as string) || "";
    data.set("subject", `ליד חדש מהאתר: ${name} · ${phone}`);

    /* Netlify Forms - שליחה מקודדת */
    const body = new URLSearchParams();
    data.forEach((value, key) => body.append(key, value.toString()));

    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (res.ok) {
        setStatus("done");
        form.reset();
        /* הטופס אופס - הכיתוב רלוונטי שוב (ה-CSS עדיין מגביל אותו למכשירי מגע) */
        datePhRef.current?.classList.add("is-empty");
        /* Facebook Pixel - אירוע ליד */
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "Lead");
        }
        /* TikTok Pixel - אירוע ליד */
        if (typeof window !== "undefined" && (window as any).ttq) {
          (window as any).ttq.track("SubmitForm");
        }
        /* Google Analytics 4 - אירוע ליד */
        trackLead("contact_form");
        /* תיקון 1 - גלול לcontact כדי להציג הודעת הצלחה */
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative pt-14 md:pt-24 pb-12 md:pb-16 bg-brand-ink overflow-hidden grain">
      <div className="absolute top-0 inset-x-0 gold-hairline" />
      {/* Spotlight on the form */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 45% at 50% 35%, rgba(200,16,46,0.35) 0%, transparent 60%), radial-gradient(ellipse 40% 35% at 50% 0%, rgba(201,168,76,0.25) 0%, transparent 60%)",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 relative z-[2]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-2xl mx-auto"
        >
          <div id="contact" />
          <SectionTitle
            kicker="דברו איתנו"
            title="שריינו את PartyTalk"
            subtitle="מוכנים ליצור את המזכרת הכי מיוחדת מהאירוע שלכם? השאירו פרטים ונחזור אליכם"
          />

          {/* כפתור וואטסאפ - חלופה מהירה לטופס */}
          <div className="text-center -mt-8 mb-6">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackContactClick("whatsapp")}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-b from-green-500 to-green-600 text-white px-7 py-3 rounded-full font-bold text-base shadow-[0_8px_30px_rgba(34,197,94,0.35)] transition-all hover:-translate-y-1 hover:brightness-105"
            >
              <MessageCircle className="w-5 h-5" />
              אפשר לשלוח גם הודעה
            </a>
          </div>

          <div className="rounded-3xl p-[1.5px] bg-gradient-to-br from-brand-gold/70 via-white/10 to-brand-gold/30 shadow-[0_32px_90px_rgba(0,0,0,0.6)]">
            <div className="bg-brand-ink/95 backdrop-blur-xl rounded-3xl p-8">
            {status === "done" ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">הפרטים התקבלו!</h3>
                <p className="text-gray-400">נחזור אליכם בהקדם עם כל הפרטים על פארטיטוק</p>
              </div>
            ) : (
              <form
                name="contact"
                onSubmit={handleSubmit}
                className="space-y-5"
                data-netlify="true"
                netlify-honeypot="bot-field"
              >
                {/* Netlify Forms - שדות נסתרים */}
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="subject" />
                <input type="hidden" name="bot-field" className="hidden" />

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="field-name" className="block text-sm font-medium text-gray-300 mb-2">שם מלא *</label>
                    <input
                      id="field-name"
                      type="text"
                      name="name"
                      required
                      aria-required="true"
                      autoComplete="name"
                      placeholder="השם המלא שלכם"
                      className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="field-phone" className="block text-sm font-medium text-gray-300 mb-2">טלפון *</label>
                    <input
                      id="field-phone"
                      type="tel"
                      name="phone"
                      required
                      aria-required="true"
                      aria-invalid={phoneError ? "true" : "false"}
                      aria-describedby={phoneError ? "phone-error" : undefined}
                      autoComplete="tel"
                      placeholder="050-0000000"
                      pattern="[0-9\-\s\+]{9,15}"
                      title="נא להזין מספר טלפון של 10 ספרות"
                      onChange={() => setPhoneError("")}
                      className={`w-full bg-white/5 border text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:bg-white/10 transition-all ${phoneError ? "border-red-500 focus:border-red-400" : "border-white/15 focus:border-brand-gold"}`}
                    />
                    {phoneError && (
                      <p id="phone-error" role="alert" className="text-red-400 text-xs mt-1.5">
                        {phoneError}
                      </p>
                    )}
                  </div>
                </div>

                {/* Event type dropdown */}
                <div>
                  <label htmlFor="field-event-type" className="block text-sm font-medium text-gray-300 mb-2">סוג האירוע</label>
                  <select
                    id="field-event-type"
                    name="event_type"
                    defaultValue=""
                    className="w-full bg-white/5 border border-white/15 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all appearance-none"
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="" disabled className="bg-gray-900">
                      בחרו סוג אירוע
                    </option>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} value={t} className="bg-gray-900 text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="field-date" className="block text-sm font-medium text-gray-300 mb-2">תאריך האירוע</label>
                    <div className="relative">
                      <input
                        ref={dateRef}
                        id="field-date"
                        type="date"
                        name="event_date"
                        className="w-full bg-white/5 border border-white/15 text-white rounded-xl px-4 focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all"
                        style={{ colorScheme: "dark", height: "50px", boxSizing: "border-box" }}
                      />
                      {/* left-4: אייקון הלוח של הדפדפן יושב בקצה הימני של שדה
                          תאריך (השדה כפוי dir:ltr), לכן הכיתוב חייב לשבת בצד שמאל
                          כדי לא לשבת עליו. */}
                      <span
                        ref={datePhRef}
                        className="date-ph is-empty pointer-events-none absolute inset-y-0 left-4 items-center text-gray-600"
                      >
                        בחרו תאריך
                      </span>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="field-location" className="block text-sm font-medium text-gray-300 mb-2">מיקום האירוע</label>
                    <input
                      id="field-location"
                      type="text"
                      name="location"
                      autoComplete="street-address"
                      placeholder="איפה מתקיים האירוע?"
                      className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">מידע נוסף</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="ספרו לנו עוד על האירוע שלכם..."
                    className="w-full bg-white/5 border border-white/15 text-white placeholder-gray-600 rounded-xl px-4 py-3 focus:outline-none focus:border-brand-gold focus:bg-white/10 transition-all resize-none"
                  />
                </div>

                <label htmlFor="field-consent" className="flex items-start gap-3 cursor-pointer">
                  <input
                    id="field-consent"
                    type="checkbox"
                    name="consent"
                    value="מאשר/ת"
                    required
                    aria-required="true"
                    className="mt-0.5 w-4 h-4 flex-shrink-0 rounded border-white/30 bg-white/10 accent-[#C8102E] cursor-pointer"
                  />
                  <span className="text-xs text-gray-500 leading-relaxed">
                    בשליחת הטופס אני מאשר/ת שמירת פרטים לצורך מתן שירות, ניהול קשרי לקוחות ושיווק, בהתאם ל
                    <a href="/privacy/" className="underline hover:text-brand-gold-light transition-colors">מדיניות הפרטיות</a>. *
                  </span>
                </label>

                {status === "error" && (
                  <p role="alert" className="text-red-400 text-sm text-center">
                    שגיאה בשליחה - אנא נסו שוב או צרו קשר טלפונית
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-gradient-to-b from-brand-gold-light to-brand-gold text-brand-ink border border-brand-red/40 disabled:opacity-60 py-4 rounded-full font-bold text-lg transition-all hover:brightness-105 hover:shadow-[0_8px_40px_rgba(200,16,46,0.4)] hover:-translate-y-0.5"
                >
                  {status === "sending" ? "שולח..." : "שלחו פרטים"}
                </button>
              </form>
            )}

            {/* Direct contact links */}
            <div className="mt-8 pt-8 border-t border-white/10 text-center">
              <p className="text-gray-400 font-medium mb-4">או צרו איתנו קשר ישירות</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackContactClick("whatsapp")}
                  className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-medium transition-all hover:shadow-[0_0_24px_rgba(22,163,74,0.4)]"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </div>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-black text-white py-14 relative">
      <div className="absolute top-0 inset-x-0 gold-hairline" />
      <div className="max-w-7xl mx-auto px-4">
        {/* ── 3 עמודות ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-8">
          {/* עמודה 1 - לוגו */}
          <div>
            <img src="/logo-tight.webp" alt="PartyTalk" className="h-12 w-auto mb-3" loading="lazy" decoding="async" />
            <p className="text-gray-500 text-sm leading-relaxed mb-4">כי כל אירוע צריך מזכרת אמיתית</p>
            <a href="/blog/" className="inline-flex items-center gap-2 border border-brand-gold/50 text-brand-gold-light hover:bg-brand-gold hover:text-brand-ink px-5 py-2.5 rounded-full font-bold text-sm transition-all">
              <Sparkles className="w-4 h-4" />
              לבלוג שלנו
            </a>
          </div>

          {/* עמודה 2 - צרו קשר + רשתות חברתיות */}
          <div>
            <h4 className="font-bold text-brand-gold mb-4">צרו קשר</h4>
            <div className="space-y-2.5 text-sm mb-5">
              <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer"
                onClick={() => trackContactClick("whatsapp")}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />{PHONE}
              </a>
              <a href={`mailto:${EMAIL}`}
                onClick={() => trackContactClick("email")}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />{EMAIL}
              </a>
            </div>

            {/* עקבו אחרינו */}
            <p className="text-gray-500 text-xs mb-3">עקבו אחרינו</p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "אינסטגרם", href: "https://www.instagram.com/partytalk_events/", icon: <Instagram className="w-4 h-4" /> },
                { label: "פייסבוק", href: "https://www.facebook.com/p/Party-talk-%D7%A2%D7%9E%D7%93%D7%AA-%D7%A8%D7%90%D7%99%D7%95%D7%9F-%D7%98%D7%9C%D7%95%D7%95%D7%99%D7%96%D7%99%D7%95%D7%A0%D7%99-%D7%9C%D7%90%D7%99%D7%A8%D7%95%D7%A2%D7%99%D7%9D-61575202233866/", icon: <Facebook className="w-4 h-4" /> },
                { label: "טיקטוק", href: "https://www.tiktok.com/@partytalk_events", icon: <span className="text-xs font-black">TT</span> },
                { label: "לינקדאין", href: "https://www.linkedin.com/company/partytalk/?viewAsMember=true", icon: <Linkedin className="w-4 h-4" /> },
                { label: "פינטרסט", href: "https://www.pinterest.com/PartyTalk_events/", icon: <span className="text-sm font-black">P</span> },
                { label: "יוטיוב", href: "https://www.youtube.com/@PartyTalk_events/shorts", icon: <Youtube className="w-4 h-4" /> },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-red flex items-center justify-center text-gray-400 hover:text-white transition-all hover:scale-110">
                  {icon}
                </a>
              ))}
            </div>

          </div>

          {/* עמודה 3 - מידע משפטי */}
          <div>
            <h4 className="font-bold text-brand-gold mb-4">מידע משפטי</h4>
            <ul className="space-y-2 text-sm">
              {[
                ["מדיניות פרטיות", "/privacy/"],
                ["הצהרת נגישות", "/accessibility/"],
                ["תנאי שימוש", "/terms/"],
              ].map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-gray-400 hover:text-white transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} PartyTalk - כל הזכויות שמורות לפארטיטוק
        </div>
      </div>
    </footer>
  );
}

// ── WhatsApp Floating Button ──────────────────────────────────
function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);
  if (!visible) return null;
  return (
    <a
      href={`https://wa.me/${WHATSAPP}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContactClick("whatsapp")}
      className="fixed left-4 bottom-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 group"
      aria-label="שלחו לנו הודעה בוואטסאפ"
    >
      <MessageCircle className="w-8 h-8 text-white" />
      <span className="absolute left-20 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
        שלחו הודעה בוואטסאפ
      </span>
    </a>
  );
}

// ── תיקון 5: Accessibility Widget ────────────────────────────
function AccessibilityWidget() {
  return (
    <details
      className="fixed right-4 bottom-6 z-50 group"
      aria-label="תפריט נגישות"
    >
      <summary
        className="list-none w-16 h-16 bg-blue-700 hover:bg-blue-800 rounded-full shadow-2xl flex items-center justify-center cursor-pointer transition-all hover:scale-110"
        aria-label="פתח אפשרויות נגישות"
      >
        <span className="text-white text-2xl" aria-hidden="true">♿</span>
      </summary>

      {/* פאנל נגישות - מופיע מעל הכפתור */}
      <div
        dir="rtl"
        className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-5 w-72 border border-gray-100"
      >
        <h3 className="font-bold text-gray-900 text-base mb-4 border-b pb-2">אפשרויות נגישות</h3>
        <div className="space-y-2">
          <button
            id="a11y-font-up"
            className="w-full text-right px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            🔡 הגדל גופן
          </button>
          <button
            id="a11y-font-down"
            className="w-full text-right px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            🔤 הקטן גופן
          </button>
          <button
            id="a11y-contrast"
            className="w-full text-right px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            🌓 ניגוד גבוה
          </button>
          <button
            id="a11y-grayscale"
            className="w-full text-right px-4 py-2.5 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            ⬜ גווני אפור
          </button>
          <button
            id="a11y-reset"
            className="w-full text-right px-4 py-2.5 rounded-xl text-sm text-red-600 hover:bg-red-50 transition-colors"
          >
            ↺ איפוס
          </button>
          <a
            href="/accessibility/"
            className="block text-center text-xs text-blue-600 hover:underline mt-2 pt-2 border-t"
          >
            הצהרת נגישות
          </a>
        </div>
      </div>
    </details>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function Page() {
  /* גלילה מדויקת לעוגן (#contact וכו') כשמגיעים מעמוד אחר כמו הבלוג -
     מתקנת קפיצה לא מדויקת בגלל טעינת תוכן/תמונות אחרי הניווט */
  useEffect(() => {
    if (typeof window === "undefined" || !window.location.hash) return;
    const id = decodeURIComponent(window.location.hash.slice(1));
    const scroll = () => goTo(id);
    const t1 = setTimeout(scroll, 300);
    const t2 = setTimeout(scroll, 800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      {/* קרוסלת ביקורות - מובייל + desktop - infinite loop */}
      <Script id="reviews-carousel" strategy="afterInteractive">{`
        (function() {

          /* ═══════════════════════════════════════
             מובייל - 1 פריט, לולאה אינסופית
          ═══════════════════════════════════════ */
          var track = document.getElementById('reviews-track');
          var dots  = document.querySelectorAll('.reviews-dot');
          var nextBtn = document.getElementById('reviews-next');
          var prevBtn = document.getElementById('reviews-prev');

          if (track && nextBtn && prevBtn && dots.length > 0) {
            var realTotal = dots.length;
            var timer;

            /* שכפל ראשון ואחרון */
            var firstClone = track.children[0].cloneNode(true);
            var lastClone  = track.children[realTotal - 1].cloneNode(true);
            track.appendChild(firstClone);
            track.insertBefore(lastClone, track.children[0]);

            /* סה"כ פריטים כולל קלונים */
            var cur = 1; /* מתחיל על הפריט האמיתי הראשון */

            function setPos(animate) {
              track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
              track.style.transform  = 'translateX(' + (cur * -100) + '%)';
            }

            function updateDots() {
              var realIdx = ((cur - 1) + realTotal) % realTotal;
              dots.forEach(function(d, i) {
                d.style.background = i === realIdx ? '#C8102E' : '#4B5563';
                d.style.transform  = i === realIdx ? 'scale(1.4)' : 'scale(1)';
              });
            }

            function next() { cur++; setPos(true); updateDots(); }
            function prev() { cur--; setPos(true); updateDots(); }

            /* לאחר אנימציה - קפוץ לפריט אמיתי אם הגעת לקלון */
            track.addEventListener('transitionend', function() {
              if (cur === 0) {
                cur = realTotal;
                setPos(false);
              } else if (cur === realTotal + 1) {
                cur = 1;
                setPos(false);
              }
            });

            function startAuto() {
              clearInterval(timer);
              timer = setInterval(next, 2000);
            }

            nextBtn.addEventListener('click', function() { next(); startAuto(); });
            prevBtn.addEventListener('click', function() { prev(); startAuto(); });
            dots.forEach(function(d, i) {
              d.addEventListener('click', function() {
                cur = i + 1; setPos(true); updateDots(); startAuto();
              });
            });

            setPos(false);
            updateDots();
            startAuto();
          }

          /* ═══════════════════════════════════════
             Desktop - 4 פריטים, לולאה אינסופית
          ═══════════════════════════════════════ */
          var trackD = document.getElementById('reviews-track-desktop');
          var nextD  = document.getElementById('reviews-next-desktop');
          var prevD  = document.getElementById('reviews-prev-desktop');
          var dotsD  = document.querySelectorAll('.reviews-dot-desktop');

          if (trackD && nextD && prevD) {
            var viewD     = 4;
            var realTotalD = trackD.children.length; /* 21 */
            var timerD;

            /* שכפל 4 ראשונים לסוף ו-4 אחרונים לתחילה */
            for (var k = 0; k < viewD; k++) {
              trackD.appendChild(trackD.children[k].cloneNode(true));
            }
            for (var j = viewD - 1; j >= 0; j--) {
              trackD.insertBefore(
                trackD.children[realTotalD - 1 + viewD - j].cloneNode(true),
                trackD.children[0]
              );
            }

            var curD = viewD; /* מתחיל על הפריט האמיתי הראשון */

            function setPosD(animate) {
              var itemW = trackD.parentElement.offsetWidth / viewD;
              trackD.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
              trackD.style.transform  = 'translateX(-' + (curD * itemW) + 'px)';
            }

            function updateDotsD() {
              var page = Math.floor(((curD - viewD) % realTotalD) / viewD);
              if (page < 0) page += Math.ceil(realTotalD / viewD);
              dotsD.forEach(function(d, i) {
                d.style.background = i === page ? '#C8102E' : '#4B5563';
                d.style.transform  = i === page ? 'scale(1.4)' : 'scale(1)';
              });
            }

            function nextD_fn() { curD++; setPosD(true); updateDotsD(); }
            function prevD_fn() { curD--; setPosD(true); updateDotsD(); }

            trackD.addEventListener('transitionend', function() {
              if (curD <= viewD - 1) {
                curD = realTotalD + viewD - 1;
                setPosD(false);
              } else if (curD >= realTotalD + viewD) {
                curD = viewD;
                setPosD(false);
              }
            });

            function startAutoD() {
              clearInterval(timerD);
              timerD = setInterval(nextD_fn, 2000);
            }

            nextD.addEventListener('click', function() { nextD_fn(); startAutoD(); });
            prevD.addEventListener('click', function() { prevD_fn(); startAutoD(); });
            dotsD.forEach(function(d, i) {
              d.addEventListener('click', function() {
                curD = i * viewD + viewD; setPosD(true); updateDotsD(); startAutoD();
              });
            });

            setPosD(false);
            updateDotsD();
            startAutoD();
          }
        })();
      `}</Script>

      {/* תיקון 6 - סגירת תפריט: לחיצה על קישור או מחוץ לתפריט */}
      <Script id="close-mobile-nav" strategy="afterInteractive">{`
        document.addEventListener('click', function(e) {
          var det = document.querySelector('header details');
          if (!det) return;
          /* סגור אם לחצו על קישור בפנים */
          if (e.target.closest('header details a')) {
            det.open = false;
            return;
          }
          /* תיקון 6 - סגור אם לחצו מחוץ לתפריט */
          if (det.open && !det.contains(e.target)) {
            det.open = false;
          }
        });
      `}</Script>

      {/* תיקון 5 - Accessibility widget JS */}
      <Script id="a11y-widget" strategy="afterInteractive">{`
        (function() {
          var fontSize = 100;
          document.getElementById('a11y-font-up') && document.getElementById('a11y-font-up').addEventListener('click', function() {
            fontSize = Math.min(fontSize + 10, 150);
            document.body.style.fontSize = fontSize + '%';
          });
          document.getElementById('a11y-font-down') && document.getElementById('a11y-font-down').addEventListener('click', function() {
            fontSize = Math.max(fontSize - 10, 80);
            document.body.style.fontSize = fontSize + '%';
          });
          document.getElementById('a11y-contrast') && document.getElementById('a11y-contrast').addEventListener('click', function() {
            document.body.classList.toggle('a11y-contrast');
          });
          document.getElementById('a11y-grayscale') && document.getElementById('a11y-grayscale').addEventListener('click', function() {
            document.body.classList.toggle('a11y-grayscale');
          });
          document.getElementById('a11y-reset') && document.getElementById('a11y-reset').addEventListener('click', function() {
            fontSize = 100;
            document.body.style.fontSize = '';
            document.body.classList.remove('a11y-contrast', 'a11y-grayscale', 'a11y-large', 'a11y-xlarge');
          });
        })();
      `}</Script>
      {/* ── סכמת Organization: מסמנת לגוגל שפארטיטוק היא היוצרת של עמדת
             הראיונות לאירועים, עם המייסדים קים ורועי ושנת ההקמה 2024.
             בריחת < מונעת יציאה מתג הסקריפט. ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "PartyTalk",
            alternateName: "פארטיטוק",
            url: "https://partytalk.co.il",
            logo: "https://partytalk.co.il/logo-tight.png",
            description:
              "פארטיטוק היא היוצרת של עמדת הראיונות הטלוויזיונית לאירועים - האטרקציה שבה מראיינת וצלם מראיינים את האורחים על בעלי האירוע ויוצרים מזכרת וידאו חיה. הרעיון נולד והובא לראשונה לעולם האירועים בישראל על ידי קים ורועי.",
            foundingDate: "2024",
            founder: [
              { "@type": "Person", name: "קים" },
              { "@type": "Person", name: "רועי" },
            ],
            slogan: "האטרקציה שכולם מדברים עליה",
            areaServed: "IL",
            email: "infopartytalk@gmail.com",
            sameAs: ["https://www.instagram.com/partytalk_events/"],
            knowsAbout: [
              "עמדת ראיונות לאירועים",
              "מראיינת לאירוע",
              "אטרקציה לחתונה",
              "אטרקציה לאירוע חברה",
            ],
          }).replace(/</g, "\\u003c"),
        }}
      />
      {/* ── סכמת FAQPage: עוטפת את שאלות-התשובות הקיימות באתר כדי שמנועי
             חיפוש ו-AI יוכלו לצטט אותן ישירות. נבנית מאותו מקור (WHAT_ITEMS). ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: WHAT_ITEMS.map((item) => ({
              "@type": "Question",
              name: item.title,
              acceptedAnswer: { "@type": "Answer", text: item.content },
            })),
          }).replace(/</g, "\\u003c"),
        }}
      />
      {/* ── סכמת Service: מתארת למכונות את השירות עצמו - סוג, ספק, אזור
             שירות ותיאור - כדי ש-AI יוכל לענות "מה זה / איפה זמין". ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "עמדת ראיונות טלוויזיונית לאירועים",
            serviceType: "אטרקציה לאירועים - עמדת ראיונות מצולמת",
            provider: {
              "@type": "Organization",
              name: "PartyTalk",
              url: "https://partytalk.co.il",
            },
            areaServed: { "@type": "Country", name: "ישראל" },
            description:
              "עמדת ראיונות בסגנון טלוויזיוני לאירועים: מראיינת וצלם מקצועיים מראיינים את האורחים על בעלי האירוע - עם שאלות מצחיקות, מרגשות ונוסטלגיות - ומפיקים מזכרת וידאו ערוכה. מתאים לחתונות, ימי הולדת עגולים, בר/בת מצווה ואירועי חברה.",
            url: "https://partytalk.co.il",
            audience: {
              "@type": "Audience",
              audienceType: "חתונות, ימי הולדת, אירועי חברה, בר/בת מצווה",
            },
          }).replace(/</g, "\\u003c"),
        }}
      />
      {/* ── נגישות: Skip link ── */}
      <a href="#main-content" className="skip-link">
        דלג לתוכן הראשי
      </a>

      <Header />
      <main id="main-content" className="bg-brand-ink">
        <Hero />
        <Ticker />
        {/* אזור 2 */}
        <VideoFeature
          title="אתם גם יכולים להיות הזוג הזה שמדברים עליו ככה"
          vimeo={{ id: "1216622144", hash: "ff41c0f967" }}
        />
        <About />
        <WhatYouGet />
        {/* אזור 3 */}
        <VideoFeature
          title="המלוות שלך ידברו ככה גם עליך?"
          vimeo={{ id: "1216622601", hash: "48ba02de56" }}
        />
        <Events />
        {/* אזור 4 - סרטון מיוטיוב (shorts) */}
        <VideoFeature
          title="האורחים שלכם הם גם הכוכבים"
          youtube="_nNZLjgpeRE"
        />
        <Reviews />
        <Contact />
        <InstagramFeed />
      </main>
      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
    </>
  );
}
