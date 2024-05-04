"use client"

import { Restaurant } from "@prisma/client";
import Image from "next/image";
import { formatCurrency } from "./helpers/price";
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

interface RestaurantItemProps {
  restaurant: Restaurant;
}

const RestaurantItem = ({ restaurant }: RestaurantItemProps) => {
  return (
    <div>
      <Link className="min-w-[266px] max-w-[266px] mb-6" href={`./restaurants/${restaurant.id}`}>
        <div className="w-full space-y-3">
          <div className="w-full space-y-3">
            {/* IMAGEM */}
            <div className="relative h-[136px] w-full">
              <Image
                src={restaurant.imageUrl}
                fill
                className="rounded-lg object-cover"
                alt={restaurant.name}
              />
              {/* Rating Icon */}
              <div className="absolute bg-primary bg-white gap-0.5 flex items-center rounded-full py-0.5 px-2 top-2 left-2">
                <StarIcon size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-semibold">5.0</span>
              </div>
              {/* TODO: create hover and active elements to fill heart with red */}
              <Button
                size="icon"
                className="absolute rounded-full h-6 w-6 top-2 right-2 bg-gray-800"
              >
                <HeartIcon size={14} className="fill-white" />
              </Button>
            </div>
            <div>
              <h3>{restaurant.name}</h3>
              <div className="flex gap-3 text-muted-foreground text-xs">
                <div className="flex gap-1 items-center">
                  <BikeIcon className="text-primary" size={15} />
                  <span>
                    {Number(restaurant.deliveryFee) === 0
                      ? "Entrega grátis!"
                      : formatCurrency(Number(restaurant.deliveryFee))}
                  </span>
                </div>
                <div className="flex gap-1 items-center">
                  <TimerIcon className="text-primary" size={15} />
                  <span>{Number(restaurant.deliveryTimeMinutes)} min</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RestaurantItem;
