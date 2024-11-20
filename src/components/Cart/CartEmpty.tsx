import { Button } from "../ui/button";

const CartEmpty = () => {
    return (
        <div className="text-center text-gray-600 mt-20">
            <h2 className="text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-4 text-lg">
                Add some tickets to your cart to proceed.
            </p>
            <Button
                variant="default"
                className="mt-6 px-6 py-3"
                onClick={() => window.history.back()}
            >
                Browse Events
            </Button>
        </div>
    );
};

export default CartEmpty;
