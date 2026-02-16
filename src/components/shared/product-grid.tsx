"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { useWishlist } from "@/contexts/wishlist-context";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

export interface Product {
  id: number;
  brand: string;
  title?: string;
  name?: string;
  star: number;
  reviews: number;
  image: string;
  price?: number;
  category?: string;
}

interface ProductGridProps {
  products: Product[];
  totalCount: number;
  onSortChange: (sortBy: string) => void;
  categoryPath?: string;
}

export function ProductGrid({ products, totalCount, onSortChange, categoryPath = "smartwatches" }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("rating");
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleSortChange = (value: string) => {
    setSortBy(value);
    onSortChange(value);
  };

  const toggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const displayName = product.title || product.name || "";
    const productTitle = `${product.brand} ${displayName}`;
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist", {
        description: `${productTitle} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        title: productTitle,
        price: product.price || 299,
        image: product.image,
        category: categoryPath,
      });
      toast.success("Added to wishlist!", {
        description: `${productTitle} has been added to your wishlist.`,
      });
    }
  };

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    const displayName = product.title || product.name || "";
    const productTitle = `${product.brand} ${displayName}`;
    
    addToCart({
      id: product.id,
      title: productTitle,
      price: product.price || 299,
      image: product.image,
      category: categoryPath,
    });
    toast.success("Added to cart!", {
      description: `${productTitle} has been added to your cart.`,
    });
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
            <SelectItem value="rating" className="cursor-pointer">By rating</SelectItem>
            <SelectItem value="price-low" className="cursor-pointer">Price: Low to High</SelectItem>
            <SelectItem value="price-high" className="cursor-pointer">Price: High to Low</SelectItem>
            <SelectItem value="name" className="cursor-pointer">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => {
          const displayName = product.title || product.name || "";
          return (
            <Link
              key={product.id}
              href={`/${categoryPath}/${product.id}`}
              className="bg-gray-100 rounded-lg overflow-hidden flex flex-col group"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-gray-100 p-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => toggleWishlist(e, product)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black cursor-pointer hover:bg-gray-400 transition-colors"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-all",
                      isInWishlist(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-300 hover:text-gray-400"
                    )}
                  />
                </Button>
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={displayName}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col gap-4 bg-white">
                <h3 className="text-base font-medium text-black line-clamp-2 min-h-12 leading-snug">
                  {displayName}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.star}</span>
                  </div>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>

                <p className="text-2xl font-semibold text-black">
                  ${product.price || 299}
                </p>
                <Button 
                  onClick={(e) => handleBuyNow(e, product)}
                  className="w-full bg-black text-white hover:bg-gray-900 cursor-pointer rounded-lg h-12 text-sm font-medium transition-colors"
                >
                  Buy Now
                </Button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
