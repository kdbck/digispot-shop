'use client'
import IProduct from "@/interfaces/Product.interface";
import ProductCard from "./ProductCard";
import Button from "./Button";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const DashboardProductCard = ({
  product
}: {
  product: IProduct;
}) => {
  const router = useRouter();
  const [isRemoveLoading, setIsRemoveLoading] = useState(false);
  const removeProduct = async () => {
    try {
      setIsRemoveLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${product.handle}`, {
        method: "DELETE",
        cache: "no-store"
      });
      if (!response.ok) {
        toast.error("Failed to remove product");
      }
      toast.success(`${product.name} removed successfully`);
      router.refresh();
    } catch (error) {
      console.error(error)
      toast.error("Failed to remove product");
    } finally {
      setIsRemoveLoading(false);
    }
  }

  return (
    <ProductCard
      key={product._id}
      product={product}
    >
      <Link
        className="w-full"
        href={`/dashboard/products/${product.handle}/edit`}
      >
        <Button
          className="w-full mt-4"
        >
          Edit
        </Button>
      </Link>
      <Button
        className="w-full mt-2"
        variant="error"
        onClick={removeProduct}
        isLoading={isRemoveLoading}
      >
        Remove
      </Button>
    </ProductCard>
  )
}

export default DashboardProductCard;
