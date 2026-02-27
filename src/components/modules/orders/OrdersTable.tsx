"use client";

import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface OrderItem {
  id: string;
  orderedAt: string;
  status: string;
  totalAmount: number;
  street: string;
  city: string;
  phone: string;
  items: { mealId: string; quantity: number }[];
}

interface OrdersTableProps {
  orders: OrderItem[];
}

const OrdersTable = ({ orders }: OrdersTableProps) => {
  const router = useRouter();

  const handleDetails = (orderId: string) => {
    router.push(`/orders/${orderId}`);
  };

  return (
    <div className="overflow-x-auto shadow rounded-xl border border-gray-200">
      <Table className="min-w-[700px]">
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Delivery Address</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} className="hover:bg-gray-50 transition-colors">
              <TableCell className="font-mono text-sm">{order.id.slice(0, 8)}...</TableCell>
              <TableCell>{new Date(order.orderedAt).toLocaleString()}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.status === "PLACED"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "DELIVERED"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {order.status}
                </span>
              </TableCell>
              <TableCell>৳ {order.totalAmount}</TableCell>
              <TableCell>
                {order.street}, {order.city} <br /> {order.phone}
              </TableCell>
              <TableCell>
                <Button size="sm" onClick={() => handleDetails(order.id)}>
                  Details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;