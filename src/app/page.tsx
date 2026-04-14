"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    // Detect browser language and redirect
    const browserLang = navigator.language || "";
    if (browserLang.startsWith("zh")) {
      router.replace("/zh");
    } else {
      router.replace("/en");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
      <div className="text-center">
        <div className="w-12 h-12 rounded-full border-4 border-violet-600 border-t-transparent animate-spin mx-auto mb-4" />
        <p className="text-slate-600">Loading BrainAI...</p>
      </div>
    </div>
  );
}
