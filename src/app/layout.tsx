import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

export const metadata: Metadata = {
    title: "SDC 자동제어 매뉴얼",
    description: "SDC 자동제어 매뉴얼 페이지 입니다.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-spoqa text-[#181818] p-5 w-full max-w-[800px] mx-auto min-h-[100dvh] bg-grayish overflow-x-hidden">
                <Header />
                {children}
            </body>
        </html>
    );
}
