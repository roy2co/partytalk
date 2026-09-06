import type { Metadata } from "next";
import BackButton from "../components/BackButton";

export const metadata: Metadata = {
  title: "תנאי שימוש - PartyTalk",
};

export default function TermsPage() {
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
          תנאי שימוש - PartyTalk
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-brand-red to-brand-gold rounded-full mb-3" />
        <p className="text-sm text-gray-400 mb-10">תאריך עדכון אחרון: 1.9.2025</p>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
          <p>
            ברוכים הבאים לאתר של PartyTalk (להלן: &quot;האתר&quot;). השימוש באתר ובשירותים הניתנים בו כפוף לתנאים המפורטים להלן. השימוש באתר מהווה הסכמה מלאה מצד המשתמש לתנאים אלו.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. שימוש באתר</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>האתר מיועד להשארת פרטים ליצירת קשר, קבלת מידע על שירותי PartyTalk והזמנת שירותי החברה.</li>
              <li>המשתמש מתחייב למסור פרטים נכונים, מלאים ומדויקים בלבד.</li>
              <li>אין לעשות שימוש באתר לכל מטרה בלתי חוקית או מסחרית ללא אישור מראש ובכתב מ־PartyTalk.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. קניין רוחני</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>כל זכויות היוצרים והקניין הרוחני באתר, לרבות טקסטים, עיצובים, לוגו, גרפיקה ותכנים אחרים - שייכים ל־PartyTalk בלבד.</li>
              <li>אין להעתיק, לשכפל, להפיץ, לפרסם או לעשות כל שימוש מסחרי בתכנים אלה ללא אישור מפורש בכתב.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. אחריות</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>PartyTalk עושה כל מאמץ להבטיח את תקינות האתר ואת נכונות המידע המוצג בו.</li>
              <li>עם זאת, PartyTalk אינה נושאת בכל אחריות ישירה או עקיפה לנזקים, הפסדים או הוצאות שייגרמו עקב שימוש באתר או הסתמכות על המידע שבו.</li>
              <li>במקרה של תקלה טכנית או טעות במידע - נעשה מאמץ סביר לתקן את הבעיה בהקדם האפשרי.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. שינוי תנאי השימוש</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>PartyTalk רשאית לעדכן את תנאי השימוש מעת לעת.</li>
              <li>התאריך המופיע בראש עמוד זה מציין את מועד העדכון האחרון והוא מהווה את הגרסה המחייבת.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. חוק וסמכות שיפוט</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>השימוש באתר וכל הנובע ממנו כפופים לחוקי מדינת ישראל בלבד.</li>
              <li>סמכות השיפוט הבלעדית בכל עניין הקשור לשימוש באתר נתונה לבתי המשפט המוסמכים בעיר תל אביב.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. יצירת קשר</h2>
            <p>לכל שאלה או בקשה בנושא תנאי שימוש ניתן לפנות לכתובת המייל:</p>
            <a href="mailto:infopartytalk@gmail.com" className="text-brand-red hover:underline font-semibold mt-2 inline-block">
              infopartytalk@gmail.com
            </a>
          </section>
        </div>

        {/* Back button - bottom */}
        <BackButton position="bottom" />
      </main>
    </div>
  );
}
