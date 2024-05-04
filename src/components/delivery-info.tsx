import { Restaurant } from "@prisma/client";
import { Card } from "./ui/card";
import { BikeIcon, TimerIcon } from "lucide-react";
import { formatCurrency } from "./helpers/price";

interface DeliveryInfoProps {
  restaurant: Pick<Restaurant, "deliveryFee" | "deliveryTimeMinutes">;
}

const DeliveryInfo = ({ restaurant }: DeliveryInfoProps) => {
  return (
    <>
      <Card className="flex justify-around mt-6 py-3">
        {/* Info */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Entrega</span>
            <BikeIcon size={14} />
          </div>
          {Number(restaurant.deliveryFee) > 0 ? (
            <p className="text-xs font-semibold">
              {formatCurrency(Number(restaurant.deliveryFee))}
            </p>
          ) : (
            <p className="text-xs font-semibold">Grátis</p>
          )}
        </div>
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span>Tempo</span>
            <TimerIcon size={14} />
          </div>
          <p className="text-xs font-semibold">
            {restaurant.deliveryTimeMinutes} min
          </p>
        </div>
      </Card>
    </>
  );
};

export default DeliveryInfo;
