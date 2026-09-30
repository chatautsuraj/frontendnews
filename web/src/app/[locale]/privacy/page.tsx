import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/data/mock";

export const metadata: Metadata = {
  title: `गोपनीयता नीति | ${site.nameEn}`,
};

export default function PrivacyPage() {
  return (
    <StaticPage title="गोपनीयता नीति">
      <p>
        {site.nameEn} ले तपाईंको गोपनीयतालाई सम्मान गर्छ। हामी साइट सञ्चालन र अनुभव
        सुधारका लागि मात्र आवश्यक जानकारी प्रयोग गर्छौं।
      </p>
      <p>
        हामी व्यक्तिगत विवरण तेस्रो पक्षलाई बेच्दैनौं। कुनै प्रश्न भए सम्पर्क:
        {site.phone}
      </p>
    </StaticPage>
  );
}
