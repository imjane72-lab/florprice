import { Flower2, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { type Product } from "@/lib/types/product";

const gradeColors: Record<string, string> = {
  특: "bg-primary/10 text-primary",
  상: "bg-blue-50 text-blue-600",
  중: "bg-amber-50 text-amber-600",
  하: "bg-gray-100 text-gray-500",
};

interface ProductListItemProps {
  product: Product;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export function ProductListItem({
  product,
  checked = false,
  onCheckedChange,
}: ProductListItemProps) {
  const displayPrice = product.isSale && product.salePrice ? product.salePrice : product.price;
  const formattedPrice = displayPrice.toLocaleString("ko-KR");
  const originalPrice = product.price.toLocaleString("ko-KR");
  const Icon = product.category === "소재" ? Leaf : Flower2;

  return (
    <div
      className={`group flex items-center gap-4 rounded-xl border bg-white px-4 py-3 transition-all ${
        checked
          ? "border-primary/30 bg-lavender-light/20"
          : "border-border/50 hover:border-primary/20 hover:shadow-sm"
      }`}
    >
      {/* Checkbox */}
      {onCheckedChange && (
        <Checkbox
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
          className="shrink-0"
        />
      )}

      {/* Thumbnail */}
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-muted">
        <Icon className="h-6 w-6 text-primary/30" />
      </div>

      {/* Product Info */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* Name & Variety */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="truncate font-semibold">{product.name}</span>
            {product.variety && (
              <span className="truncate text-sm text-muted-foreground">
                {product.variety}
              </span>
            )}
            {product.isNewArrival && (
              <Badge className="shrink-0 bg-rose-pink text-[10px] font-semibold text-white">
                NEW
              </Badge>
            )}
            {product.isSale && (
              <Badge className="shrink-0 bg-red-500 text-[10px] font-semibold text-white">
                SALE
              </Badge>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{product.wholesaler}</span>
            <span>·</span>
            <span>{product.origin}</span>
          </div>
        </div>

        {/* Grade */}
        <Badge
          variant="secondary"
          className={`shrink-0 text-[10px] font-semibold ${gradeColors[product.grade]}`}
        >
          {product.grade}
        </Badge>

        {/* Color */}
        <span className="hidden shrink-0 text-sm text-muted-foreground sm:block">
          {product.color}
        </span>

        {/* Stem Length */}
        {product.stemLength && (
          <span className="hidden shrink-0 text-sm text-muted-foreground md:block">
            {product.stemLength}cm
          </span>
        )}

        {/* Stock */}
        <span
          className={`hidden shrink-0 text-sm lg:block ${
            product.stock < 10
              ? "font-semibold text-destructive"
              : "text-muted-foreground"
          }`}
        >
          재고 {product.stock}
        </span>

        {/* Price */}
        <div className="shrink-0 text-right">
          {product.isSale && product.salePrice ? (
            <>
              <span className="mr-1 text-xs text-muted-foreground line-through">
                {originalPrice}
              </span>
              <span className="text-base font-bold text-red-500">
                {formattedPrice}
              </span>
            </>
          ) : (
            <span className="text-base font-bold">{formattedPrice}</span>
          )}
          <span className="text-xs text-muted-foreground">
            원/{product.unit}
          </span>
        </div>
      </div>
    </div>
  );
}
