import Image from "next/image";
import Link from "next/link";
import { articleHref } from "@/lib/paths";
import type { Article } from "@/lib/types";
import { SectionTitle } from "./SectionTitle";

type LightCategorySectionProps = {
  title: string;
  href: string;
  articles: Article[];
  locale: string;
};

export function LightCategorySection({
  title,
  href,
  articles,
  locale,
}: LightCategorySectionProps) {
  const [featured, ...rest] = articles;

  return (
    <section className="py-6 mb-4">
      <div className="container-xl px-2 md:px-0">
        <SectionTitle title={title} href={href} tone="light" />
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-2">
          {featured ? (
            <article className="md:col-span-5 group">
              <Link href={articleHref(locale, featured)} className="block">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  width={900}
                  height={560}
                  className="aspect-video w-full object-cover rounded-sm"
                />
              </Link>
              <h3 className="mt-3">
                <Link
                  href={articleHref(locale, featured)}
                  className="story-title font-bold text-2xl md:text-3xl leading-snug line-clamp-3"
                >
                  {featured.title}
                </Link>
              </h3>
              <p className="mt-2 text-muted text-sm md:text-base line-clamp-3">
                {featured.excerpt}
              </p>
            </article>
          ) : null}

          <div className="md:col-span-7 grid sm:grid-cols-2 gap-x-6 gap-y-4">
            {rest.slice(0, 6).map((article) => (
              <article key={article.id} className="group flex gap-3 border-b border-line pb-3">
                <Link href={articleHref(locale, article)} className="shrink-0">
                  <Image
                    src={article.image}
                    alt={article.imageAlt}
                    width={160}
                    height={100}
                    className="w-28 h-20 object-cover rounded-sm"
                  />
                </Link>
                <div>
                  <h3>
                    <Link
                      href={articleHref(locale, article)}
                      className="story-title font-semibold text-base md:text-lg leading-snug line-clamp-3"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs text-muted font-semibold">
                    {article.publishedAt}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
