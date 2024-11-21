// components/Cart/SuccessfullyOrder.tsx
import { IUser } from "@/types/types";
import { FC } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
    orderId: string;
    customer: IUser | null;
}

const SuccessfullyOrder: FC<Props> = ({ orderId, customer }) => {
    const { messages } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className="md:mt-20 md:mb-2- mt-5 mb-5 bg-gray-100 flex items-center justify-center flex-col">
            <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
                <h2 className="text-3xl font-semibold text-green-800 text-center">
                    {messages.cart.thankYouForOrder}
                </h2>

                <div className="text-center text-gray-700">
                    <p className="text-lg mb-2">
                        {messages.cart.successfully}:{" "}
                        <span className="font-bold text-indigo-600">
                            {orderId}
                        </span>
                        .
                    </p>

                    <p className="text-gray-500 mt-2">
                        {messages.cart.confirmationEmail}
                    </p>
                </div>

                {customer && (
                    <div className="bg-green-50 p-4 rounded-md border border-green-300 mt-6">
                        <h3 className="text-xl font-medium text-green-700 text-center mb-4">
                            {messages.cart.yourInfo}
                        </h3>
                        <div className="text-center text-gray-700">
                            <p className="text-lg">
                                <span className="font-semibold">
                                    {messages.cart.name}:{" "}
                                </span>
                                {customer.firstName} {customer.lastName}
                            </p>
                            <p className="text-lg">
                                <span className="font-semibold">
                                    {messages.cart.email}:{" "}
                                </span>
                                {customer.email}
                            </p>
                        </div>
                    </div>
                )}

                <div className="text-center mt-8">
                    <p className="text-gray-600">{messages.cart.contactUs}</p>
                </div>
            </div>
            <Button
                variant="default"
                className="mt-10 px-6 py-3"
                onClick={() => navigate("/")}
            >
                {messages.cart.browseOtherEvents}
            </Button>
        </div>
    );
};

export default SuccessfullyOrder;
