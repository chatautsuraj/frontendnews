import type { Metadata } from "next";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/data/mock";

export const metadata: Metadata = {
  title: `सम्पादकीय नीति | ${site.nameEn}`,
};

export default function EditorialPolicyPage() {
  return (
    <StaticPage title="सम्पादकीय नीति">
      <p>
        {site.nameEn} तथ्यमा आधारित, निष्पक्ष र जिम्मेवार पत्रकारितामा प्रतिबद्ध छ।
      </p>
      <p>
        समाचार स्रोतको पुष्टि, स्पष्ट भाषा र पाठकप्रतिको जवाफदेहिता हाम्रा मुख्य
        मापदण्ड हुन्।
      </p>
      <p>सुझाव वा गुनासोका लागि: {site.phone}</p>
    </StaticPage>
  );
}
