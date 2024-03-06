'use client';
import { toast } from "sonner";
import Button from "./Button";
import IProduct from "@/interfaces/Product.interface";

const AddToCartButton = ({ product }: { product: IProduct }) => (
  <Button
    className="mt-10 w-full"
    disabled={!product.isAvailable || product.inventory === 0}
    onClick={() => toast.success("Added to cart")}
  >
    Add to cart
  </Button>
)

export default AddToCartButton;
