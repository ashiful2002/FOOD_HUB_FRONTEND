"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getCategories } from "@/services/category";
import { createMeal } from "@/services/meal/index";

const mealSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(5),
  price: z.number().min(1),
  image: z.string().url(),
  isAvailable: z.boolean(),
  categoryId: z.string().min(1, "Category is required"),
  dietary: z.array(z.enum(["VEG", "NON_VEG", "VEGAN"])),
});

type MealFormData = z.infer<typeof mealSchema>;

type Category = {
  id: string;
  name: string;
};

const DIETARY_OPTIONS: MealFormData["dietary"][number][] = [
  "VEG",
  "NON_VEG",
  "VEGAN",
];

const MenuForm = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  console.log(categories);

  // ✅ Load categories correctly
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoryLoading(true);
        const response = await getCategories();

        // adjust depending on API shape
        setCategories(response.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load categories");
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<MealFormData>({
    resolver: zodResolver(mealSchema),
    defaultValues: {
      isAvailable: true,
      dietary: [],
    },
  });

  const onSubmit = async (data: MealFormData) => {
    try {
      setLoading(true);
      const res = await createMeal(data);

      if (res.success) {
        reset();
        toast.success(res.message, { position: "top-right" });
      } else {
        toast.error("Failed to create meal");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Meal</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Image */}
        <div>
          <Label>Image URL</Label>
          <Input {...register("image")} />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Name */}
        <div>
          <Label>Meal Name</Label>
          <Input {...register("name")} />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <Label>Description</Label>
          <Textarea {...register("description")} />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* Price */}
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            {...register("price", { valueAsNumber: true })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* Category (Dynamic) */}
        <div>
          <Label>Category</Label>

          <Controller
            name="categoryId"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {categoryLoading ? (
                    <div className="p-2 text-sm">Loading...</div>
                  ) : categories?.length === 0 ? (
                    <div className="p-2 text-sm">No categories found</div>
                  ) : (
                    categories?.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            )}
          />

          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId.message}</p>
          )}
        </div>

        {/* Dietary */}
        <div>
          <Label>Dietary</Label>
          <Controller
            name="dietary"
            control={control}
            render={({ field }) => (
              <div className="flex gap-6 mt-2">
                {DIETARY_OPTIONS.map((option) => {
                  const checked = field.value?.includes(option);

                  return (
                    <div key={option} className="flex items-center gap-2">
                      <Checkbox
                        checked={checked}
                        onCheckedChange={(isChecked) => {
                          if (isChecked) {
                            field.onChange([...(field.value ?? []), option]);
                          } else {
                            field.onChange(
                              field.value?.filter(
                                (value) => value !== option
                              ) ?? []
                            );
                          }
                        }}
                      />
                      <Label>{option}</Label>
                    </div>
                  );
                })}
              </div>
            )}
          />
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <Controller
            name="isAvailable"
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            )}
          />
          <Label>Available</Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full h-11 text-lg"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Adding...
            </span>
          ) : (
            "Add Meal"
          )}
        </Button>
      </form>
    </div>
  );
};

export default MenuForm;
