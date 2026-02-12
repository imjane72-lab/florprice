"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { NAV_LINKS } from "@/lib/data/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="mx-auto max-w-350 px-4 py-3">
        <div className="flex items-center justify-between rounded-full bg-lavender-light/60 px-6 py-4.5 backdrop-blur-md">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tight">
            FlorPrice
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            <button
              className="hidden rounded-full p-2 text-foreground/60 transition-colors hover:text-foreground md:flex"
              aria-label="검색"
            >
              <Search className="h-4.5 w-4.5" />
            </button>
            <Link
              href="/login"
              className="rounded-full p-2 text-foreground/60 transition-colors hover:text-foreground"
              aria-label="로그인"
            >
              <User className="h-4.5 w-4.5" />
            </Link>
            <Link
              href="/cart"
              className="rounded-full p-2 text-foreground/60 transition-colors hover:text-foreground"
              aria-label="장바구니"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
            </Link>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  className="rounded-full p-2 text-foreground/60 transition-colors hover:text-foreground md:hidden"
                  aria-label="메뉴"
                >
                  <Menu className="h-5 w-5" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 p-2">
                <SheetTitle className="text-lg font-bold">FlorPrice</SheetTitle>
                <nav className="mt-8 flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                        "hover:bg-lavender-light",
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
                <div className="mt-8 flex flex-col gap-2 border-t pt-6">
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-lavender-light"
                  >
                    로그인
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="rounded-lg bg-primary px-4 py-3 text-center text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  >
                    회원가입
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
