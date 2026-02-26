import MealDetails from "@/components/modules/meal/MealDetails";
import { getUser } from "@/services/auth";
import { getSingleMeal } from "@/services/meal/index";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await getUser();
  const { id } = await params;
  const { data } = await getSingleMeal(id);
  return (
    <div>
      <MealDetails meal={data} />
    </div>
  );
}
