import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

export const metadata: Metadata = {
  title: "ANBV | Anubhav Pandey",
  description:
    "The personal engineering operating system of Anubhav Pandey, a full-stack developer and open-source contributor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#08090b] text-white">{children}</body>
    </html>
  );
}
