import Link from "next/link";
import { AdBanner } from "@/components/AdBanner";
import { DarkCardGrid } from "@/components/DarkCardGrid";
import { HeadlineStory } from "@/components/HeadlineStory";
import { LightCategorySection } from "@/components/LightCategorySection";
import { VideoSection } from "@/components/VideoSection";
import { videos } from "@/data/mock";
import { getPublicFeed, getPublicHomepage } from "@/lib/api";
import { isLocale, type Locale } from "@/lib/locale";
import { categoryHref, pageHref } from "@/lib/paths";
import type { Article } from "@/lib/types";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const FALLBACK_IMAGE =
  "https://picsum.photos/seed/nagarik-fallback/1400/788";

type HomeData = {
  articles: Article[];
  emptyLive: boolean;
};

async function loadHomeArticles(): Promise<HomeData> {
  const homepage = await getPublicHomepage();
  const fromSections: Article[] = homepage.sections.flatMap((section) =>
    section.items.map((item) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      excerpt: item.title,
      body: [item.title],
      publishedAt: item.publishedAt,
      category: item.category ?? {
        id: "uncat",
        name: "समाचार",
        slug: "samachar",
      },
      author: "The Nagarik",
      image: item.featuredMedia
        ? `/api/media/${item.featuredMedia.id}/full`
        : FALLBACK_IMAGE,
      imageAlt: item.title,
    })),
  );

  if (fromSections.length) {
    return { articles: fromSections, emptyLive: false };
  }

  const feed = await getPublicFeed({ limit: 20 });
  if (feed.items.length) {
    return { articles: feed.items, emptyLive: false };
  }

  return { articles: [], emptyLive: true };
}

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;

  const { articles, emptyLive } = await loadHomeArticles();

  if (emptyLive) {
    return (
      <div className="container-xl px-2 md:px-0 mt-10 mb-16 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
          The Nagarik
        </h1>
        <p className="mt-4 text-lg text-muted">
          API connected for <strong>thenagarik.com</strong>. No published articles yet.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={categoryHref(locale, "sports")}
            className="rounded-md bg-primary text-white px-4 py-2 font-semibold"
          >
            खेल
          </Link>
          <Link
            href={pageHref(locale, "/about")}
            className="rounded-md border border-line px-4 py-2 font-semibold"
          >
            About
          </Link>
        </div>
      </div>
    );
  }

  const [h1, h2, f1, f2, f3, ...rest] = articles;
  const bySlug = (slug: string) =>
    articles.filter((a) => a.category.slug === slug).concat(rest);

  return (
    <>
      <AdBanner variant="exam" locale={locale} />

      <div className="container-xl flex flex-col gap-4 mb-4 px-2 md:px-0">
        {h1 ? <HeadlineStory article={h1} locale={locale} /> : null}
        {h2 ? <HeadlineStory article={h2} locale={locale} /> : null}
      </div>

      <AdBanner variant="election" locale={locale} />

      <div className="container-xl flex flex-col gap-4 mb-4 px-2 md:px-0">
        {f1 ? <HeadlineStory article={f1} locale={locale} showImage /> : null}
        {f2 ? <HeadlineStory article={f2} locale={locale} showImage /> : null}
        {f3 ? <HeadlineStory article={f3} locale={locale} showImage /> : null}
      </div>

      <VideoSection items={videos} />

      <AdBanner variant="promo" locale={locale} />

      <DarkCardGrid
        title="सांसदका कुरा"
        href={categoryHref(locale, "samsad-ka-kura")}
        articles={bySlug("samsad-ka-kura")}
        locale={locale}
      />

      <LightCategorySection
        title="देश चर्चा"
        href={categoryHref(locale, "desh-charcha")}
        articles={bySlug("desh-charcha")}
        locale={locale}
      />

      <LightCategorySection
        title="जेन-जी खबर"
        href={categoryHref(locale, "gen-z")}
        articles={bySlug("gen-z")}
        locale={locale}
      />

      <DarkCardGrid
        title="पूराना दल"
        href={categoryHref(locale, "purana-dal")}
        articles={bySlug("purana-dal")}
        locale={locale}
      />

      <LightCategorySection
        title="कर्पोरेट वाच"
        href={categoryHref(locale, "corporate")}
        articles={bySlug("corporate")}
        locale={locale}
      />
    </>
  );
}
