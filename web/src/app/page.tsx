import { AdBanner } from "@/components/AdBanner";
import { DarkCardGrid } from "@/components/DarkCardGrid";
import { HeadlineStory } from "@/components/HeadlineStory";
import { LightCategorySection } from "@/components/LightCategorySection";
import { VideoSection } from "@/components/VideoSection";
import { articles, videos } from "@/data/mock";

export default function Home() {
  const [h1, h2, f1, f2, f3, ...rest] = articles;

  const desh = articles.filter((a) => a.category.slug === "desh-charcha").concat(rest);
  const samsad = articles.filter((a) => a.category.slug === "samsad-ka-kura").concat(articles);
  const genz = articles.filter((a) => a.category.slug === "gen-z").concat(rest);
  const purana = articles.filter((a) => a.category.slug === "purana-dal").concat(articles.slice(3));
  const corporate = articles.filter((a) => a.category.slug === "corporate").concat(rest);

  return (
    <>
      <AdBanner variant="exam" />

      <div className="container-xl flex flex-col gap-4 mb-4 px-2 md:px-0">
        <HeadlineStory article={h1} />
        <HeadlineStory article={h2} />
      </div>

      <AdBanner variant="election" />

      <div className="container-xl flex flex-col gap-4 mb-4 px-2 md:px-0">
        <HeadlineStory article={f1} showImage />
        <HeadlineStory article={f2} showImage />
        <HeadlineStory article={f3} showImage />
      </div>

      <VideoSection items={videos} />

      <AdBanner variant="promo" />

      <DarkCardGrid
        title="सांसदका कुरा"
        href="/category/samsad-ka-kura"
        articles={samsad}
      />

      <LightCategorySection
        title="देश चर्चा"
        href="/category/desh-charcha"
        articles={desh}
      />

      <LightCategorySection
        title="जेन-जी खबर"
        href="/category/gen-z"
        articles={genz}
      />

      <DarkCardGrid
        title="पूराना दल"
        href="/category/purana-dal"
        articles={purana}
      />

      <LightCategorySection
        title="कर्पोरेट वाच"
        href="/category/corporate"
        articles={corporate}
      />
    </>
  );
}
