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
  gamingCounts: Record<string, number>;
  selectedBrands: string[];
  searchQuery: string;
  brandOpen: boolean;
  gamingItems: GamingItem[];
  onBrandToggle: (brand: string) => void;
  onSearchChange: (query: string) => void;
  onBrandOpenChange: (open: boolean) => void;
}

interface GamingItem {
  id: number;
  brand: string;
  name: string;
  title: string;
  battery: string;
  battery_mah: number;
  star: number;
  reviews: number;
  image: string;
  description?: string;
  platform?: string;
  connectivity?: string;
  resolution?: string;
  refreshRate?: string;
  price?: number;
}

export function Filters({
  brands,
  gamingCounts,
  selectedBrands,
  searchQuery,
  brandOpen,
  gamingItems,
  onBrandToggle,
  onSearchChange,
  onBrandOpenChange,
}: FiltersProps) {
  const [batteryOpen, setBatteryOpen] = useState(false);
  const [platformOpen, setPlatformOpen] = useState(false);
  const [connectivityOpen, setConnectivityOpen] = useState(false);
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [refreshRateOpen, setRefreshRateOpen] = useState(false);

  // Get unique values for each filter
  const batteries = Array.from(
    new Set(gamingItems.map((g) => g.battery).filter(Boolean))
  ).sort();
  const platforms = Array.from(
    new Set(gamingItems.map((g) => g.platform).filter(Boolean))
  ).sort();
  const connectivities = Array.from(
    new Set(gamingItems.map((g) => g.connectivity).filter(Boolean))
  ).sort();
  const resolutions = Array.from(
    new Set(gamingItems.map((g) => g.resolution).filter(Boolean))
  ).sort();
  const refreshRates = Array.from(
    new Set(gamingItems.map((g) => g.refreshRate).filter(Boolean))
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
              const count = gamingCounts[brand] || 0;
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

      {/* Platform Filter */}
      <Collapsible open={platformOpen} onOpenChange={setPlatformOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Platform</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              platformOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {platforms.map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox id={`platform-${platform}`} />
                <label
                  htmlFor={`platform-${platform}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {platform}
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

      {/* Resolution Filter */}
      <Collapsible open={resolutionOpen} onOpenChange={setResolutionOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Resolution</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              resolutionOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {resolutions.map((resolution) => (
              <div key={resolution} className="flex items-center space-x-2">
                <Checkbox id={`resolution-${resolution}`} />
                <label
                  htmlFor={`resolution-${resolution}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {resolution}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Refresh Rate Filter */}
      <Collapsible open={refreshRateOpen} onOpenChange={setRefreshRateOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Refresh rate</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              refreshRateOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {refreshRates.map((rate) => (
              <div key={rate} className="flex items-center space-x-2">
                <Checkbox id={`refresh-${rate}`} />
                <label
                  htmlFor={`refresh-${rate}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {rate}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
}
