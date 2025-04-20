// app/layout.js
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";

const roboto = Roboto({ weight: ["300","400","500","700","900"], variable: "--font-roboto", subsets: ["latin"] });
const robotoMono = Roboto_Mono({ weight: ["400","500","700"], variable: "--font-roboto-mono", subsets: ["latin"] });

export const metadata = {
  title: "Civil Engineering Resource Hub",
  description: "Centralized Academic Resources for Civil Engineering Students",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${robotoMono.variable} antialiased`} suppressHydrationWarning>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}