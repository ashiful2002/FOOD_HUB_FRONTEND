import { getUser } from "@/services/auth";
import { getSingleProvider } from "@/services/providers";
const ProvidersMenu = async () => {
  const user = await getUser();
  const data = await getSingleProvider(user?.id!);
  console.log(data);

  return <div>Manage meals</div>;
};

export default ProvidersMenu;
