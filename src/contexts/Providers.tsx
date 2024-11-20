import { ReactNode } from "react";
import { LoginProvider } from "./LoginContext";
import { CartProvider } from "./CartContext";
import { LanguageProvider } from "./LanguageContext";

const Providers = ({ children }: { children: ReactNode }) => {
    return (
        <LanguageProvider>
            <LoginProvider>
                <CartProvider>{children}</CartProvider>
            </LoginProvider>
        </LanguageProvider>
    );
};

export default Providers;
