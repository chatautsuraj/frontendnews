import type { Article, Category } from "@/lib/types";

const API_BASE =
  process.env.NEWS_API_BASE_URL ?? "https://newsportalapi.ekaartech.com";
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
  if (!media?.id) return "https://picsum.photos/seed/nagarik-fallback/1400/788";
  const size = media.thumbPath ? "full" : "full";
  return `/api/media/${media.id}?size=${size}`;
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

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  if (!PORTAL_KEY) {
    throw new Error("NEWS_PORTAL_KEY is not configured");
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      "X-Forwarded-Host": TENANT_HOST,
      "X-Portal-Key": PORTAL_KEY,
      ...(init?.headers ?? {}),
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API ${path} failed (${res.status}): ${text}`);
  }

  return res.json() as Promise<T>;
}

export async function getTenantContext() {
  const res = await fetch(`${API_BASE}/v1/tenant/context`, {
    headers: {
      Accept: "application/json",
      "X-Forwarded-Host": TENANT_HOST,
    },
    next: { revalidate: 300 },
  });
  if (!res.ok) throw new Error("Failed to resolve tenant context");
  return res.json() as Promise<{
    tenantId: string;
    domain: string;
    slug: string;
    status: string;
  }>;
}

export async function getPublicCategories(): Promise<Category[]> {
  const data = await apiFetch<{ items: PublicCategory[]; total: number }>(
    "/v1/public/categories",
  );
  return data.items.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
  }));
}

export async function getPublicHomepage() {
  return apiFetch<PublicHomepage>("/v1/public/homepage");
}

export async function getPublicFeed(opts?: {
  category?: string;
  limit?: number;
  offset?: number;
}) {
  const params = new URLSearchParams();
  if (opts?.category) params.set("category", opts.category);
  if (opts?.limit) params.set("limit", String(opts.limit));
  if (opts?.offset) params.set("offset", String(opts.offset));
  const qs = params.toString();
  const data = await apiFetch<{
    items: PublicArticleSummary[];
    total: number;
    limit: number;
    offset: number;
  }>(`/v1/public/feed${qs ? `?${qs}` : ""}`);
  return {
    ...data,
    items: data.items.map((item) => toArticle(item)),
  };
}

export async function getPublicArticle(slug: string): Promise<Article | null> {
  try {
    const item = await apiFetch<PublicArticle>(
      `/v1/public/articles/${encodeURIComponent(slug)}`,
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
  return apiFetch<{
    items: {
      id: string;
      title: string;
      slug: string;
      publishedAt: string;
      expiresAt: string | null;
    }[];
  }>("/v1/public/breaking");
}

export function getApiConfig() {
  return {
    apiBase: API_BASE,
    tenantHost: TENANT_HOST,
    hasPortalKey: Boolean(PORTAL_KEY),
  };
}
