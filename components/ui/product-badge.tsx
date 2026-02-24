import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type ProductBadgeVariant = "new" | "sale" | "category";

interface ProductBadgeProps {
  variant: ProductBadgeVariant;
  children: React.ReactNode;
  size?: "sm" | "md";
  className?: string;
}

const variantStyles: Record<ProductBadgeVariant, string> = {
  new: "bg-lavender-light text-foreground/85 border-lavender-light",
  sale: "bg-red-100 text-red-500 border-red-200",
  category: "bg-secondary text-secondary-foreground border-border",
};

export function ProductBadge({
  variant,
  children,
  size = "md",
  className,
}: ProductBadgeProps) {
  return (
    <Badge
      variant={variant === "category" ? "outline" : "default"}
      className={cn(
        "shrink-0 rounded-sm font-bold",
        size === "sm" ? "h-5 text-[10px]" : "h-6 text-xs px-2.5",
        variantStyles[variant],
        className,
      )}
    >
      {children}
    </Badge>
  );
}
