import React, { FC, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Input from "../ui/input";
import Modal from "../ui/modal";
import { useLoginContext } from "@/contexts/LoginContext";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const GuestFormModal: FC<Props> = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const { setGuest } = useLoginContext();

    useEffect(() => {
        if (isOpen) {
            setEmail("");
            setFirstName("");
            setLastName("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setGuest({ email, firstName, lastName });
        onClose();
    };

    return (
        <Modal modalName="Guest Information" onClose={onClose}>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Email
                    </label>
                    <Input
                        type="email"
                        value={email}
                        setValue={setEmail}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        First Name
                    </label>
                    <Input
                        type="text"
                        value={firstName}
                        setValue={setFirstName}
                        required
                        placeholder="Enter your first name"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                        Last Name
                    </label>
                    <Input
                        type="text"
                        value={lastName}
                        setValue={setLastName}
                        required
                        placeholder="Enter your last name"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Modal>
    );
};

export default GuestFormModal;
