import { FC } from "react";
import { Button } from "../ui/button";
import TotalCart from "./TotalCart";
import { useCart } from "../../hooks/useCart";

const Cart: FC = () => {
    const { cart, setCart } = useCart();

    function getTotalTickets(): number {
        return cart.tickets?.length ?? 0;
    }

    return (
        <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                {/* total in cart state */}
                <TotalCart totalTickets={getTotalTickets} />

                {/* checkout button */}
                <Button disabled variant="default">
                    Checkout now
                </Button>
            </div>
        </nav>
    );
};

export default Cart;
