import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/smooth-scroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "Rayyan Lakhani",
  description: "Welcome to my personal website!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inline script — runs synchronously before React hydrates so the theme
  // is applied without a flash. Defaults to dark; respects a user choice
  // saved in localStorage.
  const themeBoot = `
    (function () {
      try {
        var t = localStorage.getItem('theme');
        var d = document.documentElement;
        if (t === 'light') d.classList.remove('dark');
        else d.classList.add('dark');
      } catch (_) {
        document.documentElement.classList.add('dark');
      }
    })();
  `;

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} antialiased scanlines`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}