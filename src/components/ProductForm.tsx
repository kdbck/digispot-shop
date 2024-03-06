'use client'
import slugify from "slugify";
import Button from "./Button";
import Input from "./Input";
import { useRouter } from "next/navigation";
import IProduct from "@/interfaces/Product.interface";
import { useState } from "react";
import { toast } from "sonner";

type ICreateProduct = Omit<IProduct, '_id' | '__v'>

interface ProductFormProps {
  product?: IProduct
  type?: "create" | "edit"
}

const ProductForm = ({ product, type = "create" }: ProductFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [productData, setProductData] = useState<ICreateProduct>({
    name: product?.name ?? "",
    handle: product?.handle ?? "",
    category: product?.category ?? "",
    price: product?.price ?? 0,
    inventory: product?.inventory ?? 0,
    isAvailable: product?.isAvailable ?? true
  });
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const url = type === "edit" && product ?
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${product.handle}` : `${process.env.NEXT_PUBLIC_API_URL}/api/products`;
      const response = await fetch(url, {
        method: type === "edit" && product ? "PATCH" : "POST",
        body: JSON.stringify(productData)
      });
      if (!response.ok) {
        const errorData = await response.json()
        if (errorData.code === 11000) {
          toast.error("A product with the same handle already exists");
          return
        }
        toast.error(`An error occurred while ${type === "edit" ? "editing" : "creating"} the product`);
        return
      }
      toast.success(`Product ${type === "edit" ? "edited" : "created"} successfully`);
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      toast.error(`An error occurred while ${type === "edit" ? "editing" : "creating"} the product`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      className="flex flex-col items-start border border-neutral-150 rounded-2xl p-6 gap-3 min-w-72"
      onSubmit={handleSubmit}
    >
      <Input
        className="w-full"
        label="Name"
        value={productData.name}
        onChange={(event) => {
          const name = event.target.value;
          setProductData(prev => ({
            ...prev,
            name,
            handle: type === "create" ? slugify(name, { lower: true }) : prev.handle
          }))
        }}
        required
        minLength={3}
        maxLength={64}
      />
      <Input
        className="w-full"
        label="Handle"
        value={productData.handle}
        onChange={(event) => setProductData({ ...productData, handle: event.target.value })}
        required
        minLength={3}
        maxLength={64}
        disabled={type === "edit"}
      />
      <Input
        className="w-full"
        label="Category"
        value={productData.category}
        onChange={(event) => setProductData({ ...productData, category: event.target.value })}
        required
        minLength={3}
        maxLength={64}
      />
      <Input
        className="w-full"
        label="Price"
        type="number"
        value={productData.price}
        onChange={(event) => setProductData({ ...productData, price: Number(event.target.value) })}
        required
        min={0}
        step={0.01}
      />
      <Input
        className="w-full"
        label="Inventory"
        type="number"
        value={productData.inventory}
        onChange={(event) => setProductData({ ...productData, inventory: Number(event.target.value) })}
        required
        min={0}
        step={1}
      />
      <Input
        className="w-full"
        label="Is available?"
        type="checkbox"
        checked={productData.isAvailable}
        onChange={(event) => setProductData({ ...productData, isAvailable: event.target.checked })}
        id="is-available"
      />
      <Button type="submit" className="mt-6 w-full" isLoading={isLoading}>
        {type === "edit" ? "Edit" : "Create"}
      </Button>
    </form>
  )
}

export default ProductForm;
