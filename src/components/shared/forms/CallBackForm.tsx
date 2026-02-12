"use client";
import { Field, Form, Formik, FormikHelpers, FormikProps, useFormikContext } from "formik";
import * as motion from "motion/react-client";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import axios from "axios";
import { trackFacebookPixel } from "../../../utils/facebookPixel";
import { CallBackValidation } from "../../../schemas/CallbackValidation";
import CustomizedInput from "../formComponents/CustomizedInput";
import SubmitButton from "../formComponents/SubmitButton";
import MainButton from "../buttons/MainButton";

const AUTO_ADVANCE_MS = 500;

function AutoAdvanceOnPreset({
  step,
  setStep,
}: {
  step: 1 | 2 | 3 | 4 | 5;
  setStep: (n: 1 | 2 | 3 | 4 | 5) => void;
}) {
  const { values } = useFormikContext<ValuesCallBackFormType>();
  const lastProfitTargetRef = useRef(values.profitTarget);
  const lastCurrentProfitRef = useRef(values.currentProfit);

  useEffect(() => {
    if (step === 2) {
      const valueJustChanged = values.profitTarget !== lastProfitTargetRef.current;
      const isPreset =
        values.profitTarget &&
        values.profitTarget !== "custom" &&
        valueJustChanged;
      lastProfitTargetRef.current = values.profitTarget;
      if (isPreset) {
        const t = setTimeout(() => setStep(3), AUTO_ADVANCE_MS);
        return () => clearTimeout(t);
      }
      return;
    }
    if (step === 3) {
      lastProfitTargetRef.current = values.profitTarget;
      const valueJustChanged =
        values.currentProfit !== lastCurrentProfitRef.current;
      const isPreset =
        values.currentProfit &&
        values.currentProfit !== "custom" &&
        valueJustChanged;
      lastCurrentProfitRef.current = values.currentProfit;
      if (isPreset) {
        const t = setTimeout(() => setStep(4), AUTO_ADVANCE_MS);
        return () => clearTimeout(t);
      }
      return;
    }
    if (step === 1 || step >= 4) {
      lastProfitTargetRef.current = values.profitTarget;
      lastCurrentProfitRef.current = values.currentProfit;
    }
  }, [step, values.profitTarget, values.currentProfit, setStep]);
  return null;
}

const TOTAL_STEPS = 5;

const PROFIT_TARGET_OPTIONS: { value: string; label: string }[] = [
  { value: "1_3k", label: "$1ʼ000 до $3ʼ000" },
  { value: "3_5k", label: "$3ʼ000 до $5ʼ000" },
  { value: "5_10k", label: "$5ʼ000 до $10ʼ000" },
  { value: "10k_plus", label: "$10ʼ000+" },
  { value: "custom", label: "Свой вариант" },
];

const CURRENT_PROFIT_OPTIONS: { value: string; label: string }[] = [
  { value: "500", label: "до $500" },
  { value: "500_800", label: "$500 - $800" },
  { value: "1k_1_5k", label: "$1ʼ000 - $1ʼ500" },
  { value: "1_5k_2_5k", label: "$1ʼ500 - $2ʼ500" },
  { value: "3k_5k", label: "$3ʼ000 - $5ʼ000" },
  { value: "5k_10k", label: "$5ʼ000 - $10ʼ000" },
  { value: "10k_plus", label: "$10ʼ000+" },
  { value: "custom", label: "Свой вариант" },
];

function getProfitTargetLabel(value: string): string {
  return PROFIT_TARGET_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

function getCurrentProfitLabel(value: string): string {
  return CURRENT_PROFIT_OPTIONS.find((o) => o.value === value)?.label ?? value;
}

export interface ValuesCallBackFormType {
  message: string;
  profitTarget: string;
  profitTargetCustom: string;
  currentProfit: string;
  currentProfitCustom: string;
  telegram: string;
  instagram: string;
}

interface CallBackFormProps {
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
  setIsPopUpShown?: Dispatch<SetStateAction<boolean>>;
  className?: string;
}

export default function CallBackForm({
  setIsError,
  setIsNotificationShown,
  setIsPopUpShown,
  className = "",
}: CallBackFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  const initialValues: ValuesCallBackFormType = {
    message: "",
    profitTarget: "",
    profitTargetCustom: "",
    currentProfit: "",
    currentProfitCustom: "",
    telegram: "",
    instagram: "",
  };

  const validationSchema = CallBackValidation();

  const submitForm = async (
    values: ValuesCallBackFormType,
    formikHelpers: FormikHelpers<ValuesCallBackFormType>
  ) => {
    const { resetForm } = formikHelpers;

    const profitTargetText =
      values.profitTarget === "custom"
        ? values.profitTargetCustom.trim()
        : getProfitTargetLabel(values.profitTarget);
    const currentProfitText =
      values.currentProfit === "custom"
        ? values.currentProfitCustom.trim()
        : getCurrentProfitLabel(values.currentProfit);

    const data =
      `<b>Форма "Оставьте свои контакты"</b>\n` +
      `<b>Сообщение:</b> ${values.message.trim()}\n` +
      `<b>На какую прибыль хотите выйти через 2-3 месяца:</b> ${profitTargetText}\n` +
      `<b>Текущая прибыль в месяц со всех проектов:</b> ${currentProfitText}\n` +
      `<b>Telegram:</b> ${values.telegram.trim()}\n` +
      `<b>Instagram:</b> ${values.instagram.trim()}\n`;

    try {
      setIsLoading(true);
      setIsError(false);

      await axios({
        method: "post",
        url: "/api/telegram",
        data,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Track successful form submission with Facebook Pixel
      trackFacebookPixel("purchase");

      if (setIsPopUpShown) {
        setIsPopUpShown(false);
      }
      resetForm();
      setIsNotificationShown(true);
    } catch (error) {
      setIsError(true);
      setIsNotificationShown(true);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitForm}
      validationSchema={validationSchema}
    >
      {(formikProps: FormikProps<ValuesCallBackFormType>) => {
        const {
          errors,
          touched,
          values,
          dirty,
          isValid,
          validateForm,
          validateField,
          setFieldTouched,
        } = formikProps;

        const handleNext = async (
          fieldNames: (keyof ValuesCallBackFormType) | (keyof ValuesCallBackFormType)[],
          nextStep: 2 | 3 | 4 | 5
        ) => {
          const names = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
          for (const name of names) {
            await validateField(name);
            setFieldTouched(name, true, true);
          }
          const formErrors = await validateForm();
          const hasError = names.some((name) => formErrors[name]);
          if (!hasError) {
            setStep(nextStep);
          }
        };

        const handleBack = () => {
          if (step > 1) {
            setStep((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5);
          }
        };

        const stepFields: (keyof ValuesCallBackFormType)[] = [
          "message",
          "profitTarget",
          "currentProfit",
          "telegram",
          "instagram",
        ];
        const currentFieldNames =
          step === 2 && values.profitTarget === "custom"
            ? (["profitTarget", "profitTargetCustom"] as (keyof ValuesCallBackFormType)[])
            : step === 3 && values.currentProfit === "custom"
              ? (["currentProfit", "currentProfitCustom"] as (keyof ValuesCallBackFormType)[])
              : [stepFields[step - 1]];

        return (
          <Form
            className={`${className} flex flex-col justify-between min-h-[500px]`}
          >
            <AutoAdvanceOnPreset step={step} setStep={setStep} />
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex flex-col gap-y-3.5"
            >
              {step === 1 && (
                <CustomizedInput
                  fieldName="message"
                  labelText="Что у вас за запрос?"
                  placeholder="Не могу заработать больше определенной суммы, как ни стараюсь. Как будто есть какой-то блок внутри."
                  as="textarea"
                  isRequired
                  errors={errors}
                  touched={touched}
                />
              )}

              {step === 2 && (
                <div className="flex flex-col gap-y-3">
                  <span className="mb-1 text-[16px] font-bold leading-[143%] text-black">
                    На какую прибыль хотите выйти через 2-3 месяца?
                  </span>
                  <div
                    className="flex flex-col gap-y-2.5"
                    role="radiogroup"
                    aria-label="Целевая прибыль"
                  >
                    {PROFIT_TARGET_OPTIONS.map((opt) =>
                      opt.value === "custom" ? (
                        <label
                          key={opt.value}
                          className={`flex cursor-pointer items-center gap-x-3 w-full h-[52px] px-6 rounded-[14px] border-[1.5px] outline-none transition duration-300 ease-out ${
                            values.profitTarget === "custom"
                              ? "border-black bg-transparent"
                              : "border-black/30"
                          }`}
                        >
                          <Field
                            type="radio"
                            name="profitTarget"
                            value={opt.value}
                            className="size-4 shrink-0 rounded-full border-2 border-black bg-transparent text-black focus:ring-0 focus:ring-offset-0 appearance-auto"
                          />
                          <span className="shrink-0 text-[12px] lg:text-[14px] font-normal leading-[143%] text-black/70">
                            Свой вариант:
                          </span>
                          <Field
                            name="profitTargetCustom"
                            type="text"
                            placeholder=""
                            className="min-w-0 flex-1 bg-transparent text-[12px] lg:text-[14px] font-normal leading-[143%] text-black placeholder:text-black/30 outline-none"
                            onClick={(e: React.MouseEvent) => {
                              formikProps.setFieldValue("profitTarget", "custom");
                              e.stopPropagation();
                            }}
                          />
                        </label>
                      ) : (
                        <label
                          key={opt.value}
                          className={`flex cursor-pointer items-center gap-x-3 w-full h-[52px] px-6 rounded-[14px] border-[1.5px] outline-none transition duration-300 ease-out ${
                            values.profitTarget === opt.value
                              ? "border-black"
                              : "border-black/30"
                          }`}
                        >
                          <Field
                            type="radio"
                            name="profitTarget"
                            value={opt.value}
                            className="size-4 shrink-0 rounded-full border-2 border-black bg-transparent text-black focus:ring-0 focus:ring-offset-0 appearance-auto"
                          />
                          <span className="text-[12px] lg:text-[14px] font-normal leading-[143%] text-black">
                            {opt.label}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                  {errors.profitTarget && touched.profitTarget && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.profitTarget}
                    </p>
                  )}
                  {values.profitTarget === "custom" &&
                    errors.profitTargetCustom &&
                    touched.profitTargetCustom && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.profitTargetCustom}
                      </p>
                    )}
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-y-3">
                  <span className="mb-1 text-[16px] font-bold leading-[143%] text-black">
                    На какую общую прибыль в месяц со всех проектов сейчас
                    удалось выйти?
                  </span>
                  <div
                    className="flex flex-col gap-y-2.5"
                    role="radiogroup"
                    aria-label="Текущая прибыль"
                  >
                    {CURRENT_PROFIT_OPTIONS.map((opt) =>
                      opt.value === "custom" ? (
                        <label
                          key={opt.value}
                          className={`flex cursor-pointer items-center gap-x-3 w-full h-[52px] px-6 rounded-[14px] border-[1.5px] outline-none transition duration-300 ease-out ${
                            values.currentProfit === "custom"
                              ? "border-black bg-transparent"
                              : "border-black/30"
                          }`}
                        >
                          <Field
                            type="radio"
                            name="currentProfit"
                            value={opt.value}
                            className="size-4 shrink-0 rounded-full border-2 border-black bg-transparent text-black focus:ring-0 focus:ring-offset-0 appearance-auto"
                          />
                          <span className="shrink-0 text-[12px] lg:text-[14px] font-normal leading-[143%] text-black/70">
                            Свой вариант:
                          </span>
                          <Field
                            name="currentProfitCustom"
                            type="text"
                            placeholder=""
                            className="min-w-0 flex-1 bg-transparent text-[12px] lg:text-[14px] font-normal leading-[143%] text-black placeholder:text-black/30 outline-none"
                            onClick={(e: React.MouseEvent) => {
                              formikProps.setFieldValue("currentProfit", "custom");
                              e.stopPropagation();
                            }}
                          />
                        </label>
                      ) : (
                        <label
                          key={opt.value}
                          className={`flex cursor-pointer items-center gap-x-3 w-full h-[52px] px-6 rounded-[14px] border-[1.5px] outline-none transition duration-300 ease-out ${
                            values.currentProfit === opt.value
                              ? "border-black"
                              : "border-black/30"
                          }`}
                        >
                          <Field
                            type="radio"
                            name="currentProfit"
                            value={opt.value}
                            className="size-4 shrink-0 rounded-full border-2 border-black bg-transparent text-black focus:ring-0 focus:ring-offset-0 appearance-auto"
                          />
                          <span className="text-[12px] lg:text-[14px] font-normal leading-[143%] text-black">
                            {opt.label}
                          </span>
                        </label>
                      )
                    )}
                  </div>
                  {errors.currentProfit && touched.currentProfit && (
                    <p className="mt-1 text-[10px] text-red-500">
                      {errors.currentProfit}
                    </p>
                  )}
                  {values.currentProfit === "custom" &&
                    errors.currentProfitCustom &&
                    touched.currentProfitCustom && (
                      <p className="mt-1 text-[10px] text-red-500">
                        {errors.currentProfitCustom}
                      </p>
                    )}
                </div>
              )}

              {step === 4 && (
                <CustomizedInput
                  fieldName="telegram"
                  labelText="Ваш ник в Телеграм через @"
                  placeholder="@tatiana_khavro"
                  as="textarea"
                  isRequired
                  errors={errors}
                  touched={touched}
                />
              )}

              {step === 5 && (
                <CustomizedInput
                  fieldName="instagram"
                  labelText="Ваш ник в Инстаграм через @"
                  placeholder="@tatiana_khavro"
                  as="textarea"
                  errors={errors}
                  touched={touched}
                />
              )}
            </motion.div>

            <div className="mt-4 flex flex-col gap-y-2.5">
              <div className="flex items-center justify-between gap-x-3">
                <span
                  className="text-[12px] font-normal leading-[143%] text-black/70 sm:shrink-0"
                  aria-live="polite"
                >
                  {step} / {TOTAL_STEPS}
                </span>

                {step === 1 ? (
                  <MainButton
                    type="button"
                    variant="black"
                    shape="pill"
                    className="h-[47px] w-full sm:max-w-[230px] sm:flex-1"
                    onClick={() => handleNext("message", 2)}
                  >
                    Далее
                  </MainButton>
                ) : (
                  <div className="flex flex-1 items-center justify-end gap-x-3 sm:max-w-[calc(230px+47px+12px)]">
                    <MainButton
                      type="button"
                      variant="white"
                      shape="square"
                      className="h-[47px] w-[47px] shrink-0 border border-black"
                      onClick={handleBack}
                    >
                      ←
                    </MainButton>

                    {step < TOTAL_STEPS ? (
                      <MainButton
                        type="button"
                        variant="black"
                        shape="pill"
                        className="h-[47px] w-[230px] shrink-0 sm:max-w-[230px]"
                        onClick={() => {
                          if (step === 2) {
                            handleNext(currentFieldNames, 3);
                          } else if (step === 3) {
                            handleNext(currentFieldNames, 4);
                          } else if (step === 4) {
                            handleNext("telegram", 5);
                          }
                        }}
                      >
                        Далее
                      </MainButton>
                    ) : (
                      <SubmitButton
                        dirty={dirty}
                        isValid={isValid}
                        isLoading={isLoading}
                        text="Отправить"
                        className="h-[47px] w-[230px] shrink-0 sm:max-w-[230px]"
                      />
                    )}
                  </div>
                )}
              </div>

              <p className="text-center text-[10px] lg:text-[12px] font-light leading-[140%] text-black/70">
                Вся работа абсолютно конфиденциальная. Информация не
                разглашается и не передается третим лицам.
              </p>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
