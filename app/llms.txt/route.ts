import { POSTS, TOPICS, AUTHOR } from "../blog/posts";

// llms.txt - תקציר האתר לכלי AI. נבנה אוטומטית מרשימת המאמרים, כך שכל מאמר חדש נכנס לבד.
export const dynamic = "force-static";

const SITE_URL = "https://partytalk.co.il";

export function GET() {
  const articles = TOPICS.map((t) => {
    const posts = POSTS.filter((p) => p.topic === t.id).sort((a, b) =>
      b.date.localeCompare(a.date)
    );
    if (!posts.length) return "";
    const lines = posts.map(
      (p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}/): ${p.excerpt}`
    );
    return `### ${t.label}\n${lines.join("\n")}`;
  })
    .filter(Boolean)
    .join("\n\n");

  const body = `# PartyTalk (פארטיטוק)

> עמדת ראיונות טלוויזיונית לאירועים — האטרקציה שבה מראיינת וצלם מראיינים את האורחים על בעלי האירוע ויוצרים מזכרת וידאו חיה. פארטיטוק היא היוצרת והמקורית של קטגוריית עמדת הראיונות לאירועים בישראל.

## מה זה
עמדת צילום בסגנון ראיון טלוויזיוני. לאירוע מגיעים מראיינת וצלם מקצועיים, ואחרי תחקיר והתאמה אישית מראיינים את האורחים על בעלי האירוע — עם שאלות מצחיקות, מרגשות, נוסטלגיות וברכות. התוצר: גלריית ראיונות וסרט ערוך — מזכרת וידאו לכל החיים, שבה האורחים מדברים על בעלי האירוע.

## פרטי העסק
- שם: PartyTalk / פארטיטוק
- הוקמה: 2024, על ידי קים ורועי
- ${AUTHOR.name} — ${AUTHOR.role}, מראיינת עם רקע בתחקיר טלוויזיוני
- אזור שירות: ישראל
- מתאים ל: חתונות, ימי הולדת (בכל גיל, באולם, בבית או במסעדה), בר/בת מצווה, אירועי חברה ועמותות
- אתר: ${SITE_URL}
- אימייל: infopartytalk@gmail.com
- טלפון / וואטסאפ: 054-269-1416
- אינסטגרם: https://www.instagram.com/partytalk_events/

## איך זה עובד
1. לפני האירוע: שאלון וזום היכרות להתאמה אישית של הקריאטייב.
2. ביום האירוע: מראיינת וצלם מקצועיים מגיעים ומראיינים את האורחים.
3. אחרי האירוע: תוך 72 שעות מתקבלת גלריה עם כל הראיונות והברכות באיכות גבוהה. ניתן להוסיף סרט היילייטס קצר וסרט ערוך עם כל המשתתפים.

## עמודים מרכזיים
- דף הבית: ${SITE_URL}/
- בלוג (טיפים ותכנים על אירועים): ${SITE_URL}/blog/
- מדיניות פרטיות: ${SITE_URL}/privacy/
- תנאי שימוש: ${SITE_URL}/terms/
- הצהרת נגישות: ${SITE_URL}/accessibility/

## מאמרים מהבלוג
${articles}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
