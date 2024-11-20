// components/Cart/SuccessfullyOrder.tsx
import { IUser } from "@/types/types";
import { FC } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

interface Props {
    orderId: string;
    customer: IUser | null;
}

const SuccessfullyOrder: FC<Props> = ({ orderId, customer }) => {
    const navigate = useNavigate();

    return (
        <div className="mt-20 bg-gray-50 flex items-center justify-center flex-col">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h2 className="text-3xl font-semibold text-green-800 text-center">
                    Thank you for your order!
                </h2>

                <div className="text-center text-gray-700">
                    <p className="text-lg mb-2">
                        Your order was successfully placed. The order ID is:{" "}
                        <span className="font-bold text-indigo-600">
                            {orderId}
                        </span>
                        .
                    </p>

                    <p className="text-gray-500 mt-2">
                        A confirmation email with all the details will be sent
                        to you shortly.
                    </p>
                </div>

                {customer && (
                    <div className="bg-green-50 p-4 rounded-md border border-green-300 mt-6">
                        <h3 className="text-xl font-medium text-green-700 text-center mb-4">
                            Your Information
                        </h3>
                        <div className="text-center text-gray-700">
                            <p className="text-lg">
                                <span className="font-semibold">Name: </span>
                                {customer.firstName} {customer.lastName}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold">Email: </span>
                                {customer.email}
                            </p>
                        </div>
                    </div>
                )}

                <div className="text-center mt-8">
                    <p className="text-gray-600">
                        If you have any questions, please feel free to contact
                        us.
                    </p>
                </div>
            </div>
            <Button
                variant="default"
                className="mt-10 px-6 py-3"
                onClick={() => navigate("/")}
            >
                Browse other Events
            </Button>
        </div>
    );
};

export default SuccessfullyOrder;
