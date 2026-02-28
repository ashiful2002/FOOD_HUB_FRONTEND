import { getUser } from "@/services/auth";
import { getAllProviders, getSingleProvider } from "@/services/providers";
const ProvidersMenu = async () => {
  try {
    const { user } = await getUser();
    const { data } = await getAllProviders();
    console.log(data, user);
  } catch (error) {}
  return (
    <div>
      <h2 className="text-2xl text-center mt-3 mb-3F">Manage Providers menu</h2>
    </div>
  );
};

export default ProvidersMenu;
