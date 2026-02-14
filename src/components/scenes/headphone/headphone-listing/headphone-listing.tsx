"use client";

import { useState, useEffect } from "react";
import { Breadcrumb } from "../breadcrumb";
import { Filters } from "../filters";
import { HeadphoneGrid } from "../headphone-grid";
import { Pagination } from "../../smartphone/pagination";

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
  price?: number;
}

interface ApiResponse {
  success?: boolean;
  total?: number;
  products?: Headphone[];
}

const ITEMS_PER_PAGE = 9;

// Mock specifications generator
const addSpecifications = (headphone: Headphone): Headphone => {
  const types = ["Over-Ear", "On-Ear", "In-Ear", "Earbuds"];
  const connectivities = ["Bluetooth", "Wired", "Wireless", "Bluetooth + Wired"];
  const noiseCancellations = ["Active", "Passive", "Hybrid", "None"];
  const driverSizes = ["40mm", "45mm", "50mm", "6mm", "10mm"];
  
  // Generate price based on brand and rating
  let basePrice = 99;
  if (headphone.brand === "Sony") basePrice = 249;
  else if (headphone.brand === "Bose") basePrice = 299;
  else if (headphone.brand === "Sennheiser") basePrice = 199;
  else if (headphone.brand === "Apple") basePrice = 549;
  
  const price = basePrice + (headphone.star * 20);
  
  return {
    ...headphone,
    type: types[headphone.id % types.length],
    connectivity: connectivities[headphone.id % connectivities.length],
    noiseCancellation: noiseCancellations[headphone.id % noiseCancellations.length],
    driverSize: driverSizes[headphone.id % driverSizes.length],
    price: Math.round(price),
  };
};

export function HeadphoneListing() {
  const [headphones, setHeadphones] = useState<Headphone[]>([]);
  const [filteredHeadphones, setFilteredHeadphones] = useState<Headphone[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandOpen, setBrandOpen] = useState(true);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetch("/api/headphone_api_30_real.json")
      .then((res) => res.json())
      .then((data: ApiResponse | Headphone[]) => {
        let headphonesData: Headphone[] = [];
        
        // Handle both array and object response formats
        if (Array.isArray(data)) {
          headphonesData = data;
        } else if (data.success && data.products) {
          headphonesData = data.products;
        }
        
        if (headphonesData.length > 0) {
          // Add specifications to each headphone
          const headphonesWithSpecs = headphonesData.map(addSpecifications);
          setHeadphones(headphonesWithSpecs);
          setFilteredHeadphones(headphonesWithSpecs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching headphones:", error);
        setLoading(false);
      });
  }, []);

  // Get unique brands
  const brands = Array.from(new Set(headphones.map((headphone) => headphone.brand))).sort();

  // Get headphone counts per brand
  const headphoneCounts = headphones.reduce((acc, headphone) => {
    acc[headphone.brand] = (acc[headphone.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Filter and search logic
  useEffect(() => {
    let filtered = headphones;

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((headphone) =>
        selectedBrands.includes(headphone.brand)
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (headphone) =>
          headphone.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          headphone.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredHeadphones(filtered);
    setCurrentPage(1);
  }, [selectedBrands, searchQuery, headphones]);

  // Sorting logic
  const sortedHeadphones = [...filteredHeadphones].sort((a, b) => {
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
  const totalPages = Math.ceil(sortedHeadphones.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentHeadphones = sortedHeadphones.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading headphones...</p>
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
            headphoneCounts={headphoneCounts}
            selectedBrands={selectedBrands}
            searchQuery={searchQuery}
            brandOpen={brandOpen}
            headphones={headphones}
            onBrandToggle={toggleBrand}
            onSearchChange={setSearchQuery}
            onBrandOpenChange={setBrandOpen}
          />

          <main className="flex-1">
            <HeadphoneGrid
              headphones={currentHeadphones}
              totalCount={sortedHeadphones.length}
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
