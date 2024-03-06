'use client'
import IProduct from "@/interfaces/Product.interface";
import ProductCard from "./ProductCard";
import Button from "./Button";
import { toast } from "sonner";

const CustomerProductCard = ({ product }: { product: IProduct }) => {
  return (
    <ProductCard
      key={product._id}
      product={product}
    >
      <Button
        className="w-full mt-4"
        onClick={() => {
          toast(`${product.name} added to cart`)
        }}
      >
        Add to cart
      </Button>
    </ProductCard>
  )
}

export default CustomerProductCard;
