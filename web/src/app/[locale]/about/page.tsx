import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/data/mock";

export const metadata: Metadata = {
  title: `हाम्रो बारेमा | ${site.nameEn}`,
};

export default function AboutPage() {
  return (
    <StaticPage title="हाम्रो बारेमा">
      <p>
        <strong>{site.nameEn}</strong> ({site.name}) नेपालको ताजा समाचार, विश्लेषण र
        विशेष कभरेजका लागि तयार पारिएको डिजिटल समाचार पोर्टल हो।
      </p>
      <p>
        हाम्रो लक्ष्य स्पष्ट, भरपर्दो र नागरिककेन्द्रित पत्रकारितामार्फत पाठकलाई
        सही जानकारी पुर्‍याउनु हो।
      </p>
      <p>सम्पर्कका लागि: {site.phone}</p>
    </StaticPage>
  );
}
