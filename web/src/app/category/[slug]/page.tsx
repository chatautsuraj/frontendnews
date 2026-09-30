import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  articles,
  categories,
  getArticlesByCategory,
  getCategory,
} from "@/data/mock";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  return {
    title: category ? `${category.name} | Khabar Stories` : "श्रेणी",
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const items = getArticlesByCategory(slug);
  const list = items.length ? items : articles.slice(0, 8);

  return (
    <div className="container-xl px-2 md:px-0 mt-6 mb-10">
      <header className="mb-6 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
          {category.name}
        </h1>
        <span className="section-underline text-primary" />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {list.map((article) => (
          <article key={article.id} className="group border border-line p-3 rounded-sm">
            <Link href={`/news/${article.slug}`} className="block">
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
                href={`/news/${article.slug}`}
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
    </div>
  );
}
