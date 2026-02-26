import HeroCarousel from "@/components/modules/home/hero";
import ProductCard from "@/components/modules/meal/MealCard";
import { Button } from "@/components/ui/button";
import { getAllMeal } from "@/services/meal/index";
import Link from "next/link";

const page = async () => {
  const { data } = await getAllMeal();
  const meals = data.data;
  return (
    <>
      <HeroCarousel />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {meals?.slice(0, 6).map((meal: any) => (
          <ProductCard key={meal.id} product={meal} />
        ))}
      </div>
      <div className="flex items-center justify-center">
        <Link href="/meal">
          <Button variant={"outline"} className="cursor-pointer">
            All Meals
          </Button>
        </Link>
      </div>
    </>
  );
};

export default page;
