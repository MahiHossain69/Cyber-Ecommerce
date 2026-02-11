"use client";

import { Search, ChevronDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface FiltersProps {
  brands: string[];
  phoneCounts: Record<string, number>;
  selectedBrands: string[];
  searchQuery: string;
  brandOpen: boolean;
  phones: Phone[];
  onBrandToggle: (brand: string) => void;
  onSearchChange: (query: string) => void;
  onBrandOpenChange: (open: boolean) => void;
}

interface Phone {
  id: number;
  brand: string;
  model: string;
  price: number;
  image: string;
  batteryCapacity?: string;
  screenType?: string;
  screenDiagonal?: string;
  protectionClass?: string;
  builtInMemory?: string;
}

export function Filters({
  brands,
  phoneCounts,
  selectedBrands,
  searchQuery,
  brandOpen,
  phones,
  onBrandToggle,
  onSearchChange,
  onBrandOpenChange,
}: FiltersProps) {
  // Get unique values for each filter
  const batteryCapacities = Array.from(
    new Set(phones.map((p) => p.batteryCapacity).filter(Boolean))
  ).sort();
  const screenTypes = Array.from(
    new Set(phones.map((p) => p.screenType).filter(Boolean))
  ).sort();
  const screenDiagonals = Array.from(
    new Set(phones.map((p) => p.screenDiagonal).filter(Boolean))
  ).sort();
  const protectionClasses = Array.from(
    new Set(phones.map((p) => p.protectionClass).filter(Boolean))
  ).sort();
  const builtInMemories = Array.from(
    new Set(phones.map((p) => p.builtInMemory).filter(Boolean))
  ).sort();

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
              const count = phoneCounts[brand] || 0;
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

      {/* Battery Capacity Filter */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center cursor-pointer justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Battery capacity</span>
          <ChevronDown className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {batteryCapacities.map((capacity) => (
              <div key={capacity} className="flex items-center space-x-2">
                <Checkbox id={`battery-${capacity}`} />
                <label
                  htmlFor={`battery-${capacity}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {capacity}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Screen Type Filter */}
      <Collapsible>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Screen type</span>
          <ChevronDown className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {screenTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={`screen-${type}`} />
                <label
                  htmlFor={`screen-${type}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Screen Diagonal Filter */}
      <Collapsible>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Screen diagonal</span>
          <ChevronDown className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {screenDiagonals.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox id={`diagonal-${size}`} />
                <label
                  htmlFor={`diagonal-${size}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Protection Class Filter */}
      <Collapsible>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Protection class</span>
          <ChevronDown className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {protectionClasses.map((protection) => (
              <div key={protection} className="flex items-center space-x-2">
                <Checkbox id={`protection-${protection}`} />
                <label
                  htmlFor={`protection-${protection}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {protection}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Built-in Memory Filter */}
      <Collapsible>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Built-in memory</span>
          <ChevronDown className="w-5 h-5" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {builtInMemories.map((memory) => (
              <div key={memory} className="flex items-center space-x-2">
                <Checkbox id={`memory-${memory}`} />
                <label
                  htmlFor={`memory-${memory}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {memory}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
}
