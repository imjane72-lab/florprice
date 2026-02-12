"use client";

import { Flower2 } from "lucide-react";

export function FloatingActionButton() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-lavender-light shadow-lg transition-all hover:scale-105 hover:shadow-xl"
      aria-label="맨 위로 이동"
    >
      <span className="text-xs font-bold tracking-tighter text-foreground">
        <Flower2 className="h-5 w-5 text-primary" />
      </span>
    </button>
  );
}
