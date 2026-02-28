import ProvidersMenu from "@/components/modules/provider/ProvidersMenu";
import { getAllMeal } from "@/services/meal/index";

const providersOwnOrder = async () => {
  return (
    <div>
      <ProvidersMenu />
    </div>
  );
};

export default providersOwnOrder;
