import CategoryList from "@/components/category-list";
import Header from "@/components/header";
import ProductList from "@/components/product-list";
import PromoBanner from "@/components/promo-banner";
import RestaurantList from "@/components/restaurant-list";
import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

const Home = async () => {
  const products = await db.product.findMany({
    where: {
      discountPercentage: {
        gt: 0,
      },
    },
    take: 10,
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
      <div className="px-5 pt-6">
        <Search />
      </div>
      <div className="px-5 pt-6">
        <CategoryList />
      </div>
      <div className="pt-6">
        <PromoBanner
          src={"/promo-banner-1.png"}
          alt="Até 30% de desconto em pizzas!"
        />
      </div>
      <div className="py-6 px-5 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Pedidos Recomendados</h2>
          <Link href={`./products/recommended`}>
            <Button
              className="text-primary p-0 hover:bg-transparent"
              variant={"ghost"}
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <ProductList products={products} />
      </div>
      <div className="pt-6">
        <PromoBanner
          src={"/promo-banner-2.png"}
          alt="A partir de R$17,90 em lanches"
        />
      </div>
      <div className="pt-6 px-5 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold">Restaurantes Recomendados</h2>
          <Link href={"./restaurants/recommended"}>
            <Button
              className="text-primary p-0 hover:bg-transparent"
              variant={"ghost"}
            >
              Ver todos
              <ChevronRightIcon size={16} />
            </Button>
          </Link>
        </div>
        <RestaurantList />
      </div>
    </>
  );
};

export default Home;
