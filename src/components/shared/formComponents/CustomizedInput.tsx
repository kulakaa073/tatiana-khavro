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
  labelText?: string;
  labelClassName?: string;
  fieldClassName?: string;
  mask?: string | RegExp | (string | RegExp)[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
  inputType?: string;
  fieldFontSize?: string;
}

export default function CustomizedInput({
  fieldName,
  placeholder,
  errors,
  touched,
  as,
  labelText,
  labelClassName = "",
  fieldClassName = "",
  fieldFontSize = "",
  mask = "",
  onChange,
  onFocus,
  inputType = "text",
  isLoading = false,
}: CustomizedInputProps) {
  const { handleChange } = useFormikContext<Values>();
  const isError = (errors as Record<string, unknown>)[fieldName];
  const isTouched = (touched as Record<string, unknown>)[fieldName];

  const labelStyles = "relative flex flex-col justify-center w-full";
  const fieldStyles = `relative w-full h-[110px] px-6 pt-3 pb-0 text-[12px] lg:text-[14px] font-normal leading-[143%] text-black placeholder:text-black/30 border-[1.5px] rounded-[14px] outline-none resize-none transition duration-300 ease-out`;
  const errorStyles =
    "mt-2 text-[10px] font-normal leading-none text-red-500";

  return (
    <label className={`${labelStyles} ${labelClassName}`}>
      {labelText && (
        <span className="mb-2 text-[16px] font-bold leading-[143%] text-black">
          {labelText}
        </span>
      )}
      <Field
        as={as}
        mask={mask}
        placeholder={placeholder}
        name={fieldName}
        type={inputType}
        autoComplete="on"
        onChange={onChange || handleChange}
        onFocus={onFocus}
        className={`${fieldStyles} ${fieldClassName} ${fieldFontSize} ${
          isError && isTouched ? "border-red" : "border-black"
        }`}
      />
      {isLoading && <LoaderIcon />}
      <ErrorMessage name={fieldName} component="p" className={errorStyles} />
    </label>
  );
}
