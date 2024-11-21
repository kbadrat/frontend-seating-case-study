import { FC } from "react";
import { Button } from "../ui/button";
import TotalCart from "./TotalCart";
import { useCartContext } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
const Cart: FC = () => {
    const { messages } = useLanguage();
    const { getTotalTickets } = useCartContext();
    const navigate = useNavigate();

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center h-20">
            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                {/* total in cart state */}
                <TotalCart totalTickets={getTotalTickets} />

                {/* checkout button */}

                <Button
                    disabled={getTotalTickets() === 0}
                    variant="default"
                    onClick={() => navigate("/cart")}
                >
                    {messages.cart.checkoutNow}
                </Button>
            </div>
        </nav>
    );
};

export default Cart;
