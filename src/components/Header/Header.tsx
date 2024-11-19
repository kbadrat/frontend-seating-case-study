import { FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import UserMenu from "./UserMenu";
import LoginModal from "../Login/LoginModal";
import HeaderCart from "./HeaderCart";
import { useLoginContext } from "@/contexts/LoginContext";

const Header: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { user, setUser } = useLoginContext();
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
                <div className="max-w-screen-lg p-4 grow flex items-center justify-between gap-3">
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
                                onClick={() => setIsModalOpen(true)}
                            >
                                Login or register
                            </Button>
                        )}
                    </div>
                    <HeaderCart />
                </div>
            </nav>
            <LoginModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                setUser={setUser}
            />
        </header>
    );
};

export default Header;
