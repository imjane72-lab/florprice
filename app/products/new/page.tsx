"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { mockProducts } from "@/lib/data/products";

export default function NewProductsPage() {
  const newProducts = mockProducts.filter((p) => p.isNewArrival);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <span className="text-2xl">✨</span>
          <h1 className="text-2xl font-bold">계절 신상품</h1>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {newProducts.length}개 상품
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {newProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
