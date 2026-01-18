import Image from "next/image";
import HeroDecorations from "./HeroDecorations";

export default function Hero() {
  return (
    <div className="relative">
      <HeroDecorations />
      <div>
        <Image src="/images/hero/marina.webp" alt="hero" width={1000} height={1000} className="w-full h-full object-cover" />
      </div>
      <h1 className="font-actay text-[27px] leading-[126%] text-center uppercase text-white">Диагностическая консультация</h1>
      <p className="text-[12px] leading-[125%] text-center text-white">по психологии денег и жизненных сценариев</p>
    </div>
  );
}