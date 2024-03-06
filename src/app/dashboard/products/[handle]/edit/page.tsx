import ProductForm from "@/components/ProductForm";

export default async function Home({
  params
}: { params: { handle: string } }) {
  const response = await fetch(`${process.env.API_URL}/api/products/${params.handle}`, {
    method: "GET",
    cache: "no-store"
  });
  const product = await response.json();
  if (!product) {
    return (
      <main className="flex min-h-screen flex-col items-center">
        <h1>Product not found</h1>
      </main>
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center">
      <ProductForm
        product={product}
        type="edit"
      />
    </main>
  );
}
