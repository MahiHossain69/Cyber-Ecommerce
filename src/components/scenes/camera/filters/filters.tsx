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
  cameraCounts: Record<string, number>;
  selectedBrands: string[];
  searchQuery: string;
  brandOpen: boolean;
  cameras: Camera[];
  onBrandToggle: (brand: string) => void;
  onSearchChange: (query: string) => void;
  onBrandOpenChange: (open: boolean) => void;
}

interface Camera {
  id: number;
  brand: string;
  title: string;
  battery: string;
  star: number;
  reviews: number;
  image: string;
  sensorType?: string;
  resolution?: string;
  videoCapability?: string;
  lensMount?: string;
}

export function Filters({
  brands,
  cameraCounts,
  selectedBrands,
  searchQuery,
  brandOpen,
  cameras,
  onBrandToggle,
  onSearchChange,
  onBrandOpenChange,
}: FiltersProps) {
  const [batteryOpen, setBatteryOpen] = useState(false);
  const [sensorOpen, setSensorOpen] = useState(false);
  const [resolutionOpen, setResolutionOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [lensOpen, setLensOpen] = useState(false);

  // Get unique values for each filter
  const batteries = Array.from(
    new Set(cameras.map((c) => c.battery).filter(Boolean))
  ).sort();
  const sensorTypes = Array.from(
    new Set(cameras.map((c) => c.sensorType).filter(Boolean))
  ).sort();
  const resolutions = Array.from(
    new Set(cameras.map((c) => c.resolution).filter(Boolean))
  ).sort();
  const videoCapabilities = Array.from(
    new Set(cameras.map((c) => c.videoCapability).filter(Boolean))
  ).sort();
  const lensMounts = Array.from(
    new Set(cameras.map((c) => c.lensMount).filter(Boolean))
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
              const count = cameraCounts[brand] || 0;
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
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
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

      {/* Sensor Type Filter */}
      <Collapsible open={sensorOpen} onOpenChange={setSensorOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Sensor type</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              sensorOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {sensorTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox id={`sensor-${type}`} />
                <label
                  htmlFor={`sensor-${type}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {type}
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

      {/* Video Capability Filter */}
      <Collapsible open={videoOpen} onOpenChange={setVideoOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Video capability</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              videoOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {videoCapabilities.map((video) => (
              <div key={video} className="flex items-center space-x-2">
                <Checkbox id={`video-${video}`} />
                <label
                  htmlFor={`video-${video}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {video}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Lens Mount Filter */}
      <Collapsible open={lensOpen} onOpenChange={setLensOpen}>
        <CollapsibleTrigger className="flex cursor-pointer items-center justify-between w-full py-4 border-b">
          <span className="font-medium text-black">Lens mount</span>
          <ChevronDown
            className={cn(
              "w-5 h-5 transition-transform",
              lensOpen && "rotate-180"
            )}
          />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4 pb-6">
          <div className="space-y-3">
            {lensMounts.map((mount) => (
              <div key={mount} className="flex items-center space-x-2">
                <Checkbox id={`lens-${mount}`} />
                <label
                  htmlFor={`lens-${mount}`}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  {mount}
                </label>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </aside>
  );
}
