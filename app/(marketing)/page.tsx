"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  SlidersHorizontal,
  MapPin,
  Sparkles,
  Search,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FloatingCartBar } from "@/components/cart/floating-cart-bar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  ProductFilters,
  type FilterState,
} from "@/components/products/product-filters";
import { ProductSort } from "@/components/products/product-sort";
import { ProductListItem } from "@/components/products/product-list-item";
import { ProductCard } from "@/components/products/product-card";
import { mockProducts } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const markets = ["고속터미널", "양재 화훼공판장"] as const;
const categories = ["전체", "절화", "소재"] as const;

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 8) return "이른 아침, 신선한 꽃이 도착했어요";
  if (hour >= 8 && hour < 12) return "오늘도 좋은 꽃과 함께하세요";
  if (hour >= 12 && hour < 18) return "오후에도 좋은 꽃이 남아있어요";
  return "내일을 위한 꽃, 미리 담아두세요";
}

interface FlowerPriceSummary {
  name: string;
  avgPrice: number;
  delta: number;
  productCount: number;
}

function getFlowerPriceSummaries(market: string): FlowerPriceSummary[] {
  const flowers = mockProducts.filter(
    (p) => p.category === "절화" && p.market === market,
  );

  const grouped = new Map<string, number[]>();
  flowers.forEach((p) => {
    const prices = grouped.get(p.name) || [];
    prices.push(p.price);
    grouped.set(p.name, prices);
  });

  const summaries: FlowerPriceSummary[] = [];
  grouped.forEach((prices, name) => {
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const hash = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
    const deltas = [-500, 300, 0, -200, 500, -300, 200, 0, 400, -100];
    const delta = deltas[hash % deltas.length];
    summaries.push({ name, avgPrice: avg, delta, productCount: prices.length });
  });

  return summaries.sort((a, b) => b.productCount - a.productCount).slice(0, 10);
}

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [selectedMarket, setSelectedMarket] = useState<string>("고속터미널");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    colors: [],
    grades: [],
    origins: [],
  });

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setFilters((prev) => ({ ...prev, types: [] }));
  };

  const toggleProduct = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const removeProduct = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  // Featured sections
  const newArrivals = mockProducts
    .filter((p) => p.isNewArrival && p.market === selectedMarket)
    .slice(0, 12);
  const saleProducts = mockProducts
    .filter((p) => p.isSale && p.salePrice && p.market === selectedMarket)
    .slice(0, 12);
  const featuredProducts = mockProducts
    .filter((p) => p.isFeatured && p.market === selectedMarket)
    .slice(0, 12);

  const filteredProducts = useMemo(() => {
    let result = mockProducts;

    result = result.filter((p) => p.market === selectedMarket);

    if (selectedCategory !== "전체") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.variety?.toLowerCase().includes(q) ||
          p.wholesaler.toLowerCase().includes(q),
      );
    }

    if (filters.types.length > 0) {
      result = result.filter((p) => filters.types.includes(p.name));
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => filters.colors.includes(p.color));
    }
    if (filters.grades.length > 0) {
      const hasSale = filters.grades.includes("세일");
      const otherGrades = filters.grades.filter((g) => g !== "세일");
      result = result.filter(
        (p) =>
          (otherGrades.length > 0 && otherGrades.includes(p.grade)) ||
          (hasSale && p.isSale),
      );
    }
    if (filters.origins.length > 0) {
      result = result.filter((p) => filters.origins.includes(p.origin));
    }

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result = [...result].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
    }

    return result;
  }, [search, sort, selectedMarket, selectedCategory, filters]);

  const priceSummaries = useMemo(
    () => getFlowerPriceSummaries(selectedMarket),
    [selectedMarket],
  );

  const selectedProducts = mockProducts.filter((p) => selectedIds.has(p.id));

  const today = new Date();
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
  const dateString = `${today.getMonth() + 1}월 ${today.getDate()}일 ${dayNames[today.getDay()]}요일`;
  const greetingMessage = getTimeGreeting();

  return (
    <div className="overflow-x-hidden">
      {/* Hero Banner: 감성 + 시세 */}
      <div className="mx-auto max-w-7xl px-4">
        <div
          className="relative h-100 sm:h-126 md:h-132 overflow-hidden rounded-2xl bg-cover bg-center"
          style={{ backgroundImage: "url('/images/banner2.jpg')" }}
        >
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-black/10" />

          {/* 배너 콘텐츠 */}
          <div className="relative flex h-full flex-col justify-between px-6 py-8 sm:px-8 md:px-10 md:py-10">
            {/* 상단: 날짜 + 인사 */}
            <div className="pt-10">
              <p className="text-base font-medium text-white/60 sm:text-lg md:text-xl">
                {dateString}
              </p>
              <h1 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl md:text-4xl lg:text-4xl">
                {greetingMessage}
              </h1>
            </div>

            {/* 하단: 인기 품목 시세 카드 */}
            <div className="-mx-4 px-4 sm:mx-0 sm:px-0">
              <p className="flex items-center gap-2 mb-4 text-lg font-bold tracking-wide text-white uppercase sm:text-xl md:text-xl">
                <Sparkles className="h-5 w-5 sm:h-4 sm:w-4" />
                오늘의 시세
              </p>
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:gap-4">
                {priceSummaries.map((flower) => (
                  <button
                    key={flower.name}
                    onClick={() => {
                      setFilters((prev) => ({ ...prev, types: [flower.name] }));
                      setSelectedCategory("절화");
                      document
                        .getElementById("product-list")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className={cn(
                      "flex shrink-0 flex-col items-start rounded-2xl px-5 py-4 transition-all sm:px-6 sm:py-5",
                      "bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12)] ring-1 ring-white/10",
                      "hover:bg-white/20 hover:border-white/30",
                      "min-w-32 sm:min-w-40 md:min-w-44",
                    )}
                  >
                    <span className="text-sm font-medium text-white/70 sm:text-base">
                      {flower.name}
                    </span>
                    <span className="mt-1.5 text-lg font-bold text-white sm:text-xl md:text-2xl">
                      {flower.avgPrice.toLocaleString("ko-KR")}
                      <span className="text-xs font-normal text-white/50 sm:text-sm">
                        원
                      </span>
                    </span>
                    {flower.delta !== 0 ? (
                      <span
                        className={cn(
                          "mt-1 text-xs font-medium sm:text-sm",
                          flower.delta > 0 ? "text-red-300" : "text-blue-300",
                        )}
                      >
                        {flower.delta > 0 ? "▲" : "▼"}{" "}
                        {Math.abs(flower.delta).toLocaleString("ko-KR")}
                      </span>
                    ) : (
                      <span className="mt-1 text-xs font-medium text-white/30 sm:text-sm">
                        ─
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 시장 선택 + 검색바 — 배너 밖 */}
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            <MapPin className="h-6 w-6 text-primary" />
            <div className="flex gap-3">
              {markets.map((market) => (
                <button
                  key={market}
                  onClick={() => setSelectedMarket(market)}
                  className={cn(
                    "rounded-full px-6 py-3 text-base font-semibold transition-all",
                    selectedMarket === market
                      ? "bg-foreground/85 text-background shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] scale-[0.97]"
                      : "bg-white border border-border/60 text-foreground/60 shadow-sm hover:shadow-md hover:bg-muted/30",
                  )}
                >
                  {market}
                </button>
              ))}
            </div>
          </div>
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="꽃 이름, 품종, 도매상 검색"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && search.length > 0) {
                  document
                    .getElementById("product-list")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="h-14 w-full rounded-full border border-border bg-muted/40 pl-13 pr-6 text-base outline-none transition-all placeholder:text-muted-foreground focus:bg-white focus:border-primary/40 focus:ring-2 focus:ring-primary/10"
            />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "mx-auto max-w-7xl px-4 py-6",
          selectedIds.size > 0 && "pb-28",
        )}
      >
        {/* 오늘의 추천 상품 */}
        {featuredProducts.length > 0 && (
          <section className="mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔥</span>
                <h2 className="text-xl font-bold">
                  이번 한 주 사용할 추천 상품
                </h2>
              </div>
              <Link
                href="/products/featured"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                전체보기
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="-mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {featuredProducts.map((product) => (
                <div key={product.id} className="w-48 shrink-0 sm:w-52 lg:w-56">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 신상품 */}
        {newArrivals.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">✨</span>
                <h2 className="text-xl font-bold">계절 신상품</h2>
              </div>
              <Link
                href="/products/new"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                전체보기
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="-mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {newArrivals.map((product) => (
                <div key={product.id} className="w-48 shrink-0 sm:w-52 lg:w-56">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 할인 상품 */}
        {saleProducts.length > 0 && (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🏷️</span>
                <h2 className="text-xl font-bold">세일 상품</h2>
              </div>
              <Link
                href="/products/sale"
                className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                전체보기
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="-mx-4 mt-4 flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
              {saleProducts.map((product) => (
                <div key={product.id} className="w-48 shrink-0 sm:w-52 lg:w-56">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Divider */}
        <div
          id="product-list"
          className="mt-20 border-t border-border/40 pt-14"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">🛒</span>
            <h2 className="text-xl font-bold">전체 상품</h2>
          </div>
        </div>

        {/* Category Toggle + Sort/Filter */}
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                  selectedCategory === cat
                    ? "bg-foreground/85 text-background shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] scale-[0.97]"
                    : "bg-white border border-border/60 text-foreground/60 shadow-sm hover:shadow-md hover:bg-muted/30",
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ProductSort value={sort} onChange={setSort} />
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetTitle>필터</SheetTitle>
                <div className="mt-6">
                  <ProductFilters
                    filters={filters}
                    onChange={setFilters}
                    selectedCategory={selectedCategory}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 text-sm text-muted-foreground">
          {filteredProducts.length}개 상품
        </div>

        {/* Content */}
        <div className="mt-4 flex gap-10">
          {/* Desktop Sidebar */}
          <aside className="hidden w-56 shrink-0 lg:block">
            <ProductFilters
              filters={filters}
              onChange={setFilters}
              selectedCategory={selectedCategory}
            />
          </aside>

          {/* Product List */}
          <div className="flex-1 space-y-2">
            {filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-lg font-medium text-muted-foreground">
                  검색 결과가 없습니다
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  다른 시장이나 필터를 선택해 보세요
                </p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <ProductListItem
                  key={product.id}
                  product={product}
                  checked={selectedIds.has(product.id)}
                  onCheckedChange={(checked) =>
                    toggleProduct(product.id, checked)
                  }
                />
              ))
            )}
          </div>
        </div>

        <FloatingCartBar
          selectedProducts={selectedProducts}
          onRemove={removeProduct}
        />
      </div>
    </div>
  );
}
