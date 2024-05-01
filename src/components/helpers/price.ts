import { Product } from "@prisma/client";
//Calculate price with the discount percentage
export const calculateProductTotalPrice = (product: Product) => {
  if (product.discountPercentage === 0) {
    //convert string price into number price
    return Number(product.price);
  }
  const discount = Number(product.price) * (product.discountPercentage / 100);

  return Number(product.price) - discount;
};

//Format price into currency status
export const formatCurrency = (value: number): string =>{
    return `R$${Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        minimumFractionDigits: 2,
    }).format(value)}`
}
