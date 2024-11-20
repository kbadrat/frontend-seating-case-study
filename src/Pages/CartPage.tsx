import { FC, useEffect, useState } from "react";
import { useCartContext } from "@/contexts/CartContext";
import { IOrderInput } from "@/types/types";
import { createOrder } from "@/services/createOrder";
import CartHeader from "@/components/Cart/CartHeader";
import CartTickets from "@/components/Cart/CartTickets";
import CartSummary from "@/components/Cart/CartSummary";
import CartCheckoutBtn from "@/components/Cart/CartCheckoutBtn";
import CartEmpty from "@/components/Cart/CartEmpty";
import { useLoginContext } from "@/contexts/LoginContext";
import SuccessfullyOrder from "@/components/Cart/SuccessfullyOrder";

const CartPage: FC = () => {
    const { cart, getTotalTickets, getEventDetails, resetCart } =
        useCartContext();
    const { user, guest, openHostOrAuthModal } = useLoginContext();
    const [orderId, setOrderId] = useState<string>("");
    const event = getEventDetails();
    const [orderStatus, setOrderStatus] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!user && getTotalTickets() > 0) openHostOrAuthModal();
    }, []);

    const handleCreateOrder = async () => {
        if (!guest && !user) {
            openHostOrAuthModal();
            return;
        }

        setLoading(true);
        setOrderStatus("");

        if (!event?.eventId) {
            const errorMessage = "Event ID is missing. Please try again.";

            alert(errorMessage);
            setLoading(false);
            return;
        }

        const orderData: IOrderInput = {
            eventId: event.eventId,
            tickets: cart.tickets,
            user: guest === null ? user : guest,
        };

        try {
            const orderResponse = await createOrder(orderData);

            if (orderResponse) {
                setOrderId(orderResponse.orderId);
                setOrderStatus("success");
                resetCart();
            } else {
                const errorMessage =
                    "Failed to create order. Please try again.";

                alert(errorMessage);
            }
        } catch (error: unknown) {
            const errorMessage =
                error instanceof Error
                    ? `Error creating order: ${error.message}`
                    : "An unknown error occurred. Please try again.";

            alert(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {orderStatus === "success" ? (
                <div className="flex items-center justify-center">
                    <SuccessfullyOrder
                        orderId={orderId}
                        customer={guest === null ? user : guest}
                    />
                </div>
            ) : (
                <div className="min-h-screen bg-gray-100">
                    {getTotalTickets() > 0 && event && (
                        <CartHeader
                            getTotalTickets={getTotalTickets}
                            event={event}
                        />
                    )}

                    <main className="max-w-screen-lg mx-auto px-6 py-10">
                        {cart.tickets && cart.tickets.length > 0 ? (
                            <>
                                <CartTickets />
                                <CartSummary
                                    customer={guest === null ? user : guest}
                                />
                                <CartCheckoutBtn
                                    getTotalTickets={getTotalTickets}
                                    handleCreateOrder={handleCreateOrder}
                                    loading={loading}
                                />
                            </>
                        ) : (
                            <CartEmpty />
                        )}
                    </main>
                </div>
            )}
        </>
    );
};

export default CartPage;
