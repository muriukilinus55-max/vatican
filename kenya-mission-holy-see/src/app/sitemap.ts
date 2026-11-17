import type { MetadataRoute } from "next";
import { locales } from "@/config/locales";
import { institutionalPages, sections } from "@/lib/navigation";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (!siteUrl) return [];

  const baseUrl = siteUrl.replace(/\/$/, "");
  const entries = locales.flatMap((locale) =>
    ["", ...sections.map((item) => item.slug), ...institutionalPages].map((section) => ({
      url: `${baseUrl}/${locale}${section ? `/${section}` : ""}`,
      changeFrequency: "monthly" as const,
      priority: section ? 0.7 : 1,
    })),
  );

  return entries;
}
