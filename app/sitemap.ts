import type { MetadataRoute } from "next";
import { publicEnv } from "@/lib/env";
import { ROUTES } from "@/lib/routes";

// Generated straight from the same `ROUTES` registry the nav and per-route
// metadata read from (spec `seo-metadata`: "Single route registry"), so the
// sitemap cannot list a route the nav doesn't have or vice versa. Every URL
// is absolute, built from `publicEnv.siteUrl` — never hardcoded.
export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => ({
    url: new URL(route.path, publicEnv.siteUrl).toString(),
    lastModified: new Date(),
  }));
}
