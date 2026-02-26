"use client";

import Link from "next/link";
import { OrderModal } from "./OrderBookingModal";
import { Button } from "@/components/ui/button";

interface OrderButtonWrapperProps {
  meal: any;
  user: any;
}
const OrderButtonWrapper = ({ meal, user, categories }: any) => {
  if (!user) {
    return (
      <Link href={"/login"}>
        <Button disabled className="mt-6 w-full cursor-pointer">
          Login to Order
        </Button>
      </Link>
    );
  }

  return (
    <div className="mt-6">
      <OrderModal meal={meal} customer={user} categories={categories} />
    </div>
  );
};
export default OrderButtonWrapper;
