"use client";

import { useState } from "react";
import { ShoppingCart, ChevronUp, ChevronDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Product } from "@/lib/types/product";

interface FloatingCartBarProps {
  selectedProducts: Product[];
  onRemove: (id: string) => void;
}

export function FloatingCartBar({
  selectedProducts,
  onRemove,
}: FloatingCartBarProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (selectedProducts.length === 0) return null;

  const totalPrice = selectedProducts.reduce((sum, p) => {
    const price = p.isSale && p.salePrice ? p.salePrice : p.price;
    return sum + price;
  }, 0);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 shadow-lg backdrop-blur-md">
      {/* Expandable product list */}
      {isExpanded && (
        <div className="mx-auto max-w-7xl border-b">
          <div className="max-h-64 overflow-y-auto px-4 py-3">
            <div className="space-y-2">
              {selectedProducts.map((product) => {
                const price =
                  product.isSale && product.salePrice
                    ? product.salePrice
                    : product.price;
                return (
                  <div
                    key={product.id}
                    className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="truncate text-sm font-medium">
                        {product.name}
                      </span>
                      {product.variety && (
                        <span className="truncate text-xs text-muted-foreground">
                          {product.variety}
                        </span>
                      )}
                      <span className="shrink-0 text-xs text-muted-foreground">
                        {product.grade}등급 · {product.origin}
                      </span>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <span className="text-sm font-semibold">
                        {price.toLocaleString("ko-KR")}원
                      </span>
                      <button
                        onClick={() => onRemove(product.id)}
                        className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Summary bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            {isExpanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronUp className="h-4 w-4" />
            )}
          </button>
          <div>
            <span className="text-sm font-medium">
              {selectedProducts.length}개 선택
            </span>
            <span className="ml-4 text-lg font-bold">
              {totalPrice.toLocaleString("ko-KR")}
              <span className="text-sm font-normal text-muted-foreground">
                원
              </span>
            </span>
          </div>
        </div>
        <Button className="rounded-full px-6">
          <ShoppingCart className="mr-2 h-4 w-4" />
          장바구니 담기
        </Button>
      </div>
    </div>
  );
}
