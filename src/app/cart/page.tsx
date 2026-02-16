"use client";

import { useCart } from "@/contexts/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Minus, Plus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [bonusCard, setBonusCard] = useState("");

  const handleRemove = (id: number, title: string) => {
    removeFromCart(id);
    toast.success("Removed from cart", {
      description: `${title} has been removed from your cart.`,
    });
  };

  const handleQuantityChange = (id: number, currentQuantity: number, change: number) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity > 0) {
      updateQuantity(id, newQuantity);
    }
  };

  const estimatedTax = Math.round(cartTotal * 0.021);
  const estimatedShipping = cartTotal > 0 ? 29 : 0;
  const total = cartTotal + estimatedTax + estimatedShipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gray-100 mb-6">
              <ShoppingCart className="h-12 w-12 text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding products to your cart to see them here!
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
    <div className="min-h-screen bg-[#FAFAFA] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-8 text-black">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items - Left Side */}
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={`${item.category}-${item.id}`}
                className="bg-white rounded-lg p-6 flex gap-6 items-center"
              >
                {/* Product Image */}
                <div className="relative w-24 h-24 bg-gray-50 rounded-lg shrink-0 p-2">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-base text-black mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    #{item.id.toString().padStart(13, "2513952691398")}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4 shrink-0">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center font-medium text-black">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-black transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Price */}
                <p className="text-xl font-semibold text-black shrink-0 w-20 text-right">
                  ${item.price}
                </p>

                {/* Remove Button */}
                <button
                  onClick={() => handleRemove(item.id, item.title)}
                  className="text-gray-400 hover:text-black transition-colors shrink-0"
                  aria-label="Remove item"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary - Right Side */}
          <div>
            <div className="bg-white rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6 text-black">Order Summary</h2>

              {/* Discount Code */}
              <div className="mb-4">
                <label className="text-sm text-gray-500 mb-2 block">
                  Discount code / Promo code
                </label>
                <Input
                  type="text"
                  placeholder="Code"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                  className="w-full h-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                />
              </div>

              {/* Bonus Card */}
              <div className="mb-6">
                <label className="text-sm text-gray-500 mb-2 block">
                  Your bonus card number
                </label>
                <div className="flex gap-3">
                  <Input
                    type="text"
                    placeholder="Enter Card Number"
                    value={bonusCard}
                    onChange={(e) => setBonusCard(e.target.value)}
                    className="flex-1 h-12 bg-white border-gray-200 text-gray-900 placeholder:text-gray-400"
                  />
                  <Button
                    variant="outline"
                    className="h-12 px-6 border-gray-300 hover:border-black hover:bg-white text-black font-medium"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-medium text-black">${cartTotal}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-500">Estimated Tax</span>
                  <span className="font-medium text-black">${estimatedTax}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-500">Estimated shipping & Handling</span>
                  <span className="font-medium text-black">${estimatedShipping}</span>
                </div>
              </div>

              {/* Total */}
              <div className="flex justify-between text-lg font-semibold mb-6 pt-4 border-t border-gray-200">
                <span className="text-black">Total</span>
                <span className="text-black">${total}</span>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full bg-black text-white hover:bg-gray-900 h-14 text-base font-medium rounded-lg"
                onClick={() => {
                  router.push("/checkout");
                }}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
