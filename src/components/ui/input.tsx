import React, { FC } from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    value: string;
    setValue: (newValue: string) => void;
}

const Input: FC<Props> = ({ value, setValue, ...props }) => {
    return (
        <input
            {...props}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2"
        />
    );
};

export default Input;
