import { FC } from "react";
import { Button } from "../ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

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
    const { messages } = useLanguage();
    return (
        <div className="mt-2 flex justify-end p-6">
            <Button
                variant="default"
                className="px-8 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center"
                disabled={getTotalTickets() === 0 || loading}
                onClick={handleCreateOrder}
            >
                {loading ? (
                    <>
                        <span className="animate-spin mr-3 w-5 h-5 border-4 border-t-4 border-white rounded-full"></span>
                        {messages.cart.processing}
                    </>
                ) : (
                    messages.cart.proceedToCheckout
                )}
            </Button>
        </div>
    );
};

export default CartCheckoutBtn;
