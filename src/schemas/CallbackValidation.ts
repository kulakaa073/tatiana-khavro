import * as yup from "yup";
import { nameRegex, telegramRegex, instagramRegex } from "../regex/regex";

export const CallBackValidation = () => {

  const callBackFormValidationSchema = yup.object().shape({
    name: yup
      .string()
      .min(2, "Имя должно быть не менее 2 символов")
      .max(30, "Имя должно быть не более 30 символов")
      .matches(nameRegex, "Имя должно содержать только буквы")
      .required("Имя является обязательным"),
    telegram: yup
      .string()
      .min(5, "Имя пользователя Telegram должно быть не менее 5 символов")
      .max(32, "Имя пользователя Telegram должно быть не более 32 символов")
      .matches(telegramRegex, "Telegram должен быть в формате @username")
      .required("Telegram является обязательным"),
    instagram: yup
      .string()
      .min(1, "Имя пользователя Instagram должно быть не менее 1 символа")
      .max(30, "Имя пользователя Instagram должно быть не более 30 символов")
      .matches(instagramRegex, "Instagram должен быть в формате @username"),
    message: yup.string().required("Сообщение является обязательным"),
  });

  return callBackFormValidationSchema;
};
