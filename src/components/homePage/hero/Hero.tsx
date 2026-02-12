import Image from "next/image";
import * as motion from "motion/react-client";
import HeroDecorations from "./HeroDecorations";
import Container from "../../shared/container/Container";

export default function Hero() {
  return (
    <div className="relative pb-[27px]">
      <HeroDecorations />
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src="/images/marina.webp"
            alt="hero"
            fill
            sizes="100vw"
            className="object-cover object-top"
            priority
          />
        </motion.div>
        <Image
          src="/images/fabric.webp"
          alt="fabric"
          fill
          sizes="100vw"
          className="-z-10 object-cover object-top"
        />
        <Image
          src="/images/noise.png"
          alt="noise"
          fill
          sizes="100vw"
          className="-z-10 object-cover object-top"
        />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-[-400px] w-[300%] h-[565px] blur-[70.85px] bg-bg-primary pointer-events-none" />
      </div>
      <Container className="pt-[222px] ssm:pt-[calc(100dvh*(222/360))] z-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative mb-[10px] font-actay font-bold text-[27px] leading-[126%] text-center uppercase text-white"
        >
          Диагностическая консультация
          <motion.span
            initial={{ opacity: 0, scale: 0.8, rotate: -6.31 }}
            animate={{ opacity: 1, scale: 1, rotate: -6.31 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-[-43px] left-[-13px] z-20 bg-white rounded-full flex items-center justify-center rotate-[-6.31deg] w-[156px] h-[43px] font-actay font-bold text-[16px] leading-none text-center uppercase text-purple-500 pt-[4px]"
          >
            Бесплатная
          </motion.span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[12px] leading-[125%] text-center text-white max-w-[228px] mx-auto"
        >
          по психологии денег и жизненных сценариев
        </motion.p>
      </Container>
    </div>
  );
}
