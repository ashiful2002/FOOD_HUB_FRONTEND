import ProductCard from "@/components/modules/meal/MealCard";
import { getAllMeal } from "@/services/meal/index";

const MealPage = async () => {
  const { data } = await getAllMeal();
  const meals = data.data;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {meals.map((meal: any) => (
        <ProductCard key={meal.id} product={meal} />
      ))}
    </div>
  );
};

export default MealPage;
