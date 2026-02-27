"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

 const handleAddToCart = () => {
    // Get existing cart from session storage
    const existingCart = JSON.parse(sessionStorage.getItem("cart") || "[]");

    // Enforce single provider
    if (
      existingCart.length > 0 &&
      existingCart[0].provider.id !== product.provider.id
    ) {
      toast.error("You can only order from one restaurant at a time");
      return;
    }

    // Add product to cart
    const newCart = [
      ...existingCart,
      {
        ...product,
        quantity: 1,
      },
    ];

    sessionStorage.setItem("cart", JSON.stringify(newCart));
    toast.success("Added to cart!");

    // Navigate to /cart
    router.push("/cart");
  };
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <Image
        width={190}
        height={190}
        src={product.image}
        alt={product.name}
        className="object-cover mx-auto rounded"
      />

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

        <div className="flex justify-between">
          <h3 className="text-lg font-semibold capitalize">
            {product.name}
          </h3>
          <p className="font-bold text-lg">৳{product.price}</p>
        </div>

        <p className="text-xs text-gray-500">
          {product.category?.name}
        </p>

        <p className="text-sm text-gray-600">
          {product.description}
        </p>

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

        <div className="flex items-center justify-between text-sm text-gray-600 mt-1">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span>{product.averageRating.toFixed(1)}</span>
            <span>({product.totalReviews})</span>
          </div>

          <span
            className={`font-medium ${
              product.isAvailable
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {product.isAvailable
              ? "Available"
              : "Out of Stock"}
          </span>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          size="sm"
          variant="outline"
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;