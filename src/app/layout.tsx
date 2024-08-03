import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
const inter = Comfortaa({
  subsets: ["latin"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "Pronsh",
  description: "Welcom to Pronsh's personal website",
  keywords: [
    "pronsh",
    "personal",
    "website",
    "portfolio",
    "AI",
    "ML",
    "Fullstack",
    "Developer",
    "Software",
    "Engineer",
    "Coder",
    "coding",
    "Frontend",
    "Backend",
  ],
  generator: "Next.js",
  creator: "Pronsh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <Toaster />
        <SpeedInsights />
        <Analytics mode={"production"} />
      </body>
    </html>
  );
}
