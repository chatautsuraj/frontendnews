import Link from "next/link";
import { site } from "@/data/mock";

type LogoProps = {
  variant?: "header" | "footer";
};

export function Logo({ variant = "header" }: LogoProps) {
  const light = variant === "header" || variant === "footer";

  return (
    <Link href="/" className="inline-flex flex-col items-center text-center">
      <span
        className={`font-display font-bold tracking-wide leading-none ${
          light ? "text-white" : "text-primary"
        } text-5xl md:text-6xl`}
      >
        {site.name}
      </span>
      <span
        className={`mt-1 text-sm md:text-base font-semibold tracking-[0.18em] ${
          light ? "text-white/85" : "text-secondary"
        }`}
      >
        {site.tagline}
      </span>
    </Link>
  );
}
