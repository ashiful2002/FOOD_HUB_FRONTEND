import { z } from "zod";

export const orderSchema = z.object({
  street: z.string().min(3, "Street is required"),
  city: z.string().min(2),
  postalCode: z.string().min(4),
  phone: z.string().min(11),
  categoryId: z.string().min(1, "Select category"),
  mealId: z.string().min(1, "Select meal"),
  quantity: z.number().min(1),
});