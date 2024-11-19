import { FC, useState } from "react";
import { Button } from "../ui/button";
import TotalCart from "./TotalCart";
import { useCartContext } from "../../contexts/CartContext";
import HostModal from "../Login/HostModal";
import { useLoginContext } from "@/contexts/LoginContext";
const Cart: FC = () => {
    const { getTotalTickets } = useCartContext();
    const { user } = useLoginContext();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    return (
        <nav className="sticky bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                {/* total in cart state */}
                <TotalCart totalTickets={getTotalTickets} />

                {/* checkout button */}
                <Button
                    disabled={getTotalTickets() === 0}
                    variant="default"
                    // onClick={() => setIsModalOpen(true)}
                >
                    Checkout now
                </Button>
            </div>
            <HostModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            ></HostModal>
        </nav>
    );
};

export default Cart;
