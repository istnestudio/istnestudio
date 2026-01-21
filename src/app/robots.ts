import type { MetadataRoute } from "next";

const baseUrl = process.env.DOMAIN
  ? `https://${process.env.DOMAIN}`
  : "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
