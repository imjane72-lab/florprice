"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type SupplyCategory, type SupplyColor } from "@/lib/types/supply";

const SUPPLY_CATEGORIES: SupplyCategory[] = [
  "리본",
  "포장지",
  "플로랄폼",
  "와이어/테이프",
  "화병/바구니",
  "기타",
];

const SUPPLY_COLORS: SupplyColor[] = [
  "흰색",
  "아이보리",
  "분홍",
  "빨강",
  "검정",
  "연보라",
  "골드",
  "내추럴",
  "파스텔",
  "투명",
  "녹색",
];

const SUPPLY_COLOR_MAP: Record<SupplyColor, string> = {
  흰색: "#FFFFFF",
  아이보리: "#FFFFF0",
  분홍: "#FFB6C1",
  빨강: "#DC2626",
  검정: "#1A1A1A",
  연보라: "#DDD6FE",
  골드: "#D4AF37",
  내추럴: "#D2B48C",
  파스텔: "#F0D9E8",
  투명: "#E0F2FE",
  녹색: "#22C55E",
};

export interface SupplyFilterState {
  categories: string[];
  colors: string[];
}

interface SupplyFiltersProps {
  filters: SupplyFilterState;
  onChange: (filters: SupplyFilterState) => void;
}

export function SupplyFilters({ filters, onChange }: SupplyFiltersProps) {
  const toggleFilter = (key: keyof SupplyFilterState, value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: updated });
  };

  const clearAll = () => {
    onChange({ categories: [], colors: [] });
  };

  const hasFilters =
    filters.categories.length > 0 || filters.colors.length > 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">필터</h3>
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAll}
            className="h-auto p-0 text-xs text-primary hover:text-primary/80"
          >
            초기화
          </Button>
        )}
      </div>

      <Accordion type="multiple" defaultValue={[]} className="mt-4">
        <AccordionItem value="category">
          <AccordionTrigger className="text-sm">카테고리</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5">
              {SUPPLY_CATEGORIES.map((cat) => (
                <label
                  key={cat}
                  className="flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox
                    checked={filters.categories.includes(cat)}
                    onCheckedChange={() => toggleFilter("categories", cat)}
                  />
                  <span className="text-sm">{cat}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-sm">색상</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-1.5">
              {SUPPLY_COLORS.map((color) => {
                const isSelected = filters.colors.includes(color);
                const hex = SUPPLY_COLOR_MAP[color];
                return (
                  <button
                    key={color}
                    onClick={() => toggleFilter("colors", color)}
                    className={cn(
                      "flex w-16 flex-col items-center gap-1 rounded-lg py-1.5 text-xs transition-all",
                      isSelected
                        ? "bg-secondary font-semibold text-foreground"
                        : "text-muted-foreground hover:bg-muted",
                    )}
                  >
                    <div
                      className={cn(
                        "h-4 w-4 shrink-0 rounded-full",
                        (color === "흰색" || color === "투명") &&
                          "ring-1 ring-border",
                      )}
                      style={{ backgroundColor: hex }}
                    />
                    {color}
                  </button>
                );
              })}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
