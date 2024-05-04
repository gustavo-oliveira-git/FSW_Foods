"use client";

import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "./helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
  className?: string
}

const ProductItem = ({ product, className }: ProductItemProps) => {
  return (
      <Link
        className={cn("w-[150px] min-w-[150px]", className)}
        href={`/products/${product.id}`}
      >
        <div className="w-full space-y-2">
          {/* Imagem */}
          <div className="aspect-square relative w-full">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg shadow-md"
            />
            {product.discountPercentage && (
              <div className="absolute bg-primary flex items-center rounded-full py-0.5 px-2 text-white top-2 left-2">
                <ArrowDownIcon size={12} />
                <span className="font-semibold text-xs">
                  {product.discountPercentage}%
                </span>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-sm truncate">{product.name}</h2>
            <div className="flex gap-1 items-center">
              <h3 className="font-semibold">
                {formatCurrency(calculateProductTotalPrice(product))}
              </h3>
              {product.discountPercentage > 0 && (
                <span className="text-muted-foreground line-through text-xs">
                  {formatCurrency(Number(product.price))}
                </span>
              )}
            </div>
            <span className="text-xs text-muted-foreground block">
              {product.restaurant.name}
            </span>
          </div>
        </div>
      </Link>
  );
};

export default ProductItem;
