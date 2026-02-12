import * as yup from "yup";
import { telegramRegex, instagramRegex } from "../regex/regex";

const profitTargetOptions = [
  "1_3k",
  "3_5k",
  "5_10k",
  "10k_plus",
  "custom",
];
const currentProfitOptions = [
  "500",
  "500_800",
  "1k_1_5k",
  "1_5k_2_5k",
  "3k_5k",
  "5k_10k",
  "10k_plus",
  "custom",
];

export const CallBackValidation = () => {
  const callBackFormValidationSchema = yup.object().shape({
    message: yup.string().required("Сообщение является обязательным"),
    profitTarget: yup
      .string()
      .oneOf(profitTargetOptions, "Выберите вариант или укажите свой")
      .required("Выберите вариант или укажите свой"),
    profitTargetCustom: yup.string().when("profitTarget", {
      is: "custom",
      then: (schema) =>
        schema.required("Укажите желаемую прибыль"),
      otherwise: (schema) => schema.notRequired(),
    }),
    currentProfit: yup
      .string()
      .oneOf(currentProfitOptions, "Выберите вариант или укажите свой")
      .required("Выберите вариант или укажите свой"),
    currentProfitCustom: yup.string().when("currentProfit", {
      is: "custom",
      then: (schema) =>
        schema.required("Укажите текущую прибыль"),
      otherwise: (schema) => schema.notRequired(),
    }),
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
