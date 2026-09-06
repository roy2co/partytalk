/**
 * שליחת אירועים ל-Google Analytics 4.
 *
 * gtag נטען ב-app/layout.tsx (המזהה G-3Y9S4P4E7Z). ה-?. מגן על המקרה
 * שהמשתמש לוחץ לפני שהסקריפט הספיק להיטען, או שחוסם פרסומות חסם אותו.
 *
 * שמות האירועים מרוכזים כאן בכוונה: טעות כתיב בשם אירוע פירושה שהוא
 * פשוט לא יופיע ב-GA4, בלי שום הודעת שגיאה.
 */

export type ContactMethod = "whatsapp" | "phone" | "email";

function trackEvent(name: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  (window as any).gtag?.("event", name, params);
}

/** הגשת טופס לידים שהצליחה */
export function trackLead(method = "contact_form") {
  trackEvent("generate_lead", { method });
}

/** לחיצה על ערוץ יצירת קשר ישיר (וואטסאפ / טלפון / מייל) */
export function trackContactClick(method: ContactMethod) {
  trackEvent("contact_click", { method });
}
