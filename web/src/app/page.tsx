import Link from "next/link";
import { AdBanner } from "@/components/AdBanner";
import { DarkCardGrid } from "@/components/DarkCardGrid";
import { HeadlineStory } from "@/components/HeadlineStory";
import { LightCategorySection } from "@/components/LightCategorySection";
import { VideoSection } from "@/components/VideoSection";
import { articles as mockArticles, videos } from "@/data/mock";
import { getApiConfig, getPublicFeed, getPublicHomepage } from "@/lib/api";
import type { Article } from "@/lib/types";

export const dynamic = "force-dynamic";

type HomeData = {
  articles: Article[];
  source: "api" | "mock";
  emptyLive: boolean;
};

async function loadHomeArticles(): Promise<HomeData> {
  const { hasPortalKey } = getApiConfig();
  if (!hasPortalKey) {
    return { articles: mockArticles, source: "mock", emptyLive: false };
  }

  try {
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
          ? `/api/media/${item.featuredMedia.id}?size=full`
          : mockArticles[0].image,
        imageAlt: item.title,
      })),
    );

    if (fromSections.length) {
      return { articles: fromSections, source: "api", emptyLive: false };
    }

    const feed = await getPublicFeed({ limit: 20 });
    if (feed.items.length) {
      return { articles: feed.items, source: "api", emptyLive: false };
    }

    return { articles: [], source: "api", emptyLive: true };
  } catch {
    return { articles: mockArticles, source: "mock", emptyLive: false };
  }
}

export default async function Home() {
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
        <p className="mt-2 text-muted">
          Publish stories in Editorial CMS to see them here.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/category/sports"
            className="rounded-md bg-primary text-white px-4 py-2 font-semibold"
          >
            Sports
          </Link>
          <Link
            href="/about"
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
      <AdBanner variant="exam" />

      <div className="container-xl flex flex-col gap-4 mb-4 px-2 md:px-0">
        {h1 ? <HeadlineStory article={h1} /> : null}
        {h2 ? <HeadlineStory article={h2} /> : null}
      </div>

      <AdBanner variant="election" />

      <div className="container-xl flex flex-col gap-4 mb-4 px-2 md:px-0">
        {f1 ? <HeadlineStory article={f1} showImage /> : null}
        {f2 ? <HeadlineStory article={f2} showImage /> : null}
        {f3 ? <HeadlineStory article={f3} showImage /> : null}
      </div>

      <VideoSection items={videos} />

      <AdBanner variant="promo" />

      <DarkCardGrid
        title="सांसदका कुरा"
        href="/category/samsad-ka-kura"
        articles={bySlug("samsad-ka-kura")}
      />

      <LightCategorySection
        title="देश चर्चा"
        href="/category/desh-charcha"
        articles={bySlug("desh-charcha")}
      />

      <LightCategorySection
        title="जेन-जी खबर"
        href="/category/gen-z"
        articles={bySlug("gen-z")}
      />

      <DarkCardGrid
        title="पूराना दल"
        href="/category/purana-dal"
        articles={bySlug("purana-dal")}
      />

      <LightCategorySection
        title="कर्पोरेट वाच"
        href="/category/corporate"
        articles={bySlug("corporate")}
      />
    </>
  );
}
