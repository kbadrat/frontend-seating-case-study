import { FC, useState } from "react";
import { useCartContext } from "@/contexts/CartContext";
import { IOrderInput } from "@/types/types";
import { createOrder } from "@/services/createOrder";
import CartHeader from "@/components/Cart/CartHeader";
import CartTickets from "@/components/Cart/CartTickets";
import CartSummary from "@/components/Cart/CartSummary";
import CartCheckoutBtn from "@/components/Cart/CartCheckoutBtn";
import CartEmpty from "@/components/Cart/CartEmpty";
import { useLoginContext } from "@/contexts/LoginContext";

const CartPage: FC = () => {
    const { cart, getTotalTickets, getEventDetails } = useCartContext();
    const { user } = useLoginContext();

    const event = getEventDetails();
    const [orderStatus, setOrderStatus] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleCreateOrder = async () => {
        setLoading(true);
        setOrderStatus("");

        if (!user) {
            setOrderStatus("User not logged in. Please log in to proceed.");
            setLoading(false);
            return;
        }

        if (!event?.eventId) {
            setOrderStatus("Event ID is missing. Please try again.");
            setLoading(false);
            return;
        }

        const orderData: IOrderInput = {
            eventId: event.eventId,
            tickets: cart.tickets,
            user: user,
        };

        try {
            const orderResponse = await createOrder(orderData);

            if (orderResponse) {
                setOrderStatus(
                    `Order created successfully! Order ID: ${orderResponse.orderId}`
                );
            } else {
                setOrderStatus("Failed to create order. Please try again.");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setOrderStatus(`Error creating order: ${error.message}`);
            } else {
                setOrderStatus("An unknown error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {getTotalTickets() > 0 && event && (
                <CartHeader getTotalTickets={getTotalTickets} event={event} />
            )}

            <main className="max-w-screen-lg mx-auto px-6 py-10">
                {cart.tickets && cart.tickets.length > 0 ? (
                    <>
                        <CartTickets />
                        <CartSummary />
                        <CartCheckoutBtn
                            getTotalTickets={getTotalTickets}
                            handleCreateOrder={handleCreateOrder}
                            loading={loading}
                        />
                        {orderStatus && (
                            <div className="text-center my-4">
                                <p>{orderStatus}</p>
                            </div>
                        )}
                    </>
                ) : (
                    <CartEmpty />
                )}
            </main>
        </div>
    );
};

export default CartPage;
