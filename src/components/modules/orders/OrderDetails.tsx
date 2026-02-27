"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface OrderItem {
  mealId: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetailsProps {
  order: {
    id: string;
    orderedAt: string;
    status: string;
    totalAmount: number;
    street: string;
    city: string;
    postalCode: string;
    phone: string;
    deliveredAt?: string | null;
    items: OrderItem[];
  };
}

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto mt-16 px-6 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Order Details</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-xl shadow space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="font-mono">{order.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Ordered At</p>
            <p>{new Date(order.orderedAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <Badge variant={"outline"}>{order.status}</Badge>
          </div>
        </div>

        {order.deliveredAt && (
          <p className="text-sm text-gray-500">
            Delivered At: {new Date(order.deliveredAt).toLocaleString()}
          </p>
        )}
      </div>

      {/* Delivery Address */}
      <div className="bg-white p-6 rounded-xl shadow space-y-2">
        <h2 className="text-xl font-semibold mb-2">Delivery Address</h2>
        <p>
          {order.street}, {order.city}, {order.postalCode}
        </p>
        <p>Phone: {order.phone}</p>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto shadow rounded-xl border border-gray-200">
        <Table className="min-w-[700px]">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>Meal Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {order.items.map((item) => (
              <TableRow
                key={item.mealId}
                className="hover:bg-gray-50 transition-colors"
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>৳ {item.price}</TableCell>
                <TableCell>৳ {item.price * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Total */}
      <div className="flex justify-end font-bold text-lg">
        <span>Total: ৳ {order.totalAmount}</span>
      </div>
    </div>
  );
};

export default OrderDetails;
