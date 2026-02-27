"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { createBooking } from "@/services/order";
import { toast } from "sonner";

// ---- TYPES ----
interface OrderModalProps {
  meal: any;
  customer: any;
  categories?: any[];
}

// ---- ZOD SCHEMA ----
const orderSchema = z.object({
  street: z.string().min(2, "Street is required"),
  city: z.string().min(2, "City is required"),
  postalCode: z.string().min(2, "Postal code is required"),
  phone: z.string().min(8, "Phone number required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  // categoryId: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

// ---- COMPONENT ----
export function OrderModal({ meal, customer }: OrderModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue, // <-- add this
    watch,
    formState: { errors },
    reset,
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      street: customer?.street || "123 Main Street",
      city: customer?.city || "Dhaka",
      postalCode: customer?.postalCode || "1207",
      phone: customer?.phone || "01712345678",
      quantity: 1,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        street: customer?.street || "123 Main Street",
        city: customer?.city || "Dhaka",
        postalCode: customer?.postalCode || "1207",
        phone: customer?.phone || "01712345678",
        quantity: 1,
      });
    }
  }, [open, customer, reset]);

  const onSubmit = async (data: OrderFormValues) => {
    setLoading(true);

    const payload = {
      street: data.street,
      city: data.city,
      postalCode: data.postalCode,
      phone: data.phone,
      customerId: customer.id,
      items: [
        {
          mealId: meal.id,
          quantity: data.quantity,
        },
      ],
    };

    // try {
    //   const res = await createBooking(payload);
    //   console.log(res);

    //   if (res.success) {
    //     toast.success(res.message, { position: "top-right" });
    //   } else {
    //     toast.info("failed");
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    setLoading(false);

    setOpen(false);
  };

  const quantity = watch("quantity");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full bg-red-500/90 hover:bg-red-500 text-yellow-200 font-bold"
          disabled={!meal.isAvailable}
        >
          {meal.isAvailable ? "Order Now" : "Not Available"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Order {meal.name}
          </DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center space-x-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>

            <div className="flex items-center space-x-2 mt-1">
              <button
                type="button"
                onClick={() => {
                  const current = watch("quantity");
                  if (current > 1) setValue("quantity", current - 1);
                }}
                className="cursor-pointer px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                -
              </button>

              <span className="px-3 py-1 border rounded">
                {watch("quantity")}
              </span>

              <button
                type="button"
                onClick={() => {
                  const current = watch("quantity");
                  setValue("quantity", current + 1);
                }}
                className="cursor-pointer px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                +
              </button>
            </div>

            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity.message}</p>
            )}
          </div>

          {/* Address Fields */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Street
            </label>
            <Input {...register("street")} />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <Input {...register("city")} />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postal Code
            </label>
            <Input {...register("postalCode")} />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <Input {...register("phone")} />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <Button
            disabled={quantity < 1 || loading}
            type="submit"
            className={`w-full cursor-pointer bg-green-600 hover:bg-green-700 text-white ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Submitting..." : "Confirm Order"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
