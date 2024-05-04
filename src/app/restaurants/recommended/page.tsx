import { db } from "@/lib/prisma";
import RestaurantItem from "@/components/restaurant-item";
import Header from "@/components/header";

const RecommendedRestaurant = async () => {
  const restaurants = await db.restaurant.findMany({});
  return (
    <>
      <Header />
      <div className="p-6 py-6">
        <h2 className="font-semibold text-lg mb-6">Restaurantes Favoritos</h2>
        <div className="flex flex-col w-full gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantItem
              key={restaurant.id}
              restaurant={restaurant}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecommendedRestaurant;
