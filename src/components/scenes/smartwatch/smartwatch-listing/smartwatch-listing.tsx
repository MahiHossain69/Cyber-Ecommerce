"use client";

import { useState, useEffect } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Filters } from "../filters";
import { SmartwatchGrid } from "../smartwatch-grid";
import { Pagination } from "../../smartphone/pagination";

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
  price?: number;
}

interface ApiResponse {
  success: boolean;
  total: number;
  products: Smartwatch[];
}

const ITEMS_PER_PAGE = 9;

// Mock specifications generator
const addSpecifications = (watch: Smartwatch): Smartwatch => {
  const displayTypes = ["AMOLED", "OLED", "LCD", "Retina"];
  const waterResistances = ["5ATM", "10ATM", "IP68", "50m"];
  const connectivities = ["Bluetooth", "Wi-Fi", "LTE", "Bluetooth + Wi-Fi"];
  
  // Generate price based on brand and rating
  let basePrice = 199;
  if (watch.brand === "Apple") basePrice = 399;
  else if (watch.brand === "Samsung") basePrice = 299;
  else if (watch.brand === "Garmin") basePrice = 349;
  
  const price = basePrice + (watch.star * 20);
  
  return {
    ...watch,
    displayType: displayTypes[watch.id % displayTypes.length],
    waterResistance: waterResistances[watch.id % waterResistances.length],
    connectivity: connectivities[watch.id % connectivities.length],
    price: Math.round(price),
  };
};

export function SmartwatchListing() {
  const [watches, setWatches] = useState<Smartwatch[]>([]);
  const [filteredWatches, setFilteredWatches] = useState<Smartwatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandOpen, setBrandOpen] = useState(true);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetch("/api/smartwatch_api_77_unique.json")
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.success && data.products) {
          // Add specifications to each watch
          const watchesWithSpecs = data.products.map(addSpecifications);
          setWatches(watchesWithSpecs);
          setFilteredWatches(watchesWithSpecs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching smartwatches:", error);
        setLoading(false);
      });
  }, []);

  // Get unique brands
  const brands = Array.from(new Set(watches.map((watch) => watch.brand))).sort();

  // Get watch counts per brand
  const watchCounts = watches.reduce((acc, watch) => {
    acc[watch.brand] = (acc[watch.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Filter and search logic
  useEffect(() => {
    let filtered = watches;

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((watch) =>
        selectedBrands.includes(watch.brand)
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (watch) =>
          watch.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          watch.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredWatches(filtered);
    setCurrentPage(1);
  }, [selectedBrands, searchQuery, watches]);

  // Sorting logic
  const sortedWatches = [...filteredWatches].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0);
      case "price-high":
        return (b.price || 0) - (a.price || 0);
      case "name":
        return a.title.localeCompare(b.title);
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
  const totalPages = Math.ceil(sortedWatches.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentWatches = sortedWatches.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading smartwatches...</p>
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
            watchCounts={watchCounts}
            selectedBrands={selectedBrands}
            searchQuery={searchQuery}
            brandOpen={brandOpen}
            watches={watches}
            onBrandToggle={toggleBrand}
            onSearchChange={setSearchQuery}
            onBrandOpenChange={setBrandOpen}
          />

          <main className="flex-1">
            <SmartwatchGrid
              watches={currentWatches}
              totalCount={sortedWatches.length}
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
