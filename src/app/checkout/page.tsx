"use client";

import { useState } from "react";
import { useCart } from "@/contexts/cart-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { MapPin, Package, CreditCard, Edit2, X, Plus, ChevronDown, Nfc } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

interface Address {
  id: number;
  name: string;
  type: "HOME" | "OFFICE";
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
  const [selectedShipping, setSelectedShipping] = useState("free");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"credit" | "paypal" | "paypal-credit">("credit");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<number | null>(null);
  
  // Form fields for new/edit address
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState<"HOME" | "OFFICE">("HOME");
  const [formStreet, setFormStreet] = useState("");
  const [formCity, setFormCity] = useState("");
  const [formState, setFormState] = useState("");
  const [formZip, setFormZip] = useState("");
  const [formPhone, setFormPhone] = useState("");

  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: "2118 Thornridge",
      type: "HOME",
      street: "2118 Thornridge Cir. Syracuse, Connecticut 35624",
      city: "Connecticut",
      state: "Connecticut",
      zip: "35624",
      phone: "(209) 555-0104",
    },
    {
      id: 2,
      name: "Headoffice",
      type: "OFFICE",
      street: "2715 Ash Dr. San Jose, South Dakota 83475",
      city: "South Dakota",
      state: "South Dakota",
      zip: "83475",
      phone: "(704) 555-0127",
    },
  ]);

  const estimatedTax = Math.round(cartTotal * 0.021);
  const estimatedShipping = 29;
  const total = cartTotal + estimatedTax + estimatedShipping;

  const selectedAddressData = addresses.find((addr) => addr.id === selectedAddress);

  const handleNext = () => {
    if (currentStep === 1 && !selectedAddress) {
      toast.error("Please select an address");
      return;
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.push("/cart");
    }
  };

  const handlePay = () => {
    // Route to appropriate payment handler based on selected method
    if (paymentMethod === "paypal") {
      handlePayPalPayment();
    } else if (paymentMethod === "paypal-credit") {
      handlePayPalCreditPayment();
    } else {
      // Credit card payment
      if (!cardholderName || !cardNumber || !expDate || !cvv) {
        toast.error("Please fill in all payment details");
        return;
      }
      
      toast.success("Order placed successfully!", {
        description: "Thank you for your purchase. You will receive a confirmation email shortly.",
      });
      
      clearCart();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }
  };

  const handlePayPalPayment = () => {
    toast.success("Redirecting to PayPal...", {
      description: "You will be redirected to PayPal to complete your payment.",
    });
    
    // Simulate PayPal redirect
    setTimeout(() => {
      toast.success("Order placed successfully!", {
        description: "Thank you for your purchase via PayPal.",
      });
      clearCart();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }, 1500);
  };

  const handlePayPalCreditPayment = () => {
    toast.success("Redirecting to PayPal Credit...", {
      description: "You will be redirected to apply for PayPal Credit.",
    });
    
    // Simulate PayPal Credit redirect
    setTimeout(() => {
      toast.success("Order placed successfully!", {
        description: "Thank you for your purchase via PayPal Credit.",
      });
      clearCart();
      setTimeout(() => {
        router.push("/");
      }, 2000);
    }, 1500);
  };

  const handleDeleteAddress = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setAddresses(addresses.filter((addr) => addr.id !== id));
    if (selectedAddress === id) {
      setSelectedAddress(null);
    }
    toast.success("Address deleted successfully");
  };

  const handleEditAddress = (e: React.MouseEvent, address: Address) => {
    e.stopPropagation();
    setEditingAddress(address.id);
    setFormName(address.name);
    setFormType(address.type);
    setFormStreet(address.street);
    setFormCity(address.city);
    setFormState(address.state);
    setFormZip(address.zip);
    setFormPhone(address.phone);
    setShowAddressForm(true);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setFormName("");
    setFormType("HOME");
    setFormStreet("");
    setFormCity("");
    setFormState("");
    setFormZip("");
    setFormPhone("");
    setShowAddressForm(true);
  };

  const handleSaveAddress = () => {
    if (!formName || !formStreet || !formCity || !formState || !formZip || !formPhone) {
      toast.error("Please fill in all fields");
      return;
    }

    if (editingAddress) {
      // Update existing address
      setAddresses(
        addresses.map((addr) =>
          addr.id === editingAddress
            ? {
                ...addr,
                name: formName,
                type: formType,
                street: formStreet,
                city: formCity,
                state: formState,
                zip: formZip,
                phone: formPhone,
              }
            : addr
        )
      );
      toast.success("Address updated successfully");
    } else {
      // Add new address
      const newAddress: Address = {
        id: Math.max(...addresses.map((a) => a.id), 0) + 1,
        name: formName,
        type: formType,
        street: formStreet,
        city: formCity,
        state: formState,
        zip: formZip,
        phone: formPhone,
      };
      setAddresses([...addresses, newAddress]);
      toast.success("Address added successfully");
    }

    setShowAddressForm(false);
    setEditingAddress(null);
  };

  const handleCancelAddressForm = () => {
    setShowAddressForm(false);
    setEditingAddress(null);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => router.push("/")} className="bg-black text-white hover:bg-gray-900">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Steps Header */}
        <div className="flex items-center justify-center mb-12">
          <div className="flex items-center gap-8">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  currentStep >= 1 ? "bg-black text-white" : "bg-gray-200 text-gray-500"
                )}
              >
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Step 1</p>
                <p className={cn("text-sm font-medium", currentStep >= 1 ? "text-black" : "text-gray-400")}>
                  Address
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  currentStep >= 2 ? "bg-black text-white" : "bg-gray-200 text-white"
                )}
              >
                <Package className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Step 2</p>
                <p className={cn("text-sm font-medium", currentStep >= 2 ? "text-black" : "text-gray-400")}>
                  Shipping
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center",
                  currentStep >= 3 ? "bg-black text-white" : "bg-gray-200 text-white"
                )}
              >
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Step 3</p>
                <p className={cn("text-sm font-medium", currentStep >= 3 ? "text-black" : "text-gray-400")}>
                  Payment
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Step Content */}
          <div>
            {/* Step 1: Address */}
            {currentStep === 1 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-black">Select Address</h2>
                
                {!showAddressForm ? (
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className={cn(
                          "bg-gray-50 rounded-lg p-6 cursor-pointer transition-all",
                          selectedAddress === address.id ? "ring-2 ring-black" : "hover:bg-gray-100"
                        )}
                        onClick={() => setSelectedAddress(address.id)}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "w-5 h-5 rounded-full border-2 flex items-center justify-center mt-1",
                              selectedAddress === address.id
                                ? "border-black bg-black"
                                : "border-gray-300"
                            )}
                          >
                            {selectedAddress === address.id && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-black">{address.name}</h3>
                              <span className="px-2 py-0.5 bg-black text-white text-xs rounded">
                                {address.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{address.street}</p>
                            <p className="text-sm text-gray-600">{address.phone}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleEditAddress(e, address)}
                              className="w-8 h-8 p-0 group hover:bg-black rounded transition-colors"
                            >
                              <Edit2 className="w-4 h-4 text-gray-600 group-hover:text-white " />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={(e) => handleDeleteAddress(e, address.id)}
                              className="w-8 h-8 p-0 group hover:bg-black  rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-gray-600 group-hover:text-white" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Add New Address Button */}
                    <Button 
                      variant="outline"
                      onClick={handleAddNewAddress}
                      className="w-full bg-transparent hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg h-16 hover:border-gray-400 transition-colors flex items-center justify-center gap-2 text-gray-600"
                    >
                      <Plus className="w-5 h-5" />
                      <span>Add New Address</span>
                    </Button>
                  </div>
                ) : (
                  /* Address Form */
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4 text-black">
                      {editingAddress ? "Edit Address" : "Add New Address"}
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Address Name</label>
                        <Input
                          placeholder="e.g., Home, Office"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="h-12"
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Type</label>
                        <div className="flex gap-4">
                          <button
                            onClick={() => setFormType("HOME")}
                            className={cn(
                              "flex-1 h-12 rounded-lg border-2 font-medium transition-all",
                              formType === "HOME"
                                ? "border-black bg-black text-white"
                                : "border-gray-300 text-gray-600 hover:border-gray-400"
                            )}
                          >
                            HOME
                          </button>
                          <button
                            onClick={() => setFormType("OFFICE")}
                            className={cn(
                              "flex-1 h-12 rounded-lg border-2 font-medium transition-all",
                              formType === "OFFICE"
                                ? "border-black bg-black text-white"
                                : "border-gray-300 text-gray-600 hover:border-gray-400"
                            )}
                          >
                            OFFICE
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Street Address</label>
                        <Input
                          placeholder="Street address"
                          value={formStreet}
                          onChange={(e) => setFormStreet(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm text-gray-600 mb-1 block">City</label>
                          <Input
                            placeholder="City"
                            value={formCity}
                            onChange={(e) => setFormCity(e.target.value)}
                            className="h-12"
                          />
                        </div>
                        <div>
                          <label className="text-sm text-gray-600 mb-1 block">State</label>
                          <Input
                            placeholder="State"
                            value={formState}
                            onChange={(e) => setFormState(e.target.value)}
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">ZIP Code</label>
                        <Input
                          placeholder="ZIP Code"
                          value={formZip}
                          onChange={(e) => setFormZip(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Phone Number</label>
                        <Input
                          placeholder="Phone number"
                          value={formPhone}
                          onChange={(e) => setFormPhone(e.target.value)}
                          className="h-12"
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <Button
                          variant="outline"
                          onClick={handleCancelAddressForm}
                          className="flex-1 h-12 border-2 border-gray-300 hover:border-black"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={handleSaveAddress}
                          className="flex-1 h-12 bg-black text-white hover:bg-gray-900"
                        >
                          {editingAddress ? "Update" : "Save"}
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Shipping */}
            {currentStep === 2 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-black">Shipment Method</h2>
                <div className="space-y-4">
                  {/* Free Shipping */}
                  <div
                    className={cn(
                      "bg-white border-2 rounded-lg p-6 cursor-pointer transition-all",
                      selectedShipping === "free" ? "border-black" : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setSelectedShipping("free")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedShipping === "free" ? "border-black bg-black" : "border-gray-300"
                          )}
                        >
                          {selectedShipping === "free" && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                          <p className="font-semibold text-black">Free</p>
                          <p className="text-sm text-gray-500">Regular shipment</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">17 Oct, 2023</p>
                    </div>
                  </div>

                  {/* Express Shipping */}
                  <div
                    className={cn(
                      "bg-white border-2 rounded-lg p-6 cursor-pointer transition-all",
                      selectedShipping === "express" ? "border-black" : "border-gray-200 hover:border-gray-300"
                    )}
                    onClick={() => setSelectedShipping("express")}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedShipping === "express" ? "border-black bg-black" : "border-gray-300"
                          )}
                        >
                          {selectedShipping === "express" && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                          <p className="font-semibold text-black">$8.50</p>
                          <p className="text-sm text-gray-500">Get your delivery as soon as possible</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">1 Oct, 2023</p>
                    </div>
                  </div>

                  {/* Schedule Shipping */}
                  <div
                    className={cn(
                      "bg-white border-2 rounded-lg p-6 transition-all",
                      selectedShipping === "schedule" ? "border-black" : "border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div 
                        className="flex items-center gap-4 flex-1 cursor-pointer"
                        onClick={() => setSelectedShipping("schedule")}
                      >
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                            selectedShipping === "schedule" ? "border-black bg-black" : "border-gray-300"
                          )}
                        >
                          {selectedShipping === "schedule" && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                          <p className="font-semibold text-black">Schedule</p>
                          <p className="text-sm text-gray-500">Pick a date when you want to get your delivery</p>
                        </div>
                      </div>
                      <Select value={selectedDate} onValueChange={setSelectedDate}>
                        <SelectTrigger className="w-45 h-10 border-gray-300">
                          <SelectValue placeholder="Select Date" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2023-10-17">17 Oct, 2023</SelectItem>
                          <SelectItem value="2023-10-18">18 Oct, 2023</SelectItem>
                          <SelectItem value="2023-10-19">19 Oct, 2023</SelectItem>
                          <SelectItem value="2023-10-20">20 Oct, 2023</SelectItem>
                          <SelectItem value="2023-10-21">21 Oct, 2023</SelectItem>
                          <SelectItem value="2023-10-22">22 Oct, 2023</SelectItem>
                          <SelectItem value="2023-10-23">23 Oct, 2023</SelectItem>
                          <SelectItem value="2023-10-24">24 Oct, 2023</SelectItem>
                          <SelectItem value="2023-10-25">25 Oct, 2023</SelectItem>
                          <SelectItem value="2023-10-26">26 Oct, 2023</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div>
                <h2 className="text-2xl font-semibold mb-6 text-black">Payment</h2>

                {/* Payment Method Tabs */}
                <div className="flex gap-4 mb-6 border-b border-gray-200">
                  <Button 
                    onClick={() => setPaymentMethod("credit")}
                    className={cn(
                      "pb-3 px-4 bg-transparent rounded-none hover:bg-transparent border-b-2 font-medium transition-colors",
                      paymentMethod === "credit" 
                        ? "border-black text-black" 
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    )}
                  >
                    Credit Card
                  </Button>
                  <Button 
                    onClick={() => setPaymentMethod("paypal")}
                    className={cn(
                      "pb-3 px-4 bg-transparent rounded-none hover:bg-transparent border-b-2 font-medium transition-colors",
                      paymentMethod === "paypal" 
                        ? "border-black text-black" 
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    )}
                  >
                    PayPal
                  </Button>
                  <Button 
                    onClick={() => setPaymentMethod("paypal-credit")}
                    className={cn(
                      "pb-3 px-4 bg-transparent rounded-none hover:bg-transparent border-b-2 font-medium transition-colors",
                      paymentMethod === "paypal-credit" 
                        ? "border-black text-black" 
                        : "border-transparent text-gray-400 hover:text-gray-600"
                    )}
                  >
                    PayPal Credit
                  </Button>
                </div>

                {/* Credit Card Payment */}
                {paymentMethod === "credit" && (
                  <>
                    {/* Credit Card Display */}
                    <div className="bg-linear-to-br from-gray-900 to-gray-800 rounded-2xl p-6 mb-6 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-gray-700/30 to-transparent rounded-full -mr-32 -mt-32" />
                      <div className="absolute bottom-0 left-0 w-48 h-48 bg-linear-to-tr from-gray-700/30 to-transparent rounded-full -ml-24 -mb-24" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-8">
                          <Image src="/cart/sim.png" alt="Sim Icon" width={30} height={30}/>
                          <div className="text-2xl"><Nfc /></div>
                        </div>
                        <div className="text-2xl font-mono tracking-wider mb-6">
                          {cardNumber || "4085 9536 8475 9530"}
                        </div>
                        <div className="flex justify-between items-end">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Cardholder</p>
                            <p className="font-medium">{cardholderName || "Cardholder"}</p>
                          </div>
                          <div className="flex gap-1">
                            <div className="w-8 h-8 bg-red-500 rounded-full opacity-80" />
                            <div className="w-8 h-8 bg-yellow-500 rounded-full opacity-80 -ml-3" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Form */}
                    <div className="space-y-4">
                      <Input
                        placeholder="Cardholder Name"
                        value={cardholderName}
                        onChange={(e) => setCardholderName(e.target.value)}
                        className="h-12"
                      />
                      <Input
                        placeholder="Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="h-12"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Exp.Date"
                          value={expDate}
                          onChange={(e) => setExpDate(e.target.value)}
                          className="h-12"
                        />
                        <Input
                          placeholder="CVV"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="h-12"
                          maxLength={3}
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={sameAsBilling}
                          onCheckedChange={(checked) => setSameAsBilling(checked as boolean)}
                        />
                        <Label className="text-sm text-gray-600">Same as billing address</Label>
                      </div>
                    </div>
                  </>
                )}

                {/* PayPal Payment */}
                {paymentMethod === "paypal" && (
                  <div className="space-y-6">
                    {/* PayPal Info Card */}
                    <div className="bg-linear-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
                      <div className="flex items-center justify-between mb-6">
                        <div className="text-3xl font-bold">PayPal</div>
                        <div className="text-sm bg-white/20 px-3 py-1 rounded-full">Secure Payment</div>
                      </div>
                      <p className="text-blue-100 text-sm mb-6">
                        You will be redirected to PayPal to complete your purchase securely.
                      </p>
                      <div className="flex items-center gap-2 text-sm text-blue-100">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Protected by PayPal Buyer Protection</span>
                      </div>
                    </div>

                    {/* PayPal Benefits */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-black mb-4">Why use PayPal?</h3>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-black">Secure checkout</p>
                            <p className="text-xs text-gray-500">Your financial information is never shared</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-black">Fast payment</p>
                            <p className="text-xs text-gray-500">Complete your purchase in just a few clicks</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-black">Buyer protection</p>
                            <p className="text-xs text-gray-500">Get refunded if something goes wrong</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* PayPal Button */}
                    <Button 
                      onClick={handlePayPalPayment}
                      className="w-full h-14 bg-[#0070BA] hover:bg-[#005EA6] text-white font-semibold text-base rounded-lg"
                    >
                      Continue with PayPal
                    </Button>
                  </div>
                )}

                {/* PayPal Credit Payment */}
                {paymentMethod === "paypal-credit" && (
                  <div className="space-y-6">
                    {/* PayPal Credit Info Card */}
                    <div className="bg-linear-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full -mr-24 -mt-24" />
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32" />
                      
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <div className="text-2xl font-bold mb-1">PayPal Credit</div>
                            <div className="text-sm text-gray-400">Buy now, pay later</div>
                          </div>
                          <div className="text-4xl">💳</div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-4 mb-4">
                          <p className="text-sm text-gray-300 mb-2">Special Offer</p>
                          <p className="text-xl font-semibold">0% APR for 6 months</p>
                          <p className="text-xs text-gray-400 mt-1">On purchases of $99 or more</p>
                        </div>
                      </div>
                    </div>

                    {/* PayPal Credit Features */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <h3 className="font-semibold text-black mb-4">PayPal Credit Benefits</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-linear-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-white text-sm font-bold">0%</span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-black">No interest if paid in full</p>
                            <p className="text-xs text-gray-500">Pay within 6 months on purchases of $99+</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-linear-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-black">Flexible payments</p>
                            <p className="text-xs text-gray-500">Choose how and when you pay</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-linear-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shrink-0">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-black">Secure & protected</p>
                            <p className="text-xs text-gray-500">Same security as regular PayPal</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Important Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-xs text-blue-800">
                        <span className="font-semibold">Important:</span> You'll be redirected to PayPal to apply for PayPal Credit. Subject to credit approval. See terms and conditions.
                      </p>
                    </div>

                    {/* PayPal Credit Button */}
                    <Button 
                      onClick={handlePayPalCreditPayment}
                      className="w-full h-14 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base rounded-lg"
                    >
                      Apply & Continue with PayPal Credit
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side - Summary */}
          <div>
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-6 text-black">Summary</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={`${item.category}-${item.id}`} className="flex items-center gap-4 bg-white rounded-lg p-4">
                    <div className="relative w-16 h-16 bg-gray-100 rounded-lg shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-contain p-2" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-black line-clamp-1">{item.title}</h3>
                    </div>
                    <p className="text-base font-semibold text-black">${item.price}</p>
                  </div>
                ))}
              </div>

              {/* Address */}
              {selectedAddressData && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="text-sm text-black">{selectedAddressData.street}</p>
                </div>
              )}

              {/* Shipment Method */}
              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Shipment method</p>
                <p className="text-sm text-black">
                  {selectedShipping === "free" 
                    ? "Free" 
                    : selectedShipping === "express" 
                    ? "$8.50" 
                    : selectedDate 
                    ? `Schedule - ${selectedDate}` 
                    : "Schedule"}
                </p>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
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
              <div className="space-y-3 mb-6 pt-6 border-t border-gray-200">
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
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-end gap-4 mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            className="px-12 h-12 border-2 border-gray-300 hover:border-black text-black font-medium"
          >
            Back
          </Button>
          {currentStep < 3 ? (
            <Button onClick={handleNext} className="px-12 h-12 bg-black text-white hover:bg-gray-900 font-medium">
              Next
            </Button>
          ) : (
            <Button onClick={handlePay} className="px-12 h-12 bg-black text-white hover:bg-gray-900 font-medium">
              Pay
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
