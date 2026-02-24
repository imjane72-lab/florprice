"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Ribbon,
  Package,
  Scissors,
  SlidersHorizontal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductBadge } from "@/components/ui/product-badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { mockSupplies } from "@/lib/data/supplies";
import {
  SupplyFilters,
  type SupplyFilterState,
} from "@/components/supplies/supply-filters";
import { FloatingSupplyCartBar } from "@/components/cart/floating-supply-cart-bar";

export default function SuppliesPage() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<SupplyFilterState>({
    categories: [],
    colors: [],
  });

  const toggleSupply = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const removeSupply = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    let result = mockSupplies;

    if (filters.categories.length > 0) {
      result = result.filter((s) => filters.categories.includes(s.category));
    }
    if (filters.colors.length > 0) {
      result = result.filter(
        (s) => s.color && filters.colors.includes(s.color),
      );
    }

    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.seller.toLowerCase().includes(q),
      );
    }

    return result;
  }, [search, filters]);

  const selectedSupplies = mockSupplies.filter((s) => selectedIds.has(s.id));

  return (
    <div
      className={cn(
        "mx-auto max-w-7xl px-4 py-10",
        selectedIds.size > 0 && "pb-28",
      )}
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Scissors className="h-6 w-6 text-primary/70" />
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
            소품샵
          </h1>
        </div>
        <p className="mt-2 text-muted-foreground">
          리본, 포장지, 플로랄폼 등 꽃 작업에 필요한 모든 부자재
        </p>
      </div>

      {/* Search + Filter button */}
      <div className="mt-6 flex items-center gap-3">
        <div className="relative max-w-sm flex-1 sm:flex-initial sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="소품 이름, 판매처..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full pl-9"
          />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetTitle>필터</SheetTitle>
            <div className="mt-6">
              <SupplyFilters filters={filters} onChange={setFilters} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Results count */}
      <div className="mt-4 text-sm text-muted-foreground">
        {filtered.length}개 소품
      </div>

      {/* Content: Sidebar + List */}
      <div className="mt-4 flex gap-10">
        {/* Desktop Sidebar */}
        <aside className="hidden w-56 shrink-0 lg:block">
          <SupplyFilters filters={filters} onChange={setFilters} />
        </aside>

        {/* Supply List */}
        <div className="flex-1 space-y-2">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <p className="text-lg font-medium text-muted-foreground">
                검색 결과가 없습니다
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                다른 카테고리나 검색어를 시도해 보세요
              </p>
            </div>
          ) : (
            filtered.map((supply) => {
              const displayPrice =
                supply.isSale && supply.salePrice
                  ? supply.salePrice
                  : supply.price;
              const formattedPrice = displayPrice.toLocaleString("ko-KR");
              const originalPrice = supply.price.toLocaleString("ko-KR");
              const Icon = supply.category === "리본" ? Ribbon : Package;
              const isChecked = selectedIds.has(supply.id);

              return (
                <div
                  key={supply.id}
                  className={cn(
                    "group flex items-center gap-5 rounded-xl border bg-white px-5 py-5 transition-all",
                    isChecked
                      ? "border-primary/30 bg-lavender-light/20"
                      : "border-border/50 hover:border-primary/20 hover:shadow-sm",
                  )}
                >
                  {/* Checkbox */}
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={(v) =>
                      toggleSupply(supply.id, v === true)
                    }
                    className="shrink-0"
                  />

                  {/* Thumbnail */}
                  <div className="flex h-26 w-26 shrink-0 items-center justify-center rounded-xl bg-muted">
                    <Icon size={32} className="text-muted-foreground/40" />
                  </div>

                  {/* Info */}
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <div className="min-w-0 flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        {supply.isNewArrival && (
                          <ProductBadge variant="new">NEW</ProductBadge>
                        )}
                        {supply.isSale && (
                          <ProductBadge variant="sale">SALE</ProductBadge>
                        )}
                        <ProductBadge variant="category">
                          {supply.category}
                        </ProductBadge>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="truncate text-base font-semibold">
                          {supply.name}
                        </span>
                      </div>
                      <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{supply.seller}</span>
                        <span>·</span>
                        <span>{supply.category}</span>
                        {supply.color && (
                          <>
                            <span>·</span>
                            <span>{supply.color}</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col gap-1">
                      <div className="shrink-0 text-right">
                        {supply.isSale && supply.salePrice ? (
                          <>
                            <span className="mr-1 text-xs text-muted-foreground line-through">
                              {originalPrice}
                            </span>
                            <span className="text-lg font-bold text-red-500">
                              {formattedPrice}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold">
                            {formattedPrice}
                          </span>
                        )}
                        <span className="text-xs text-muted-foreground">
                          원/{supply.unit}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span
                          className={cn(
                            "hidden shrink-0 lg:block",
                            supply.stock < 20
                              ? "font-semibold text-destructive"
                              : "",
                          )}
                        >
                          재고 {supply.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      <FloatingSupplyCartBar
        selectedSupplies={selectedSupplies}
        onRemove={removeSupply}
      />
    </div>
  );
}
