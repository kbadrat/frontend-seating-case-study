import { useCartContext } from "@/contexts/CartContext";
import { FC } from "react";

const CartSummary: FC = () => {
    const { totalPrice, currency, getTotalTickets } = useCartContext();

    return (
        <section className="mt-4 p-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                Order Summary
            </h2>
            <div className="flex space-x-6">
                {/* Total Tickets */}
                <div className="flex-1 border border-gray-300 bg-white p-6 rounded-lg text-center">
                    <h3 className="text-xl font-medium text-gray-600 mb-3">
                        Total Tickets
                    </h3>
                    <p className="text-3xl font-bold text-gray-800">
                        {getTotalTickets()}
                    </p>
                </div>
                {/* Total Price */}
                <div className="flex-1 border border-gray-300 bg-white p-6 rounded-lg text-center">
                    <h3 className="text-xl font-medium text-gray-600 mb-3">
                        Total Price
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600">
                        {totalPrice} {currency}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CartSummary;
