import type { Metadata } from "next";
import { Heebo, Suez_One } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// ── Google Analytics 4 (gtag ישיר) ────────────────────────────
const GA_ID = "G-3Y9S4P4E7Z";

// ── Facebook Pixel ────────────────────────────────────────────
const FB_PIXEL_ID = "2511801729213939";

// ── Microsoft Clarity (מפות חום + הקלטות סשן) ─────────────────
const CLARITY_ID = "xykquyge6m";

// ── TikTok Pixel ──────────────────────────────────────────────
const TIKTOK_PIXEL_ID = "D9TL59RC77U1EF9DS6U0";

/* המשקלים 300 ו-800 לא בשימוש בשום מקום בקוד - הוסרו כדי לא לטעון בייטים לחינם */
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
});

const suezOne = Suez_One({
  subsets: ["hebrew", "latin"],
  weight: "400",
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://partytalk.co.il"),
  title: "עמדת ראיונות לאירוע | PartyTalk - האטרקציה שכולם מדברים עליה",
  description:
    "עמדת ראיונות לאירוע - האטרקציה הייחודית שבה מראיינת וצלם מראיינים את האורחים עליכם ויוצרים סרטון מרגש. מושלם לחתונה, יום הולדת ואירוע חברה. השאירו פרטים.",
  keywords:
    "עמדת ראיונות לאירוע, ראיונות באירוע, עמדת ראיונות, אטרקציה ייחודית לאירוע, אטרקציה לחתונה, אטרקציה לאירוע חברה, פארטיטוק, party talk, מראיינת לאירוע, מזכרת חתונה",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "עמדת ראיונות לאירוע | PartyTalk - האטרקציה שכולם מדברים עליה",
    description:
      "עמדת ראיונות לאירוע - מראיינת וצלם מראיינים את האורחים עליכם ויוצרים סרטון מרגש. לחתונה, יום הולדת ואירוע חברה.",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <head>
        {/* ── Google Analytics 4 ── */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}</Script>

        {/* ── Facebook Pixel ──
            lazyOnload: הפיקסל שוקל 103KB ואינו נחוץ לציור הראשון, לכן נטען
            בזמן סרק אחרי שהדף מוכן. PageView עדיין נרשם, ואירועי Lead נורים
            ממילא רק בשליחת הטופס - כך שמדידת הלידים לא מושפעת כלל. */}
        <Script id="fb-pixel" strategy="lazyOnload">{`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${FB_PIXEL_ID}');
          fbq('track', 'PageView');
        `}</Script>
        {/* ביקון לגולשים בלי JavaScript. נכתב כמחרוזת ולא כ-<img> של React
            במכוון: React מזהה תגי img ומוסיף להם <link rel="preload">, וכך
            הביקון הזה נמשך בעדיפות גבוהה אצל *כל* הגולשים - בזבוז על המסלול
            הקריטי. כמחרוזת הוא נשאר פעיל רק למי שבאמת צריך אותו. */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" alt="" src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1"/>`,
          }}
        />

        {/* ── Microsoft Clarity ──
            afterInteractive: נטען מוקדם (אחרי ההידרציה) כדי לתפוס את הסשן מתחילתו,
            בלי לחסום את הציור הראשון. מספק מפות חום והקלטות סשן לצד ה-GA4. */}
        <Script id="ms-clarity" strategy="afterInteractive">{`
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `}</Script>

        {/* ── TikTok Pixel ──
            lazyOnload: נטען בזמן סרק כמו הפיקסל של פייסבוק, בלי להאט את הציור
            הראשון. ttq.page() מדווח צפייה בכל עמוד. שים לב: ה-CSP ב-public/_headers
            חייב לאשר את analytics.tiktok.com אחרת הפיקסל ייחסם בשקט. */}
        <Script id="tiktok-pixel" strategy="lazyOnload">{`
          !function (w, d, t) {
            w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
            ttq.load('${TIKTOK_PIXEL_ID}');
            ttq.page();
          }(window, document, 'ttq');
        `}</Script>
      </head>
      <body className={`${heebo.className} ${suezOne.variable}`}>{children}</body>
    </html>
  );
}
