import Link from "next/link";

type AdBannerProps = {
  variant?: "exam" | "election" | "promo";
  label?: string;
};

export function AdBanner({ variant = "promo", label }: AdBannerProps) {
  if (variant === "exam") {
    return (
      <div className="container-xl my-3">
        <Link
          href="/category/explainer"
          className="block rounded-md bg-gradient-to-r from-[#0b3d5c] via-[#126b9e] to-[#0b3d5c] text-white px-4 py-5 md:py-6 text-center shadow-sm hover:opacity-95 transition"
        >
          <p className="font-display text-2xl md:text-3xl font-bold tracking-wide">
            {label ?? "ENTRANCE TAYAARI"}
          </p>
          <p className="mt-1 text-sm md:text-base text-white/85">
            परीक्षा तयारीका लागि विशेष सामग्री — विज्ञापन स्लट
          </p>
        </Link>
      </div>
    );
  }

  if (variant === "election") {
    return (
      <div className="container-xl my-3">
        <Link
          href="/tools/election"
          className="rounded-md bg-accent-blue text-white px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 hover:opacity-95 transition"
        >
          <div>
            <p className="font-display text-2xl md:text-3xl font-bold">
              प्रतिनिधि सभाको निर्वाचन २०८२
            </p>
            <p className="text-white/85 mt-1">#NepalElection2082</p>
          </div>
          <span className="rounded-full bg-white text-accent-blue font-bold px-4 py-2 text-sm">
            निर्वाचन पोर्टल
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-xl my-4">
      <Link
        href="/tools/calendar"
        className="block rounded-md border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center hover:bg-white transition"
      >
        <p className="text-lg md:text-xl font-semibold text-primary">
          The Nagarik मा अब{" "}
          <span className="text-accent-orange">नेपालको प्रिमियम नेपाली पात्रो</span>
        </p>
        <p className="text-sm text-muted mt-1">{label ?? "Advertisement placeholder"}</p>
      </Link>
    </div>
  );
}
