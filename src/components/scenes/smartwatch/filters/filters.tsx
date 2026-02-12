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

interface FiltersProps {
  brands: string[];
  watchCounts: Record<string, number>;
  selectedBrands: string[];
  searchQuery: string;
  brandOpen: boolean;
  watches: Smartwatch[];
  onBrandToggle: (brand: string) => void;
  onSearchChange: (query: string) => void;
  onBrandOpenChange: (open: boolean) => void;
}

interface Smartwatch {
  id: number;
  brand: string;
  title: string;
  battery: string;
  star: number;
  reviews: number;
  image: string;
  displayType?: string;
  waterResistance?: string;
  connectivity?: string;
}

export function Filters({
  brands,
  watchCounts,
  selectedBrands,
  searchQuery,
  brandOpen,
  watches,
  onBrandToggle,
  onSearchChange,
  onBrandOpenChange,
}: FiltersProps) {
  const [batteryOpen, setBatteryOpen] = useState(false);
  const [displayOpen, setDisplayOpen] = useState(false);
  const [waterResistanceOpen, setWaterResistanceOpen] = useState(false);
  const [connectivityOpen, setConnectivityOpen] = useState(false);

  // Get unique values for each filter
  const batteries = Array.from(
    new Set(watches.map((w) => w.battery).filter(Boolean))
  ).sort();
  const displayTypes = Array.from(
    new Set(watches.map((w) => w.displayType).filter(Boolean))
  ).sort();
  const waterResistances = Array.from(
    new Set(watches.map((w) => w.waterResistance).filter(Boolean))
  ).sort();
  const connectivities = Array.from(
    new Set(watches.map((w) => w.connectivity).filter(Boolean))
  ).sort();

  return (
    <aside className="w-full lg:w-64 shrink-0">
      {/* Brand Filter */}
      <Collapsible open={brandOpen} onOpenChange={onBrandOpenChange}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b">
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
              const count = watchCounts[brand] || 0;
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
      <Collapsible open={batteryOpen} onOpenChange={setBatteryOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Battery capacity</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              batteryOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {batteries.map((battery) => (
              <div key={battery} className="flex items-center space-x-2">
                <Checkbox id={`battery-${battery}`} />
                <label
                  htmlFor={`battery-${battery}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {battery}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Display Type Filter */}
      <Collapsible open={displayOpen} onOpenChange={setDisplayOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Display type</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              displayOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {displayTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={`display-${type}`} />
                <label
                  htmlFor={`display-${type}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Water Resistance Filter */}
      <Collapsible open={waterResistanceOpen} onOpenChange={setWaterResistanceOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Water resistance</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              waterResistanceOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {waterResistances.map((resistance) => (
              <div key={resistance} className="flex items-center space-x-2">
                <Checkbox id={`water-${resistance}`} />
                <label
                  htmlFor={`water-${resistance}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {resistance}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Connectivity Filter */}
      <Collapsible open={connectivityOpen} onOpenChange={setConnectivityOpen}>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Connectivity</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              connectivityOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {connectivities.map((connectivity) => (
              <div key={connectivity} className="flex items-center space-x-2">
                <Checkbox id={`connectivity-${connectivity}`} />
                <label
                  htmlFor={`connectivity-${connectivity}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {connectivity}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
}
