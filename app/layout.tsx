import type { Metadata } from "next";
import { Inter, Open_Sans, Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { ReactQueryProvider } from "@/providers/query-provider";
import { siteConfig } from "@/shared/config/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  applicationName: siteConfig.name,
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`${inter.variable} ${poppins.variable} ${openSans.variable} h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full`}>
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
