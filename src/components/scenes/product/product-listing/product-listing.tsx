"use client";

import { useState, useEffect } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Filters } from "../filters";
import { ProductGrid } from "../product-grid";
import { Pagination } from "../pagination";

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
  rating?: number;
}

interface ApiResponse {
  success: boolean;
  total: number;
  products: Phone[];
}

const ITEMS_PER_PAGE = 9;

// Mock specifications generator
const addSpecifications = (phone: Phone): Phone => {
  const batteryOptions = ["3000mAh", "4000mAh", "4500mAh", "5000mAh"];
  const screenTypes = ["OLED", "AMOLED", "LCD", "Super AMOLED"];
  const screenSizes = ["5.5\"", "6.1\"", "6.5\"", "6.7\""];
  const protectionClasses = ["IP67", "IP68", "None"];
  const memoryOptions = ["64GB", "128GB", "256GB", "512GB", "1TB"];
  
  return {
    ...phone,
    batteryCapacity: batteryOptions[phone.id % batteryOptions.length],
    screenType: screenTypes[phone.id % screenTypes.length],
    screenDiagonal: screenSizes[phone.id % screenSizes.length],
    protectionClass: protectionClasses[phone.id % protectionClasses.length],
    builtInMemory: memoryOptions[phone.id % memoryOptions.length],
    rating: 3 + (phone.id % 3), // Rating between 3-5
  };
};

export function ProductListing() {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandOpen, setBrandOpen] = useState(true);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetch("/api/phones_real_image_database.json")
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.success && data.products) {
          // Add specifications to each phone
          const phonesWithSpecs = data.products.map(addSpecifications);
          setPhones(phonesWithSpecs);
          setFilteredPhones(phonesWithSpecs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching phones:", error);
        setLoading(false);
      });
  }, []);

  // Get unique brands
  const brands = Array.from(new Set(phones.map((phone) => phone.brand))).sort();

  // Get phone counts per brand
  const phoneCounts = phones.reduce((acc, phone) => {
    acc[phone.brand] = (acc[phone.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Filter and search logic
  useEffect(() => {
    let filtered = phones;

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((phone) =>
        selectedBrands.includes(phone.brand)
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (phone) =>
          phone.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          phone.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredPhones(filtered);
    setCurrentPage(1);
  }, [selectedBrands, searchQuery, phones]);

  // Sorting logic
  const sortedPhones = [...filteredPhones].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.model.localeCompare(b.model);
      case "rating":
      default:
        return (b.rating || 0) - (a.rating || 0);
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
  const totalPages = Math.ceil(sortedPhones.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentPhones = sortedPhones.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading products...</p>
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
            phoneCounts={phoneCounts}
            selectedBrands={selectedBrands}
            searchQuery={searchQuery}
            brandOpen={brandOpen}
            phones={phones}
            onBrandToggle={toggleBrand}
            onSearchChange={setSearchQuery}
            onBrandOpenChange={setBrandOpen}
          />

          <main className="flex-1">
            <ProductGrid
              phones={currentPhones}
              totalCount={sortedPhones.length}
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
