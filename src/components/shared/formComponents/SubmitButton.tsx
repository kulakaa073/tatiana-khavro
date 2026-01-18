import { useTranslations } from "next-intl";
import MainButton from "../buttons/MainButton";

interface SubmitButtonProps {
  dirty: boolean;
  isValid: boolean;
  isLoading: boolean;
  text: string;
  className?: string;
  variant?: "pink" | "blue" | "gradient" | "white";
}

export default function SubmitButton({
  dirty,
  isValid,
  isLoading,
  text,
  className = "",
  variant = "gradient",
}: SubmitButtonProps) {
  const t = useTranslations("forms");

  return (
    <MainButton
      type="submit"
      variant={variant}
      disabled={!(dirty && isValid) || isLoading}
      isLoading={isLoading}
      className={className}
    >
      {isLoading ? t("sending") : text}
    </MainButton>
  );
}
