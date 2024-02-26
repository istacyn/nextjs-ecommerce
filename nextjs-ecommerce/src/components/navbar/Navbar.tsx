import Image from "next/image";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/db/cart";
import ShoppingCartButton from "./ShoppingCartButton";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default function Navbar() {
  const cart = await getCart();

  return (
    <nav className="bg-base-100">
      <div className="max-w-7x1 navbar m-auto flex-col justify-between sm:flex-row">
        <section className="flex items-center">
          <Link href="/" className="btn btn-ghost text-xl">
            <Image src={logo} height={70} width={70} alt="Zuri Logo" />
          </Link>
        </section>
        <section className="flex items-center space-x-16">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
        </section>
        <section className="flex items-center space-x-4">
          <form action={searchProducts}>
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input input-bordered w-full min-w-[100px]"
              />
            </div>
          </form>
          <ShoppingCartButton cart={cart} />
        </section>
      </div>
    </nav>
  );
}
