"use client";

import DeliveryInfo from "@/components/delivery-info";
import DiscountBadge from "@/components/discount-badge";
import {
  calculateProductTotalPrice,
  formatCurrency,
} from "@/components/helpers/price";
import ProductList from "@/components/product-list";
import { Button } from "@/components/ui/button";
import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ChevronRightIcon, Equal } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>;
  extraProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    };
  }>[];
}

const ProductDetails = ({ product, extraProducts }: ProductDetailsProps) => {
  {
    /*Function to increase and decease quantity*/
  }
  const [quantity, setQuantity] = useState(1);
  const handleIncreaseQuantity = () =>
    setQuantity((currentState) => currentState + 1);
  const handleDecreaseQuantity = () =>
    setQuantity((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    });

  return (
    <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
      <div className="p-5">
        <div className="flex items-center gap-1">
          {/*Restaurant Image */}
          <div className="relative h-6 w-6">
            <Image
              src={product.restaurant.imageUrl}
              alt={product.restaurant.name}
              fill
              className="rounded-full object-cover"
            />
          </div>
          {/* Restaurant name */}
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>
        {/* Product text */}
        <h1 className="font-bold text-xl mb-3 mt-1">{product.name}</h1>
        {/* Price and quantity*/}
        <div className="flex justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h2>
              {product.discountPercentage > 0 && (
                <DiscountBadge product={product} />
              )}
            </div>
            {/* original price */}
            <p className="text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          </div>
          {/* Quantity */}
          <div className="flex items-center justify-between gap-4">
            <Button
              size={"icon"}
              variant={"ghost"}
              className="border border-solid border-muted-foreground"
              onClick={handleDecreaseQuantity}
            >
              <ChevronLeftIcon />
            </Button>
            <span className="w-4">{quantity}</span>
            <Button size={"icon"} onClick={handleIncreaseQuantity}>
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        {/* Delivery data */}
        <div className="">
          {/* Delivery Info */}
          <DeliveryInfo restaurant={product.restaurant} />
        </div>
        {/* Product description */}
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sobre</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold">Sucos</h3>
          <p className="text-sm">
            <ProductList products={extraProducts} />
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
