"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

interface ProviderOrderFormProps {
  order: any;
}

const ProviderOrderForm = ({ order }: ProviderOrderFormProps) => {
  const [status, setStatus] = useState<string>(order.status);
  const router = useRouter();
console.log(order);

  const handleUpdate = async () => {
    try {
      await fetch(`/api/provider/orders/${order.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      router.push("/provider/orders"); // go back to table
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Update Order Status</h2>
      <p>Order ID: {order.id}</p>
      <p>Customer: {order.customer?.name}</p>
      <p>Total Amount: ${order.totalAmount}</p>

      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="PLACED">PLACED</SelectItem>
          <SelectItem value="PREPARING">PREPARING</SelectItem>
          <SelectItem value="READY">READY</SelectItem>
          <SelectItem value="DELIVERED">DELIVERED</SelectItem>
          <SelectItem value="CANCELLED">CANCELLED</SelectItem>
        </SelectContent>
      </Select>

      <Button onClick={handleUpdate}>Update Status</Button>
    </div>
  );
};

export default ProviderOrderForm;