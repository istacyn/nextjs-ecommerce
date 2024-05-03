"use client";

import { loadStripe } from "@stripe/stripe-js";
import { CartItemWithProduct } from "@/lib/db/cart";
import { useSession } from "next-auth/react";
import { createOrder, removeAllItems } from './actions';

interface CheckoutButtonProps {
  cartItems: CartItemWithProduct[];
}

export default function CheckoutButton({ cartItems }: CheckoutButtonProps) {
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
  );
  const { data: session } = useSession();

  const handleCheckout = async () => {

    const stripe = await stripePromise;
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
        userId: session?.user.id,
        email: session?.user?.email,
      }),
    });
    const data = await response.json();

    if (response.ok) {
    
      await createOrder(session, cartItems);

      stripe?.redirectToCheckout({ sessionId: data.id });

      await removeAllItems();
    } else {
      throw new Error("Failed to create Stripe Payment");
    }
  };

  return (
    <button className="btn btn-primary sm:w-[200px] hover:opacity-80" onClick={handleCheckout}>
      Checkout
    </button>
  );
}
