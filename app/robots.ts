import type { MetadataRoute } from "next";

const SITE_URL = "https://partytalk.co.il";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* קובץ עזר שנטליפי צריכה כדי לזהות את הטופס - אינו עמוד אמיתי ואין לאנדקס אותו */
      disallow: "/netlify-form.html",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
