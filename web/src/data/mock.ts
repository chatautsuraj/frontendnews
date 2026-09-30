import type { Article, Category, NavItem, UtilityLink, VideoItem } from "@/lib/types";

export const site = {
  name: "द नागरिक",
  nameEn: "The Nagarik",
  tagline: "सत्यको आवाज",
  phone: "9800000000",
  domain: "thenagarik.com",
};

export const categories: Category[] = [
  { id: "1", name: "समाचार", slug: "samachar" },
  { id: "2", name: "देश चर्चा", slug: "desh-charcha" },
  { id: "3", name: "बालेन सरकार वरपर", slug: "balen-sarkar" },
  { id: "4", name: "कर्पोरेट वाच", slug: "corporate" },
  { id: "5", name: "एक्सप्लेनर", slug: "explainer" },
  { id: "6", name: "सिने संसार", slug: "cinema" },
  { id: "7", name: "कला", slug: "entertainment" },
  { id: "8", name: "स्पोर्ट्स", slug: "sports" },
  { id: "9", name: "हेल्थ", slug: "health" },
  { id: "10", name: "क्राइम स्टोरी", slug: "crime" },
  { id: "11", name: "घण्टी खबर", slug: "ghanti-khabar" },
  { id: "12", name: "सांसदका कुरा", slug: "samsad-ka-kura" },
  { id: "13", name: "जेन-जी खबर", slug: "gen-z" },
  { id: "14", name: "पूराना दल", slug: "purana-dal" },
];

export const mainNav: NavItem[] = [
  { label: "होमपेज", href: "/" },
  { label: "समाचार", href: "/category/samachar" },
  { label: "देश चर्चा", href: "/category/desh-charcha" },
  { label: "बालेन सरकार वरपर", href: "/category/balen-sarkar" },
  { label: "कर्पोरेट वाच", href: "/category/corporate" },
  { label: "एक्सप्लेनर", href: "/category/explainer" },
  { label: "सिने संसार", href: "/category/cinema" },
  {
    label: "अन्य",
    href: "/category/entertainment",
    children: [
      { label: "कला", href: "/category/entertainment" },
      { label: "स्पोर्ट्स", href: "/category/sports" },
      { label: "हेल्थ", href: "/category/health" },
      { label: "क्राइम स्टोरी", href: "/category/crime" },
      { label: "घण्टी खबर", href: "/category/ghanti-khabar" },
    ],
  },
];

export const utilityLinks: UtilityLink[] = [
  { label: "रेडियो लाइभ", href: "/tools/radio", icon: "radio" },
  { label: "क्यालेण्डर", href: "/tools/calendar", icon: "calendar" },
  { label: "बैंक ब्याजदर", href: "/tools/bank-rates", icon: "bank" },
  { label: "युनिकोड टूल्स", href: "/tools/unicode", icon: "unicode" },
  { label: "सेयर मार्केटस", href: "/tools/share-market", icon: "market" },
  { label: "राशिफल", href: "/tools/horoscope", icon: "horoscope" },
  { label: "सिनेमा बोर्ड", href: "/tools/cinema-board", icon: "cinema" },
  { label: "निर्वाचन पोर्टल", href: "/tools/election", icon: "election" },
  { label: "RateMySamsad", href: "/tools/rate-my-samsad", icon: "rate" },
];

const img = (seed: number) => `https://picsum.photos/seed/kp${seed}/1400/788`;

export const articles: Article[] = [
  {
    id: "a1",
    title: "बिमा दाबी भुक्तानी सरलीकरण गर्ने कार्यविधि लागु",
    slug: "bima-dabi-bhuktani-saralikaran",
    excerpt: "बिमा प्राधिकरणले दाबी भुक्तानी प्रक्रिया छिटो र सहज बनाउन नयाँ कार्यविधि लागू गरेको छ।",
    body: [
      "काठमाडौं — बिमा प्राधिकरणले बिमा दाबी भुक्तानी प्रक्रिया सरलीकरण गर्ने नयाँ कार्यविधि लागू गरेको छ। यसबाट बीमितले छिटो र झन्झटरहित रूपमा दाबी रकम पाउने अपेक्षा गरिएको छ।",
      "कार्यविधिअनुसार दाबीसम्बन्धी कागजात अनलाइनमार्फत पेस गर्न सकिनेछ। प्राधिकरणले कम्पनीहरूलाई निश्चित समयभित्र निर्णय दिन निर्देशन दिएको छ।",
      "विज्ञहरूका अनुसार यस कदमले बिमा क्षेत्रप्रतिको जनविश्वास बढाउन मद्दत पुग्नेछ।",
    ],
    publishedAt: "२०८३ असोज १४",
    category: categories[0],
    author: "द नागरिक",
    image: img(101),
    imageAlt: "बिमा र कागजात",
  },
  {
    id: "a2",
    title: "हिउँदमा भारतबाट १ हजार १५४ मेगावाट बिजुली आयात गरिने",
    slug: "hiuda-ma-bijuli-aayat",
    excerpt: "ऊर्जा मन्त्रालयका अनुसार हिउँदयामको माग धान्न भारतबाट थप बिजुली आयात गरिनेछ।",
    body: [
      "काठमाडौं — हिउँदयाममा बढ्दो बिजुली माग धान्न सरकारले भारतबाट एक हजार एक सय चौवन्न मेगावाट बिजुली आयात गर्ने तयारी गरेको छ।",
      "ऊर्जा मन्त्रालयका अनुसार आन्तरिक उत्पादन पर्याप्त नहुँदा आयात आवश्यक पर्ने देखिएको हो।",
      "प्राधिकरणले माग व्यवस्थापन र चुहावट नियन्त्रणमा पनि जोड दिएको छ।",
    ],
    publishedAt: "२०८३ असोज १४",
    category: categories[1],
    author: "द नागरिक",
    image: img(102),
    imageAlt: "बिजुली पूर्वाधार",
  },
  {
    id: "a3",
    title: "‘बाढीपछि ऊर्जा सुरक्षा र पूर्वाधार पुनर्निर्माणमा सरकार गम्भीर बनोस्’ : कुलमान",
    slug: "badhi-pachi-urja-suraksha-kulman",
    excerpt: "पूर्वकार्यकारी निर्देशक कुलमान घिसिङले बाढीपछिको पुनर्निर्माणमा ध्यान दिन आग्रह गरेका छन्।",
    body: [
      "काठमाडौं — बाढीले क्षति पुर्‍याएका ऊर्जा पूर्वाधारको शीघ्र पुनर्निर्माण गर्न सरकार गम्भीर हुनुपर्नेमा जोड दिँदै कुलमान घिसिङले चेतावनी दिएका छन्।",
      "उनले ऊर्जा सुरक्षा दीर्घकालीन नीतिबिना सम्भव नहुने बताए।",
      "स्थानीय प्रभावित क्षेत्रमा आपूर्ति सुचारु गर्न तत्काल कदम आवश्यक रहेको उनको भनाइ छ।",
    ],
    publishedAt: "२०८३ असोज १३",
    category: categories[1],
    author: "द नागरिक",
    image: img(103),
    imageAlt: "ऊर्जा पूर्वाधार",
  },
  {
    id: "a4",
    title: "एआईआईबीको वार्षिक बैठकमा सहभागी भएर अर्थमन्त्री वाग्ले स्वदेश फर्किए",
    slug: "aib-baithak-arthamantri",
    excerpt: "अर्थमन्त्रीले विकास वित्त र पूर्वाधार लगानीबारे द्विपक्षीय छलफल गरेको जानकारी दिएका छन्।",
    body: [
      "काठमाडौं — एआईआईबीको वार्षिक बैठकमा सहभागी भएपछि अर्थमन्त्री स्वदेश फर्किएका छन्।",
      "बैठकका क्रममा पूर्वाधार लगानी, हरित विकास र सहुलियतपूर्ण ऋणका विषयमा छलफल भएको उनले बताए।",
      "सरकारले प्राथमिकताका आयोजनामा वैदेशिक सहयोग जुटाउने लक्ष्य राखेको छ।",
    ],
    publishedAt: "२०८३ असोज १३",
    category: categories[3],
    author: "द नागरिक",
    image: img(104),
    imageAlt: "अर्थमन्त्री बैठक",
  },
  {
    id: "a5",
    title: "प्रतिनिधिसभा बैठक बस्दै",
    slug: "pratinidhisabha-baithak",
    excerpt: "आज प्रतिनिधिसभाको बैठक बस्ने कार्यक्रम छ। महत्वपूर्ण विधेयकहरूमा छलफल हुने अपेक्षा गरिएको छ।",
    body: [
      "काठमाडौं — प्रतिनिधिसभाको बैठक आज बस्दै छ। सभामुखको नेतृत्वमा बैठक सुरु हुनेछ।",
      "कार्यसूचीमा विधेयक छलफल र समसामयिक विषय समावेश गरिएको छ।",
      "प्रमुख दलहरूले आफ्ना एजेन्डा अघि सार्ने तयारी गरेका छन्।",
    ],
    publishedAt: "२०८३ असोज १२",
    category: categories[11],
    author: "द नागरिक",
    image: img(105),
    imageAlt: "संसद् भवन",
  },
  {
    id: "a6",
    title: "सांसद शाहीको आरोप– ‘सरकारले व्यक्तिगत इगो साट्न राज्यसत्ताको दुरुपयोग गर्‍यो’",
    slug: "samsad-shahi-aarop",
    excerpt: "राप्रपा सांसदले सरकारमाथि राज्यसत्ता दुरुपयोगको आरोप लगाएका छन्।",
    body: [
      "काठमाडौं — राप्रपा सांसद शाहीले सरकारले व्यक्तिगत इगो साट्न राज्यसत्ताको दुरुपयोग गरेको आरोप लगाएका छन्।",
      "उनले संसद्मा बोल्दै निष्पक्ष प्रशासनको माग गरे।",
      "सरकार पक्षले भने आरोप आधारहीन भएको प्रतिक्रिया दिएको छ।",
    ],
    publishedAt: "२०८३ असोज १२",
    category: categories[13],
    author: "द नागरिक",
    image: img(106),
    imageAlt: "राजनीतिक छलफल",
  },
  {
    id: "a7",
    title: "जेन्जी सहिद दिवस मनाइँदै, देशभर सार्वजनिक बिदा",
    slug: "gen-z-shahid-diwas",
    excerpt: "युवा आन्दोलनकै क्रममा ज्यान गुमाएकाहरूको स्मरणमा विभिन्न कार्यक्रम आयोजना गरिएको छ।",
    body: [
      "काठमाडौं — जेन्जी सहिद दिवसका अवसरमा देशभर सार्वजनिक बिदा दिइएको छ।",
      "विभिन्न शहरमा श्रद्धाञ्जलि सभा र सांस्कृतिक कार्यक्रम भइरहेका छन्।",
      "परिवारजन र नागरिक समाजले न्याय र सुधारको माग दोहोर्याएका छन्।",
    ],
    publishedAt: "२०८३ असोज ११",
    category: categories[12],
    author: "द नागरिक",
    image: img(107),
    imageAlt: "युवा जमघट",
  },
  {
    id: "a8",
    title: "स्वर्ण बजारमा मूल्य उतारचढाव, लगानीकर्ता सतर्क",
    slug: "swarna-bazar-mulya",
    excerpt: "अन्तर्राष्ट्रिय बजारसँगै स्थानीय सुनचाँदीको मूल्यमा प्रभाव देखिएको छ।",
    body: [
      "काठमाडौं — अन्तर्राष्ट्रिय बजारको असरले स्थानीय सुनचाँदीको भाउमा उतारचढाव आएको छ।",
      "व्यापारीहरूले छोटो अवधिको कारोबारमा सावधानी अपनाउन सुझाव दिएका छन्।",
      "लगानीकर्ताले दीर्घकालीन दृष्टिकोण राख्न उपयुक्त हुने विज्ञहरू बताउँछन्।",
    ],
    publishedAt: "२०८३ असोज ११",
    category: categories[3],
    author: "द नागरिक",
    image: img(108),
    imageAlt: "सुन बजार",
  },
  {
    id: "a9",
    title: "आजका प्रमुख फिल्मी खबर — नयाँ रिलिज र चर्चा",
    slug: "aajaka-pramukh-filmi-khabar",
    excerpt: "नेपाली र भारतीय चलचित्र क्षेत्रका ताजा अपडेट एकै ठाउँमा।",
    body: [
      "काठमाडौं — यो साता नयाँ फिल्म घोषणा र कलाकारका अन्तर्वार्ताले चर्चा पाएका छन्।",
      "दर्शकको चासो बढेसँगै डिजिटल प्लेटफर्ममा पनि सामग्री विस्तार भइरहेको छ।",
    ],
    publishedAt: "२०८३ असोज १०",
    category: categories[5],
    author: "द नागरिक",
    image: img(109),
    imageAlt: "सिनेमा",
  },
  {
    id: "a10",
    title: "राष्ट्रिय टिमको अभ्यास तीव्र, आगामी प्रतियोगिताको तयारी",
    slug: "rastriya-team-abhyas",
    excerpt: "खेलकुद परिषद् परिसरमा राष्ट्रिय टिमले नियमित अभ्यास गरिरहेको छ।",
    body: [
      "काठमाडौं — आगामी क्षेत्रीय प्रतियोगितालाई लक्षित गर्दै राष्ट्रिय टिमको अभ्यास तीव्र पारिएको छ।",
      "कोचिंग स्टाफले फिटनेस र रणनीति दुवैमा जोड दिएको जनाएको छ।",
    ],
    publishedAt: "२०८३ असोज १०",
    category: categories[7],
    author: "द नागरिक",
    image: img(110),
    imageAlt: "खेलकुद अभ्यास",
  },
  {
    id: "a11",
    title: "स्वास्थ्य शिविरमा निःशुल्क जाँच, नागरिकको भिड",
    slug: "swasthya-shibir",
    excerpt: "महानगरले आयोजना गरेको स्वास्थ्य शिविरमा सयौं नागरिकले सेवा लिएका छन्।",
    body: [
      "काठमाडौं — निःशुल्क स्वास्थ्य शिविरमा रक्तचाप, चिनी र सामान्य जाँच सेवा उपलब्ध गराइएको थियो।",
      "स्वास्थ्यकर्मीहरूले नियमित जाँचको महत्वबारे जानकारी दिए।",
    ],
    publishedAt: "२०८३ असोज ९",
    category: categories[8],
    author: "द नागरिक",
    image: img(111),
    imageAlt: "स्वास्थ्य शिविर",
  },
  {
    id: "a12",
    title: "पूर्वप्रधानन्यायाधीश जबरा पक्राउप्रति एमाले महासचिवको आपत्ति",
    slug: "jabara-pakrau-prati-aapatii",
    excerpt: "एमाले महासचिवले पक्राउको तरिकामा प्रश्न उठाएका छन्।",
    body: [
      "काठमाडौं — पूर्वप्रधानन्यायाधीश जबराको पक्राउप्रति एमाले महासचिवले आपत्ति जनाएका छन्।",
      "उनले कानुनी प्रक्रिया पारदर्शी हुनुपर्नेमा जोड दिए।",
    ],
    publishedAt: "२०८३ असोज ९",
    category: categories[0],
    author: "द नागरिक",
    image: img(112),
    imageAlt: "कानुनी समाचार",
  },
];

export const videos: VideoItem[] = [
  {
    id: "v1",
    title: "आजका प्रमुख फिल्मी खबर... || The Nagarik Cinema",
    image: img(201),
    href: "/news/aajaka-pramukh-filmi-khabar",
  },
  {
    id: "v2",
    title: "आजका प्रमुख फिल्मी खबर... || The Nagarik Cinema",
    image: img(202),
    href: "/category/cinema",
  },
  {
    id: "v3",
    title: "आजका प्रमुख फिल्मी खबर... || The Nagarik Cinema",
    image: img(203),
    href: "/tv",
  },
];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getArticlesByCategory(slug: string) {
  return articles.filter((a) => a.category.slug === slug);
}

export function getRelated(slug: string, limit = 4) {
  const current = getArticle(slug);
  if (!current) return articles.slice(0, limit);
  return articles.filter((a) => a.slug !== slug).slice(0, limit);
}
