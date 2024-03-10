import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { AuthNav } from "./auth-nav";

// Font files can be colocated inside of `app`
const satoshi = localFont({
  src: "../assets/Satoshi-Variable.ttf",
  display: "swap",
  variable: "--font-satoshi",
});
const cabinetGrotesk = localFont({
  src: "../assets/CabinetGrotesk-Extrabold.woff2",
  display: "swap",
  variable: "--font-cabinet-grotesk",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html
      lang="en"
      className={cn(satoshi.variable, cabinetGrotesk.variable, "")}
    >
      <body className="font-sans">
        <div className="fixed inset-0 -z-20 overflow-y-auto bg-grid-small-black/[0.1] dark:bg-grid-small-white/[0.1]" />
        <div className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center bg-card [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black)]"></div>

        <main className="mx-auto max-w-lg space-y-2 sm:max-w-2xl lg:max-w-5xl">
          <AuthNav user={session?.user} />
          {children}
        </main>
      </body>
    </html>
  );
}
