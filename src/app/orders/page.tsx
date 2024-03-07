import {prisma} from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Zuri - Orders",
}

export default async function OrdersPage() {
  try {
    // Fetch orders from the database
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        deliveryDate: 'desc',
      },
    });

    // Display orders
    return (
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-6">Order History</h1>
        <div>
          {orders.map((order) => (
            <div key={order.id} className="order-item border p-4 mb-4 flex items-center">
              {/* Order Image */}
              <div className="order-image flex-none mr-4">
                <Image
                  src={order.items[0]?.product.imageUrl}
                  alt="Order"
                  className="w-16 h-16 object-cover rounded"
                />
              </div>
              {/* Order Details */}
              <div className="order-details flex-1">
                <p className="text-lg font-semibold">Order Name: {order.items[0]?.product.name}</p>
                <p className="text-gray-600">Order ID: {order.id}</p>
                <p className="text-gray-600">Delivery Date: {order.deliveryDate.toDateString()}</p>
                {/* Additional details for delivery status */}
                <p className="text-gray-600">Delivery Status: {order.orderStatus}</p>
                {/* See Details button */}
                <Link
                  href={`/orders/${order.id}`}
                  className="text-blue-500 hover:underline"
                >
                  See Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching orders:', error);
    // You may want to handle errors appropriately, e.g., display an error message
    return (
      <div className="container mx-auto mt-8">
        <p className="text-red-500">Error fetching orders. Please try again later.</p>
      </div>
    );
  }
};
