import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, videos } from "@/data/mock";

export const metadata: Metadata = {
  title: `${site.nameEn} TV | ${site.nameEn}`,
};

export default function TvPage() {
  return (
    <div className="container-xl px-2 md:px-0 mt-8 mb-12">
      <header className="mb-6 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-primary">
          {site.nameEn} TV
        </h1>
        <span className="section-underline text-primary" />
      </header>
      <div className="grid md:grid-cols-3 gap-4">
        {videos.map((item) => (
          <Link key={item.id} href={item.href} className="group border border-line p-2 rounded-sm">
            <div className="relative">
              <Image
                src={item.image}
                alt={item.title}
                width={640}
                height={360}
                className="aspect-video w-full object-cover rounded-sm"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="play-circle play-circle-sm" />
              </div>
            </div>
            <p className="mt-2 font-semibold leading-snug line-clamp-3">{item.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
