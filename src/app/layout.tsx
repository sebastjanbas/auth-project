import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth Tutorial",
  description: "Authentication tutorial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
        {children}
      </body>
    </html>
  );
}
