import { Flower2, Leaf } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ProductBadge } from "@/components/ui/product-badge";
import { Checkbox } from "@/components/ui/checkbox";
import { type Product } from "@/lib/types/product";

const gradeColors: Record<string, string> = {
  특: "bg-sky-50 text-blue-600",
  상: "bg-sky-50 text-blue-600",
  중: "bg-sky-50 text-blue-600",
  세일: "bg-red-50 text-red-500",
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
  const displayPrice =
    product.isSale && product.salePrice ? product.salePrice : product.price;
  const formattedPrice = displayPrice.toLocaleString("ko-KR");
  const originalPrice = product.price.toLocaleString("ko-KR");
  const Icon = product.category === "소재" ? Leaf : Flower2;

  return (
    <div
      className={`group flex items-center gap-5 rounded-xl border bg-white px-5 py-5 transition-all ${
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
      <div className="flex h-26 w-26 shrink-0 items-center justify-center rounded-xl bg-muted">
        <Icon size={32} className="text-muted-foreground/40" />
      </div>

      {/* Product Info */}
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {/* Name & Variety */}
        <div className="min-w-0 flex flex-col flex-1">
          <div className="flex items-center gap-2">
            {product.isNewArrival && (
              <ProductBadge variant="new">NEW</ProductBadge>
            )}
            {product.isSale && product.salePrice ? (
              <ProductBadge variant="sale">SALE</ProductBadge>
            ) : (
              <Badge
                variant="outline"
                className={`shrink-0 text-xs rounded-sm h-6 px-2 border font-bold ${gradeColors[product.grade]}`}
              >
                {product.grade}
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="truncate text-base font-semibold">{product.name}</span>
            {product.variety && (
              <span className="truncate text-sm text-muted-foreground">
                {product.variety}
              </span>
            )}
          </div>
          <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
            <span>{product.wholesaler}</span>
            <span>·</span>
            <span>{product.origin}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex flex-col gap-1">
          <div className="shrink-0 text-right">
            {product.isSale && product.salePrice ? (
              <>
                <span className="mr-1 text-xs text-muted-foreground line-through">
                  {originalPrice}
                </span>
                <span className="text-lg font-bold text-red-500">
                  {formattedPrice}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold">{formattedPrice}</span>
            )}
            <span className="text-xs text-muted-foreground">
              원/{product.unit}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden shrink-0 sm:block">{product.color}</span>
            <span className="hidden sm:block">&middot;</span>
            {product.stemLength && (
              <>
                <span className="hidden shrink-0 md:block">
                  {product.stemLength}cm
                </span>
                <span className="hidden md:block">&middot;</span>
              </>
            )}
            <span
              className={`hidden shrink-0 lg:block ${
                product.stock < 10
                  ? "font-semibold text-destructive"
                  : ""
              }`}
            >
              재고 {product.stock}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
