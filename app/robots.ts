import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";

// Allows crawling of the whole site and points at the generated sitemap,
// both absolute against `publicEnv.siteUrl` (spec `seo-metadata`: "Canonical,
// sitemap, robots").
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: new URL("/sitemap.xml", publicEnv.siteUrl).toString(),
  };
}
