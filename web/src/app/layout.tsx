import type { Metadata } from "next";
import { Khand, Mukta } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
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
  title: `${site.nameEn} :: Nepal's Premium news portal`,
  description: `${site.name} — ${site.tagline}. Frontend clone with mock data.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ne" className={`${mukta.variable} ${khand.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans antialiased bg-background text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
