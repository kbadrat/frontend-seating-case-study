import { FC, useState } from "react";
import { Button } from "../ui/button";
import TotalCart from "./TotalCart";
import { useCartContext } from "../../contexts/CartContext";
import HostModal from "../Login/HostModal";
import { useLoginContext } from "@/contexts/LoginContext";
import { useNavigate } from "react-router-dom";
const Cart: FC = () => {
    const { getTotalTickets } = useCartContext();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    return (
        <nav className="fixed  bottom-0 left-0 right-0 bg-white border-t border-zinc-200 flex justify-center">
            <div className="max-w-screen-lg p-6 flex justify-between items-center gap-4 grow">
                {/* total in cart state */}
                <TotalCart totalTickets={getTotalTickets} />

                {/* checkout button */}

                <Button
                    disabled={getTotalTickets() === 0}
                    variant="default"
                    // onClick={() => setIsModalOpen(true)}
                    onClick={() => navigate("/cart")}
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
