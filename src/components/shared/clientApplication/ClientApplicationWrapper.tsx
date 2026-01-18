"use client";
import { useState, ReactNode, cloneElement, isValidElement } from "react";
import CallbackFormModal from "../modals/CallbackFormModal";
import { useTranslations } from "next-intl";
import NotificationModal from "../modals/NotificationModal";

interface ClientApplicationWrapperProps {
  children: ReactNode;
  source: string;
}

export default function ClientApplicationWrapper({
  children,
  source,
}: ClientApplicationWrapperProps) {
  const t = useTranslations();
  const [isPopUpShown, setIsPopUpShown] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  const handleClick = () => {
    setIsPopUpShown(true);
  };

  // Clone the child element and add onClick handler
  const buttonWithClick = isValidElement(children)
    ? cloneElement(children as React.ReactElement<any>, {
        onClick: (e: any) => {
          // Call original onClick if it exists
          const originalOnClick = (children as React.ReactElement<any>).props
            ?.onClick;
          if (typeof originalOnClick === "function") {
            originalOnClick(e);
          }
          handleClick();
        },
      })
    : children;

  return (
    <>
      {buttonWithClick}
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
