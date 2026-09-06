"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ position = "top" }: { position?: "top" | "bottom" }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className={`inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold px-6 py-3 rounded-xl transition-all hover:shadow-lg text-base ${
        position === "top" ? "mb-10" : "mt-12"
      }`}
    >
      → חזרה לדף הראשי
    </button>
  );
}
