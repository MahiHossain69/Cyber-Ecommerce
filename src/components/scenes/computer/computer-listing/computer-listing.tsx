"use client";

import { useState, useEffect } from "react";
import {
  ProductBreadcrumb,
  ProductPagination,
  ProductGrid,
  ProductFilters,
  FilterOption,
  Product,
} from "@/components/shared";

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
  price?: number;
}

interface ApiResponse {
  success?: boolean;
  total?: number;
  products?: Computer[];
}

const ITEMS_PER_PAGE = 9;

// Mock specifications generator
const addSpecifications = (computer: Computer): Computer => {
  const processors = ["Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "AMD Ryzen 7", "Apple M1", "Apple M2", "Apple M3"];
  const rams = ["8GB", "16GB", "32GB", "64GB"];
  const storages = ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"];
  const screenSizes = ["13.3\"", "14\"", "15.6\"", "16\"", "17\""];
  const graphics = ["Integrated", "NVIDIA GTX", "NVIDIA RTX", "AMD Radeon"];
  
  // Generate price based on brand and rating
  let basePrice = 699;
  if (computer.brand === "Apple") basePrice = 1299;
  else if (computer.brand === "Dell") basePrice = 899;
  else if (computer.brand === "HP") basePrice = 799;
  else if (computer.brand === "Lenovo") basePrice = 749;
  else if (computer.brand === "Microsoft") basePrice = 999;
  
  const price = basePrice + (computer.star * 100);
  
  return {
    ...computer,
    processor: processors[computer.id % processors.length],
    ram: rams[computer.id % rams.length],
    storage: storages[computer.id % storages.length],
    screenSize: screenSizes[computer.id % screenSizes.length],
    graphics: graphics[computer.id % graphics.length],
    price: Math.round(price),
  };
};

export function ComputerListing() {
  const [computers, setComputers] = useState<Computer[]>([]);
  const [filteredComputers, setFilteredComputers] = useState<Computer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandOpen, setBrandOpen] = useState(true);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetch("/api/laptop_api_15.json")
      .then((res) => res.json())
      .then((data: ApiResponse | Computer[]) => {
        let computersData: Computer[] = [];
        
        // Handle both array and object response formats
        if (Array.isArray(data)) {
          computersData = data;
        } else if (data.success && data.products) {
          computersData = data.products;
        }
        
        if (computersData.length > 0) {
          // Add specifications to each computer
          const computersWithSpecs = computersData.map(addSpecifications);
          setComputers(computersWithSpecs);
          setFilteredComputers(computersWithSpecs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching computers:", error);
        setLoading(false);
      });
  }, []);

  // Get unique brands
  const brands = Array.from(new Set(computers.map((computer) => computer.brand))).sort();

  // Get computer counts per brand
  const computerCounts = computers.reduce((acc, computer) => {
    acc[computer.brand] = (acc[computer.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Filter and search logic
  useEffect(() => {
    let filtered = computers;

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((computer) =>
        selectedBrands.includes(computer.brand)
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (computer) =>
          computer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          computer.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredComputers(filtered);
    setCurrentPage(1);
  }, [selectedBrands, searchQuery, computers]);

  // Sorting logic
  const sortedComputers = [...filteredComputers].sort((a, b) => {
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
  const totalPages = Math.ceil(sortedComputers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentComputers = sortedComputers.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading computers...</p>
      </div>
    );
  }

  // Prepare additional filters
  const additionalFilters: FilterOption[] = [
    {
      label: "Battery life",
      key: "battery",
      values: Array.from(new Set(computers.map((c) => c.battery).filter(Boolean))).sort(),
    },
    {
      label: "Processor",
      key: "processor",
      values: Array.from(new Set(computers.map((c) => c.processor).filter(Boolean))).sort(),
    },
    {
      label: "RAM",
      key: "ram",
      values: Array.from(new Set(computers.map((c) => c.ram).filter(Boolean))).sort(),
    },
    {
      label: "Storage",
      key: "storage",
      values: Array.from(new Set(computers.map((c) => c.storage).filter(Boolean))).sort(),
    },
    {
      label: "Screen size",
      key: "screenSize",
      values: Array.from(new Set(computers.map((c) => c.screenSize).filter(Boolean))).sort(),
    },
  ];

  // Convert computers to Product format
  const productsForGrid: Product[] = currentComputers.map((computer) => ({
    id: computer.id,
    brand: computer.brand,
    title: computer.title,
    star: computer.star,
    reviews: computer.reviews,
    image: computer.image,
    price: computer.price,
  }));

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductBreadcrumb category="Computers" />

        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters
            brands={brands}
            brandCounts={computerCounts}
            selectedBrands={selectedBrands}
            searchQuery={searchQuery}
            brandOpen={brandOpen}
            additionalFilters={additionalFilters}
            onBrandToggle={toggleBrand}
            onSearchChange={setSearchQuery}
            onBrandOpenChange={setBrandOpen}
          />

          <main className="flex-1">
            <ProductGrid
              products={productsForGrid}
              totalCount={sortedComputers.length}
              onSortChange={setSortBy}
              categoryPath="computers"
            />
            <ProductPagination
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
