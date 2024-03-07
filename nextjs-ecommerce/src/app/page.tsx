import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { prisma } from "@/lib/db/prisma";

export default async function Home() {
  const newProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: "desc" },
  });

  return (
    <article className="flex min-h-screen flex-col items-center">
      <section
        className="hero min-h-screen"
        style={{ backgroundImage: `url("/images/hero.png")` }}
      >
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-center text-[#5C3A1D]">
          <div className="max-w-md">
            <h1 className="mb-20 text-5xl font-bold">
              Timeless Treasures,<br /> Modern Elegance
            </h1>
            <Link href="/shop" className="btn btn-primary hover:btn-primary-hover mt-10">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      <section className="hero min-h-screen bg-base-100">
        <div className="hero-content flex-col lg:flex-row">
          <Image
            src="/images/about.png"
            alt="About Image"
            width={400}
            height={800}
            className="w-full max-w-sm rounded-lg shadow-2xl"
          />
          <div className="text-[#5C3A1D]">
            <h1 className="text-5xl font-bold">Meet Zuri</h1>
            <p className="py-6">
              Welcome to Zuri, your exquisite destination for timeless elegance
              and luxurious craftsmanship in the world of gold jewelry. At Zuri,
              we curate an unparalleled collection of fine gold pieces,
              meticulously designed to celebrate the beauty and sophistication
              of every moment.
            </p>
            <Link href="/about" className="text-bold text-red-600">
              Learn More ➝
            </Link>
          </div>
        </div>
      </section>

      <section className="hero min-h-screen bg-secondary">
        <div className="hero-content flex-col lg:flex-row">
          <h2 className="mb-10 text-4xl font-bold text-[#808080]">New Collection</h2>
          <div className="grid grid-cols-1 gap-8 p-4 md:grid-cols-2 lg:grid-cols-4">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
