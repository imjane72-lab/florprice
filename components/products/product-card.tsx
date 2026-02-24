import { Flower2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductBadge } from "@/components/ui/product-badge";
import { type Product } from "@/lib/types/product";

const gradeColors: Record<string, string> = {
  특: "bg-sky-50 text-blue-600",
  상: "bg-sky-50 text-blue-600",
  중: "bg-sky-50 text-blue-600",
  세일: "bg-red-50 text-red-500",
};

export function ProductCard({ product }: { product: Product }) {
  const formattedPrice = product.price.toLocaleString("ko-KR");

  return (
    <div className="group cursor-pointer">
      {/* Image placeholder */}
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="flex h-full items-center justify-center">
          <Flower2 className="h-20 w-20 text-primary/20" />
        </div>
        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-1.5">
          {product.isNewArrival && (
            <ProductBadge variant="new">NEW</ProductBadge>
          )}
          {product.isSale && product.salePrice ? (
            <ProductBadge variant="sale">SALE</ProductBadge>
          ) : (
            <Badge
              variant="secondary"
              className={`text-xs font-bold rounded-sm ${gradeColors[product.grade]}`}
            >
              {product.grade}
            </Badge>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {product.wholesaler}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">
            {product.origin}
          </span>
        </div>
        <h3 className="font-semibold">
          {product.name}
          {product.variety && (
            <span className="ml-1 font-normal text-muted-foreground">
              {product.variety}
            </span>
          )}
        </h3>
        <div className="flex items-baseline gap-1">
          {product.isSale && product.salePrice ? (
            <>
              <span className="text-xs text-muted-foreground line-through">
                {formattedPrice}
              </span>
              <span className="text-lg font-bold text-red-500">
                {product.salePrice.toLocaleString("ko-KR")}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold">{formattedPrice}</span>
          )}
          <span className="text-sm text-muted-foreground">
            원 / {product.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
