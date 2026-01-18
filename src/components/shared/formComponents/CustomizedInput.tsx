"use client";

import {
  ErrorMessage,
  Field,
  FormikErrors,
  FormikTouched,
  useFormikContext,
} from "formik";
import LoaderIcon from "../icons/LoaderIcon";

interface Values {
  [fieldName: string]: string;
}

interface CustomizedInputProps {
  fieldName: string;
  placeholder: string;
  errors: FormikErrors<Values>;
  touched: FormikTouched<Values>;
  isRequired?: boolean;
  as?: string;
  labelClassName?: string;
  fieldClassName?: string;
  mask?: string | RegExp | (string | RegExp)[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  inputType?: string;
  fieldFontSize?: string;
  variant?: "black" | "gradient";
}

export default function CustomizedInput({
  fieldName,
  placeholder,
  errors,
  touched,
  as,
  labelClassName = "",
  fieldClassName = "",
  fieldFontSize = "",
  mask = "",
  onChange,
  onFocus,
  inputType = "text",
  isLoading = false,
  variant = "black",
}: CustomizedInputProps) {
  const { handleChange } = useFormikContext<Values>();
  const isError = (errors as Record<string, unknown>)[fieldName];
  const isTouched = (touched as Record<string, unknown>)[fieldName];

  const labelStyles = "relative flex flex-col justify-center w-full";
  const fieldStyles = `relative w-full h-12 px-6 py-3 text-[12px] lg:text-[14px] font-normal leading-[143%] ${variant === "gradient" ? "text-white placeholder:text-white backdrop-blur-[37.9px]" : "text-black placeholder:text-black"} border-[1.5px] rounded-full outline-none resize-none transition duration-300 ease-out`;
  const errorStyles =
    "absolute bottom-[-11px] left-2 text-[9px] font-normal leading-none text-red-500";

  return (
    <label className={`${labelStyles} ${labelClassName}`}>
      <Field
        as={as}
        mask={mask}
        placeholder={placeholder}
        name={fieldName}
        type={inputType}
        autoComplete="on"
        onChange={onChange || handleChange}
        onFocus={onFocus}
        className={`${fieldStyles} ${
          as === "textarea" ? "h-[112px]" : ""
        } ${fieldClassName} ${fieldFontSize} ${
          isError && isTouched
            ? "border-red"
            : variant === "gradient"
              ? "border-transparent"
              : "border-black"
        }`}
      />
      {isLoading && <LoaderIcon />}
      {variant === "gradient" ? (
        <>
          <div
            className="absolute z-10 w-[calc(100%-3px)] h-[calc(100%-3px)] shadow-[inset_0px_4px_12.6px_rgba(255,255,255,0.25)] 
        bg-white/6 pointer-events-none rounded-full"
          />
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(175.34deg, #FF76C1 3.91%, #6A8FFF 123.62%)",
              padding: "1.5px",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
              maskComposite: "exclude",
            }}
          />
        </>
      ) : null}

      <ErrorMessage name={fieldName} component="p" className={errorStyles} />
    </label>
  );
}
