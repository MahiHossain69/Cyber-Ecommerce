"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Truck, Package, Award, Monitor, Cpu, Battery, Camera, Star, Send, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useWishlist } from "@/contexts/wishlist-context";
import { toast } from "sonner";

interface GenericProduct {
  id: number;
  brand?: string;
  title?: string;
  name?: string;
  model?: string;
  price?: number;
  star?: number;
  rating?: number;
  reviews?: number;
  description?: string;
  image: string;
  battery?: string;
  battery_mah?: number;
  reviewComments?: string[];
  [key: string]: any;
}

interface GenericProductDetailsProps {
  productId: string;
  category: string;
  apiPath: string;
}

const getCategoryDisplayName = (category: string) => {
  const names: Record<string, string> = {
    cameras: "Cameras",
    headphones: "Headphones",
    gaming: "Gaming",
    computers: "Computers",
  };
  return names[category] || category;
};

const generatePrice = (product: GenericProduct) => {
  if (product.price) return product.price;
  
  const basePrices: Record<string, number> = {
    cameras: 1200,
    headphones: 299,
    gaming: 499,
    computers: 999,
  };
  
  return basePrices[product.brand?.toLowerCase() || ""] || 399;
};

export function GenericProductDetails({ productId, category, apiPath }: GenericProductDetailsProps) {
  const [product, setProduct] = useState<GenericProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<GenericProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedStorage, setSelectedStorage] = useState("256GB");
  const [selectedColor, setSelectedColor] = useState(0);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentRating, setCommentRating] = useState(0);
  const [commentImages, setCommentImages] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState(0);

  const { addToWishlist, isInWishlist } = useWishlist();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleWishlistToggle = () => {
    if (product) {
      const productName = product.title || product.name || product.model || "Product";
      if (isInWishlist(product.id)) {
        toast.info("Already in wishlist");
      } else {
        addToWishlist({
          id: product.id,
          title: product.brand ? `${product.brand} ${productName}` : productName,
          price: product.price || 0,
          image: product.image,
          category,
        });
        toast.success("Added to wishlist!", {
          description: `${product.brand ? `${product.brand} ` : ""}${productName} has been added to your wishlist.`,
        });
      }
    }
  };

  useEffect(() => {
    fetch(apiPath)
      .then((res) => res.json())
      .then((data) => {
        let productsData: GenericProduct[] = [];
        
        // Handle different API response formats
        if (Array.isArray(data)) {
          productsData = data;
        } else if (data.success && data.products) {
          productsData = data.products;
        }
        
        if (productsData.length > 0) {
          const foundProduct = productsData.find(
            (p: GenericProduct) => p.id === parseInt(productId)
          );
          
          if (foundProduct) {
            const normalizedProduct = {
              ...foundProduct,
              title: foundProduct.title || foundProduct.name || foundProduct.model,
              battery: foundProduct.battery || (foundProduct.battery_mah ? `${foundProduct.battery_mah}mAh` : undefined),
              price: generatePrice(foundProduct),
              star: foundProduct.star || foundProduct.rating || 4.5,
              reviews: foundProduct.reviews || 150,
            };
            setProduct(normalizedProduct);
            
            const related = productsData
              .filter((p: GenericProduct) => 
                p.brand === foundProduct.brand && p.id !== foundProduct.id
              )
              .slice(0, 4)
              .map((p: GenericProduct) => ({
                ...p,
                title: p.title || p.name || p.model,
                battery: p.battery || (p.battery_mah ? `${p.battery_mah}mAh` : undefined),
                price: generatePrice(p),
                star: p.star || p.rating || 4.5,
                reviews: p.reviews || 150,
              }));
            setRelatedProducts(related);
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
        setLoading(false);
      });
  }, [productId, apiPath]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Link href={`/${category}`}>
            <Button>Back to {getCategoryDisplayName(category)}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const productName = product.title || product.name || product.model || "Product";
  const images = [
    product.image, // Front view
    product.image, // Side view
    product.image, // Back view
  ];
  const storageOptions = ["128GB", "256GB", "512GB", "1TB"];
  const colors = ["#000000", "#800080", "#FF0000", "#FFD700", "#E5E5E5"];

  // Mock reviews data
  const reviews = [
    {
      id: 1,
      name: "Grace Carey",
      date: "24 January, 2023",
      rating: 4,
      comment: "I was a bit nervous to be buying a secondhand product from Amazon, but I couldn't be happier with my purchase!! Everything arrived in excellent condition and works perfectly. Highly recommend!🖤",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      name: "Ronald Richards",
      date: "24 January, 2023",
      rating: 5,
      comment: "This product is durable and high quality. Great value for the price. Would definitely buy again!",
      avatar: "https://i.pravatar.cc/150?img=12"
    },
    {
      id: 3,
      name: "Darcy King",
      date: "24 January, 2023",
      rating: 4,
      comment: "Love this product! Came in great condition and works as expected. Very satisfied with my purchase.",
      avatar: "https://i.pravatar.cc/150?img=5"
    }
  ];

  const ratingBreakdown = [
    { label: "Excellent", count: 100, percentage: 65 },
    { label: "Good", count: 11, percentage: 7 },
    { label: "Average", count: 3, percentage: 2 },
    { label: "Below Average", count: 8, percentage: 5 },
    { label: "Poor", count: 1, percentage: 1 }
  ];

  const totalReviews = ratingBreakdown.reduce((sum, item) => sum + item.count, 0);
  const averageRating = product.star || 4.8;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setCommentImages([...commentImages, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setCommentImages(commentImages.filter((_, i) => i !== index));
  };

  const handleSubmitComment = () => {
    if (commentText.trim() || commentImages.length > 0) {
      console.log({
        text: commentText,
        rating: commentRating,
        images: commentImages
      });
      
      setCommentText("");
      setCommentRating(0);
      setCommentImages([]);
      
      alert("Comment posted successfully!");
    }
  };

  return (
    <section className="bg-white py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8 text-gray-500">
          <Link href="/" className="hover:text-black">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${category}`} className="hover:text-black">
            {getCategoryDisplayName(category)}
          </Link>
          <span>/</span>
          <span className="text-black">{product.brand || productName}</span>
          <span>/</span>
          <span className="text-black">{productName}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="flex gap-4">
            {/* Thumbnails */}
            <div className="flex flex-col gap-4">
              {images.slice(0, 3).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 transition-all shrink-0",
                    selectedImage === idx
                      ? "border-black"
                      : "border-transparent hover:border-gray-300"
                  )}
                >
                  <Image
                    src={img}
                    alt={`${productName} view ${idx + 1}`}
                    fill
                    className={cn(
                      "object-contain p-2 transition-transform",
                      idx === 1 && "rotate-[-15deg] scale-90",
                      idx === 2 && "scale-75 opacity-80"
                    )}
                  />
                </button>
              ))}
            </div>

            {/* Main Image with Zoom */}
            <div className="flex-1 relative aspect-square bg-gray-100 rounded-2xl overflow-hidden group cursor-zoom-in">
              <div className="relative w-full h-full transition-transform duration-300 group-hover:scale-150">
                <Image
                  src={images[selectedImage]}
                  alt={productName}
                  fill
                  className={cn(
                    "object-contain p-12 transition-transform",
                    selectedImage === 1 && "rotate-[-15deg] scale-90",
                    selectedImage === 2 && "scale-75"
                  )}
                  priority
                />
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-black mb-4">
                {product.brand && `${product.brand} `}{productName}
              </h1>
              
              <div className="flex items-baseline gap-3 mb-6">
                <p className="text-3xl font-bold text-black">${product.price}</p>
                <p className="text-xl text-gray-400 line-through">${(product.price || 0) + 100}</p>
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <p className="text-sm text-gray-600 mb-3">Select color :</p>
              <div className="flex gap-3">
                {colors.map((color, idx) => (
                  <Button
                    key={idx}
                    onClick={() => setSelectedColor(idx)}
                    className={cn(
                      "w-10 h-10 rounded-full cursor-pointer border-2 transition-all",
                      selectedColor === idx ? "border-blue-800" : "border-gray-300 hover:border-gray-400"
                    )}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Storage Selection */}
            <div>
              <div className="grid grid-cols-4 gap-3">
                {storageOptions.map((storage) => (
                  <Button
                    key={storage}
                    onClick={() => setSelectedStorage(storage)}
                    className={cn(
                      "py-3 px-4 rounded-lg cursor-pointer border-2 text-sm font-medium transition-all",
                      selectedStorage === storage
                        ? "border-black cursor-pointer bg-black text-white"
                        : "border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:text-white"
                    )}
                  >
                    {storage}
                  </Button>
                ))}
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-3 gap-4">
              {product.battery && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Battery className="w-5 h-5 text-gray-600" />
                    <p className="text-xs text-gray-500">Battery</p>
                  </div>
                  <p className="text-sm font-semibold">{product.battery}</p>
                </div>
              )}
              {Object.entries(product)
                .filter(([key, value]) => 
                  !['id', 'image', 'title', 'name', 'model', 'price', 'star', 'rating', 'reviews', 'description', 'brand', 'battery', 'battery_mah', 'reviewComments'].includes(key) &&
                  value && typeof value === 'string'
                )
                .slice(0, 5)
                .map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Monitor className="w-5 h-5 text-gray-600" />
                      <p className="text-xs text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </div>
                    <p className="text-sm font-semibold">{value as string}</p>
                  </div>
                ))}
            </div>

            {/* Description */}
            <div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {product.description || `Experience premium quality with the ${productName}. Designed for excellence and built to last.`}{" "}
                <button className="text-black font-medium underline">more...</button>
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                variant="outline"
                onClick={handleWishlistToggle}
                className="flex-1 h-14 text-base font-medium rounded-lg border-2 border-gray-300 cursor-pointer hover:border-black"
              >
                <Heart
                  className={cn(
                    "w-5 h-5 mr-2 transition-all",
                    isInWishlist(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                  )}
                />
                Add to Wishlist
              </Button>
              <Button className="flex-1 cursor-pointer bg-black text-white hover:bg-gray-900 h-14 text-base font-medium rounded-lg">
                Add to Card
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Truck className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-xs font-medium text-gray-600">Free Delivery</p>
                <p className="text-xs text-gray-500">1-2 day</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Package className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-xs font-medium text-gray-600">In Stock</p>
                <p className="text-xs text-gray-500">Today</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                  <Award className="w-6 h-6 text-gray-700" />
                </div>
                <p className="text-xs font-medium text-gray-600">Guaranteed</p>
                <p className="text-xs text-gray-500">1 year</p>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Reviews</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Overall Rating */}
            <div className="bg-gray-50 p-8 rounded-2xl">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{averageRating.toFixed(1)}</div>
                <p className="text-sm text-gray-500 mb-3">of {totalReviews} reviews</p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "w-5 h-5",
                        i < Math.floor(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                      )}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="lg:col-span-2">
              <div className="space-y-3">
                {ratingBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 w-28">{item.label}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-400 rounded-full transition-all"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-8 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Leave Comment */}
          <div className="mb-8">
            <div className="border border-gray-300 rounded-lg p-4 focus-within:border-black transition-colors">
              {/* Rating Stars */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm text-gray-600">Your rating:</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setCommentRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="h-4 w-4 p-0 hover:bg-transparent"
                    >
                      <Star
                        className={cn(
                          "w-5 h-5 transition-colors",
                          star <= (hoverRating || commentRating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        )}
                      />
                    </Button>
                  ))}
                </div>
              </div>

              {/* Text Input */}
              <Textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Leave Comment"
                rows={3}
                className="w-full border-none focus-visible:ring-0  resize-none focus:outline-none text-sm"
              />

              {/* Image Preview */}
              {commentImages.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {commentImages.map((img, idx) => (
                    <div key={idx} className="relative w-20 h-20 rounded-lg overflow-hidden group">
                      <Image
                        src={img}
                        alt={`Upload ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                      <Button
                        onClick={() => removeImage(idx)}
                        className="absolute cursor-pointer top-1 right-1 bg-black/50 hover:bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-3 h-3 text-white" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
                <Button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 text-sm  text-white cursor-pointer transition-colors"
                >
                  <ImagePlus className="w-5 h-5" />
                  <span>Add Image</span>
                </Button>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {(commentText.trim() || commentImages.length > 0) && (
                  <Button
                    onClick={handleSubmitComment}
                    className="bg-black cursor-pointer text-white hover:bg-gray-900 rounded-lg px-6 py-2 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Post
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-6">
            {(showAllReviews ? reviews : reviews.slice(0, 3)).map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6">
                <div className="flex items-start gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-200 shrink-0">
                    <Image
                      src={review.avatar}
                      alt={review.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{review.name}</h4>
                      <span className="text-sm text-gray-400">{review.date}</span>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={cn(
                            "w-4 h-4",
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300 fill-gray-300"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          {reviews.length > 3 && (
            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => setShowAllReviews(!showAllReviews)}
                className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:border-black transition-colors"
              >
                {showAllReviews ? "View Less" : "View More"}
                <svg
                  className={cn(
                    "w-4 h-4 ml-2 transition-transform",
                    showAllReviews && "rotate-180"
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Button>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const relatedName = relatedProduct.title || relatedProduct.name || relatedProduct.model || "Product";
                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/${category}/${relatedProduct.id}`}
                    className="group"
                  >
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <div className="relative aspect-square bg-gray-100 p-6">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedName}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="font-medium text-sm line-clamp-2 mb-2">
                          {relatedName}
                        </h3>
                        <p className="text-lg font-bold">${relatedProduct.price}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
