import type { Article, Category } from "@/lib/types";
import { resolveCategorySlug } from "@/lib/locale";

/** API root including version prefix, e.g. https://newsportalapi.ekaartech.com/v1 */
const API_BASE = (
  process.env.NEWS_API_BASE_URL ?? "https://newsportalapi.ekaartech.com/v1"
).replace(/\/$/, "");

const TENANT_HOST = process.env.NEWS_TENANT_HOST ?? "thenagarik.com";
const PORTAL_KEY = process.env.NEWS_PORTAL_KEY ?? "";

type PublicCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
};

type PublicMedia = {
  id: string;
  kind: "image" | "video";
  contentType: string;
  path: string;
  thumbPath: string | null;
  width: number | null;
  height: number | null;
};

type PublicArticleSummary = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  category: { id: string; name: string; slug: string } | null;
  tags: { id: string; name: string; slug: string }[];
  featuredMedia: PublicMedia | null;
};

type PublicArticle = PublicArticleSummary & {
  body: string;
  updatedAt: string;
  media: PublicMedia[];
};

type PublicHomepage = {
  date: string | null;
  requestedDate: string;
  isFallback: boolean;
  sections: {
    kind: "latest" | "category";
    category: { id: string; name: string; slug: string } | null;
    items: PublicArticleSummary[];
  }[];
};

function mediaUrl(media: PublicMedia | null | undefined): string {
  if (!media?.id) {
    return "https://picsum.photos/seed/nagarik-fallback/1400/788";
  }
  return `/api/media/${media.id}/full`;
}

function toArticle(item: PublicArticleSummary, body: string[] = []): Article {
  return {
    id: item.id,
    title: item.title,
    slug: item.slug,
    excerpt: body[0] ?? item.title,
    body: body.length ? body : [item.title],
    publishedAt: item.publishedAt,
    category: item.category ?? { id: "uncat", name: "समाचार", slug: "samachar" },
    author: "The Nagarik",
    image: mediaUrl(item.featuredMedia),
    imageAlt: item.title,
  };
}

/** Fetch a public API path (must start with /public/...). */
async function publicFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!path.startsWith("/public/")) {
    throw new Error(`Only public routes are allowed: ${path}`);
  }
  if (!PORTAL_KEY) {
    throw new Error("NEWS_PORTAL_KEY is not configured");
  }

  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      "X-Forwarded-Host": TENANT_HOST,
      "X-Portal-Key": PORTAL_KEY,
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${url} failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function getPublicCategories(): Promise<Category[]> {
  const data = await publicFetch<{ items: PublicCategory[]; total: number }>(
    "/public/categories",
  );
  return data.items.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));
}

export async function getPublicHomepage() {
  return publicFetch<PublicHomepage>("/public/homepage");
}

export async function getPublicFeed(opts?: {
  category?: string;
  date?: string;
  limit?: number;
  offset?: number;
}) {
  const params = new URLSearchParams();
  if (opts?.category) {
    params.set("category", resolveCategorySlug(opts.category));
  }
  if (opts?.date) params.set("date", opts.date);
  if (opts?.limit) params.set("limit", String(opts.limit));
  if (opts?.offset) params.set("offset", String(opts.offset));
  const qs = params.toString();
  const data = await publicFetch<{
    items: PublicArticleSummary[];
    total: number;
    limit: number;
    offset: number;
  }>(`/public/feed${qs ? `?${qs}` : ""}`);
  return {
    ...data,
    items: data.items.map((item) => toArticle(item)),
  };
}

export async function getPublicArticle(slug: string): Promise<Article | null> {
  try {
    const item = await publicFetch<PublicArticle>(
      `/public/articles/${encodeURIComponent(slug)}`,
    );
    const paragraphs = item.body
      .split(/\n+/)
      .map((p) => p.trim())
      .filter(Boolean);
    return toArticle(item, paragraphs.length ? paragraphs : [item.body]);
  } catch {
    return null;
  }
}

export async function getPublicBreaking() {
  return publicFetch<{
    items: {
      id: string;
      title: string;
      slug: string;
      publishedAt: string;
      expiresAt: string | null;
    }[];
  }>("/public/breaking");
}

export async function getPublicAds() {
  return publicFetch<{
    items: {
      id: string;
      name: string;
      slot: string;
      linkUrl: string;
      imagePath: string;
      width: number | null;
      height: number | null;
      startsAt: string;
      endsAt: string;
    }[];
  }>("/public/ads");
}

export async function recordArticleView(slug: string, visitorId: string) {
  return publicFetch<{ ok?: boolean }>(
    `/public/articles/${encodeURIComponent(slug)}/views`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitorId }),
    },
  );
}

export function getApiConfig() {
  return {
    apiBase: API_BASE,
    tenantHost: TENANT_HOST,
    hasPortalKey: Boolean(PORTAL_KEY),
  };
}
