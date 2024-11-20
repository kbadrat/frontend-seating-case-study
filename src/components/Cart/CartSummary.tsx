import { useCartContext } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { IUser } from "@/types/types";
import { FC } from "react";

interface Props {
    customer: IUser | null;
}

const CartSummary: FC<Props> = ({ customer }) => {
    const { messages } = useLanguage();
    const { totalPrice, currency, getTotalTickets } = useCartContext();

    return (
        <section className="mt-4 p-6">
            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                {messages.cart.orderSummary}
            </h2>
            <div
                className={`grid gap-6 grid-cols-1  ${
                    customer ? "md:grid-cols-3" : "md:grid-cols-2"
                }`}
            >
                {/* Total Tickets */}
                <div className="border border-gray-300 bg-white p-6 rounded-lg text-center">
                    <h3 className="text-xl font-medium text-gray-600 mb-3">
                        {messages.cart.totalTickets}
                    </h3>
                    <p className="text-3xl font-bold text-gray-800">
                        {getTotalTickets()}
                    </p>
                </div>
                {/* Total Price */}
                <div className="border border-gray-300 bg-white p-6 rounded-lg text-center">
                    <h3 className="text-xl font-medium text-gray-600 mb-3">
                        {messages.cart.totalPrice}
                    </h3>
                    <p className="text-3xl font-bold text-indigo-600">
                        {totalPrice} {currency}
                    </p>
                </div>
                {/* Customer Info */}

                {customer && (
                    <div className="border border-gray-300 bg-white p-6 rounded-lg text-center">
                        <h3 className="text-xl font-medium text-gray-600 mb-3">
                            {messages.cart.billingInfo}
                        </h3>
                        <p className="text-lg font-semibold text-gray-800">
                            {customer.firstName} {customer.lastName}
                        </p>
                        <p className="text-sm text-gray-600">
                            {customer.email}
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CartSummary;
