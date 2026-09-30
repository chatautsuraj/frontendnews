import type { Metadata } from "next";
import Link from "next/link";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/data/mock";

export const metadata: Metadata = {
  title: `एप | ${site.nameEn}`,
};

export default function AppDownloadPage() {
  return (
    <StaticPage title="एप डाउनलोड">
      <p>{site.nameEn} मोबाइल एप चाँडै उपलब्ध हुनेछ।</p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link
          href="https://play.google.com/store"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-xl bg-primary text-white px-4 py-2 font-semibold"
        >
          Google Play
        </Link>
        <Link
          href="https://apps.apple.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex rounded-xl bg-primary text-white px-4 py-2 font-semibold"
        >
          App Store
        </Link>
      </div>
      <p className="text-sm text-muted">सम्पर्क: {site.phone}</p>
    </StaticPage>
  );
}
