import Link from "next/link";
import {
  MapPin,
  Star,
  ShieldCheck,
  Clock,
  Phone,
  ArrowLeft,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockWholesalers } from "@/lib/data/wholesalers";
import { mockProducts } from "@/lib/data/products";
import { WholesalerProducts } from "@/components/wholesalers/wholesaler-products";

export function generateStaticParams() {
  return mockWholesalers.map((ws) => ({ id: ws.id }));
}

const mockReviews = [
  {
    id: 1,
    author: "꽃길플라워",
    userId: "@kkotgil_flower",
    rating: 5,
    date: "2026-02-08",
    content:
      "항상 싱싱한 꽃을 보내주세요. 포장도 꼼꼼하고 배송도 빠릅니다. 단골 도매상입니다!",
  },
  {
    id: 2,
    author: "로즈가든",
    userId: "@rose_garden02",
    rating: 4,
    date: "2026-02-05",
    content:
      "장미 품질이 정말 좋습니다. 가끔 재고가 부족할 때가 있지만 그래도 만족합니다.",
  },
  {
    id: 3,
    author: "블룸플라워샵",
    userId: "@bloom_flowershop",
    rating: 5,
    date: "2026-02-01",
    content: "주문 후 응답이 빠르고, 꽃 상태도 항상 좋습니다. 추천합니다.",
  },
];

export default async function WholesalerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const wholesaler = mockWholesalers.find((ws) => ws.id === id);

  if (!wholesaler) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 text-center">
        <p className="text-muted-foreground">꽃파트너를 찾을 수 없습니다</p>
        <Button asChild variant="outline" className="mt-4 rounded-full">
          <Link href="/wholesalers">꽃파트너 목록으로</Link>
        </Button>
      </div>
    );
  }

  const products = mockProducts.filter((p) => p.wholesalerId === wholesaler.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      {/* Back link */}
      <Link
        href="/wholesalers"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        꽃파트너 목록
      </Link>

      {/* Profile Header */}
      <div className="mt-6 rounded-2xl border bg-white p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold md:text-3xl">
                {wholesaler.name}
              </h1>
              {wholesaler.isVerified && (
                <Badge className="gap-1 rounded-full bg-primary/10 text-primary">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  인증 도매상
                </Badge>
              )}
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {wholesaler.address}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {wholesaler.joinedAt.split("-")[0]}년 입점
              </span>
            </div>

            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              {wholesaler.description}
            </p>

            {/* Specialties */}
            <div className="mt-4 flex flex-wrap gap-2">
              {wholesaler.specialties.map((s) => (
                <Badge
                  key={s}
                  variant="secondary"
                  className="bg-lavender-light/50 text-primary"
                >
                  {s}
                </Badge>
              ))}
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-lg font-bold text-amber-700">
                  {wholesaler.rating}
                </span>
              </div>
              <span className="text-sm text-muted-foreground">
                리뷰 {wholesaler.reviewCount}건
              </span>
            </div>

            <div className="flex gap-3 text-center text-sm">
              <div className="rounded-xl bg-surface px-4 py-2">
                <p className="font-bold">{wholesaler.productCount}</p>
                <p className="text-xs text-muted-foreground">상품</p>
              </div>
              <div className="rounded-xl bg-surface px-4 py-2">
                <p className="font-bold">
                  {wholesaler.totalOrders.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">거래</p>
              </div>
              <div className="rounded-xl bg-surface px-4 py-2">
                <p className="font-bold">{wholesaler.responseRate}%</p>
                <p className="text-xs text-muted-foreground">응답률</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="rounded-full">
                <Heart className="mr-2 h-4 w-4" />
                즐겨찾기
              </Button>
              <Button variant="outline" className="rounded-full">
                <Phone className="mr-2 h-4 w-4" />
                문의하기
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold">판매 상품</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {products.length}개 상품
        </p>

        {products.length > 0 ? (
          <div className="mt-6">
            <WholesalerProducts products={products} />
          </div>
        ) : (
          <div className="mt-6 rounded-xl border py-12 text-center text-muted-foreground">
            등록된 상품이 없습니다
          </div>
        )}
      </div>

      <Separator className="my-10" />

      {/* Reviews Section */}
      <div>
        <h2 className="text-xl font-bold">
          거래 후기{" "}
          <span className="text-base font-normal text-muted-foreground">
            ({mockReviews.length})
          </span>
        </h2>

        <div className="mt-6 space-y-4">
          {mockReviews.map((review) => (
            <div key={review.id} className="rounded-xl border bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-lavender-light text-sm font-bold text-primary">
                    {review.author[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{review.author}</p>
                      <span className="text-xs text-muted-foreground">{review.userId}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {review.date}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {review.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
