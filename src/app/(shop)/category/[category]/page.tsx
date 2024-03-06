import Section from "@/components/Section";
import IProduct from "@/interfaces/Product.interface";
import CustomerProductCard from "@/components/CustomerProductCard";

export default async function Home({
  params
}: { params: { category: string } }) {
  const response = await fetch(`${process.env.API_URL}/api/products?category=${params.category}`, {
    method: "GET",
    cache: "no-store"
  });
  const products = await response.json() as IProduct[];
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <CustomerProductCard
            key={product._id}
            product={product}
          />
        ))}
      </Section>
    </main>
  );
}
