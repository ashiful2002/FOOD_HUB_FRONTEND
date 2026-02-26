// "use client";

// import { useEffect, useState } from "react";
// import { getAllMeals } from "@/services/meal";

// const AllMeal = () => {
//   const [meals, setMeals] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchMeals = async () => {
//       try {
//         const data = await getAllMeals(); // returns Meal[]
//         setMeals(data);
//       } catch (err: any) {
//         setError(err.message || "Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMeals();
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading meals...</p>;
//   if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;
//   if (meals.length === 0)
//     return <p className="text-center mt-10">No meals available.</p>;

//   return (
//     <div className="container mx-auto px-4 py-6">
//       <h2 className="text-2xl font-bold mb-6 text-center">All Meals</h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {meals.map((meal) => (
//           <div
//             key={meal.id}
//             className="border rounded-lg p-4 shadow hover:shadow-lg transition"
//           >
//             {meal?.image && (
//               <img
//                 src={meal.image}
//                 alt={meal.name}
//                 className="w-full h-40 object-cover rounded-md mb-4"
//               />
//             )}
//             <h3 className="text-lg font-semibold">{meal.name}</h3>
//             {meal.description && (
//               <p className="text-sm text-gray-600">{meal.description}</p>
//             )}
//             <p className="mt-2 font-bold">${meal.price.toFixed(2)}</p>
//             <p className="text-sm text-yellow-500 mt-1">
//               ⭐ {meal.averageRating} ({meal.totalReviews} reviews)
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllMeal;