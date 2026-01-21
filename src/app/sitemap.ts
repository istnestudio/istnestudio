import { request } from "@/lib/cms";
import type { MetadataRoute } from "next";
import { RealizationSlugsDocument } from "../../graphql/generated";

const baseUrl = process.env.DOMAIN
  ? `https://${process.env.DOMAIN}`
  : "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { allRealizations } = await request(RealizationSlugsDocument);

  const staticPages = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ] as const;

  const realizationPages: MetadataRoute.Sitemap = allRealizations.map(
    ({ slug, _updatedAt }) => ({
      url: `${baseUrl}/realizations/${slug}`,
      lastModified: new Date(_updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    }),
  );

  return [...staticPages, ...realizationPages];
}
