import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import "./globals.css";
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
      <head>
        <meta name="google-site-verification" content="q-RBVfbqO8BeEqQVupN9UX61u8_ATp-bEtEl2embWO4" />
      </head>
      <body className={inter.className + " selection:bg-slate-300 selection:bg-opacity-20"}>
        {children}
        <Toaster />
        <SpeedInsights />
        <Analytics mode={"production"} />
      </body>
    </html>
  );
}
