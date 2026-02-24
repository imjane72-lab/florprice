"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";

export function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="relative bg-lavender-light py-2.5 text-center text-sm">
      <div className="mx-auto max-w-7xl px-4">
        <span className="text-foreground/80">
          신규 가입시 첫 주문{" "}
          <Link
            href="/register"
            className="font-semibold text-foreground/85 underline underline-offset-2"
          >
            무료배송
          </Link>{" "}
          + 할인 쿠폰 증정
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-foreground/50 transition-colors hover:text-foreground"
        aria-label="배너 닫기"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
