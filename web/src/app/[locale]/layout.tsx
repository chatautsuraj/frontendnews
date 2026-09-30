import { notFound } from "next/navigation";
import { SiteShell } from "@/components/SiteShell";
import { isLocale, LOCALES, type Locale } from "@/lib/locale";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  return <SiteShell locale={locale}>{children}</SiteShell>;
}
