import { getCart } from "@/lib/db/cart";
import CartElement from "./CartElement";
import { setProductQty } from "./actions";
import { formatPrice } from "@/lib/format";
import CheckoutButton from "./CheckoutButton";

export const metadata = {
  title: "Zuri- Cart",
};

export default async function CartPage() {
  const cart = await getCart();
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      {cart?.items.map((cartItem) => (
        <CartElement
          cartItem={cartItem}
          key={cartItem.id}
          setProductQty={setProductQty}
        />
      ))}
      {!cart?.items.length && <p>Your cart is empty.</p>}
      <div className="flex flex-col items-end sm:items-center">
        <p className="mb-3 font-bold">
          Total: {formatPrice(cart?.subtotal || 0)}
        </p>
        <CheckoutButton cartItems={cart?.items || []}/>
      </div>
    </div>
  );
}
