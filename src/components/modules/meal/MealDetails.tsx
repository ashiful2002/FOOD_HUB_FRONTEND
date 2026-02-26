import Image from "next/image";

const MealDetails = ({ meal }: any) => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden">
          <Image
            height={400}
            width={400}
            src={meal.image}
            alt={meal.name}
             className="object-cover"
          />
        </div>

        {/* Meal Info */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{meal.name}</h1>
          <p className="text-gray-600 mb-4">{meal.description}</p>

          <p className="text-2xl font-semibold text-green-600 mb-3">
            ৳ {meal.price}
          </p>

          <div className="space-y-2 text-sm text-gray-700">
            <p>Category ID: {meal.categoryId}</p>
            <p>Available: {meal.isAvailable ? "Yes" : "No"}</p>
            <p>Views: {meal.views}</p>
            <p>Average Rating: {meal.averageRating}</p>
            <p>Total Reviews: {meal.totalReviews}</p>
            <p>Dietary: {meal.dietary.join(", ")}</p>
          </div>

          {/* Provider Info */}
          <div className="mt-6 p-4 border rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Restaurant</h2>
            <p className="font-medium">{meal.provider.restaurantName}</p>
            <p className="text-sm text-gray-500">{meal.provider.location}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        {meal.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {meal.reviews.map((review: any) => (
              <div key={review.id} className="border p-4 rounded-lg shadow-sm">
                <p className="font-semibold">Rating: {review.rating} ⭐</p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
