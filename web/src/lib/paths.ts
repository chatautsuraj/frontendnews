import { publicCategorySlug, withLocale } from "@/lib/locale";
import type { Article } from "@/lib/types";

export function homeHref(locale: string) {
  return withLocale(locale);
}

export function categoryHref(locale: string, categorySlug: string) {
  return withLocale(locale, `/${publicCategorySlug(categorySlug)}`);
}

export function articleHref(locale: string, article: Pick<Article, "slug" | "category">) {
  const cat = publicCategorySlug(article.category.slug);
  return withLocale(locale, `/${cat}/${article.slug}`);
}

export function pageHref(locale: string, page: string) {
  return withLocale(locale, `/${page.replace(/^\//, "")}`);
}
