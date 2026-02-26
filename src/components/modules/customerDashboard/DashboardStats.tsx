"use client";

import { getOrder } from "@/services/order";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Order {
  id: string;
  customerId: string;
  providerId: string;
  status: string;
  orderedAt: string;
  deliveredAt: string | null;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  totalAmount: number;
  items: any[];
}

const statusColor = (status: string) => {
  switch (status) {
    case "PLACED":
      return "yellow";
    case "PREPARING":
      return "orange";
    case "READY":
      return "blue";
    case "DELIVERED":
      return "green";
    case "CANCELLED":
      return "red";
    default:
      return "gray";
  }
};

const DashboardStats = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await getOrder();
      setOrders(data || []);
    };
    fetchOrders();
  }, []);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Ordered At</TableHead>
            <TableHead>Delivered At</TableHead>
            <TableHead>Address</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id.slice(0, 8)}</TableCell>
              <TableCell>
                <Badge
                  className={`bg-${statusColor(order.status)}-100 text-${statusColor(
                    order.status
                  )}-800`}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>{order.items.length}</TableCell>
              <TableCell>৳{order.totalAmount}</TableCell>
              <TableCell>{formatDate(order.orderedAt)}</TableCell>
              <TableCell>
                {order.deliveredAt ? formatDate(order.deliveredAt) : "-"}
              </TableCell>
              <TableCell>
                {order.street}, {order.city}, {order.postalCode}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DashboardStats;