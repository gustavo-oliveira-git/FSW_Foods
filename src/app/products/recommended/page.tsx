import Header from "@/components/header";
import ProductItem from "@/components/product-item";
import { db } from "@/lib/prisma";

const ProductRecommended = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 20,
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  });
  return (
    <>
      <Header />
      <div className="p-6 py-6">
        <h2 className="font-semibold text-lg mb-6">Produtos Favoritos</h2>
        <div className="flex flex-col w-full gap-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              className="min-w-full max-w-full"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductRecommended;
