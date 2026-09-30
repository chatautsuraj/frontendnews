import Link from "next/link";

type SectionTitleProps = {
  title: string;
  href?: string;
  tone?: "light" | "dark";
};

export function SectionTitle({ title, href = "/", tone = "dark" }: SectionTitleProps) {
  const color = tone === "dark" ? "text-white" : "text-primary";

  return (
    <h2 className="w-full flex justify-center mb-5">
      <Link href={href} className={`font-display font-bold text-3xl md:text-4xl ${color} text-center`}>
        <span className="block">{title}</span>
        <span className={`section-underline ${color}`} />
      </Link>
    </h2>
  );
}
