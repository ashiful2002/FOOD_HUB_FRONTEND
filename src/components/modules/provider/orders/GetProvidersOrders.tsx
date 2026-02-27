// app/provider/orders/GetProvidersOrders.tsx
import { getOrder, updateOrderStatusAction } from "@/services/order";
import OrderManageTable from "./OrderManageTable";

const GetProvidersOrders = async () => {
  const { data: orderData } = await getOrder();

  return (
    <div>
      <OrderManageTable
        providersOrder={orderData}
        updateOrderStatus={updateOrderStatusAction} // pass server action
      />
    </div>
  );
};

export default GetProvidersOrders;