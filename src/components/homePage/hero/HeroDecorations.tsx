import Image from "next/image";

export default function HeroDecorations() {
    return (
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-[100px] h-auto">
                <Image src="/images/frame-top-left.webp" alt="decoration" width={100} height={111} />
            </div>
            <div className="absolute top-0 right-0 w-[100px] h-auto">
                <Image src="/images/frame-top-right.webp" alt="decoration" width={100} height={111} />
            </div>
            <div className="absolute -top-3 left-[-6px] w-[192px] h-auto">
                <Image src="/images/drop-purple.webp" alt="decoration" width={192} height={192} />
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 top-17 w-[283px] h-[283px]"
            style={{
                background: "linear-gradient(184.47deg, #7640FF 3.63%, #000000 79.46%)",
                }} />
            <div className="absolute left-1/2 -translate-x-1/2 top-[3.5px] w-[312px] h-[312px] blur-[20.1544px]"
            style={{
                background: "linear-gradient(184.47deg, #7640FF 3.63%, #000000 79.46%)",
            }} />
        </div>
    );
}