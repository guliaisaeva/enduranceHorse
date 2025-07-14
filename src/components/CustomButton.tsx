import React from "react";

interface CustomButtonProps {
    onClick?: () => void;
    className?: string;
    children: React.ReactNode;
    type?: "button" | "submit" | "reset";
}

const CustomButton: React.FC<CustomButtonProps> = ({
    onClick,
    className = "",
    children,
    type = "button",
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`px-5 py-2 rounded flex items-center justify-center gap-2 ${className}`}
        >
            {children}
        </button>
    );
};

export default CustomButton;