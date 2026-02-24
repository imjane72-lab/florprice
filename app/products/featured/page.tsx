"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ProductCard } from "@/components/products/product-card";
import { mockProducts } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const tabs = ["전체", "☝🏻 메인꽃 추천", "☝🏻 필러꽃 추천", "☝🏻 소재 추천"] as const;

export default function FeaturedProductsPage() {
  const [selectedTab, setSelectedTab] = useState<string>("전체");

  const featuredProducts = mockProducts.filter((p) => p.isFeatured);

  const filtered =
    selectedTab === "전체"
      ? featuredProducts
      : selectedTab === "☝🏻 메인꽃 추천"
        ? featuredProducts.filter((p) => p.flowerRole === "메인")
        : selectedTab === "☝🏻 필러꽃 추천"
          ? featuredProducts.filter((p) => p.flowerRole === "필러")
          : featuredProducts.filter((p) => p.flowerRole === "소재");

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
          <span className="text-2xl">🔥</span>
          <h1 className="text-2xl font-bold">이번 한 주 사용할 추천 상품</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={cn(
              "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
              selectedTab === tab
                ? "bg-foreground/85 text-background shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] scale-[0.97]"
                : "bg-white border border-border/60 text-foreground/60 shadow-sm hover:shadow-md hover:bg-muted/30",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length}개 상품
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          해당 카테고리의 추천 상품이 없습니다
        </div>
      )}
    </div>
  );
}
