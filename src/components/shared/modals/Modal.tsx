import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

import IconButton from "../buttons/IconButton";
import CrossIcon from "../icons/CrossIcon";

interface ModalProps {
  isModalShown: boolean;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
}

export default function Modal({
  isModalShown,
  setIsModalShown,
  children,
  className = "bg-white",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMounted(true);
    }, 0);
  }, []);

  useEffect(() => {
    // Prevent body scroll when image modal is open
    if (isModalShown) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalShown]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed z-9998 inset-0 w-dvw h-dvh transition ease-in-out duration-1000"
          } ${isModalShown
            ? "opacity-100 no-doc-scroll"
            : "opacity-0 pointer-events-none"
          } bg-black/44`}
        onClick={() => setIsModalShown(false)}
      />

      {/* Modal */}
      <div
        className={`${isModalShown
          ? " -translate-y-[calc(50dvh-50%)] opacity-100 scale-100"
          : "pointer-events-none opacity-0 scale-90"
          } fixed left-1/2 bottom-0 transform -translate-x-1/2 transition ease-out z-9999 duration-600 w-[87%] max-w-[470px] lg:max-w-[512px] max-h-dvh px-5 lg:px-[68px] pt-15 lg:pt-[65px] pb-5 lg:pb-15 overflow-y-auto rounded-[8px] scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-transparent scrollbar-track-blue-light popup-scroll shadow-md ${className}`}
        onClick={e => e.stopPropagation()}
      >
        <IconButton
          handleClick={() => setIsModalShown(false)}
          className={`absolute top-4 right-4 z-50 size-6 text-black hover:scale-110 transition-transform`}
        >
          {<CrossIcon />}
        </IconButton>

        {children}
      </div>
    </>,
    document.body
  );
}
