import OrdersTable from "@/components/modules/orders/OrdersTable";
import { getOrder } from "@/services/order";

const page = async () => {
  const { data } = await getOrder();

  return (
    <div className="max-w-6xl mx-auto mt-16 px-6">
      <h1 className="text-3xl font-bold mb-6">Order History</h1>
      <OrdersTable orders={data} />
    </div>
  );
};

export default page;