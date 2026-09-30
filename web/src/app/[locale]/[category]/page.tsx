import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublicCategories, getPublicFeed } from "@/lib/api";
import {
  isLocale,
  publicCategorySlug,
  resolveCategorySlug,
  type Locale,
} from "@/lib/locale";
import { articleHref } from "@/lib/paths";
import type { Article, Category } from "@/lib/types";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: string; category: string }>;
};

async function resolveCategory(slug: string): Promise<Category | null> {
  const apiSlug = resolveCategorySlug(slug);
  const live = await getPublicCategories();
  const found = live.find(
    (c) => c.slug === apiSlug || c.slug === slug || publicCategorySlug(c.slug) === slug,
  );
  if (!found) return null;

  return {
    ...found,
    // Keep public slug in URL-facing fields when aliased
    slug: publicCategorySlug(found.slug) === slug ? slug : found.slug,
    name: found.name === "Sports" && slug === "khel" ? "खेल" : found.name,
  };
}

async function resolveArticles(slug: string): Promise<Article[]> {
  const feed = await getPublicFeed({ category: slug, limit: 30 });
  return feed.items;
}

export async function generateMetadata({ params }: PageProps) {
  const { category: slug } = await params;
  const category = await resolveCategory(slug);
  return {
    title: category ? `${category.name} | The Nagarik` : "श्रेणी",
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { locale: raw, category: slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const category = await resolveCategory(slug);
  if (!category) notFound();

  const list = await resolveArticles(slug);

  return (
    <div className="container-xl px-2 md:px-0 mt-6 mb-10">
      <header className="mb-6 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
          {category.name}
        </h1>
        <span className="section-underline text-primary" />
      </header>

      {list.length === 0 ? (
        <p className="text-center text-muted text-lg py-16">
          यस श्रेणीमा अहिले कुनै प्रकाशित समाचार छैन।
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {list.map((article) => (
            <article key={article.id} className="group border border-line p-3 rounded-sm">
              <Link href={articleHref(locale, article)} className="block">
                <Image
                  src={article.image}
                  alt={article.imageAlt}
                  width={900}
                  height={500}
                  className="aspect-video w-full object-cover rounded-sm"
                />
              </Link>
              <h2 className="mt-3">
                <Link
                  href={articleHref(locale, article)}
                  className="story-title font-bold text-xl md:text-2xl leading-snug line-clamp-3"
                >
                  {article.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted line-clamp-2">{article.excerpt}</p>
              <p className="mt-2 text-xs font-semibold text-muted">{article.publishedAt}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
