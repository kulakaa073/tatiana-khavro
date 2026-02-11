"use client";
import { Form, Formik, FormikHelpers, FormikProps } from "formik";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { CallBackValidation } from "../../../schemas/CallbackValidation";
import { trackFacebookPixel } from "../../../utils/facebookPixel";

import CustomizedInput from "../formComponents/CustomizedInput";
import SubmitButton from "../formComponents/SubmitButton";
import MainButton from "../buttons/MainButton";

export interface ValuesCallBackFormType {
  message: string;
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
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isStepAnimating, setIsStepAnimating] = useState(true);

  useEffect(() => {
    setIsStepAnimating(true);
    const timeoutId = setTimeout(() => {
      setIsStepAnimating(false);
    }, 250);

    return () => clearTimeout(timeoutId);
  }, [step]);

  const initialValues = {
    message: "",
    telegram: "",
    instagram: "",
  };

  const validationSchema = CallBackValidation();

  const submitForm = async (
    values: ValuesCallBackFormType,
    formikHelpers: FormikHelpers<ValuesCallBackFormType>
  ) => {
    const { resetForm } = formikHelpers;
    const data =
      `<b>Форма "Оставьте свои контакты"</b>\n` +
      `<b>Сообщение:</b> ${values.message.trim()}\n` +
      `<b>Telegram:</b> ${values.telegram.trim()}\n` +
      `<b>Instagram:</b> ${values.instagram.trim()}\n` +
      "";
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
      trackFacebookPixel("Lead");

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
          dirty,
          isValid,
          validateForm,
          validateField,
          setFieldTouched,
        } = formikProps;

        const handleNext = async (
          fieldName: keyof ValuesCallBackFormType,
          nextStep: 2 | 3
        ) => {
          await validateField(fieldName);
          setFieldTouched(fieldName, true, true);
          const formErrors = await validateForm();

          if (!formErrors[fieldName]) {
            setStep(nextStep);
          }
        };

        const handleBack = () => {
          if (step > 1) {
            setStep(prev => (prev - 1) as 1 | 2 | 3);
          }
        };

        return (
          <Form
            className={`${className} flex flex-col justify-between min-h-[500px]`}
          >
            <div
              className={`flex flex-col gap-y-3.5 transform transition-all duration-300 ease-out ${
                isStepAnimating
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
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

              {step === 3 && (
                <CustomizedInput
                  fieldName="instagram"
                  labelText="Ваш ник в Инстаграм через @"
                  placeholder="@tatiana_khavro"
                  as="textarea"
                  errors={errors}
                  touched={touched}
                />
              )}
            </div>

            <div className="mt-4 flex flex-col gap-y-2.5">
              {step === 1 ? (
                <MainButton
                  type="button"
                  variant="black"
                  shape="pill"
                  className="h-[47px] w-full"
                  onClick={() =>
                    handleNext("message", 2)
                  }
                >
                  Далее
                </MainButton>
              ) : (
                <div className="flex items-center justify-between gap-x-3">
                  <MainButton
                    type="button"
                    variant="white"
                    shape="square"
                    className="h-[47px] w-[47px] border border-black"
                    onClick={handleBack}
                  >
                    ←
                  </MainButton>

                  {step < 3 ? (
                    <MainButton
                      type="button"
                      variant="black"
                      shape="pill"
                      className="h-[47px] w-full"
                      onClick={() =>
                        handleNext("telegram", 3)
                      }
                    >
                      Далее
                    </MainButton>
                  ) : (
                    <SubmitButton
                      dirty={dirty}
                      isValid={isValid}
                      isLoading={isLoading}
                      text="Отправить"
                      className="h-[47px] w-full"
                    />
                  )}
                </div>
              )}

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
