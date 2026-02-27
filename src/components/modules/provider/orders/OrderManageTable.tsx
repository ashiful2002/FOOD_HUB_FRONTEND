"use client";

import { useState, startTransition, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface OrderManageTableProps {
  providersOrder: any[];
  updateOrderStatus: (orderId: string, status: string) => Promise<any>;
}

const ORDER_STATUS_OPTIONS = [
  "PLACED",
  "PREPARING",
  "READY",
  "DELIVERED",
  "CANCELLED",
];

const OrderManageTable = ({
  providersOrder,
  updateOrderStatus,
}: OrderManageTableProps) => {

  // ✅ Local state
  const [orders, setOrders] = useState(providersOrder);
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  // If parent updates data, sync again
  useEffect(() => {
    setOrders(providersOrder);
  }, [providersOrder]);

  const handleStatusChange = (orderId: string, status: string) => {
    setUpdatingOrderId(orderId);

    startTransition(async () => {
      try {
        const result = await updateOrderStatus(orderId, status);

        if (result?.success) {
          // ✅ Update local UI instantly
          setOrders((prev) =>
            prev.map((order) =>
              order.id === orderId ? { ...order, status } : order
            )
          );

          toast.success("Status updated successfully");
        }
      } catch (error) {
        toast.error("Failed to update status");
      } finally {
        setUpdatingOrderId(null);
      }
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id.slice(0, 8)}</TableCell>
            <TableCell>{order.customer?.name}</TableCell>
            <TableCell>${order.totalAmount}</TableCell>
            <TableCell>
              <Select
                value={order.status}
                onValueChange={(value) =>
                  handleStatusChange(order.id, value)
                }
                disabled={updatingOrderId === order.id}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  {ORDER_STATUS_OPTIONS.map((statusOption) => (
                    <SelectItem key={statusOption} value={statusOption}>
                      {statusOption}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default OrderManageTable;