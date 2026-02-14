"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface Headphone {
  id: number;
  brand: string;
  title: string;
  battery: string;
  star: number;
  reviews: number;
  image: string;
  price?: number;
}

interface HeadphoneGridProps {
  headphones: Headphone[];
  totalCount: number;
  onSortChange: (sortBy: string) => void;
}

export function HeadphoneGrid({ headphones, totalCount, onSortChange }: HeadphoneGridProps) {
  const [sortBy, setSortBy] = useState("rating");
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange(value);
  };

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-gray-600">
          Selected Products:{" "}
          <span className="font-semibold text-black">{totalCount}</span>
        </p>
        <Select value={sortBy} onValueChange={handleSortChange}>
          <SelectTrigger className="w-45 focus:ring-0 focus:ring-offset-0 cursor-pointer">
            <SelectValue placeholder="By rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rating"  className="cursor-pointer">By rating</SelectItem>
            <SelectItem value="price-low"  className="cursor-pointer">Price: Low to High</SelectItem>
            <SelectItem value="price-high"  className="cursor-pointer">Price: High to Low</SelectItem>
            <SelectItem value="name"  className="cursor-pointer">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {headphones.map((headphone) => (
          <div
            key={headphone.id}
            className="bg-gray-100 rounded-lg overflow-hidden flex flex-col"
          >
            {/* Product Image */}
            <div className="relative aspect-square bg-gray-100 p-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleLike(headphone.id)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black hover:bg-gray-400 transition-colors"
                aria-label="Add to wishlist"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-all",
                    likedProducts.includes(headphone.id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-300 hover:text-gray-400"
                  )}
                />
              </Button>
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={headphone.image}
                  alt={headphone.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6 flex flex-col gap-4 bg-white">
              <h3 className="text-base font-medium text-black line-clamp-2 min-h-12 leading-snug">
                {headphone.title}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{headphone.star}</span>
                </div>
                <span className="text-sm text-gray-500">({headphone.reviews} reviews)</span>
              </div>

              <p className="text-2xl font-semibold text-black">
                ${headphone.price || 199}
              </p>
              <Button className="w-full cursor-pointer bg-black text-white hover:bg-gray-900 rounded-lg h-12 text-sm font-medium transition-colors">
                Buy Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
