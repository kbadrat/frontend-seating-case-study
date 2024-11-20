import { FC } from "react";

const EventSectionLouder: FC = () => {
    return (
        <div className="flex flex-col items-center gap-6 p-4 w-full">
            {/* Loading Main Content */}
            <div className="w-full max-w-screen-lg flex items-start gap-4">
                {/* Loading Seating Map */}
                <div className="flex-grow bg-gray-100 rounded-md p-6 animate-pulse flex flex-col items-center gap-4">
                    {Array.from({ length: 7 }).map((_, rowIndex) => (
                        <div
                            key={rowIndex}
                            className="flex justify-center gap-2"
                            style={{
                                width: "100%",
                            }}
                        >
                            {Array.from({ length: 8 }).map((_, seatIndex) => (
                                <div
                                    key={seatIndex}
                                    className="w-8 h-10 bg-gray-200 rounded-md"
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Loading Event Info */}
                <div className="w-1/3 bg-gray-100 rounded-md p-4 animate-pulse flex flex-col gap-4">
                    <div className="w-full h-28 bg-gray-200 rounded-md"></div>

                    <div className="w-2/3 h-6 bg-gray-200 rounded-md"></div>

                    <div className="w-full h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-5/6 h-4 bg-gray-200 rounded-md"></div>
                    <div className="w-3/4 h-4 bg-gray-200 rounded-md"></div>

                    <div className="w-1/2 h-4 bg-gray-200 rounded-md"></div>

                    <div className="w-2/3 h-4 bg-gray-200 rounded-md"></div>
                </div>
            </div>

            {/* Loading Cart */}
            <div className="w-full max-w-screen-lg bg-gray-100 rounded-md p-4 animate-pulse">
                <div className="w-full h-6 bg-gray-200 rounded-md mb-3"></div>
                <div className="w-5/6 h-6 bg-gray-200 rounded-md mb-3"></div>
                <div className="w-3/4 h-6 bg-gray-200 rounded-md"></div>
            </div>
        </div>
    );
};

export default EventSectionLouder;
