import { CartItemWithProduct } from "@/lib/db/cart";
import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

export const POST = async (request: NextRequest) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

  try {
    const reqBody = await request.json();
    const { items, email } = await reqBody;

    // Validate request data
    if (!items || !email) {
      throw new Error('Invalid request data');
    }

    const extractingItems = await items.map((item: CartItemWithProduct) => {
      // Check if item.product is defined
      if (!item.product) {
        throw new Error('Invalid item data: product is undefined');
      }
    
      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.product.price * 100,
          product_data: {
            name: item.product.name,
            description: item.product.description,
            images: [item.product.imageUrl], 
          }
        }
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: extractingItems,
      mode: "payment",
      success_url: `${process.env.NEXTAUTH_URL}/success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/checkout`,
      metadata: {
        email,
      }
    })

    return NextResponse.json({
      message: "Connection is Active",
      success: true,
      id: session.id,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ Error: error.message }, { status: 500 });
  }
};
