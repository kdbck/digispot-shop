import Section from "@/components/Section";
import IProduct from "@/interfaces/Product.interface";
import DashboardProductCard from "@/components/DashboardProductCard";

export default async function Home() {
  const response = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    cache: "no-store"
  });
  const products = await response.json() as IProduct[];
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <DashboardProductCard
            key={product._id}
            product={product}
          />
        ))}
      </Section>
    </main>
  );
}
