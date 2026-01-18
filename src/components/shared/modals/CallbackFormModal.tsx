import { Dispatch, SetStateAction } from "react";
import CallBackForm from "../forms/CallBackForm";
import Modal from "./Modal";

interface CallbackFormModalProps {
  isPopUpShown: boolean;
  setIsPopUpShown: Dispatch<SetStateAction<boolean>>;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setIsNotificationShown: Dispatch<SetStateAction<boolean>>;
  title: string;
  description: string;
  source?: string;
}

export default function CallbackFormModal({
  isPopUpShown,
  setIsPopUpShown,
  setIsError,
  setIsNotificationShown,
  title,
  description,
  source,
}: CallbackFormModalProps) {
  return (
    <Modal isModalShown={isPopUpShown} setIsModalShown={setIsPopUpShown}>
      <h3 className="mb-4.5 font-actay text-[24px] xl:text-[32px] font-bold uppercase leading-[122%] text-center text-black">
        {title}
      </h3>
      <p className="mb-[51px] text-[12px] lg:text-[16px] font-light leading-[122%] text-center text-black">
        {description}
      </p>
      <CallBackForm
        setIsPopUpShown={setIsPopUpShown}
        setIsError={setIsError}
        setIsNotificationShown={setIsNotificationShown}
        source={source}
      />
    </Modal>
  );
}
