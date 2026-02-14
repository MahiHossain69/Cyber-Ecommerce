"use client";

import { useState, useEffect } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Filters } from "../filters";
import { GamingGrid } from "../gaming-grid";
import { Pagination } from "../../smartphone/pagination";

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

interface ApiResponse {
  success?: boolean;
  total?: number;
  products?: GamingItem[];
}

const ITEMS_PER_PAGE = 9;

// Mock specifications generator
const addSpecifications = (item: GamingItem): GamingItem => {
  const platforms = ["PlayStation 5", "Xbox Series X", "PC", "Nintendo Switch", "Multi-platform"];
  const connectivities = ["Wireless", "Wired", "Bluetooth", "USB-C", "2.4GHz Wireless"];
  const resolutions = ["1080p", "1440p", "4K", "8K"];
  const refreshRates = ["60Hz", "120Hz", "144Hz", "165Hz", "240Hz"];
  
  // Generate price based on brand and rating
  let basePrice = 49;
  if (item.brand === "Sony") basePrice = 499;
  else if (item.brand === "Microsoft") basePrice = 499;
  else if (item.brand === "Nintendo") basePrice = 349;
  else if (item.brand === "Valve") basePrice = 399;
  else if (item.brand === "Meta") basePrice = 499;
  else if (item.brand === "ASUS") basePrice = 699;
  else if (item.brand === "Logitech") basePrice = 129;
  else if (item.brand === "Razer") basePrice = 149;
  else if (item.brand === "SteelSeries") basePrice = 299;
  else if (item.brand === "Corsair") basePrice = 169;
  else if (item.brand === "HyperX") basePrice = 139;
  else if (item.brand === "Elgato") basePrice = 149;
  else if (item.brand === "Thrustmaster") basePrice = 399;
  else if (item.brand === "Glorious") basePrice = 79;
  
  const price = basePrice + (item.star * 20);
  
  // Convert battery_mah to battery string
  const battery = item.battery_mah > 0 ? `${item.battery_mah}mAh` : "Wired";
  
  return {
    ...item,
    battery: battery,
    title: item.name,
    platform: platforms[item.id % platforms.length],
    connectivity: connectivities[item.id % connectivities.length],
    resolution: resolutions[item.id % resolutions.length],
    refreshRate: refreshRates[item.id % refreshRates.length],
    price: Math.round(price),
  };
};

export function GamingListing() {
  const [gamingItems, setGamingItems] = useState<GamingItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GamingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandOpen, setBrandOpen] = useState(true);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetch("/api/gaming_api_17.json")
      .then((res) => res.json())
      .then((data: ApiResponse | GamingItem[]) => {
        let itemsData: GamingItem[] = [];
        
        // Handle both array and object response formats
        if (Array.isArray(data)) {
          itemsData = data;
        } else if (data.success && data.products) {
          itemsData = data.products;
        }
        
        if (itemsData.length > 0) {
          // Add specifications to each item
          const itemsWithSpecs = itemsData.map(addSpecifications);
          setGamingItems(itemsWithSpecs);
          setFilteredItems(itemsWithSpecs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching gaming items:", error);
        setLoading(false);
      });
  }, []);

  // Get unique brands
  const brands = Array.from(new Set(gamingItems.map((item) => item.brand))).sort();

  // Get item counts per brand
  const gamingCounts = gamingItems.reduce((acc, item) => {
    acc[item.brand] = (acc[item.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Filter and search logic
  useEffect(() => {
    let filtered = gamingItems;

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((item) =>
        selectedBrands.includes(item.brand)
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [selectedBrands, searchQuery, gamingItems]);

  // Sorting logic
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "name":
        return a.name.localeCompare(b.name);
      case "rating":
      default:
        return b.star - a.star;
    }
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  // Pagination
  const totalPages = Math.ceil(sortedItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = sortedItems.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading gaming products...</p>
      </div>
    );
  }

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Breadcrumb />

        <div className="flex flex-col lg:flex-row gap-8">
          <Filters
            brands={brands}
            gamingCounts={gamingCounts}
            selectedBrands={selectedBrands}
            searchQuery={searchQuery}
            brandOpen={brandOpen}
            gamingItems={gamingItems}
            onBrandToggle={toggleBrand}
            onSearchChange={setSearchQuery}
            onBrandOpenChange={setBrandOpen}
          />

          <main className="flex-1">
            <GamingGrid
              gamingItems={currentItems}
              totalCount={sortedItems.length}
              onSortChange={setSortBy}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>
      </div>
    </section>
  );
}
