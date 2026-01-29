import type { Metadata } from "next";
import { Syne, Quicksand, JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { DebugProvider } from "@/components/debug/DebugEngine";

const syne = Syne({ 
  subsets: ["latin"],
  variable: "--font-nexus-header",
  weight: ["400", "500", "600", "700", "800"],
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-nexus-soft",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-nexus-mono",
});

export const metadata: Metadata = {
  title: "VirtuaCity Nexus | Where every world connects",
  description: "The official front door of the VirtuaCity Nexus platform. Clean, cinematic, and future-proof.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${syne.variable} ${quicksand.variable} ${jetbrainsMono.variable} font-soft bg-nexus-dark text-white min-h-screen antialiased`}>
        <DebugProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </DebugProvider>
      </body>
    </html>
  );
}
