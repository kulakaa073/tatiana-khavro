import Container from "../../shared/container/Container";
import Image from "next/image";
import * as motion from "motion/react-client";

const services = [
  {
    description:
      "Выявим глубинные сценарии, которые незаметно саботируют деньги, проявленность и рост",
  },
  {
    description:
      "Посмотрим, какие внутренние установки удерживают вас в повторяющихся ситуациях",
  },
  {
    description:
      "Найдём, где решения принимаются не\nиз реальности, а из старых программ и страхов",
  },
  {
    description:
      "Поймём, что именно сейчас мешает выйти на новый уровень — в доходе\nи жизни",
  },
];

export default function Services() {
  return (
    <Container className="mb-[10px]">
      <motion.ul
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.1,
            },
          },
        }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[5px] text-purple-light"
      >
        {services.map((service, index) => (
          <motion.li
            key={index}
            variants={{
              hidden: { opacity: 0, y: 30, scale: 0.95 },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: {
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1],
                },
              },
            }}
            className="relative rounded-[8px] w-full h-[56px] px-[14px] flex items-center gap-[14px]
                    bg-linear-to-r from-[rgba(12, 1, 31, 0.13)] to-[rgba(106, 47, 255, 0.13)]"
          >
            <div
              className="absolute z-10 inset-0 rounded-[8px] pointer-events-none"
              style={{
                background: "linear-gradient(90deg, var(--color-purple-dark) 0%, var(--color-purple-600) 100%)",
                padding: "1.5px",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              }}
            />
            <div className="relative size-[28px] flex items-center justify-center">
              <Image
                src="/images/star.svg"
                alt="service"
                fill
              />
            </div>
            <p className="text-[10px] leading-[120%] text-purple-light max-w-[221px] whitespace-pre-line">
              {service.description}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </Container>
  );
}
