import GuestFormModal from "@/components/Login/GuestFormModal";
import HostOrAuthModal from "@/components/Login/HostOrAuthModal";
import LoginModal from "@/components/Login/LoginModal";
import { IUser } from "@/types/types";
import { createContext, ReactNode, useContext, useState } from "react";

interface LoginContextType {
    user: IUser | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    openLoginModal: () => void;
    closeLoginModal: () => void;
    openHostOrAuthModal: () => void;
    closeHostOrAuthModal: () => void;
    openGuestFormModal: () => void;
    closeGuestFormModal: () => void;
    guest: IUser | null;
    setGuest: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
    const [isHostOrAuthModal, setIsHostOrAuthModal] = useState<boolean>(false);
    const [isGuestFormModal, setIsGuestFormModal] = useState<boolean>(false);
    const [guest, setGuest] = useState<IUser | null>(null);

    const openLoginModal = () => setIsLoginModal(true);
    const closeLoginModal = () => setIsLoginModal(false);
    const openHostOrAuthModal = () => setIsHostOrAuthModal(true);
    const closeHostOrAuthModal = () => setIsHostOrAuthModal(false);
    const openGuestFormModal = () => setIsGuestFormModal(true);
    const closeGuestFormModal = () => setIsGuestFormModal(false);

    return (
        <LoginContext.Provider
            value={{
                user,
                setUser,
                openLoginModal,
                closeLoginModal,
                openHostOrAuthModal,
                closeHostOrAuthModal,
                openGuestFormModal,
                closeGuestFormModal,
                guest,
                setGuest,
            }}
        >
            {children}
            <LoginModal
                isOpen={isLoginModal}
                onClose={closeLoginModal}
                setUser={setUser}
            />
            <HostOrAuthModal
                isOpen={isHostOrAuthModal}
                onClose={closeHostOrAuthModal}
            />
            <GuestFormModal
                isOpen={isGuestFormModal}
                onClose={closeGuestFormModal}
            />
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
