"use client";

import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  MapPin,
} from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { mockProducts } from "@/lib/data/products";
import { cn } from "@/lib/utils";

const markets = ["고속터미널", "양재 화훼공판장"] as const;
const categories = ["전체", "절화", "소재"] as const;

export default function ProductsPage() {
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

  // Reset type filters when category changes
  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setFilters((prev) => ({ ...prev, types: [] }));
  };

  const toggleProduct = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const filteredProducts = useMemo(() => {
    let result = mockProducts;

    // Market
    result = result.filter((p) => p.market === selectedMarket);

    // Category
    if (selectedCategory !== "전체") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Search
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.variety?.toLowerCase().includes(q) ||
          p.wholesaler.toLowerCase().includes(q),
      );
    }

    // Filters
    if (filters.types.length > 0) {
      result = result.filter((p) => filters.types.includes(p.name));
    }
    if (filters.colors.length > 0) {
      result = result.filter((p) => filters.colors.includes(p.color));
    }
    if (filters.grades.length > 0) {
      result = result.filter((p) => filters.grades.includes(p.grade));
    }
    if (filters.origins.length > 0) {
      result = result.filter((p) => filters.origins.includes(p.origin));
    }

    // Sort
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
      default:
        break;
    }

    return result;
  }, [search, sort, selectedMarket, selectedCategory, filters]);

  const selectedProducts = mockProducts.filter((p) => selectedIds.has(p.id));

  const removeProduct = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const marketProductCount = (market: string) =>
    mockProducts.filter((p) => p.market === market).length;

  return (
    <div className={cn("mx-auto max-w-7xl px-4 py-10", selectedIds.size > 0 && "pb-28")}>
      {/* Market Selection */}
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-primary/70" />
        <h1 className="text-lg font-bold">시장 선택</h1>
      </div>
      <div className="mt-3 flex gap-3">
        {markets.map((market) => (
          <button
            key={market}
            onClick={() => setSelectedMarket(market)}
            className={cn(
              "rounded-2xl border-2 px-6 py-3 text-left transition-all cursor-pointer",
              selectedMarket === market
                ? "border-primary/20 bg-lavender-light/50 shadow-sm"
                : "border-border/50 bg-white hover:border-primary/20",
            )}
          >
            <span
              className={cn(
                "text-sm font-semibold",
                selectedMarket === market ? "text-primary" : "text-foreground",
              )}
            >
              {market}
            </span>
            <span className="ml-2 text-xs text-muted-foreground">
              {marketProductCount(market)}개
            </span>
          </button>
        ))}
      </div>

      {/* Category Toggle + Search */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Category pills */}
        <div className="flex rounded-full bg-muted/40 p-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
                selectedCategory === cat
                  ? "bg-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative max-w-xs flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="꽃 이름, 품종, 도매상..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-full pl-9"
            />
          </div>
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
  );
}
