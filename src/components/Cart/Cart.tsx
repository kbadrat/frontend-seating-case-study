import { FC } from "react";
import { Button } from "../ui/button";
import TotalCart from "./TotalCart";

const Cart: FC = () => {
    return (
        <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                {/* total in cart state */}
                <TotalCart />

                {/* checkout button */}
                <Button disabled variant="default">
                    Checkout now
                </Button>
            </div>
        </nav>
    );
};

export default Cart;
