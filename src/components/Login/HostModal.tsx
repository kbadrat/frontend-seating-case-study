import { FC } from "react";
import { Button } from "../ui/button";
import Modal from "../ui/modal";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const LoginChoiceModal: FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <Modal modalName="Choose your login method" onClose={onClose}>
            <div className="flex flex-col gap-4 mt-4">
                <Button variant="default">Login</Button>
                <Button variant="outline">Continue as Guest</Button>
            </div>
        </Modal>
    );
};

export default LoginChoiceModal;
