"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const discountProducts = [
  {
    id: 1,
    name: "Apple iPhone 14 Pro 512GB Gold (MQ233)",
    price: 1437,
    image: "/discount/Iphone 14 pro.svg",
  },
  {
    id: 2,
    name: "AirPods Max Silver Starlight Aluminium",
    price: 549,
    image: "/discount/Airpod max.svg",
  },
  {
    id: 3,
    name: "Apple Watch Series 9 GPS 41mm Starlight Aluminium",
    price: 399,
    image: "/discount/Apple watch.svg",
  },
  {
    id: 4,
    name: "Apple iPhone 14 Pro 1TB Gold (MQ2V3)",
    price: 1499,
    image: "/discount/Iphone 14 pro 1tb.svg",
  },
];

export function Discount() {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  const toggleLike = (productId: number) => {
    setLikedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-black mb-8">
          Discounts up to -50%
        </h2>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {discountProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#F6F6F6] hover:shadow-lg transition-shadow rounded-lg overflow-hidden flex flex-col"
            >
              {/* Product Image */}
              <div className="relative aspect-square bg-[#F6F6F6] p-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => toggleLike(product.id)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black hover:bg-gray-400 transition-all duration-500 ease-in-out cursor-pointer"
                  aria-label="Add to wishlist"
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-all",
                      likedProducts.includes(product.id)
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
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6 flex flex-col gap-4 bg-white">
                <h3 className="text-base font-medium text-black line-clamp-2 min-h-12 leading-snug">
                  {product.name}
                </h3>
                <p className="text-2xl font-semibold text-black">
                  ${product.price}
                </p>
                <Button className="w-full bg-black text-white hover:bg-gray-900 cursor-pointer rounded-lg h-12 text-sm font-medium transition-colors">
                  Buy Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
