import type { Metadata } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";


import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const notoThai = Noto_Sans_Thai({
  subsets: ["thai"],
  variable: "--font-noto-thai",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Age → Food Recommender",
  description: "ระบบแนะนำอาหารตามอายุ พร้อมเหตุผลด้านโภชนาการ",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${notoThai.variable} font-sans min-h-screen bg-dots`}
      >
        <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
          <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-indigo-600 text-white grid place-items-center shadow-soft animate-pulseSoft">
                🍽️
              </div>
              <span className="font-semibold">Age → Food Recommender</span>
            </div>
            <div className="hidden md:flex items-center gap-2">
              <a className="btn sheen" href="/">หน้าแรก</a>
              <a className="btn sheen" href="#results">ผลลัพธ์</a>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10 space-y-10">
          {children}
        </main>

        <footer className="border-t border-slate-200 bg-white/70 backdrop-blur">
          <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-slate-600 flex flex-col md:flex-row items-center justify-between">
            <span>*ข้อมูลนี้เป็นคำแนะนำทั่วไป ไม่ใช่การวินิจฉัยทางการแพทย์</span>
            <span className="mt-2 md:mt-0 text-slate-500">
              Dev by <span className="font-semibold text-indigo-600">Satyr</span>
            </span>
          </div>
        </footer>

      </body>
    </html>
  );
}
