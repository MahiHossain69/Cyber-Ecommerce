"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useWishlist } from "@/contexts/wishlist-context";
import { useCart } from "@/contexts/cart-context";
import { toast } from "sonner";

interface Product {
  id: number;
  category: string;
  name: string;
  price: number;
  bestseller: boolean;
  featured: boolean;
  image: string;
}

interface ApiResponse {
  success: boolean;
  total: number;
  products: Product[];
}

const tabs = ["New Arrival", "Bestseller", "Featured Products"];

export function NewArrival() {
  const [activeTab, setActiveTab] = useState("New Arrival");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch products from new API
    fetch("/api/products.json")
      .then((res) => res.json())
      .then((data: ApiResponse) => {
        if (data.success && data.products) {
          setAllProducts(data.products);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const toggleWishlist = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success("Removed from wishlist", {
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
        category: getCategoryLink(product.category).replace('/', ''),
      });
      toast.success("Added to wishlist!", {
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const handleBuyNow = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      category: getCategoryLink(product.category).replace('/', ''),
    });
    toast.success("Added to cart!", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  // Filter products based on active tab
  const getFilteredProducts = () => {
    if (!allProducts.length) return [];

    switch (activeTab) {
      case "New Arrival":
        // Show all products as new arrivals
        return allProducts;
      
      case "Bestseller":
        // Show products marked as bestsellers
        return allProducts.filter(product => product.bestseller);
      
      case "Featured Products":
        // Show products marked as featured
        return allProducts.filter(product => product.featured);
      
      default:
        return allProducts;
    }
  };

  // Get category link based on product category
  const getCategoryLink = (category: string) => {
    const categoryMap: Record<string, string> = {
      "Phones": "/smartphones",
      "Smart Watches": "/smartwatches",
      "Cameras": "/cameras",
      "Headphones": "/headphones",
      "Computers": "/computers",
      "Gaming": "/gaming",
    };
    return categoryMap[category] || "/smartphones";
  };

  const currentProducts = getFilteredProducts();

  if (loading) {
    return (
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading products...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="flex gap-6 sm:gap-8 mb-8 sm:mb-12 overflow-x-auto">
          {tabs.map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-3 px-0 h-auto cursor-pointer text-sm sm:text-base font-medium transition-colors relative whitespace-nowrap hover:bg-transparent",
                activeTab === tab
                  ? "text-black after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-black"
                  : "text-gray-400 hover:text-gray-600"
              )}
            >
              {tab}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#F6F6F6] rounded-lg overflow-hidden flex flex-col group hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-[#F6F6F6] p-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => toggleWishlist(e, product)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black hover:bg-gray-400 transition-all duration-500 ease-in-out cursor-pointer"
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
                    alt={product.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={(e) => {
                      // Fallback to placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = `https://placehold.co/400x400/f6f6f6/666666?text=${encodeURIComponent(product.name)}`;
                    }}
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col gap-4 bg-white">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-base font-medium text-black line-clamp-2 min-h-12 leading-snug flex-1">
                    {product.name}
                  </h3>
                  <div className="flex gap-1 shrink-0">
                    {product.bestseller && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                        Bestseller
                      </span>
                    )}
                    {product.featured && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold text-black">
                    ${product.price}
                  </p>
                  <span className="text-sm text-gray-500 capitalize">
                    {product.category}
                  </span>
                </div>
                <Link href={getCategoryLink(product.category)}>
                  <Button 
                    onClick={(e) => handleBuyNow(e, product)}
                    className="w-full cursor-pointer bg-black text-white hover:bg-gray-900 rounded-lg h-12 text-sm font-medium transition-colors"
                  >
                    Buy Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Show message if no products found */}
        {currentProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found for this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}