import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 md:py-28">
      <div className="rounded-3xl bg-linear-to-br from-lavender-light via-lavender-light/80 to-rose-pink-light p-12 text-center md:p-20">
        <h2 className="text-2xl font-bold tracking-tight md:text-4xl">
          지금 FlorPrice와 함께
          <br />
          시작하세요
        </h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          전국 어디서든 도매상의 가격을 비교하고, 합리적인 가격으로 신선한
          꽃을 만나보세요.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="h-12 rounded-full bg-foreground px-8 text-background hover:bg-foreground/90"
          >
            <Link href="/register">
              무료로 시작하기
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-foreground/20 px-8 hover:bg-foreground/5"
          >
            <Link href="/about">더 알아보기</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
