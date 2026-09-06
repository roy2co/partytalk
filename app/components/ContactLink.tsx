"use client";

import { trackContactClick, type ContactMethod } from "../lib/analytics";

/**
 * קישור יצירת קשר עם מעקב GA4.
 *
 * עמודי הבלוג הם Server Components ולכן אי אפשר לתלות בהם onClick ישירות -
 * הרכיב הקטן הזה עוטף את הקישור בצד הלקוח בלי לשנות את העיצוב.
 */
export default function ContactLink({
  href,
  method,
  className,
  children,
}: {
  href: string;
  method: ContactMethod;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackContactClick(method)}
      className={className}
    >
      {children}
    </a>
  );
}
