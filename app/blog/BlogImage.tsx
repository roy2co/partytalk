"use client";

import { useState } from "react";
import { FALLBACK_COVER } from "./posts";

// תמונה עם נפילה אוטומטית ל-FALLBACK_COVER אם הקובץ ב-public/blog/ עדיין לא הועלה
export default function BlogImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => {
        if (imgSrc !== FALLBACK_COVER) setImgSrc(FALLBACK_COVER);
      }}
    />
  );
}
