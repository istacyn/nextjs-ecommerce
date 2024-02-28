import Image from "next/image";
import logo from "../../../public/images/logo.png";
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

export default async function Navbar() {
  const cart = await getCart();

  return (
    <div className="bg-base-100">
      <div className="navbar m-auto max-w-7xl flex-col gap-2 sm:flex-row items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="btn btn-ghost text-xl">
            <Image src={logo} height={40} width={40} alt="Zuri Logo" priority />
          </Link>
        </div>

        <div className="hidden flex-grow justify-center space-x-16 sm:flex">
          <Link href="/shop">Shop</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="flex items-center space-x-4">
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
        </div>
      </div>
    </div>
  );
}
