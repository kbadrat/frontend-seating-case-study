import { FC } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { useLoginContext } from "@/contexts/LoginContext";
import { useLanguage } from "@/contexts/LanguageContext";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const HostOrAuthModal: FC<Props> = ({ isOpen, onClose }) => {
    const { messages } = useLanguage();
    const { openLoginModal, openGuestFormModal } = useLoginContext();

    if (!isOpen) return null;

    const handleLogin = () => {
        openLoginModal();
        onClose();
    };

    const handleGuest = () => {
        openGuestFormModal();
        onClose();
    };

    return (
        <Modal modalName="Choose your login method" onClose={onClose}>
            <div className="flex flex-col gap-4 mt-4">
                <Button variant="default" onClick={handleLogin}>
                    {messages.profile.login}
                </Button>
                <Button variant="outline" onClick={handleGuest}>
                    {messages.profile.continueGuest}
                </Button>
            </div>
        </Modal>
    );
};

export default HostOrAuthModal;
