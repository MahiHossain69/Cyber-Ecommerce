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
  headphoneCounts: Record<string, number>;
  selectedBrands: string[];
  searchQuery: string;
  brandOpen: boolean;
  headphones: Headphone[];
  onBrandToggle: (brand: string) => void;
  onSearchChange: (query: string) => void;
  onBrandOpenChange: (open: boolean) => void;
}

interface Headphone {
  id: number;
  brand: string;
  title: string;
  battery: string;
  star: number;
  reviews: number;
  image: string;
  type?: string;
  connectivity?: string;
  noiseCancellation?: string;
  driverSize?: string;
}

export function Filters({
  brands,
  headphoneCounts,
  selectedBrands,
  searchQuery,
  brandOpen,
  headphones,
  onBrandToggle,
  onSearchChange,
  onBrandOpenChange,
}: FiltersProps) {
  const [batteryOpen, setBatteryOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [connectivityOpen, setConnectivityOpen] = useState(false);
  const [noiseOpen, setNoiseOpen] = useState(false);
  const [driverOpen, setDriverOpen] = useState(false);

  // Get unique values for each filter
  const batteries = Array.from(
    new Set(headphones.map((h) => h.battery).filter(Boolean))
  ).sort();
  const types = Array.from(
    new Set(headphones.map((h) => h.type).filter(Boolean))
  ).sort();
  const connectivities = Array.from(
    new Set(headphones.map((h) => h.connectivity).filter(Boolean))
  ).sort();
  const noiseCancellations = Array.from(
    new Set(headphones.map((h) => h.noiseCancellation).filter(Boolean))
  ).sort();
  const driverSizes = Array.from(
    new Set(headphones.map((h) => h.driverSize).filter(Boolean))
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
              const count = headphoneCounts[brand] || 0;
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

      {/* Battery Life Filter */}
      <Collapsible open={batteryOpen} onOpenChange={setBatteryOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Battery life</span>
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

      {/* Type Filter */}
      <Collapsible open={typeOpen} onOpenChange={setTypeOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Type</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              typeOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {types.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={`type-${type}`} />
                <label
                  htmlFor={`type-${type}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Connectivity Filter */}
      <Collapsible open={connectivityOpen} onOpenChange={setConnectivityOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
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

      {/* Noise Cancellation Filter */}
      <Collapsible open={noiseOpen} onOpenChange={setNoiseOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Noise cancellation</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              noiseOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {noiseCancellations.map((noise) => (
              <div key={noise} className="flex items-center space-x-2">
                <Checkbox id={`noise-${noise}`} />
                <label
                  htmlFor={`noise-${noise}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {noise}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Driver Size Filter */}
      <Collapsible open={driverOpen} onOpenChange={setDriverOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Driver size</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              driverOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {driverSizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox id={`driver-${size}`} />
                <label
                  htmlFor={`driver-${size}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {size}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
}
