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
import Image from "next/image";

interface ModalProps {
  isModalShown: boolean;
  setIsModalShown: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
  variant?: "default" | "image";
}

export default function Modal({
  isModalShown,
  setIsModalShown,
  children,
  className = "bg-white",
  variant = "default",
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const isImageVariant = variant === "image";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Prevent body scroll when image modal is open
    if (isImageVariant && isModalShown) {
      document.body.style.overflow = "hidden";
    } else if (isImageVariant) {
      document.body.style.overflow = "";
    }
    return () => {
      if (isImageVariant) {
        document.body.style.overflow = "";
      }
    };
  }, [isImageVariant, isModalShown]);

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed z-[9998] inset-0 w-dvw h-dvh transition ease-in-out ${
          isImageVariant ? "duration-300" : "duration-[1000ms]"
        } ${
          isModalShown
            ? "opacity-100 no-doc-scroll"
            : "opacity-0 pointer-events-none"
        } ${isImageVariant ? "bg-black/90" : "bg-black/44"}`}
        onClick={() => setIsModalShown(false)}
      />

      {/* Modal */}
      <div
        className={`${
          isModalShown
            ? isImageVariant
              ? "opacity-100 scale-100"
              : " -translate-y-[calc(50dvh-50%)] opacity-100 scale-100"
            : "pointer-events-none opacity-0 scale-90"
        } fixed left-1/2 ${
          isImageVariant
            ? "top-1/2 transform -translate-x-1/2 -translate-y-1/2"
            : "bottom-0 transform -translate-x-1/2"
        } transition ease-out z-[9999] ${
          isImageVariant ? "duration-300" : "duration-[600ms]"
        } ${
          isImageVariant
            ? "w-[90vw] max-w-[90vw] h-[90vh] max-h-[90vh] flex items-center justify-center p-4"
            : "w-[82%] max-w-[470px] lg:max-w-[512px] max-h-dvh px-5 lg:px-[68px] pt-12 lg:pt-[65px] pb-5 lg:pb-15 overflow-y-auto rounded-[8px] scrollbar scrollbar-w-[3px] scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-transparent scrollbar-track-blue-light popup-scroll shadow-md"
        } ${className}`}
        onClick={isImageVariant ? (e) => e.stopPropagation() : undefined}
      >
        {!isImageVariant && (
          <Image
            src="/images/modal/background.webp"
            alt="background"
            fill
            sizes="(max-width: 1024px) 470px, 512px"
            className="-z-10 object-cover object-top-left mix-blend-luminosity"
          />
        )}
        <IconButton
          handleClick={() => setIsModalShown(false)}
          className={`absolute top-4 right-4 z-50 ${isImageVariant ? "size-8 lg:size-10 text-white hover:scale-110 transition-transform" : "size-6 text-black"}`}
        >
          {<CrossIcon />}
        </IconButton>

        {children}
      </div>
    </>,
    document.body
  );
}
