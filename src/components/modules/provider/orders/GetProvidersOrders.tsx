export const dynamic = "force-dynamic";

import { getOrder, updateOrderStatusAction } from "@/services/order";
import OrderManageTable from "./OrderManageTable";

const GetProvidersOrders = async () => {
  try {
    const { data: orderData } = await getOrder();

    return (
      <div>
        <OrderManageTable
          providersOrder={orderData ?? []}   // ✅ SAFE FALLBACK
          updateOrderStatus={updateOrderStatusAction}
        />
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <OrderManageTable
        providersOrder={[]}                 // ✅ ALSO SAFE ON ERROR
        updateOrderStatus={updateOrderStatusAction}
      />
    );
  }
};

export default GetProvidersOrders;