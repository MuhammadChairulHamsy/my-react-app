import React, { useState } from "react";
import { Heart, ShoppingCart, Star, Eye, Zap } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

export const ProductCard = ({ product, handleAddToCart }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="w-full max-w-sm group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] bg-gradient-to-br from-slate-50 to-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Wishlist */}
      <button
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full p-2.5 transition-all duration-300 z-20 shadow-lg hover:shadow-xl hover:scale-110"
      >
        <Heart
          className={`h-5 w-5 transition-all duration-300 ${
            isLiked
              ? "fill-red-500 text-red-500 scale-110"
              : "text-gray-600 hover:text-red-500 hover:scale-110"
          }`}
        />
      </button>

      {/* Image */}
      <CardContent className="p-0 relative">
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[24.5rem] object-cover transition-all duration-700 group-hover:scale-110"
          />
          {/* Hover overlay */}
          <div
            className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex gap-3">
              <button className="bg-white/90 text-gray-800 p-3 rounded-full hover:bg-slate-50 transition-all duration-200 hover:scale-110 shadow-lg">
                <Eye className="h-5 w-5" />
              </button>
              <button
                className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition-all duration-200 hover:scale-110 shadow-lg"
                onClick={() => handleAddToCart(product)} // ✅ aktif
              >
                <ShoppingCart className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </CardContent>

      {/* Info */}
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-gray-800 mb-2">
          {product.name}
        </CardTitle>
        <CardDescription className="text-gray-600 text-sm mb-4">
          {product.description}
        </CardDescription>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-gray-800">
            ${product.price}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-lg text-gray-500 line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>
      </CardHeader>

      {/* Actions */}
      <CardFooter className="pt-0 flex-col gap-3">
        <div className="flex gap-2 w-full">
          <button
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 
              hover:from-blue-700 hover:to-blue-800 text-white font-semibold 
              py-3 px-4 rounded-lg transition-all duration-200 
              flex items-center justify-center gap-2 shadow-lg 
              hover:shadow-xl hover:scale-[1.02] 
              cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!product.inStock}
            onClick={() => handleAddToCart(product)} // ✅ aktif
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
          <button className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition-all duration-200 hover:bg-gray-50 hover:scale-[1.02]">
            Buy Now
          </button>
        </div>
      </CardFooter>
    </Card>
  );
};
