import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Input from "../ui/input";
import { apiClient, handleApiError } from "@/services/apiService";
import { IUser } from "@/types/types";
import Modal from "../ui/modal";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const LoginModal: FC<Props> = ({ isOpen, onClose, setUser }) => {
    const { messages } = useLanguage();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setPassword("");
            setLoading(false);
            setError(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await apiClient.post("/login", {
                email,
                password,
            });

            const { user, token } = response.data;
            localStorage.setItem("authToken", token);
            localStorage.setItem("user", JSON.stringify(user));

            setUser(user);
            onClose();
        } catch (error: any) {
            handleApiError(error);
            setError(error.response?.data?.message || "Failed to login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal modalName={messages.profile.login} onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        {messages.cart.email}
                    </label>
                    <Input
                        type="email"
                        value={email}
                        setValue={setEmail}
                        required
                        placeholder={messages.profile.enterEmail}
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        {messages.profile.password}
                    </label>
                    <Input
                        type="password"
                        value={password}
                        setValue={setPassword}
                        required
                        placeholder={messages.profile.enterPassword}
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="submit" disabled={loading}>
                        {loading
                            ? messages.profile.loading
                            : messages.profile.login}
                    </Button>
                </div>
            </form>
            {error && (
                <div className="text-red-500 mt-4 font-semibold text-center">
                    {messages.profile.invalid}
                </div>
            )}
        </Modal>
    );
};

export default LoginModal;
