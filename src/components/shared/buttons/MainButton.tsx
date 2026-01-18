interface MainButtonProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    loading?: boolean;
    variant?: "white" | "black";
}

export default function MainButton({ children, className, onClick, type = "button", disabled = false, loading = false, variant = "black" }: MainButtonProps) {
    const variantClasses = {
        white: "bg-white text-black",
        black: "bg-black text-white",
    }

    return (
        <button className={`${variantClasses[variant]} ${className}`} onClick={onClick} type={type} disabled={disabled || loading}>
            <span>{children}</span>
            {loading && <span>Loading...</span>}
        </button>
    );
}