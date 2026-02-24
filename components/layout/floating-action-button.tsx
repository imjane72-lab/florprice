"use client";

import Link from "next/link";
import { ArrowUp, Store } from "lucide-react";

export function FloatingActionButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* 입점하기 */}
      <Link
        href="/intro"
        className="flex items-center gap-2 rounded-full bg-foreground/85 px-5 py-3 shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        aria-label="입점하기"
      >
        <Store className="h-4 w-4 text-background" />
        <span className="text-sm font-semibold text-background">입점</span>
      </Link>

      {/* 맨 위로 */}
      <button
        onClick={scrollToTop}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-lavender-light shadow-lg transition-all hover:scale-105 hover:shadow-xl"
        aria-label="맨 위로 이동"
      >
        <ArrowUp className="h-4 w-4 text-foreground/70" />
      </button>
    </div>
  );
}
