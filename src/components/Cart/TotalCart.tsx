import { useCartContext } from "@/contexts/CartContext";
import { FC } from "react";

interface Props {
    totalTickets: () => number;
}

const TotalCart: FC<Props> = ({ totalTickets }) => {
    const { totalPrice, currency } = useCartContext();
    return (
        <div className="flex flex-col">
            <span>Total for {totalTickets()} tickets</span>
            <span className="text-2xl font-semibold">
                {totalPrice} {currency}
            </span>
        </div>
    );
};

export default TotalCart;
