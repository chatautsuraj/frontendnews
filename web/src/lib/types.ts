export type Category = {
  id: string;
  name: string;
  slug: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string[];
  publishedAt: string;
  category: Category;
  author: string;
  image: string;
  imageAlt: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type UtilityLink = {
  label: string;
  href: string;
  icon: "radio" | "calendar" | "bank" | "unicode" | "market" | "horoscope" | "cinema" | "election" | "rate";
};

export type VideoItem = {
  id: string;
  title: string;
  image: string;
  href: string;
};
