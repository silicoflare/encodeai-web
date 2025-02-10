import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURA - Adapting to the Future",
  description: "Official website of AURA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-heading antialiased">{children}</body>
    </html>
  );
}
