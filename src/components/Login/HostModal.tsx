import { FC } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";
import { useLoginContext } from "@/contexts/LoginContext";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const LoginChoiceModal: FC<Props> = ({ isOpen, onClose }) => {
    const { setIsLoginModalOpen } = useLoginContext();

    if (!isOpen) return null;

    const handleLogin = () => {
        setIsLoginModalOpen(true);
        onClose();
    };

    return (
        <Modal modalName="Choose your login method" onClose={onClose}>
            <div className="flex flex-col gap-4 mt-4">
                <Button variant="default" onClick={handleLogin}>
                    Login
                </Button>
                <Button variant="outline">Continue as Guest</Button>
            </div>
        </Modal>
    );
};

export default LoginChoiceModal;
