import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "../ui/button";

const CartEmpty = () => {
    const { messages } = useLanguage();
    return (
        <div className="text-center text-gray-600 mt-20">
            <h2 className="text-2xl font-semibold">
                {messages.cart.emptyCart}
            </h2>
            <p className="mt-4 text-lg">{messages.cart.addSomeTickets}</p>
            <Button
                variant="default"
                className="mt-6 px-6 py-3"
                onClick={() => window.history.back()}
            >
                {messages.cart.browseEvents}
            </Button>
        </div>
    );
};

export default CartEmpty;
