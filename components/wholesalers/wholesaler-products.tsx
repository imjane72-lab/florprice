"use client";

import { useState } from "react";
import { ProductListItem } from "@/components/products/product-list-item";
import { FloatingCartBar } from "@/components/cart/floating-cart-bar";
import { type Product } from "@/lib/types/product";
import { cn } from "@/lib/utils";

interface WholesalerProductsProps {
  products: Product[];
}

export function WholesalerProducts({ products }: WholesalerProductsProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleProduct = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (checked) {
        next.add(id);
      } else {
        next.delete(id);
      }
      return next;
    });
  };

  const removeProduct = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const selectedProducts = products.filter((p) => selectedIds.has(p.id));

  return (
    <>
      <div className={cn("space-y-2", selectedIds.size > 0 && "pb-24")}>
        {products.map((product) => (
          <ProductListItem
            key={product.id}
            product={product}
            checked={selectedIds.has(product.id)}
            onCheckedChange={(checked) => toggleProduct(product.id, checked)}
          />
        ))}
      </div>

      <FloatingCartBar
        selectedProducts={selectedProducts}
        onRemove={removeProduct}
      />
    </>
  );
}
