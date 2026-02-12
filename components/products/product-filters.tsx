"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  FLOWER_TYPES,
  MATERIAL_TYPES,
  FLOWER_COLORS,
  FLOWER_GRADES,
  FLOWER_ORIGINS,
} from "@/lib/data/constants";

export interface FilterState {
  types: string[];
  colors: string[];
  grades: string[];
  origins: string[];
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  selectedCategory?: string;
}

export function ProductFilters({
  filters,
  onChange,
  selectedCategory = "전체",
}: ProductFiltersProps) {
  const toggleFilter = (category: keyof FilterState, value: string) => {
    const current = filters[category];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [category]: updated });
  };

  const clearAll = () => {
    onChange({ types: [], colors: [], grades: [], origins: [] });
  };

  const hasFilters =
    filters.types.length > 0 ||
    filters.colors.length > 0 ||
    filters.grades.length > 0 ||
    filters.origins.length > 0;

  // Show appropriate type list based on selected category
  const typeList =
    selectedCategory === "소재"
      ? MATERIAL_TYPES
      : selectedCategory === "절화"
        ? FLOWER_TYPES
        : [...FLOWER_TYPES, ...MATERIAL_TYPES];

  const typeLabel =
    selectedCategory === "소재"
      ? "소재 종류"
      : selectedCategory === "절화"
        ? "꽃 종류"
        : "품목";

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

      <Accordion
        type="multiple"
        defaultValue={["type", "color", "grade", "origin"]}
        className="mt-4"
      >
        <AccordionItem value="type">
          <AccordionTrigger className="text-sm">{typeLabel}</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5">
              {typeList.map((type) => (
                <label
                  key={type}
                  className="flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox
                    checked={filters.types.includes(type)}
                    onCheckedChange={() => toggleFilter("types", type)}
                  />
                  <span className="text-sm">{type}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-sm">색상</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5">
              {FLOWER_COLORS.map((color) => (
                <label
                  key={color}
                  className="flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox
                    checked={filters.colors.includes(color)}
                    onCheckedChange={() => toggleFilter("colors", color)}
                  />
                  <span className="text-sm">{color}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="grade">
          <AccordionTrigger className="text-sm">등급</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5">
              {FLOWER_GRADES.map((grade) => (
                <label
                  key={grade}
                  className="flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox
                    checked={filters.grades.includes(grade)}
                    onCheckedChange={() => toggleFilter("grades", grade)}
                  />
                  <span className="text-sm">{grade}등급</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="origin">
          <AccordionTrigger className="text-sm">산지</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2.5">
              {FLOWER_ORIGINS.map((origin) => (
                <label
                  key={origin}
                  className="flex cursor-pointer items-center gap-2.5"
                >
                  <Checkbox
                    checked={filters.origins.includes(origin)}
                    onCheckedChange={() => toggleFilter("origins", origin)}
                  />
                  <span className="text-sm">{origin}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
