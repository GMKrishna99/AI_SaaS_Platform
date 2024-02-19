import type { Metadata } from "next";
import { Nunito, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const IBM_PLEX = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
});

export const metadata: Metadata = {
  title: "AI_Saas_App",
  description: "this site is useful for to generate images ext.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn("font-IBM_PLEX antialiased", IBM_PLEX.variable)}>
        {children}
      </body>
    </html>
  );
}
