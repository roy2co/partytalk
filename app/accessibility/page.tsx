import type { Metadata } from "next";
import BackButton from "../components/BackButton";

export const metadata: Metadata = {
  title: "הצהרת נגישות - PartyTalk",
};

export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* Header */}
      <header className="border-b border-gray-100 py-4 px-4 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <a href="/">
            <img src="/logo.png" alt="PartyTalk" className="h-12 w-auto" />
          </a>
          <a href="/" className="text-sm text-gray-500 hover:text-brand-red transition-colors">
            ← דף הבית
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-12">
        {/* Back button - top */}
        <BackButton position="top" />

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-2">
          הצהרת נגישות - PartyTalk
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-brand-red to-brand-gold rounded-full mb-3" />
        <p className="text-sm text-gray-400 mb-10">תאריך עדכון אחרון: 1.9.2025</p>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
          <p>
            PartyTalk מחויבת להנגיש את שירותיה לכלל האוכלוסייה, לרבות אנשים עם מוגבלויות. אנו פועלים ליישום ושמירה על נגישות האתר בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות שירות), התש&quot;ע-2010 ובהתאם לתקן הישראלי ת&quot;י 5568.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">רמת הנגישות</h2>
            <p>אתר זה נבנה בהתאם לתקן הישראלי ת&quot;י 5568 ברמה AA, המבוסס על הנחיות WCAG 2.0. התקן כולל הנחיות להנגשת תכנים באינטרנט עבור אנשים עם מוגבלויות שונות.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">תכונות נגישות באתר</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>ניווט באמצעות מקלדת בלבד</li>
              <li>תמיכה בתוכנות קריאת מסך</li>
              <li>ניגוד צבעים מתאים לקריאה</li>
              <li>אפשרות להגדלת הגופן עד 150%</li>
              <li>כותרות מובנות היררכית</li>
              <li>תיאור חלופי לתמונות</li>
              <li>קישורים מובנים וברורים</li>
              <li>פונטים ברורים וקריאים</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">כיצד להשתמש בתכונות הנגישות</h2>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">כפתור הנגישות</h3>
            <p>בפינה השמאלית העליונה של האתר תמצאו כפתור נגישות עם סמל האדם הנגיש. הכפתור מאפשר:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700">
              <li>הגדלה והקטנה של גודל הגופן (80%-150%)</li>
              <li>הפעלת מצב ניגוד גבוה</li>
              <li>הסתרה והצגה של כפתור הנגישות</li>
              <li>איפוס כל ההגדרות</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-5 mb-2">ניווט במקלדת</h3>
            <ul className="list-none space-y-1 text-gray-700">
              <li><kbd className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">Tab</kbd> - מעבר קדימה בין אלמנטים</li>
              <li><kbd className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">Shift + Tab</kbd> - מעבר אחורה בין אלמנטים</li>
              <li><kbd className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">Enter / Space</kbd> - הפעלת קישורים וכפתורים</li>
              <li><kbd className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">Esc</kbd> - סגירת חלונות קופצים ותפריטים</li>
              <li><kbd className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">חצים</kbd> - ניווט בתפריטים ורשימות</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">בעיות נגישות ידועות וחלופות</h2>
            <p>אנו עובדים ברציפות לשיפור נגישות האתר. בעיות ידועות:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700">
              <li>חלק מהתמונות בגלריה עשויות להיות ללא תיאור מלא - אנו עובדים על השלמת התיאורים</li>
              <li>סרטוני הדגמה אינם כוללים כתוביות - תיאור טקסטואלי זמין לפי בקשה</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">פנייה בנושא נגישות</h2>
            <p>אם נתקלתם בבעיית נגישות באתר או שאתם זקוקים לסיוע, אנא פנו אלינו:</p>
            <ul className="list-none space-y-1 mt-3 text-gray-700">
              <li><strong>רכז נגישות:</strong> צוות PartyTalk</li>
              <li><strong>אימייל:</strong> <a href="mailto:infopartytalk@gmail.com" className="text-brand-red hover:underline">infopartytalk@gmail.com</a></li>
              <li><strong>טלפון:</strong> <a href="tel:+972542691416" className="text-brand-red hover:underline">054-269-1416</a></li>
              <li><strong>זמני מענה:</strong> ראשון-חמישי, 9:00-17:00</li>
            </ul>
            <p className="mt-3">אנו מתחייבים לענות לפניות בתוך 5 ימי עסקים ולספק פתרון או חלופה מתאימה.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">פנייה לרשות המפקחת</h2>
            <p>אם לא קיבלתם מענה מתאים, תוכלו לפנות לאגף שוויון זכויות לאנשים עם מוגבלות:</p>
            <ul className="list-none space-y-1 mt-3 text-gray-700">
              <li>טלפון: 02-646-6644</li>
              <li>פקס: 02-646-6645</li>
              <li>אימייל: <a href="mailto:netzigut@justice.gov.il" className="text-brand-red hover:underline">netzigut@justice.gov.il</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">עדכונים ושיפורים</h2>
            <p>הצהרת נגישות זו עודכנה לאחרונה ב-1.9.2025. אנו עובדים ברציפות לשיפור נגישות האתר ונעדכן הצהרה זו בהתאם לשינויים שיבוצעו.</p>
          </section>
        </div>

        {/* Back button - bottom */}
        <BackButton position="bottom" />
      </main>
    </div>
  );
}
