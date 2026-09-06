import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clutch Cabinets Oregon Project Radar",
  description: "Oregon Multifamily & Casework Sales Intelligence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
