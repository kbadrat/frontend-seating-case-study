import { FC, useEffect } from "react";
import { Button } from "@/components/ui/button.tsx";
import UserMenu from "./UserMenu";
import HeaderCart from "./HeaderCart";
import { useLoginContext } from "@/contexts/LoginContext";
import LanguageSwitcher from "../LanguageSwitcher";
import { useLanguage } from "@/contexts/LanguageContext";

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
            <nav className="sticky top-0 left-0 right-0 bg-white border-b border-zinc-200 flex justify-center">
                <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-2">
                    {/* application/author image/logo placeholder */}
                    <div className="max-w-[250px] w-full flex">
                        <div className="bg-zinc-100 rounded-md size-12" />
                    </div>
                    {/* app/author title/name placeholder */}
                    <div className="bg-zinc-100 rounded-md h-8 w-[200px]" />
                    {/* user menu */}
                    <div className="max-w-[250px] w-full flex justify-end">
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
                    <div className="flex gap-2">
                        <HeaderCart />
                        <LanguageSwitcher />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
