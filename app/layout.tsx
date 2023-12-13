import "@/app/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clerk Discord Warehouse",
  description: "A repository for Clerk Support Discord Posts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
