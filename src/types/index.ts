export type UserTypes = {
  name: string;
  email: string;
  role: string;
};

export enum OrderStatus {
  PLACED = "PLACED",
  PREPARING = "PREPARING",
  READY = "READY",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
export type UserRole = {
  customer: "CUSTOMER";
  provider: "PROVIDER";
  admin: "ADMIN";
};
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

export interface DashboardProps {
  orders: Order[];
}
