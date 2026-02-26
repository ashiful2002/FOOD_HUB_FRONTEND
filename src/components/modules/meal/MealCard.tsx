"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: any; // ideally define proper type
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <Image
        width={190}
        height={190}
        src={product.image}
        alt={product.name}
        className="object-cover mx-auto rounded"
      />

      {/* Content */}
      <CardContent className="space-y-2">
        {/* Provider */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src={product.provider.logo}
            alt={product.provider.restaurantName}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-gray-700 font-medium">
            {product.provider.restaurantName}
          </span>
        </div>

        {/* Product Name & Category */}
        <h3 className="text-lg font-semibold capitalize">{product.name}</h3>
        <p className="text-xs text-gray-500">{product.category?.name}</p>

        {/* Description */}
        <p className="text-sm text-gray-600">{product.description}</p>

        {/* Dietary Tags */}
        <div className="flex gap-1">
          {product.dietary.map((tag: string) => (
            <span
              key={tag}
              className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Rating & Availability */}
        <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{product.averageRating.toFixed(1)}</span>
            <span>({product.totalReviews})</span>
          </div>

          <span
            className={`font-medium ${
              product.isAvailable ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.isAvailable ? "Available" : "Out of Stock"}
          </span>
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="flex flex-col gap-2">
        <p className="font-bold text-lg">৳{product.price}</p>
        <Link href={`/meal/${product.id}`}>
          <Button className="w-full">View Product</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
