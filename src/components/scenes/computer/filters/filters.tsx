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
  computerCounts: Record<string, number>;
  selectedBrands: string[];
  searchQuery: string;
  brandOpen: boolean;
  computers: Computer[];
  onBrandToggle: (brand: string) => void;
  onSearchChange: (query: string) => void;
  onBrandOpenChange: (open: boolean) => void;
}

interface Computer {
  id: number;
  brand: string;
  title: string;
  battery: string;
  star: number;
  reviews: number;
  image: string;
  processor?: string;
  ram?: string;
  storage?: string;
  screenSize?: string;
  graphics?: string;
}

export function Filters({
  brands,
  computerCounts,
  selectedBrands,
  searchQuery,
  brandOpen,
  computers,
  onBrandToggle,
  onSearchChange,
  onBrandOpenChange,
}: FiltersProps) {
  const [batteryOpen, setBatteryOpen] = useState(false);
  const [processorOpen, setProcessorOpen] = useState(false);
  const [ramOpen, setRamOpen] = useState(false);
  const [storageOpen, setStorageOpen] = useState(false);
  const [screenOpen, setScreenOpen] = useState(false);

  // Get unique values for each filter
  const batteries = Array.from(
    new Set(computers.map((c) => c.battery).filter(Boolean))
  ).sort();
  const processors = Array.from(
    new Set(computers.map((c) => c.processor).filter(Boolean))
  ).sort();
  const rams = Array.from(
    new Set(computers.map((c) => c.ram).filter(Boolean))
  ).sort();
  const storages = Array.from(
    new Set(computers.map((c) => c.storage).filter(Boolean))
  ).sort();
  const screenSizes = Array.from(
    new Set(computers.map((c) => c.screenSize).filter(Boolean))
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
              const count = computerCounts[brand] || 0;
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

      {/* Processor Filter */}
      <Collapsible open={processorOpen} onOpenChange={setProcessorOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Processor</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              processorOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {processors.map((processor) => (
              <div key={processor} className="flex items-center space-x-2">
                <Checkbox id={`processor-${processor}`} />
                <label
                  htmlFor={`processor-${processor}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {processor}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* RAM Filter */}
      <Collapsible open={ramOpen} onOpenChange={setRamOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">RAM</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              ramOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {rams.map((ram) => (
              <div key={ram} className="flex items-center space-x-2">
                <Checkbox id={`ram-${ram}`} />
                <label
                  htmlFor={`ram-${ram}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {ram}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Storage Filter */}
      <Collapsible open={storageOpen} onOpenChange={setStorageOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Storage</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              storageOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {storages.map((storage) => (
              <div key={storage} className="flex items-center space-x-2">
                <Checkbox id={`storage-${storage}`} />
                <label
                  htmlFor={`storage-${storage}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {storage}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Screen Size Filter */}
      <Collapsible open={screenOpen} onOpenChange={setScreenOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Screen size</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              screenOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {screenSizes.map((size) => (
              <div key={size} className="flex items-center space-x-2">
                <Checkbox id={`screen-${size}`} />
                <label
                  htmlFor={`screen-${size}`}
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
