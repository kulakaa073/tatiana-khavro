"use client";
import { useState } from "react";
import * as motion from "motion/react-client";
import MainButton from "../../shared/buttons/MainButton";
import Container from "../../shared/container/Container";
import CallbackFormModal from "../../shared/modals/CallbackFormModal";
import NotificationModal from "../../shared/modals/NotificationModal";

export default function SignUp() {
  const [isPopUpShown, setIsPopUpShown] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isNotificationShown, setIsNotificationShown] = useState(false);
  return (
    <>
      <Container className="relative pb-[19px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute -z-10 left-1/2 -translate-x-1/2 bottom-[-505px] w-[771px] h-[565px] blur-[70.85px] bg-bg-glow"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <MainButton variant="white" className="w-full h-[52px] rounded-full" onClick={() => setIsPopUpShown(true)}>Записаться на консультацию</MainButton>
        </motion.div>
      </Container >
      <CallbackFormModal
        isPopUpShown={isPopUpShown}
        setIsPopUpShown={setIsPopUpShown}
        setIsNotificationShown={setIsNotificationShown}
        setIsError={setIsError}
      />
      <NotificationModal
        isPopUpShown={isNotificationShown}
        setIsPopUpShown={setIsNotificationShown}
        isError={isError}
      />
    </>
  );
}
