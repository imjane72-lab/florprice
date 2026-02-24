"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, MapPin, Star, Package, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockWholesalers } from "@/lib/data/wholesalers";
import { cn } from "@/lib/utils";

const typeFilters = ["전체", "꽃도매", "부자재도매"] as const;
const locationFilters = ["전체", "고속터미널", "양재 화훼공판장"] as const;

export default function WholesalersPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("전체");
  const [locationFilter, setLocationFilter] = useState<string>("전체");

  const filtered = mockWholesalers.filter((ws) => {
    const matchSearch =
      search === "" ||
      ws.name.includes(search) ||
      ws.specialties.some((s) => s.includes(search));
    const matchType = typeFilter === "전체" || ws.type === typeFilter;
    const matchLocation =
      locationFilter === "전체" || ws.location === locationFilter;
    return matchSearch && matchType && matchLocation;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          꽃파트너
        </h1>
        <p className="mt-2 text-muted-foreground">
          믿을 수 있는 꽃파트너를 찾아보세요
        </p>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col gap-3">
        {/* 타입 필터 */}
        <div className="flex gap-2">
          {typeFilters.map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                typeFilter === t
                  ? "bg-foreground/85 text-background shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] scale-[0.97]"
                  : "bg-white border border-border/60 text-foreground/60 shadow-sm hover:shadow-md hover:bg-muted/30",
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 위치 필터 */}
        <div className="flex gap-2">
          {locationFilters.map((loc) => (
            <button
              key={loc}
              onClick={() => setLocationFilter(loc)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-all",
                locationFilter === loc
                  ? "bg-foreground/85 text-background shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] scale-[0.97]"
                  : "bg-white border border-border/60 text-foreground/60 shadow-sm hover:shadow-md hover:bg-muted/30",
              )}
            >
              {loc}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="mt-4 flex sm:justify-end">
        <div className="relative max-w-sm flex-1 sm:flex-initial sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="파트너 또는 품목 검색..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full pl-9"
          />
        </div>
      </div>

      {/* Results count */}
      <p className="mt-6 text-sm text-muted-foreground">
        {filtered.length}개 꽃파트너
      </p>

      {/* Partner Cards */}
      <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((ws) => {
          return (
            <Link
              key={ws.id}
              href={`/wholesalers/${ws.id}`}
              className="group rounded-2xl border border-border/50 bg-white p-6 transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold group-hover:text-primary">
                      {ws.name}
                    </h3>
                    {ws.isVerified && (
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    )}
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-xs font-bold rounded-sm",
                        ws.type === "부자재도매"
                          ? "bg-amber-50 text-amber-600"
                          : "bg-green-50 text-green-600",
                      )}
                    >
                      {ws.type}
                    </Badge>
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" />
                    {ws.location}
                  </div>
                </div>
                <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span className="text-sm font-semibold text-amber-700">
                    {ws.rating}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                {ws.description}
              </p>

              {/* Specialties */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {ws.specialties.map((s) => (
                  <Badge
                    key={s}
                    variant="secondary"
                    className="bg-[oklch(0.955_0.012_290)] text-xs font-bold rounded-sm text-foreground/70"
                  >
                    {s}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-4 flex items-center gap-4 border-t pt-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Package className="h-3.5 w-3.5" />
                  상품 {ws.productCount}개
                </span>
                <span>리뷰 {ws.reviewCount}건</span>
                <span>응답률 {ws.responseRate}%</span>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-20 text-center text-muted-foreground">
          검색 결과가 없습니다
        </div>
      )}
    </div>
  );
}
