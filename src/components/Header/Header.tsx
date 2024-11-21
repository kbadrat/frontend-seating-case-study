import { FC, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";
import UserMenu from "./UserMenu";
import HeaderCart from "./HeaderCart";
import { useLoginContext } from "@/contexts/LoginContext";
import LanguageSwitcher from "../LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";
import logo from "../../public/event-logo.png";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
    const { messages } = useLanguage();
    const { user, setUser, openLoginModal } = useLoginContext();
    const navigate = useNavigate();

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
                    {/* application/author image/logo placeholder */}
                    <div
                        className="max-w-[250px] w-full flex cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <img src={logo} alt="Logo" className="w-10 h-auto" />
                    </div>
                    {/* app/author title/name placeholder */}
                    <div className="bg-zinc-100 rounded-md h-8 w-[200px] hidden md:block" />
                    {/* user menu */}
                    <div className="flex justify-between gap-2 items-center w-full md:max-w-[250px]">
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
                        <div className="flex gap-2">
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
