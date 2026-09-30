import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/data/mock";

export const metadata: Metadata = {
  title: `सम्पर्क | ${site.nameEn}`,
};

export default function ContactPage() {
  return (
    <StaticPage title="सम्पर्क">
      <p>समाचार, सुझाव वा सहयोगका लागि हामीलाई सम्पर्क गर्नुहोस्।</p>
      <p>
        <strong>फोन:</strong> {site.phone}
      </p>
      <p>
        <strong>ठेगाना:</strong> काठमाडौं, नेपाल
      </p>
    </StaticPage>
  );
}
