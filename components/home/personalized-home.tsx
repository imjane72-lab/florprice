"use client";

import Link from "next/link";
import {
  ArrowRight,
  Flower2,
  TrendingUp,
  Sparkles,
  Heart,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/products/product-card";
import { mockProducts } from "@/lib/data/products";
import { mockWholesalers } from "@/lib/data/wholesalers";

// Simulate personalized data
const todayFlowers = [
  { name: "장미", trend: "up" as const, avgPrice: 18000, change: -5 },
  { name: "튤립", trend: "up" as const, avgPrice: 22000, change: 3 },
  { name: "수국", trend: "up" as const, avgPrice: 42000, change: -2 },
  { name: "백합", trend: "up" as const, avgPrice: 33000, change: 0 },
];

const recommendedProducts = mockProducts
  .filter((p) => p.isFeatured)
  .slice(0, 4);

const newArrivals = mockProducts
  .filter((p) => p.isNewArrival)
  .slice(0, 4);

// Simulated favorited wholesaler (ws-002)
const favoritedWholesaler = mockWholesalers.find((ws) => ws.id === "ws-002")!;
const favWholesalerProducts = mockProducts
  .filter((p) => p.wholesalerId === "ws-002" && p.isNewArrival)
  .slice(0, 3);

export function PersonalizedHome() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          안녕하세요, 꽃길플라워님
        </h1>
        <p className="mt-1 text-muted-foreground">
          오늘의 꽃 시장 소식을 확인해보세요
        </p>
      </div>

      {/* Today's Flower Summary */}
      <div className="mt-8">
        <div className="flex items-center gap-2">
          <Flower2 className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-semibold">오늘의 꽃 시세</h2>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {todayFlowers.map((flower) => (
            <Card key={flower.name}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{flower.name}</span>
                  {flower.change !== 0 && (
                    <Badge
                      variant="secondary"
                      className={
                        flower.change < 0
                          ? "bg-blue-50 text-xs text-blue-600"
                          : "bg-red-50 text-xs text-red-500"
                      }
                    >
                      {flower.change < 0 ? "▼" : "▲"}{" "}
                      {Math.abs(flower.change)}%
                    </Badge>
                  )}
                  {flower.change === 0 && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-50 text-xs text-gray-500"
                    >
                      변동없음
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-xl font-bold">
                  {flower.avgPrice.toLocaleString("ko-KR")}
                  <span className="text-sm font-normal text-muted-foreground">
                    원
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">평균 도매가</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-12">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">추천 상품</h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            전체 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* New Arrivals */}
      <div className="mt-12">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">새로 들어온 상품</h2>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            전체 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* Favorited Wholesaler's New Products */}
      <div className="mt-12">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">
              즐겨찾기 도매상 신규 상품
            </h2>
          </div>
          <Link
            href="/wholesalers"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80"
          >
            도매상 보기
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Wholesaler highlight card */}
        <Card className="mt-4">
          <CardHeader className="flex-row items-center gap-3 pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lavender-light text-sm font-bold text-primary">
              {favoritedWholesaler.name[0]}
            </div>
            <div>
              <CardTitle className="text-base">
                {favoritedWholesaler.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                {favoritedWholesaler.location} · 상품{" "}
                {favoritedWholesaler.productCount}개
              </p>
            </div>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="ml-auto text-primary"
            >
              <Link href={`/wholesalers/${favoritedWholesaler.id}`}>
                매장 보기
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {favWholesalerProducts.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favWholesalerProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-sm text-muted-foreground">
                아직 새로운 상품이 없습니다
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
