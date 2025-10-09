import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolageGrotesqueLight = Bricolage_Grotesque({
  variable: "--font-bricolage-light",
  subsets: ["latin"],
  weight: "300",
});

const bricolageGrotesqueExtrabold = Bricolage_Grotesque({
  variable: "--font-bricolage-extrabold",
  subsets: ["latin"],
  weight: "800",
});

export const metadata: Metadata = {
  title: "Xispita - Bebidas Naturales y Refrescantes",
  description: "Xispita - Una marca de bebidas naturales y refrescantes",
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="overflow-x-hidden">
      <body
        className={`${bricolageGrotesqueLight.variable} ${bricolageGrotesqueExtrabold.variable} antialiased overflow-x-hidden`}
        style={{ fontFamily: 'var(--font-bricolage-light)' }}
      >
        {children}
      </body>
    </html>
  );
}
