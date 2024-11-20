import { FC } from "react";
import { useCartContext } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { dateFormat } from "@/services/dateFormat";

const CartPage: FC = () => {
    const {
        cart,
        removeTicketFromCart,
        totalPrice,
        currency,
        getTotalTickets,
        getTicketPrice,
        getTicketPlace,
        getTicketRow,
        getEventDetails,
        getTicketTypeName,
    } = useCartContext();

    const event = getEventDetails();

    const eventStartDate = event.dateFrom
        ? new Date(event.dateFrom)
        : new Date();
    const eventEndDate = event.dateTo ? new Date(event.dateTo) : new Date();

    const [formattedStartDate, formattedEndDate] = dateFormat(
        eventStartDate,
        eventEndDate
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-700 via-purple-600 to-indigo-700 text-white py-10">
                <div className="max-w-screen-lg mx-auto px-6">
                    <h1 className="text-4xl font-extrabold tracking-tight">
                        Your Cart
                    </h1>
                    <p className="text-lg mt-3">
                        <span className="font-bold text-2xl">
                            {getTotalTickets()}
                        </span>{" "}
                        tickets selected for{" "}
                        <span className="font-bold text-xl">
                            {event.name || "Unknown Event"}
                        </span>
                        .
                    </p>
                    <p className="mt-4 text-lg">{formattedStartDate}</p>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-screen-lg mx-auto px-6 py-10">
                {cart.tickets && cart.tickets.length > 0 ? (
                    <>
                        {/* Tickets List */}
                        <section className="space-y-6">
                            {cart.tickets.map((ticket) => {
                                const ticketPrice = getTicketPrice(
                                    ticket.ticketTypeId
                                );
                                const ticketRow = getTicketRow(ticket.seatId);
                                const ticketPlace = getTicketPlace(
                                    ticket.seatId
                                );
                                const ticketType = getTicketTypeName(
                                    ticket.ticketTypeId
                                );

                                return (
                                    <div
                                        key={ticket.seatId}
                                        className="flex items-center justify-between bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="flex flex-col space-y-2">
                                            {/* Ticket Type */}
                                            <p className="text-xl font-semibold">
                                                {ticketType}
                                            </p>
                                            {/* Ticket Seat Details */}
                                            <p className="text-gray-600 ">
                                                Row {ticketRow}, Seat{" "}
                                                {ticketPlace}
                                            </p>
                                            {/* Ticket Price */}
                                            <p className="text-gray-600 mt-2">
                                                Price:{" "}
                                                <span className="font-bold text-indigo-700">
                                                    {ticketPrice} {currency}
                                                </span>
                                            </p>
                                        </div>
                                        {/* Remove Ticket Button */}
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="ml-4"
                                            onClick={() =>
                                                removeTicketFromCart(ticket)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                );
                            })}
                        </section>

                        {/* Summary Section */}
                        <section className="mt-4 p-6">
                            <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                                Order Summary
                            </h2>
                            <div className="flex space-x-6">
                                {/* Total Tickets */}
                                <div className="flex-1 border border-gray-300 bg-white p-6 rounded-lg text-center">
                                    <h3 className="text-xl font-medium text-gray-600 mb-3">
                                        Total Tickets
                                    </h3>
                                    <p className="text-3xl font-bold text-gray-800">
                                        {getTotalTickets()}
                                    </p>
                                </div>
                                {/* Total Price */}
                                <div className="flex-1 border border-gray-300 bg-white p-6 rounded-lg text-center">
                                    <h3 className="text-xl font-medium text-gray-600 mb-3">
                                        Total Price
                                    </h3>
                                    <p className="text-3xl font-bold text-indigo-600">
                                        {totalPrice} {currency}
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Checkout Button */}
                        <div className="mt-2 flex justify-end p-6">
                            <Button
                                variant="default"
                                className="px-8 py-4 text-lg font-semibold bg-indigo-600 hover:bg-indigo-700 text-white"
                                disabled={getTotalTickets() === 0}
                            >
                                Proceed to Checkout
                            </Button>
                        </div>
                    </>
                ) : (
                    <div className="text-center text-gray-600 mt-20">
                        <h2 className="text-2xl font-semibold">
                            Your cart is empty
                        </h2>
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
                )}
            </main>
        </div>
    );
};

export default CartPage;
