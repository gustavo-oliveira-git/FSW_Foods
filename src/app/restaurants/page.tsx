"use client";
import { Restaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { searchForRestaurants } from "./actions/search";
import Header from "@/components/header";
import RestaurantItem from "@/components/restaurant-item";

const Restaurants = () => {
  const searchParams = useSearchParams();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  
  const searchFor = searchParams.get("search");

  useEffect(() => {
    const fetchRestaurants = async () => {
      if (!searchFor) return;
      const foundRestaurants = await searchForRestaurants(searchFor);
      setRestaurants(foundRestaurants);
    };
    fetchRestaurants();
  }, [searchFor]);
  if (!searchFor){
      return notFound()
  }
    return (
      <>
        <Header />
        <div className="p-6 py-6">
          <h2 className="font-semibold text-lg mb-6">
            Restaurantes Encontrados
          </h2>
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

export default Restaurants;
