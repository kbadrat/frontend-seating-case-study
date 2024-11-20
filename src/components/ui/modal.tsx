import React, { ReactNode, useRef } from "react";
import { Button } from "../ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface ModalProps {
    modalName: string;
    children: ReactNode;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ modalName, children, onClose }) => {
    const { messages } = useLanguage();
    const modalRef = useRef<HTMLDivElement>(null);

    const handleClose = () => {
        onClose();
    };

    const handleBackdropClick = (event: React.MouseEvent) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(event.target as Node)
        )
            onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-10"
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md"
                onClick={(event) => event.stopPropagation()}
            >
                <div className="flex justify-between items-center">
                    <h2 className="text-lg font-bold mb-4">{modalName}</h2>
                    <Button variant="secondary" onClick={handleClose}>
                        {messages.cart.close}
                    </Button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
