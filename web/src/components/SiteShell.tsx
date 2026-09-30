import { getApiConfig, getPublicCategories } from "@/lib/api";
import type { NavItem } from "@/lib/types";
import { mainNav as defaultNav } from "@/data/mock";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { BackToTop } from "./BackToTop";

async function loadNav(): Promise<NavItem[]> {
  const { hasPortalKey } = getApiConfig();
  if (!hasPortalKey) return defaultNav;

  try {
    const categories = await getPublicCategories();
    if (!categories.length) return defaultNav;

    const primary = categories.slice(0, 6).map((c) => ({
      label: c.name,
      href: `/category/${c.slug}`,
    }));
    const more = categories.slice(6).map((c) => ({
      label: c.name,
      href: `/category/${c.slug}`,
    }));

    const nav: NavItem[] = [{ label: "होमपेज", href: "/" }, ...primary];
    if (more.length) {
      nav.push({
        label: "अन्य",
        href: more[0].href,
        children: more,
      });
    }
    return nav;
  } catch {
    return defaultNav;
  }
}

export async function SiteShell({ children }: { children: React.ReactNode }) {
  const navItems = await loadNav();

  return (
    <>
      <Header navItems={navItems} />
      <main id="content" className="flex-1 pb-8">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
