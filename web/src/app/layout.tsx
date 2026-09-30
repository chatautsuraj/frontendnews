import type { Metadata } from "next";
import { Khand, Mukta } from "next/font/google";
import { site } from "@/data/mock";
import "./globals.css";

const mukta = Mukta({
  variable: "--font-mukta",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
});

const khand = Khand({
  variable: "--font-khand",
  subsets: ["devanagari", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: `${site.nameEn} :: Nepal's news portal`,
  description: `${site.nameEn} (${site.name}) — ${site.tagline}`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ne" className={`${mukta.variable} ${khand.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
