"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  provider: {
    restaurantName: string;
    logo: string;
  };
}

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();
  // Load cart
  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  // Sync to sessionStorage
  const updateCart = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    sessionStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQty = (id: string) => {
    const updated = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updated);
  };

  const decreaseQty = (id: string) => {
    const updated = cart
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updated);
  };

  const removeItem = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    updateCart(updated);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-6xl mx-auto mt-16 px-6">
      <h1 className="text-3xl font-bold mb-8  ">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">No items in cart.</p>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex flex-col sm:flex-row  gap-6 bg-white p-6 rounded-xl shadow"
            >
              {/* Meal Image */}
              <Image
                height={400}
                width={400}
                src={item.image}
                alt={item.name}
                className="rounded object-cover"
              />

              {/* Info */}
              <div className="flex-1 ">
                <h2 className="text-lg font-semibold">{item.name}</h2>

                <p className="text-sm text-gray-600">{item.description}</p>

                {/* Provider */}
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={item.provider.logo}
                    className="w-5 h-5 rounded-full"
                  />
                  <span className="text-xs text-gray-700">
                    {item.provider.restaurantName}
                  </span>
                </div>
              </div>

              <div className="">
                {/* Price */}
                <div>
                  <p className="font-bold text-lg">
                    ৳ {item.price * item.quantity}
                  </p>
                  <Button
                    size={"icon-lg"}
                    variant="ghost"
                    className="text-red-500 mt-3 "
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => decreaseQty(item.id)}
                  >
                    -
                  </Button>

                  <span className="font-medium">{item.quantity}</span>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => increaseQty(item.id)}
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex justify-end">
                <Button size="lg" onClick={() => router.push("/checkout")}>
                  Checkout
                </Button>
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="flex justify-between items-center mt-10 border-t pt-6">
            <h2 className="text-xl font-semibold">Total:</h2>
            <h2 className="text-2xl font-bold">৳ {total}</h2>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
