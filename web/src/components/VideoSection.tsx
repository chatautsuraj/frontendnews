import Image from "next/image";
import Link from "next/link";
import type { VideoItem } from "@/lib/types";
import { SectionTitle } from "./SectionTitle";

type VideoSectionProps = {
  items: VideoItem[];
};

export function VideoSection({ items }: VideoSectionProps) {
  const [main, ...rest] = items;

  return (
    <section className="w-full bg-primary mb-5 text-white">
      <div className="container-xl px-3 md:px-5 py-6">
        <SectionTitle title="कालोपाटी टिभी" href="#" tone="dark" />
        <div className="grid md:grid-cols-3 gap-2 mt-2">
          <div className="md:col-span-2">
            <Link href={main.href} className="group block p-2">
              <div className="relative">
                <Image
                  src={main.image}
                  alt={main.title}
                  width={1200}
                  height={675}
                  className="aspect-video w-full rounded-sm object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="play-circle" />
                </div>
              </div>
              <p className="mt-2 font-semibold text-xl md:text-2xl leading-snug line-clamp-3">
                {main.title}
              </p>
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            {rest.map((item) => (
              <Link key={item.id} href={item.href} className="group block p-2">
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={640}
                    height={360}
                    className="aspect-video w-full rounded-sm object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="play-circle play-circle-sm" />
                  </div>
                </div>
                <p className="mt-2 font-semibold text-lg leading-snug line-clamp-3">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
