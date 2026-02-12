import { Heart, MapPin, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import { WHOLESALERS } from "@/lib/data/constants";
import { mockProducts } from "@/lib/data/products";

const favoriteProducts = mockProducts.filter((p) => p.isFeatured).slice(0, 6);

export default function FavoritesPage() {
  return (
    <DashboardShell role="retailer">
      <DashboardHeader title="즐겨찾기" role="retailer" />
      <div className="p-6">
        {/* Favorite Wholesalers */}
        <div>
          <h2 className="text-lg font-semibold">즐겨찾기 도매상</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {WHOLESALERS.slice(0, 3).map((ws) => (
              <Card key={ws.id}>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{ws.name}</h3>
                      <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {ws.location}
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-medium">4.8</span>
                        <span className="text-xs text-muted-foreground">
                          (124)
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Heart className="h-4 w-4 fill-rose-pink text-rose-pink" />
                    </Button>
                  </div>
                  <div className="mt-3 flex gap-1.5">
                    <Badge variant="secondary" className="text-[10px]">
                      장미
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      튤립
                    </Badge>
                    <Badge variant="secondary" className="text-[10px]">
                      백합
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Frequent Products */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold">자주 주문하는 상품</h2>
          <div className="mt-4 space-y-3">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between rounded-xl border p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
                    <span className="text-lg">🌸</span>
                  </div>
                  <div>
                    <p className="font-medium">
                      {product.name}{" "}
                      {product.variety && (
                        <span className="text-muted-foreground">
                          {product.variety}
                        </span>
                      )}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {product.wholesaler} · {product.origin}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">
                    {product.price.toLocaleString("ko-KR")}원
                  </span>
                  <Button size="sm" variant="outline" className="rounded-full">
                    재주문
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}
