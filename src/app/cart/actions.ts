"use server";

import { createCart, getCart } from "@/lib/db/cart";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";
import { CartItemWithProduct } from "@/lib/db/cart";
import { Session } from "next-auth";

export async function setProductQty(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart());

  const articleInCart = cart.items.find((item) => item.productId === productId);

  if (quantity === 0) {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            delete: { id: articleInCart.id },
          },
        },
      });
    }
  } else {
    if (articleInCart) {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            update: {
              where: { id: articleInCart.id },
              data: { quantity },
            },
          },
        },
      });
    } else {
      await prisma.cart.update({
        where: { id: cart.id },
        data: {
          items: {
            create: {
              productId,
              quantity,
            },
          },
        },
      });
    }
  }

  revalidatePath("/cart");
}

// Move cart items to orders after payment
export async function createOrder(session: Session | null, cartItems: CartItemWithProduct[]) {
  if (!session || !session.user) {
    console.error("Session or user is undefined");
    return;
  }

  const order = await prisma.order.create({
    data: {
      items: {
        create: cartItems.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
        })),
      },
      userId: session.user.id,
      deliveryDate: new Date(),
      orderStatus: "pending",
    },
  });

  return order;
}

// Remove items from cart after payment
export async function removeAllItems() {
  const cart = await getCart();

  if (!cart) {
    console.error("Cart is undefined");
    return;
  }

  // Delete all items from the cart
  await prisma.cart.update({
    where: { id: cart.id },
    data: {
      items: {
        deleteMany: {},
      },
    },
  });

  revalidatePath("/cart");
}