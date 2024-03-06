import IProduct from "@/interfaces/Product.interface";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

interface ProductCardProps {
  product: IProduct;
  children?: ReactNode;
  className?: string;
}

const ProductCard = ({ product, className, children }: ProductCardProps) => {
  return (
    <div
      className={classNames(
        "flex flex-col items-start rounded-3xl border border-neutral-150 p-4",
        className
      )}
    >
      <Link
        href={`/product/${product.handle}`}
        className={classNames(
          "h-40 bg-neutral-100 rounded-2xl w-full flex items-center justify-center",
          "hover:opacity-75 active:opacity-50 duration-150"
        )}
      >
        <Image
          src="/logo.svg"
          alt="Digispot Shop"
          width={200}
          height={50}
          style={{
            opacity: '10%',
            filter: "brightness(0)"
          }}
          className="h-8"
        />
      </Link>
      <Link
        className="text-neutral-800 text-lg mt-2"
        href={`/product/${product.handle}`}
      >
        {product.name}
      </Link>
      <p className="text-neutral-800 font-light">{product.price.toFixed(2)}zł</p>
      {children}
    </div>
  )
}

export default ProductCard;
