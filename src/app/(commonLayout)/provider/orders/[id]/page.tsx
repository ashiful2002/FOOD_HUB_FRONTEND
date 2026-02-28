import ProviderOrderForm from "@/components/modules/provider/orders/ProviderOrderForm";
import { getSingleOrder } from "@/services/order";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  // Fetch order on the server
  const { data } = await getSingleOrder(id);

  if (!data) return <p>Order not found</p>;

  return <ProviderOrderForm order={data} />;
};

export default Page;
