import Link from "next/link";
import { site } from "@/data/mock";
import { homeHref } from "@/lib/paths";

type LogoProps = {
  variant?: "header" | "footer";
  locale?: string;
};

export function Logo({ variant = "header", locale = "ne" }: LogoProps) {
  const light = variant === "header" || variant === "footer";

  return (
    <Link href={homeHref(locale)} className="inline-flex flex-col items-center text-center">
      <span
        className={`font-display font-bold tracking-wide leading-none ${
          light ? "text-white" : "text-primary"
        } text-4xl md:text-6xl`}
      >
        {site.nameEn}
      </span>
      <span
        className={`mt-1 text-lg md:text-xl font-semibold ${
          light ? "text-white/90" : "text-secondary"
        }`}
      >
        {site.name}
      </span>
      <span
        className={`mt-0.5 text-sm md:text-base font-semibold tracking-[0.18em] ${
          light ? "text-white/75" : "text-secondary"
        }`}
      >
        {site.tagline}
      </span>
    </Link>
  );
}
