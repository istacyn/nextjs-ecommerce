import Image from "next/image";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import { redirect } from "next/navigation";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default function Navbar() {
  return (
    <nav className="bg-base-100">
      <div className="navbar justify-between max-w-7x1 m-auto flex-col sm:flex-row">
        <section className="flex items-center">
          <Link href="/" className="btn btn-ghost text-xl">
            <Image src={logo} height={70} width={70} alt="Zuri Logo" />
          </Link>
        </section>
        <section className="flex items-center space-x-16"> 
          <Link href="/shop">
            Shop
          </Link>
          <Link href="/about">
            About
          </Link>
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
        </section>
      </div>
    </nav>
  )
}
