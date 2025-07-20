import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ifyoudca.com";

  const staticPages = ["/", "/insights", "/about", "/faq", "/contact"];

  const staticPageEntries = staticPages.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.8,
  }));

  return [
    ...staticPageEntries,
    // NOTE: If you add dynamic pages (e.g., /insights/[slug]),
    // you would fetch them from the database and add them here.
  ];
}
