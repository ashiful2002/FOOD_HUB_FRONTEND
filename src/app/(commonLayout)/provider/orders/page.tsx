import OrderManageTable from "@/components/modules/provider/orders/OrderManageTable";
import { getOrder, updateOrderStatusAction } from "@/services/order";

const Page = async () => {
  try {
    const { data: orderData } = await getOrder();

    return (
      <div>
        <h2 className="text-2xl text-center mt-3 mb-3F">Manage Providers order</h2>
        <OrderManageTable
          providersOrder={orderData ?? []}
          updateOrderStatus={updateOrderStatusAction}
        />
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <OrderManageTable
        providersOrder={[]}
        updateOrderStatus={updateOrderStatusAction}
      />
    );
  }
};

export default Page;
