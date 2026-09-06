import type { Metadata } from "next";
import BackButton from "../components/BackButton";

export const metadata: Metadata = {
  title: "מדיניות פרטיות - PartyTalk",
};

export default function PrivacyPage() {
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
          מדיניות פרטיות - PartyTalk
        </h1>
        <div className="w-16 h-1 bg-gradient-to-r from-brand-red to-brand-gold rounded-full mb-3" />
        <p className="text-sm text-gray-400 mb-10">תאריך עדכון אחרון: 7.8.2026</p>

        {/* Content */}
        <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-8">
          <p>
            אנחנו ב־PartyTalk מכבדים את פרטיות המשתמשים שלנו ומתחייבים לשמור על המידע האישי בהתאם לחוקי הגנת הפרטיות החלים בישראל. במסמך זה נפרט אילו נתונים אנו אוספים, כיצד אנו משתמשים בהם, כיצד נשמרים המידע והסרטונים, ומהן הזכויות שלך.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1. פרטי התקשרות</h2>
            <ul className="list-none space-y-1 text-gray-700">
              <li><strong>PartyTalk</strong></li>
              <li>מיקום: תל אביב, ישראל</li>
              <li>אימייל: <a href="mailto:infopartytalk@gmail.com" className="text-brand-red hover:underline">infopartytalk@gmail.com</a></li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2. סוגי המידע שאנו אוספים</h2>
            <p>בעת השימוש בשירות, אנו עשויים לאסוף את הפרטים הבאים:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700">
              <li>שם פרטי ושם משפחה</li>
              <li>מספר טלפון</li>
              <li>כתובת דוא&quot;ל</li>
              <li>פרטי האירוע (תאריך האירוע, מיקום האירוע)</li>
            </ul>
            <p className="mt-3">בנוסף, יתכן שנאספים נתונים טכניים באמצעות Cookies וכלים דומים, לשיפור חוויית המשתמש.</p>
            <p className="mt-2 font-semibold text-gray-900">חשוב: איננו אוספים או שומרים תמונות/סרטונים ממשתמשי האתר.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3. מטרות השימוש במידע</h2>
            <p>המידע שנאסף ישמש אך ורק ל:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700">
              <li>יצירת קשר עם לקוחות ומתעניינים בשירות</li>
              <li>מתן מידע על שירותי PartyTalk</li>
              <li>ניהול אירועים והזמנות</li>
              <li>שיפור האתר והשירותים שלנו</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">4. משך שמירת המידע</h2>
            <p><strong>פרטי פנייה</strong> (שם, טלפון, דוא&quot;ל ופרטי האירוע) נשמרים כל עוד הם נדרשים לטיפול בפנייה ולתקופה של עד 24 חודשים ממועד ההתקשרות האחרונה, ולאחר מכן נמחקים. ניתן לבקש מחיקה מוקדמת בכל עת (ראו סעיף 7).</p>
            <p className="mt-3"><strong>סרטוני האירוע:</strong></p>
            <ul className="list-disc list-inside space-y-1 mt-1 text-gray-700">
              <li>הסרטונים נשמרים בשרתי PartyTalk למשך עד 3 חודשים לאחר האירוע.</li>
              <li>לאחר האירוע, הסרטונים נמסרים ללקוחות (הזוג החוגג) בלבד.</li>
              <li>איננו משתפים את הסרטונים עם צדדים שלישיים.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">5. שיתוף מידע עם צדדים שלישיים</h2>
            <p>איננו מוכרים את המידע האישי שלך ואיננו מעבירים אותו לצדדים שלישיים לצורכי שיווק מטעמם.</p>
            <p className="mt-3">יחד עם זאת, להפעלת האתר, למדידת השימוש בו ולשיווק שירותינו אנו נעזרים בספקי שירות המעבדים נתונים עבורנו:</p>
            <ul className="list-disc list-inside space-y-2 mt-2 text-gray-700">
              <li><strong>Netlify</strong> - אחסון האתר וקליטת טפסי יצירת הקשר. פרטים שנשלחים בטופס נשמרים במערכת זו.</li>
              <li><strong>Google Analytics</strong> - מדידת השימוש באתר וניתוח תנועה. במסגרת זו נאספים ומועברים ל-Google נתונים כגון כתובת IP, סוג הדפדפן והמכשיר, הדפים שנצפו ופעולות שבוצעו באתר.</li>
              <li><strong>Meta Pixel (פייסבוק)</strong> - מדידת יעילות הפרסום והתאמת מודעות. במסגרת זו מועברים ל-Meta נתוני שימוש באתר, לרבות דפים שנצפו ופעולות כגון השארת פרטים בטופס.</li>
              <li><strong>Microsoft Clarity</strong> - ניתוח חוויית המשתמש באמצעות מפות חום והקלטות אנונימיות של הגלישה (תנועות עכבר, קליקים וגלילה), לצורך שיפור האתר. הכלי מסתיר אוטומטית טקסט ושדות רגישים, ובמסגרתו מועברים ל-Microsoft נתוני שימוש באתר.</li>
              <li><strong>Vimeo</strong> ו-<strong>YouTube (Google)</strong> - הצגת סרטוני התדמית, ו-<strong>Behold</strong> - הצגת פיד האינסטגרם. בעת טעינת רכיבים אלה מועברת כתובת ה-IP שלך לספקים אלה.</li>
            </ul>
            <p className="mt-3">ספקים אלה פועלים בהתאם למדיניות הפרטיות שלהם, וחלקם מאחסנים מידע מחוץ לישראל. השימוש בכלים אלה נעשה באמצעות Cookies וטכנולוגיות דומות. באפשרותך לחסום או למחוק Cookies דרך הגדרות הדפדפן, וכן להתקין את <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline">התוסף של Google לביטול מעקב Analytics</a>.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">6. אבטחת מידע</h2>
            <p>המידע האישי והסרטונים נשמרים במערכות מאובטחות ומוגנות באמצעי אבטחה מקובלים. יחד עם זאת, אין מערכת אבטחה החסינה לחלוטין, ולכן איננו יכולים להתחייב לאבטחה מוחלטת.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">7. זכויות המשתמש</h2>
            <p>בהתאם לחוק הגנת הפרטיות בישראל, עומדות לך הזכויות הבאות:</p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-gray-700">
              <li>לעיין במידע שנשמר עליך.</li>
              <li>לבקש לתקן פרטים לא נכונים.</li>
              <li>לבקש למחוק את המידע שלך.</li>
            </ul>
            <p className="mt-3">בקשה למחיקה או תיקון תיעשה באמצעות פנייה לכתובת: <a href="mailto:infopartytalk@gmail.com" className="text-brand-red hover:underline">infopartytalk@gmail.com</a></p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">8. עדכונים למדיניות פרטיות</h2>
            <p>מדיניות פרטיות זו עודכנה לאחרונה בתאריך 7.8.2026. אנו שומרים לעצמנו את הזכות לעדכן את המסמך בהתאם לשינויים רגולטוריים או תפעוליים.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">9. קהל יעד</h2>
            <p>השירות של PartyTalk פתוח לכל הגילאים ואין הגבלת שימוש.</p>
          </section>
        </div>

        {/* Back button - bottom */}
        <BackButton position="bottom" />
      </main>
    </div>
  );
}
