import type { Metadata } from "next";
import { Inter, Geist_Mono, Geist } from "next/font/google";
import "../../app/globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Work It",
    description: "A workout app designed to help you reach your full potential",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={cn("font-sans", geist.variable)}>
            <body className={`${geist.variable} ${geist.className} ${geistMono.variable} antialiased`}>
                <div className="flex flex-1 min-w-0 flex-col">
                    {children}
                </div>
            </body>
        </html>
    );
}
