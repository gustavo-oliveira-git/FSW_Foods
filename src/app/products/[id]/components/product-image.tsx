"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@prisma/client";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface ProductImageProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductImage = ({ product }: ProductImageProps) => {
  const router = useRouter();
  return (
    <div className="relative h-[360px] w-full">
      <Image
        src={product.imageUrl}
        alt={product.name}
        fill
        className="object-cover"
      />
      <Button
        className="absolute top-4 left-4 bg-white rounded-full text-foreground hover:text-white "
        size={"icon"}
      >
        <ChevronLeftIcon />
      </Button>
    </div>
  );
};

export default ProductImage;
