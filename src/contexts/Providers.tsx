import { ReactNode } from "react";
import { LoginProvider } from "./LoginContext";
import { CartProvider } from "./CartContext";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <LoginProvider>
            <CartProvider>{children}</CartProvider>
        </LoginProvider>
    );
};

export default Providers;
