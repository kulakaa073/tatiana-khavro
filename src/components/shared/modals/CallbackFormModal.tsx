import { Dispatch, SetStateAction } from "react";
import CallBackForm from "../forms/CallBackForm";
import Modal from "./Modal";
import Image from "next/image";

interface CallbackFormModalProps {
  isPopUpShown: boolean;
  setIsPopUpShown: Dispatch<SetStateAction<boolean>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
}

export default function CallbackFormModal({
  isPopUpShown,
  setIsPopUpShown,
  setIsError,
  setIsNotificationShown,
}: CallbackFormModalProps) {
  return (
    <Modal isModalShown={isPopUpShown} setIsModalShown={setIsPopUpShown}>
      <div className="absolute inset-0 -z-10 pointer-events-none w-full h-full">
        <Image src="/images/fabric-form.webp" alt="fabric-form" fill sizes="100vw" className="object-cover object-top" />
      </div>
      {isPopUpShown && (
        <CallBackForm
          setIsPopUpShown={setIsPopUpShown}
          setIsError={setIsError}
          setIsNotificationShown={setIsNotificationShown}
        />
      )}
    </Modal>
  );
}
