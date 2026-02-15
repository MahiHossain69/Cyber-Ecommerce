"use client";

import { useWishlist } from "@/contexts/wishlist-context";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { X, ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemove = (id: number, title: string) => {
    removeFromWishlist(id);
    toast.success("Removed from wishlist", {
      description: `${title} has been removed from your wishlist.`,
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
              <Heart className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Wishlist is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding products to your wishlist to save them for later!
            </p>
            <Link href="/">
              <Button className="bg-black text-white hover:bg-gray-900 px-8 h-12">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
          <p className="text-gray-600">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div 
              key={`${item.category}-${item.id}`} 
              className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item.id, item.title)}
                className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 hover:shadow-xl transition-all duration-200 opacity-0 group-hover:opacity-100"
                aria-label="Remove from wishlist"
              >
                <X className="h-4 w-4 text-gray-600 hover:text-red-500 transition-colors" />
              </button>

              <Link href={`/${item.category}/${item.id}`}>
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50 p-6">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Product Info */}
                <div className="p-4 space-y-3">
                  <h3 className="font-medium text-sm line-clamp-2 mb-2 min-h-10 text-gray-900 group-hover:text-black transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-2xl font-bold text-black">${item.price}</p>
                  
                  {/* Add to Cart Button */}
                  <Button 
                    className="w-full bg-black text-white hover:bg-gray-900 flex items-center justify-center gap-2 h-11 rounded-lg transition-all duration-200"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success("Added to cart!", {
                        description: `${item.title} has been added to your cart.`,
                      });
                    }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-gray-600">Total items in wishlist</p>
              <p className="text-2xl font-bold">{wishlist.length}</p>
            </div>
            <Link href="/">
              <Button variant="outline" className="border-2 border-gray-300 hover:border-black px-8 h-12">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
