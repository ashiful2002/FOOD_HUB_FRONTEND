"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

type Meal = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isAvailable: boolean;
  averageRating: number;
  totalReviews: number;
  views: number;
};

type Props = {
  meals: Meal[];
};

const ProvidersMenutable = ({ meals }: Props) => {
  return (
    <div className="max-w-6xl mx-auto mt-12 px-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-6">Meals Menu</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Views</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {meals?.map((meal) => (
              <TableRow key={meal.id}>
                <TableCell>
                  <Image
                    width={60}
                    height={60}
                    src={meal.image}
                    alt={meal.name}
                    className="rounded object-cover"
                  />
                </TableCell>

                <TableCell>
                  <div className="font-medium">{meal.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {meal.description}
                  </div>
                </TableCell>

                <TableCell className="font-semibold">৳ {meal.price}</TableCell>

                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      meal.isAvailable
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {meal.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </TableCell>

                <TableCell>
                  {meal.averageRating} ⭐ ({meal.totalReviews})
                </TableCell>

                <TableCell>{meal.views}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProvidersMenutable;
