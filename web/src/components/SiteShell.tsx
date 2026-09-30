import { getPublicCategories } from "@/lib/api";
import type { Locale } from "@/lib/locale";
import { publicCategorySlug, withLocale } from "@/lib/locale";
import type { NavItem } from "@/lib/types";
import { BackToTop } from "./BackToTop";
import { Footer } from "./Footer";
import { Header } from "./Header";

async function loadNav(locale: Locale): Promise<NavItem[]> {
  const categories = await getPublicCategories();

  const primary = categories.slice(0, 6).map((c) => ({
    label: c.name === "Sports" ? "खेल" : c.name,
    href: withLocale(locale, `/${publicCategorySlug(c.slug)}`),
  }));
  const more = categories.slice(6).map((c) => ({
    label: c.name,
    href: withLocale(locale, `/${publicCategorySlug(c.slug)}`),
  }));

  const nav: NavItem[] = [
    { label: "होमपेज", href: withLocale(locale) },
    ...primary,
  ];
  if (more.length) {
    nav.push({
      label: "अन्य",
      href: more[0].href,
      children: more,
    });
  }
  return nav;
}

export async function SiteShell({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const navItems = await loadNav(locale);

  return (
    <>
      <Header navItems={navItems} locale={locale} />
      <main id="content" className="flex-1 pb-8">
        {children}
      </main>
      <Footer locale={locale} />
      <BackToTop />
    </>
  );
}
