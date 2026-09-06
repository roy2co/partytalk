/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",      // ייצוא סטטי לנטליפי
  trailingSlash: true,   // /privacy → /privacy/index.html
  images: {
    unoptimized: true,   // נדרש לייצוא סטטי
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qtrypzzcjebvfcihiynt.supabase.co",
      },
    ],
  },
};

export default nextConfig;
