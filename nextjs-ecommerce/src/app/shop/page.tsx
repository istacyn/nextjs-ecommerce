import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";

export default async function Shop() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <main>
      <section className="my-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </section>
    </main>
  );
}
