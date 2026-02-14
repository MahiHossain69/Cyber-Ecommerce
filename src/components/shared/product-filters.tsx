"use client";

import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface FilterOption {
  label: string;
  key: string;
  values: (string | undefined)[];
}

interface ProductFiltersProps {
  brands: string[];
  brandCounts: Record<string, number>;
  selectedBrands: string[];
  searchQuery: string;
  brandOpen: boolean;
  additionalFilters?: FilterOption[];
  onBrandToggle: (brand: string) => void;
  onSearchChange: (query: string) => void;
  onBrandOpenChange: (open: boolean) => void;
}

export function ProductFilters({
  brands,
  brandCounts,
  selectedBrands,
  searchQuery,
  brandOpen,
  additionalFilters = [],
  onBrandToggle,
  onSearchChange,
  onBrandOpenChange,
}: ProductFiltersProps) {
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({});

  const toggleFilter = (key: string) => {
    setOpenFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="w-full lg:w-64 shrink-0">
      {/* Brand Filter */}
      <Collapsible open={brandOpen} onOpenChange={onBrandOpenChange}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Brand</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              brandOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 bg-gray-100 border-0"
            />
          </div>

          {/* Brand Checkboxes */}
          <div className="space-y-3">
            {brands.map((brand) => {
              const count = brandCounts[brand] || 0;
              return (
                <div
                  key={brand}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => onBrandToggle(brand)}
                    />
                    <label
                      htmlFor={brand}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {brand}
                    </label>
                  </div>
                  <span className="text-sm text-gray-400">{count}</span>
                </div>
              );
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Additional Filters */}
      {additionalFilters.map((filter) => (
        <Collapsible
          key={filter.key}
          open={openFilters[filter.key] || false}
          onOpenChange={() => toggleFilter(filter.key)}
        >
          <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
            <span className="font-medium text-black">{filter.label}</span>
            <ChevronDown
              className={cn(
                "w-5 h-5 transition-transform",
                openFilters[filter.key] && "rotate-180"
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-4 pb-6">
            <div className="space-y-3">
              {filter.values.filter(Boolean).map((value) => (
                <div key={value} className="flex items-center space-x-2">
                  <Checkbox id={`${filter.key}-${value}`} />
                  <label
                    htmlFor={`${filter.key}-${value}`}
                    className="text-sm font-medium leading-none cursor-pointer"
                  >
                    {value}
                  </label>
                </div>
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </aside>
  );
}
