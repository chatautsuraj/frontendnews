import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StaticPage } from "@/components/StaticPage";
import { site } from "@/data/mock";

const tools = {
  radio: {
    title: "रेडियो लाइभ",
    body: "लाइभ रेडियो स्ट्रिमिङ यस खण्डमा उपलब्ध हुनेछ। अहिले डेमो सामग्री देखाइएको छ।",
  },
  calendar: {
    title: "नेपाली क्यालेण्डर",
    body: "नेपाली पात्रो, तिथि र महत्वपूर्ण मितिहरू यहाँ हेर्न सकिनेछ।",
  },
  "bank-rates": {
    title: "बैंक ब्याजदर",
    body: "वाणिज्य बैंकहरूको निक्षेप तथा कर्जा ब्याजदर अद्यावधिक सूची यहाँ राखिनेछ।",
  },
  unicode: {
    title: "युनिकोड टूल्स",
    body: "नेपाली युनिकोड रूपान्तरण र टाइपिङ सहयोगी उपकरणहरू यस पृष्ठमा उपलब्ध हुनेछन्।",
  },
  "share-market": {
    title: "सेयर मार्केट",
    body: "नेप्सेसम्बन्धी ताजा सूचकांक र बजार अपडेटका लागि यो खण्ड प्रयोग गर्नुहोस्।",
  },
  horoscope: {
    title: "राशिफल",
    body: "दैनिक राशिफल र ज्योतिष सामग्री यहाँ प्रकाशन गरिनेछ।",
  },
  "cinema-board": {
    title: "सिनेमा बोर्ड",
    body: "चलचित्र रिलिज, शो टाइम र मनोरञ्जन अपडेटका लागि यो बोर्ड हेर्नुहोस्।",
  },
  election: {
    title: "निर्वाचन पोर्टल",
    body: "निर्वाचन समाचार, नतिजा र विश्लेषण सामग्रीका लागि यो पोर्टल प्रयोग गर्नुहोस्।",
  },
  "rate-my-samsad": {
    title: "RateMySamsad",
    body: "सांसदहरूको सार्वजनिक मूल्यांकन र मतदाता प्रतिक्रियाका लागि यो खण्ड तयार पारिएको छ।",
  },
} as const;

type ToolSlug = keyof typeof tools;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(tools).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools[slug as ToolSlug];
  return {
    title: tool ? `${tool.title} | ${site.nameEn}` : site.nameEn,
  };
}

export default async function ToolPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = tools[slug as ToolSlug];
  if (!tool) notFound();

  return (
    <StaticPage title={tool.title}>
      <p>{tool.body}</p>
      <p>
        थप समाचार हेर्न{" "}
        <Link href="/" className="font-bold text-accent-blue hover:underline">
          होमपेज
        </Link>{" "}
        मा जानुहोस्।
      </p>
      <p className="text-sm text-muted">सम्पर्क: {site.phone}</p>
    </StaticPage>
  );
}
