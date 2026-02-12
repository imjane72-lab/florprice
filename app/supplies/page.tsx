"use client";

import { useState, useMemo } from "react";
import {
  Search,
  Ribbon,
  Package,
  Scissors,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { mockSupplies } from "@/lib/data/supplies";
import { type SupplyCategory } from "@/lib/types/supply";

const categories: Array<"전체" | SupplyCategory> = [
  "전체",
  "리본",
  "포장지",
  "플로랄폼",
  "와이어/테이프",
  "화병/바구니",
  "기타",
];

export default function SuppliesPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");

  const filtered = useMemo(() => {
    let result = mockSupplies;

    if (selectedCategory !== "전체") {
      result = result.filter((s) => s.category === selectedCategory);
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
  }, [search, selectedCategory]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
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

      {/* Category pills + Search */}
      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition-all",
                selectedCategory === cat
                  ? "border-primary bg-lavender-light text-primary"
                  : "border-border/50 text-muted-foreground hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="소품 이름, 판매처..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full pl-9"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="mt-4 text-sm text-muted-foreground">
        {filtered.length}개 소품
      </div>

      {/* Supply List */}
      <div className="mt-4 space-y-2">
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
            const Icon = supply.category === "리본" ? Ribbon : Package;

            return (
              <div
                key={supply.id}
                className="group flex items-center gap-4 rounded-xl border border-border/50 bg-white px-4 py-3 transition-all hover:border-primary/20 hover:shadow-sm"
              >
                {/* Icon */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Icon className="h-6 w-6 text-primary/30" />
                </div>

                {/* Info */}
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-semibold">
                        {supply.name}
                      </span>
                      {supply.isNewArrival && (
                        <Badge className="shrink-0 bg-rose-pink text-[10px] font-semibold text-white">
                          NEW
                        </Badge>
                      )}
                      {supply.isSale && (
                        <Badge className="shrink-0 bg-red-500 text-[10px] font-semibold text-white">
                          SALE
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
                      {supply.description}
                    </p>
                    <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{supply.seller}</span>
                      <span>·</span>
                      <span>{supply.category}</span>
                    </div>
                  </div>

                  {/* Stock */}
                  <span
                    className={cn(
                      "hidden shrink-0 text-sm lg:block",
                      supply.stock < 20
                        ? "font-semibold text-destructive"
                        : "text-muted-foreground",
                    )}
                  >
                    재고 {supply.stock}
                  </span>

                  {/* Price */}
                  <div className="shrink-0 text-right">
                    {supply.isSale && supply.salePrice ? (
                      <>
                        <span className="mr-1 text-xs text-muted-foreground line-through">
                          {supply.price.toLocaleString("ko-KR")}
                        </span>
                        <span className="text-base font-bold text-red-500">
                          {displayPrice.toLocaleString("ko-KR")}
                        </span>
                      </>
                    ) : (
                      <span className="text-base font-bold">
                        {displayPrice.toLocaleString("ko-KR")}
                      </span>
                    )}
                    <span className="text-xs text-muted-foreground">
                      원/{supply.unit}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
