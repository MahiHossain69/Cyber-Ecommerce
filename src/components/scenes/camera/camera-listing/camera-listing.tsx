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
  price?: number;
}

interface ApiResponse {
  success: boolean;
  total: number;
  products: Camera[];
}

const ITEMS_PER_PAGE = 9;

// Mock specifications generator
const addSpecifications = (camera: Camera): Camera => {
  const sensorTypes = ["Full Frame", "APS-C", "Micro Four Thirds", "Medium Format"];
  const resolutions = ["20MP", "24MP", "45MP", "50MP", "61MP"];
  const videoCapabilities = ["4K 60fps", "4K 30fps", "8K 30fps", "Full HD"];
  const lensMounts = ["Canon RF", "Canon EF", "Nikon Z", "Sony E", "Fujifilm X"];
  
  // Generate price based on brand and rating
  let basePrice = 799;
  if (camera.brand === "Canon") basePrice = 1299;
  else if (camera.brand === "Nikon") basePrice = 1199;
  else if (camera.brand === "Sony") basePrice = 1399;
  else if (camera.brand === "Fujifilm") basePrice = 999;
  
  const price = basePrice + (camera.star * 100);
  
  return {
    ...camera,
    sensorType: sensorTypes[camera.id % sensorTypes.length],
    resolution: resolutions[camera.id % resolutions.length],
    videoCapability: videoCapabilities[camera.id % videoCapabilities.length],
    lensMount: lensMounts[camera.id % lensMounts.length],
    price: Math.round(price),
  };
};

export function CameraListing() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [filteredCameras, setFilteredCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [brandOpen, setBrandOpen] = useState(true);
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    fetch("/api/camera_api_45_real.json")
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.success && data.products) {
          // Add specifications to each camera
          const camerasWithSpecs = data.products.map(addSpecifications);
          setCameras(camerasWithSpecs);
          setFilteredCameras(camerasWithSpecs);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching cameras:", error);
        setLoading(false);
      });
  }, []);

  // Get unique brands
  const brands = Array.from(new Set(cameras.map((camera) => camera.brand))).sort();

  // Get camera counts per brand
  const cameraCounts = cameras.reduce((acc, camera) => {
    acc[camera.brand] = (acc[camera.brand] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Filter and search logic
  useEffect(() => {
    let filtered = cameras;

    // Filter by brand
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((camera) =>
        selectedBrands.includes(camera.brand)
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (camera) =>
          camera.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          camera.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCameras(filtered);
    setCurrentPage(1);
  }, [selectedBrands, searchQuery, cameras]);

  // Sorting logic
  const sortedCameras = [...filteredCameras].sort((a, b) => {
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
  const totalPages = Math.ceil(sortedCameras.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCameras = sortedCameras.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading cameras...</p>
      </div>
    );
  }

  // Prepare additional filters
  const additionalFilters: FilterOption[] = [
    {
      label: "Battery capacity",
      key: "battery",
      values: Array.from(new Set(cameras.map((c) => c.battery).filter(Boolean))).sort(),
    },
    {
      label: "Sensor type",
      key: "sensorType",
      values: Array.from(new Set(cameras.map((c) => c.sensorType).filter(Boolean))).sort(),
    },
    {
      label: "Resolution",
      key: "resolution",
      values: Array.from(new Set(cameras.map((c) => c.resolution).filter(Boolean))).sort(),
    },
    {
      label: "Video capability",
      key: "videoCapability",
      values: Array.from(new Set(cameras.map((c) => c.videoCapability).filter(Boolean))).sort(),
    },
    {
      label: "Lens mount",
      key: "lensMount",
      values: Array.from(new Set(cameras.map((c) => c.lensMount).filter(Boolean))).sort(),
    },
  ];

  // Convert cameras to Product format
  const productsForGrid: Product[] = currentCameras.map((camera) => ({
    id: camera.id,
    brand: camera.brand,
    title: camera.title,
    star: camera.star,
    reviews: camera.reviews,
    image: camera.image,
    price: camera.price,
  }));

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ProductBreadcrumb category="Cameras" />

        <div className="flex flex-col lg:flex-row gap-8">
          <ProductFilters
            brands={brands}
            brandCounts={cameraCounts}
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
              totalCount={sortedCameras.length}
              onSortChange={setSortBy}
              categoryPath="cameras"
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
