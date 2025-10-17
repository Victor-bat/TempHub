import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Inter, Lexend } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });


export const metadata: Metadata = {
  title: "TempHub",
  description: "Find temporary work and workers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: "dark" }} suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased",
          inter.variable,
          lexend.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
