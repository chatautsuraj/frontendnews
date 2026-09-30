import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/lib/types";
import { SectionTitle } from "./SectionTitle";

type DarkCardGridProps = {
  title: string;
  href: string;
  articles: Article[];
};

export function DarkCardGrid({ title, href, articles }: DarkCardGridProps) {
  return (
    <section className="bg-primary py-6 mb-5 text-white">
      <div className="container-xl px-2 md:px-0">
        <SectionTitle title={title} href={href} tone="dark" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
          {articles.slice(0, 3).map((article) => (
            <article
              key={article.id}
              className="relative group overflow-hidden rounded-sm h-[420px] md:h-[500px]"
            >
              <Image
                src={article.image}
                alt={article.imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-0 w-full p-3 z-10 text-center">
                <h3>
                  <Link
                    href={`/news/${article.slug}`}
                    className="text-white font-semibold text-xl md:text-2xl line-clamp-2 leading-snug"
                  >
                    {article.title}
                  </Link>
                </h3>
                <div className="mt-3 flex items-center justify-center gap-2 text-sm font-bold text-white/90">
                  <span>{article.author}</span>
                  <span className="bg-white/80 h-3 w-[2px]" />
                  <Link href={`/category/${article.category.slug}`} className="hover:text-white">
                    {article.category.name}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
