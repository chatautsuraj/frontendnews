export const LOCALES = ["ne", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "ne";

/** Map public URL category slugs → newsportalapi category slugs */
export const CATEGORY_ALIASES: Record<string, string> = {
  khel: "sports",
  sports: "sports",
};

/** Map API category slugs → preferred public URL slugs */
export const CATEGORY_PUBLIC_SLUGS: Record<string, string> = {
  sports: "khel",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function resolveCategorySlug(slug: string): string {
  return CATEGORY_ALIASES[slug] ?? slug;
}

export function publicCategorySlug(apiSlug: string): string {
  return CATEGORY_PUBLIC_SLUGS[apiSlug] ?? apiSlug;
}

export function withLocale(locale: string, path = ""): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `/${locale}`;
  return `/${locale}${normalized}`;
}
