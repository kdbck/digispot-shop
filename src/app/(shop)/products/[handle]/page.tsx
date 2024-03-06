import Button from "@/components/Button";
import Section from "@/components/Section";
import IProduct from "@/interfaces/Product.interface";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
  params
}: { params: { handle: string } }) {
  const response = await fetch(`${process.env.API_URL}/api/products/${params.handle}`, {
    method: "GET",
    cache: "no-store"
  });
  const product = await response.json() as IProduct;
  return (
    <main className="flex min-h-screen flex-col items-center w-full">
      <Section className="flex flex-col items-start w-full">
        <div className="border border-neutral-150 p-6 rounded-3xl w-full sm:w-auto">
          <div
            className={classNames(
              "w-full h-48 sm:h-80 sm:w-80 bg-neutral-100 rounded-2xl flex items-center justify-center",
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
          </div>
          <p className="text-4xl font-semibold mt-6">
            {product.name}
          </p>
          <p className="text-xl font-light mt-1">
            {product.price.toFixed(2)}zł
          </p>
          <Button className="mt-10 w-full" disabled={!product.isAvailable || product.inventory === 0}>
            Add to cart
          </Button>
        </div>
        <p
          className="text-xs font-light mt-3 ml-1"
        >
          Available: {product.inventory}
        </p>
        <Link
          href={`/dashboard/products/${product.handle}/edit`}
          className="text-xs font-light mt-1 ml-1 underline"
        >
          Edit
        </Link>
      </Section>
    </main>
  );
}
