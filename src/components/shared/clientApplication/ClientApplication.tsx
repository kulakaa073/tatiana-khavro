"use client";
import { useState } from "react";
import * as motion from "motion/react-client";
import MainButton from "@/components/shared/buttons/MainButton";
import CallbackFormModal from "../modals/CallbackFormModal";
import { useTranslations } from "next-intl";
import NotificationModal from "../modals/NotificationModal";

interface ClientApplicationProps {
  buttonText: string;
  variant?: "pink" | "blue" | "gradient" | "white";
  className?: string;
  buttonClassName?: string;
  variants?: {};
  source?: string;
}

export default function ClientApplication({
  buttonText,
  variant = "white",
  className = "",
  buttonClassName = "",
  variants = {},
  source,
}: ClientApplicationProps) {
  const t = useTranslations();
  const [isPopUpShown, setIsPopUpShown] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  return (
    <>
      <motion.div
        initial="hidden"
        whileInView="visible"
        exit="exit"
        viewport={{ once: true, amount: 0.1 }}
        variants={variants}
        className={className}
      >
        <MainButton
          variant={variant}
          onClick={() => setIsPopUpShown(true)}
          className={buttonClassName}
        >
          {buttonText}
        </MainButton>
      </motion.div>
      <CallbackFormModal
        isPopUpShown={isPopUpShown}
        setIsPopUpShown={setIsPopUpShown}
        setIsNotificationShown={setIsNotificationShown}
        setIsError={setIsError}
        title={t("modals.leaveContacts")}
        description={t("modals.fillData")}
        source={source}
      />
      <NotificationModal
        title={isError ? t("modals.errorTitle") : t("modals.successTitle")}
        description={
          isError
            ? t("modals.errorDescription")
            : t("modals.successDescription")
        }
        isPopUpShown={isNotificationShown}
        setIsPopUpShown={setIsNotificationShown}
      />
    </>
  );
}
