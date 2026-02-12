import { Flower2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { type Product } from "@/lib/types/product";

const gradeColors: Record<string, string> = {
  특: "bg-primary/10 text-primary",
  상: "bg-blue-50 text-blue-600",
  중: "bg-amber-50 text-amber-600",
  하: "bg-gray-100 text-gray-500",
};

export function ProductCard({ product }: { product: Product }) {
  const formattedPrice = product.price.toLocaleString("ko-KR");

  return (
    <div className="group cursor-pointer">
      {/* Image placeholder */}
      <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-muted transition-all group-hover:-translate-y-1 group-hover:shadow-lg">
        <div className="flex h-full items-center justify-center">
          <Flower2 className="h-16 w-16 text-primary/20" />
        </div>
        {/* Badges */}
        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge
            variant="secondary"
            className={`text-[10px] font-semibold ${gradeColors[product.grade]}`}
          >
            {product.grade}등급
          </Badge>
          {product.isNewArrival && (
            <Badge className="bg-rose-pink text-[10px] font-semibold text-white">
              NEW
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
          <span className="text-lg font-bold">{formattedPrice}</span>
          <span className="text-sm text-muted-foreground">
            원 / {product.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
