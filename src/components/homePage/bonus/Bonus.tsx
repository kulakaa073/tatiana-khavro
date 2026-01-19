import Image from "next/image";
import Container from "../../shared/container/Container";
import * as motion from "motion/react-client";

export default function Bonus() {
  return (
    <Container className="mb-[16px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative flex items-center gap-4 h-[57px] rounded-[8px]
            bg-linear-to-r from-purple-700 to-purple-800 px-[14px]"
      >
        <div
          className="absolute z-10 inset-0 rounded-[8px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, var(--color-purple-darker) 0%, var(--color-purple-500) 100%)",
            padding: "1.5px",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: 1.35, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute z-10 right-[-14px] -top-11 w-[67px] h-[67px]"
        >
          <Image src="/images/giftbox.svg" alt="bonus" width={67} height={67} />
        </motion.div>
        <h2
          className="font-actay font-bold text-[27px] leading-none text-center uppercase pt-[7px]"
          style={{
            background:
              "linear-gradient(94.78deg, #FFFFFF 3.86%, var(--color-purple-accent) 149%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Бонус
        </h2>
        <p className="text-[10px] leading-[120%] text-purple-light">
          мини-видео «Сценарии прошлого: как они управляют настоящим»
        </p>
      </motion.div>
    </Container>
  );
}
