import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AdBanner } from "@/components/AdBanner";
import { articles as mockArticles, getArticle, getRelated } from "@/data/mock";
import { getApiConfig, getPublicArticle, getPublicFeed } from "@/lib/api";
import { isLocale, type Locale } from "@/lib/locale";
import { articleHref, categoryHref } from "@/lib/paths";
import type { Article } from "@/lib/types";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ locale: string; category: string; slug: string }>;
};

async function resolveArticle(slug: string): Promise<Article | null> {
  const { hasPortalKey } = getApiConfig();
  if (hasPortalKey) {
    try {
      const live = await getPublicArticle(slug);
      if (live) return live;
    } catch {
      // fall through
    }
  }
  return getArticle(slug) ?? null;
}

async function resolveSidebar(slug: string): Promise<{ related: Article[]; latest: Article[] }> {
  const { hasPortalKey } = getApiConfig();
  if (hasPortalKey) {
    try {
      const feed = await getPublicFeed({ limit: 10 });
      const others = feed.items.filter((a) => a.slug !== slug);
      return {
        related: others.slice(0, 5),
        latest: others.slice(0, 6),
      };
    } catch {
      // fall through
    }
  }
  return {
    related: getRelated(slug, 5),
    latest: mockArticles.filter((a) => a.slug !== slug).slice(0, 6),
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await resolveArticle(slug);
  return {
    title: article ? `${article.title} | The Nagarik` : "समाचार",
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const article = await resolveArticle(slug);
  if (!article) notFound();

  const { related, latest } = await resolveSidebar(slug);

  return (
    <div className="container-xl px-2 md:px-0 mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <article className="lg:col-span-8">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight text-primary">
            {article.title}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-sm text-muted">
            <span className="size-9 rounded-full bg-gray-200 grid place-items-center font-bold text-primary">
              न
            </span>
            <span className="font-bold text-primary">{article.author}</span>
            <span>·</span>
            <span>{article.publishedAt}</span>
            <span>·</span>
            <Link
              href={categoryHref(locale, article.category.slug)}
              className="font-bold text-primary hover:text-secondary"
            >
              {article.category.name}
            </Link>
          </div>

          <div className="relative mt-5">
            <Image
              src={article.image}
              alt={article.imageAlt}
              width={1400}
              height={788}
              className="w-full aspect-video object-cover rounded-sm"
              priority
            />
          </div>

          <div className="mt-6 flex gap-4">
            <aside className="hidden md:flex flex-col gap-2 sticky top-4 h-fit">
              {["Fb", "X", "Wa", "Mail"].map((label) => (
                <span
                  key={label}
                  className="size-10 rounded-full bg-primary text-white text-xs font-bold grid place-items-center"
                >
                  {label}
                </span>
              ))}
            </aside>

            <div className="prose max-w-none flex-1 space-y-4 text-[1.05rem] leading-8 text-[#222]">
              {article.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </div>

          <AdBanner variant="promo" locale={locale} label="Article inline ad slot" />

          <section className="mt-8">
            <h2 className="font-display text-3xl font-bold mb-4">सम्बन्धित समाचार</h2>
            {related.length === 0 ? (
              <p className="text-muted">सम्बन्धित समाचार उपलब्ध छैन।</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={articleHref(locale, item)}
                    className="group flex gap-3 border border-line p-2 rounded-sm"
                  >
                    <Image
                      src={item.image}
                      alt={item.imageAlt}
                      width={160}
                      height={100}
                      className="w-28 h-20 object-cover rounded-sm"
                    />
                    <span className="story-title font-semibold leading-snug line-clamp-3">
                      {item.title}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </article>

        <aside className="lg:col-span-4 lg:border-l lg:border-line lg:pl-6">
          <h2 className="font-display text-2xl font-bold mb-3">ताजा समाचार</h2>
          {latest.length === 0 ? (
            <p className="text-muted text-sm">अहिले ताजा समाचार छैन।</p>
          ) : (
            <ul className="divide-y divide-line">
              {latest.map((item) => (
                <li key={item.id} className="py-3">
                  <Link
                    href={articleHref(locale, item)}
                    className="story-title font-semibold leading-snug line-clamp-3"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}
