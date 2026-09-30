import { AdBanner } from "@/components/AdBanner";
import { DarkCardGrid } from "@/components/DarkCardGrid";
import { HeadlineStory } from "@/components/HeadlineStory";
import { LightCategorySection } from "@/components/LightCategorySection";
import { VideoSection } from "@/components/VideoSection";
import { articles as mockArticles, videos } from "@/data/mock";
import { getApiConfig, getPublicFeed, getPublicHomepage } from "@/lib/api";
import type { Article } from "@/lib/types";

async function loadHomeArticles(): Promise<Article[]> {
  const { hasPortalKey } = getApiConfig();
  if (!hasPortalKey) return mockArticles;

  try {
    const homepage = await getPublicHomepage();
    const fromSections = homepage.sections.flatMap((section) =>
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

    if (fromSections.length >= 5) return fromSections;

    const feed = await getPublicFeed({ limit: 20 });
    return feed.items.length ? feed.items : mockArticles;
  } catch {
    return mockArticles;
  }
}

export default async function Home() {
  const articles = await loadHomeArticles();
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
