import OrderDetails from "@/components/modules/orders/OrderDetails";
import { getSingleOrder } from "@/services/order";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data: orderData } = await getSingleOrder(id);
  console.log(orderData);

  return (
    <div>
      <OrderDetails order={orderData} />
    </div>
  );
}
