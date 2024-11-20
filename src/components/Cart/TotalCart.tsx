import { useCartContext } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { FC } from "react";

interface Props {
    totalTickets: () => number;
}

const TotalCart: FC<Props> = ({ totalTickets }) => {
    const { messages } = useLanguage();
    const { totalPrice, currency } = useCartContext();
    return (
        <div className="flex flex-col">
            <span>
                {messages.cart.totalFor} {totalTickets()}{" "}
                {messages.cart.tickets}
            </span>
            <span className="text-2xl font-semibold">
                {totalPrice} {currency}
            </span>
        </div>
    );
};

export default TotalCart;
