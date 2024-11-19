import { IUser } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface LoginContextType {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);

    return (
        <LoginContext.Provider
            value={{
                user,
                setUser,
            }}
        >
            {children}
        </LoginContext.Provider>
    );
};

export const useLoginContext = () => {
    const context = useContext(LoginContext);

    if (context === undefined) {
        throw new Error("useLoginContext must be used within a CartProvider");
    }
    return context;
};
