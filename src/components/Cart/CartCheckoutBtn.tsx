import { FC } from "react";
import { Button } from "../ui/button";

interface Props {
    getTotalTickets: () => number;
    handleCreateOrder: () => Promise<void>;
    loading: boolean;
}

const CartCheckoutBtn: FC<Props> = ({
    getTotalTickets,
    handleCreateOrder,
    loading,
}) => {
    return (
        <div className="mt-2 flex justify-end p-6">
            <Button
                variant="default"
                className="px-8 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
                disabled={getTotalTickets() === 0}
                onClick={handleCreateOrder}
            >
                {loading ? "Processing..." : "Proceed to Checkout"}
            </Button>
        </div>
    );
};

export default CartCheckoutBtn;
