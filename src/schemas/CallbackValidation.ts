import * as yup from "yup";
import { telegramRegex, instagramRegex } from "../regex/regex";

export const CallBackValidation = () => {
  const callBackFormValidationSchema = yup.object().shape({
    message: yup.string().required("Сообщение является обязательным"),
    telegram: yup
      .string()
      .matches(
        telegramRegex,
        "Telegram должен быть в формате @username и содержать минимум 3 символа после @"
      )
      .required("Telegram является обязательным"),
    instagram: yup
      .string()
      .matches(
        instagramRegex,
        "Instagram должен быть в формате @username и содержать минимум 3 символа после @"
      ),
  });

  return callBackFormValidationSchema;
};
