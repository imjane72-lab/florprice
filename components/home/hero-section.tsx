import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-lavender-light via-lavender-light/50 to-background" />

      <div className="relative mx-auto max-w-7xl px-4 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/60 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            B2B 꽃 도매 플랫폼
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl md:leading-tight">
            도매상에서 꽃집까지,
            <br />
            <span className="text-primary">FlorPrice</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            도매상과 소매 꽃집을 직접 연결합니다.
            <br className="hidden sm:block" />
            투명한 가격 비교부터 전국 배송까지, 한 곳에서.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-foreground px-8 text-background hover:bg-foreground/90"
            >
              <Link href="/register">
                도매상 입점하기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-full border-foreground/20 px-8 hover:bg-foreground/5"
            >
              <Link href="/products">상품 둘러보기</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
