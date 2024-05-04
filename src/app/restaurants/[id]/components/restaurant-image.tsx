"use client";

import { Button } from "@/components/ui/button";
import { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
  restaurant: Pick<Restaurant, "name" | "imageUrl">;
}

const RestaurantImage = ({ restaurant }: RestaurantImageProps) => {
  const router = useRouter();

  const handleBackClick = () => router.back();

  return (
    <div className="relative h-[250px] w-full">
      <Image
        src={restaurant.imageUrl}
        alt={restaurant.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute top-4 left-4 bg-white rounded-full text-foreground hover:text-white "
        size={"icon"}
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        className="absolute top-4 right-4 bg-opacity-70 bg-gray-700 rounded-full hover:text-white "
        size={"icon"}
      >
        <HeartIcon size={20} className=" fill-white" />
      </Button>
    </div>
  );
};

export default RestaurantImage;
