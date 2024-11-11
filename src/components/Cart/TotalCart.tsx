import { FC } from "react";

const TotalCart: FC = () => {
    return (
        <div className="flex flex-col">
            <span>Total for [?] tickets</span>
            <span className="text-2xl font-semibold">[?] CZK</span>
        </div>
    );
};

export default TotalCart;
