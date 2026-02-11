import LoaderIcon from "../icons/LoaderIcon";

interface MainButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  isLoading?: boolean;
  variant?: "white" | "black";
  shape?: "pill" | "square";
}

export default function MainButton({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
  isLoading = false,
  variant = "black",
  shape = "pill",
}: MainButtonProps) {
  const variantClasses = {
    white: "bg-white text-black",
    black: "bg-black text-white",
  };

  const shapeClasses = {
    pill: "rounded-full",
    square: "rounded-[14px]",
  };

  return (
    <button
      className={`${variantClasses[variant]} ${shapeClasses[shape]} ${className} ${
        disabled ? "opacity-50" : ""
      } flex items-center justify-center font-actay font-bold text-[12px] leading-[15px] uppercase cursor-pointer`}
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
    >
      <span className="pt-[4px]">{children}</span>
      {isLoading && <LoaderIcon />}
    </button>
  );
}
