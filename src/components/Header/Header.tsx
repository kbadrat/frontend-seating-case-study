import { FC, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";
import UserMenu from "./UserMenu";
import HeaderCart from "./HeaderCart";
import { useLoginContext } from "@/contexts/LoginContext";
import LanguageSwitcher from "../LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "../../public/event-logo.png";

const Header: FC = () => {
    const { messages } = useLanguage();
    const { user, setUser, openLoginModal } = useLoginContext();

    useEffect(() => {
        const restoreUser = async () => {
            const token = localStorage.getItem("authToken");
            const user = localStorage.getItem("user");

            if (token && user) setUser(JSON.parse(user));
        };

        restoreUser();
    }, []);

    return (
        <header>
            <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200">
                <div className="max-w-screen-lg md:p-4 p-2 grow flex items-center justify-between mx-auto">
                    <img src={logo} alt="Logo" className="w-10 h-auto" />

                    <div className="flex items-center gap-2">
                        <div>
                            {user ? (
                                <UserMenu user={user} setUser={setUser} />
                            ) : (
                                <Button
                                    variant="secondary"
                                    onClick={openLoginModal}
                                >
                                    {messages.header.login}
                                </Button>
                            )}
                        </div>

                        <div className="flex items-center md:gap-10 gap-2">
                            <HeaderCart />
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
