import type { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const actay = localFont({
  src: [
    {
      path: "../../public/fonts/ActayWide-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-actay",
  display: "swap",
  preload: true,
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Татьяна Хавро | Психолог — Консультации по психологии денег",
  description:
    "Бесплатная диагностическая консультация по психологии денег и жизненных сценариев. Выявление глубинных установок, которые мешают финансовому росту и развитию.",
  keywords: [
    "психолог",
    "психология денег",
    "консультация психолога",
    "Татьяна Хавро",
    "жизненные сценарии",
    "финансовая психология",
    "бесплатная консультация",
  ],
  authors: [{ name: "Татьяна Хавро" }],
  creator: "Татьяна Хавро",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: "Татьяна Хавро | Психолог — Консультации по психологии денег",
    description:
      "Бесплатная диагностическая консультация по психологии денег и жизненных сценариев. Выявление глубинных установок, которые мешают финансовому росту.",
    siteName: "Татьяна Хавро",
  },
  twitter: {
    card: "summary_large_image",
    title: "Татьяна Хавро | Психолог — Консультации по психологии денег",
    description:
      "Бесплатная диагностическая консультация по психологии денег и жизненных сценариев.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C011F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${montserrat.variable} ${actay.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
