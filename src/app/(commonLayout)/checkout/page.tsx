"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createOrder } from "@/services/order";

const addressSchema = z.object({
  street: z.string().min(5, "Street required"),
  city: z.string().min(2, "City required"),
  postalCode: z.string().min(4, "Postal code required"),
  phone: z.string().min(11, "Valid phone required"),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const CheckoutPage = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(sessionStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      phone: "",
      street: "",
      city: "",
      postalCode: "",
    },
  });

const onSubmit = async (data: AddressFormValues) => {
  if (cart.length === 0) {
    return toast.error("Cart is empty");
  }

  const payload = {
    street: data.street,
    city: data.city,
    postalCode: data.postalCode,
    phone: data.phone,
    items: cart.map((item) => ({
      mealId: item.id,
      quantity: item.quantity,
    })),
  };

  console.log("ORDER PAYLOAD:", payload);

  try {
    setLoading(true); // disable button

    const res = await createOrder(payload);

    // Assuming your backend sends { success: true } when order is placed
    if (res?.success) {
      // Clear cart
      sessionStorage.removeItem("cart");

      // Show toast
      toast.success("Order placed successfully!");

      // Navigate to orders page
      setTimeout(() => {
        router.push("/orders");
      }, 100); // small delay for toast to appear
    } else {
      toast.error(res?.message || "Failed to place order");
    }
  } catch (err) {
    console.log(err);
    toast.error("Something went wrong!");
  } finally {
    setLoading(false); // re-enable button
  }
};

  return (
    <div className="max-w-4xl mx-auto mt-16 px-6">
      <h1 className="text-3xl font-bold mb-8">Delivery Address</h1>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Address Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="01XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="House 12, Road 5" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="Dhaka" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="postalCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="1207" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              type="submit"
              size="lg"
              className="w-full cursor-pointer"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </Button>
          </form>
        </Form>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-3 text-sm">
              <span>
                {item.name} x {item.quantity}
              </span>
              <span>৳ {item.price * item.quantity}</span>
            </div>
          ))}

          <div className="border-t mt-4 pt-4 font-bold flex justify-between">
            <span>Total</span>
            <span>
              ৳{" "}
              {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
