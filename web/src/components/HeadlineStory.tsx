import Image from "next/image";
import Link from "next/link";
import { articleHref } from "@/lib/paths";
import type { Article } from "@/lib/types";

type HeadlineStoryProps = {
  article: Article;
  locale: string;
  showImage?: boolean;
};

export function HeadlineStory({ article, locale, showImage = false }: HeadlineStoryProps) {
  const href = articleHref(locale, article);
  return (
    <article className="group border border-line p-2 md:p-4">
      <h2 className="entry-title text-center m-0">
        <Link
          href={href}
          className="story-title text-primary font-bold text-[1.85rem] leading-tight md:text-5xl md:leading-[1.2]"
        >
          {article.title}
        </Link>
      </h2>

      {showImage ? (
        <>
          <div className="mt-3 flex items-center justify-center gap-3">
            <span className="size-9 rounded-full bg-gray-200 overflow-hidden grid place-items-center text-xs font-bold">
              न
            </span>
            <span className="text-sm font-bold text-gray-600">{article.author}</span>
          </div>
          <Link href={href} className="mt-4 block">
            <Image
              src={article.image}
              alt={article.imageAlt}
              width={1400}
              height={788}
              className="aspect-video w-full object-cover"
              priority={!showImage}
            />
          </Link>
        </>
      ) : null}
    </article>
  );
}
