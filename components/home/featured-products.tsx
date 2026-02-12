import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { mockProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/products/product-card";

export function FeaturedProducts() {
  const featured = mockProducts.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              오늘의 추천 상품
            </h2>
            <p className="mt-2 text-muted-foreground">
              엄선된 도매 상품을 만나보세요
            </p>
          </div>
          <Link
            href="/products"
            className="hidden items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 md:flex"
          >
            전체 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <Link
          href="/products"
          className="mt-8 flex items-center justify-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80 md:hidden"
        >
          전체 보기
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
