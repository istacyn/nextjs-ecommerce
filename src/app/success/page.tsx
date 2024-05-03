import Link from "next/link";

export default function SuccessPage() {
  return (
    <section className="flex items-center justify-center py-20">
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-y-5">
        <h2 className="text-4xl font-bold">Payment successful!</h2>
        <p>You can now view your orders or continue shopping with us.</p>
        <div className="flex items-center gap-x-5">
            <Link href={"/orders"}>
                <button className="btn btn-primary sm:w-[200px] hover:opacity-80"> View Orders</button>
            </Link>
            <Link href={"/shop"}>
                <button className="btn btn-primary sm:w-[200px] hover:opacity-80">Continue Shopping</button>
            </Link>
        </div>
      </div>
    </section>
  );
};
