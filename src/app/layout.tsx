import type { Metadata } from "next";
import "./globals.css";
import SessionHandler from "@/components/SessionHandler";

export const metadata: Metadata = {
  title: "EncodeAI",
  description: "Official website of EncodeAI PESU",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-body antialiased">
        <SessionHandler>{children}</SessionHandler>
      </body>
    </html>
  );
}
