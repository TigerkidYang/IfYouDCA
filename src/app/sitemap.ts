import { MetadataRoute } from "next";
import { INSIGHTS_POSTS } from "./lib/insights-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ifyoudca.com";

  const staticPages = ["/", "/insights", "/about", "/faq", "/contact"];

  const staticPageEntries = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  const insightPageEntries = INSIGHTS_POSTS.map((post) => ({
    url: `${siteUrl}/insights/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPageEntries, ...insightPageEntries];
}
