import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import { SkipLink } from "@/components/chrome/SkipLink";
import { SiteHeader } from "@/components/chrome/SiteHeader";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { JsonLd } from "@/components/chrome/JsonLd";
import { publicEnv } from "@/lib/env";
import { ROUTE_METADATA } from "@/lib/seo";
import { buildPersonJsonLd, serializePersonJsonLd } from "@/lib/jsonld";
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Root-level fallback only. `metadataBase` is the one thing every route
// needs from here (it resolves each page's own relative canonical/OG URLs
// into absolute ones); title/description are the home page's own values as
// a sane default for any route that somehow renders without exporting its
// own `metadata` (spec `seo-metadata`: single source of truth for absolute
// URLs is `NEXT_PUBLIC_SITE_URL` via `publicEnv.siteUrl`).
export const metadata: Metadata = {
  metadataBase: new URL(publicEnv.siteUrl),
  title: ROUTE_METADATA.home.title,
  description: ROUTE_METADATA.home.description,
};

const personJsonLd = serializePersonJsonLd(buildPersonJsonLd());

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${bricolageGrotesque.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SkipLink />
        <SiteHeader />
        <main id="main-content" className="flex flex-1 flex-col">
          {children}
        </main>
        <SiteFooter />
        <JsonLd data={personJsonLd} />
      </body>
    </html>
  );
}
