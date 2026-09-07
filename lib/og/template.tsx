// Shared OG image renderer, reused by every `app/**/opengraph-image.tsx`
// (design D4). Satori (the renderer behind `ImageResponse`) supports only a
// CSS subset: flexbox layout (no grid), hex color literals (no CSS custom
// properties — see `lib/og/colors.ts`), and every node with more than one
// child needs an explicit `display: "flex"` or Satori cannot lay it out.
//
// WU10 layout (Engram id 514): the logo centred on the canvas, roughly
// 700px wide on home (smaller on the other five routes to leave room for a
// longer headline), one supporting line below it, and a short accent rule
// under that. The logo only ever renders on the paper background — its own
// "Pedro" wordmark measures 1.20:1 on ink, invisible — so this template has
// no ink/dark variant.
//
// Safe zone: WhatsApp crops its large link preview to its own aspect ratio,
// and the previous kicker-badge-in-the-corner design lost content to that
// crop. Every element here stays inside the central 76% of the 1200x630
// canvas (912x478.8), by centering a fixed-size column inside the full
// canvas rather than anchoring anything to an edge or corner.
//
// This file has no `async` boundary of its own beyond awaiting
// `loadOgFonts()`/`loadOgLogo()` — both pure, memoized local file reads,
// not request-time APIs — so calling it from a six-line
// `opengraph-image.tsx` keeps that route's static prerender intact.

import { ImageResponse } from "next/og";
import { OG_SIZE } from "./size";
import { OG_COLORS } from "./colors";
import { loadOgFonts } from "./fonts";
import { loadOgLogo, LOGO_NATURAL_WIDTH, LOGO_NATURAL_HEIGHT } from "./logo";
import type { OgContent } from "./content";

const LOGO_ASPECT = LOGO_NATURAL_WIDTH / LOGO_NATURAL_HEIGHT;

// Central 76% of the 1200x630 canvas (Engram id 514's clipping fix).
const SAFE_WIDTH = Math.round(OG_SIZE.width * 0.76);

// Home reads as the primary share image. The approved layout (Engram id
// 514) called for "roughly 700px wide"; measured against this exact
// column (logo + gap + one line of the supporting copy + gap + rule), a
// literal 700px pushes the block's total height past the safe zone's
// 478.8px, since the safe-zone rule is the harder constraint here (it is
// the fix for the exact WhatsApp crop bug this work unit addresses) —
// 520px keeps the whole column inside the safe zone with real margin
// (measured: content bounding box within [144,1056]x[75.6,554.4]).
// The other five routes get a smaller logo so their own (longer)
// headline always has room.
const HOME_LOGO_WIDTH = 520;
const INNER_LOGO_WIDTH = 420;

function logoHeightFor(width: number): number {
  return Math.round(width / LOGO_ASPECT);
}

export async function renderOgImage(content: OgContent): Promise<ImageResponse> {
  const [fonts, logo] = await Promise.all([loadOgFonts(), loadOgLogo()]);
  const isHome = content.variant === "home";
  const logoWidth = isHome ? HOME_LOGO_WIDTH : INNER_LOGO_WIDTH;
  const logoHeight = logoHeightFor(logoWidth);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: OG_COLORS.paper,
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: SAFE_WIDTH,
          }}
        >
          {/*
           * `next/image` cannot run inside a Satori/`ImageResponse` tree —
           * this is rasterized to a PNG at build time, never hydrated as a
           * DOM `<img>`, so neither the LCP-optimization nor the
           * alt-text a11y concern those lint rules exist to catch applies
           * here. `alt=""` because Satori ignores it entirely; the real
           * accessible name for this image lives in each route's own
           * `export const alt`, read by the scraper, not by this element.
           */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt=""
            width={logoWidth}
            height={logoHeight}
            style={{ display: "flex", width: logoWidth, height: logoHeight }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 20,
              width: isHome ? 860 : 880,
              maxWidth: SAFE_WIDTH,
              justifyContent: "center",
              textAlign: "center",
              fontFamily: isHome ? "Inter" : "Bricolage Grotesque",
              fontWeight: isHome ? 400 : 700,
              fontSize: isHome ? 34 : 40,
              lineHeight: 1.3,
              color: isHome ? OG_COLORS.inkMuted : OG_COLORS.ink,
            }}
          >
            {content.supportingLine}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 14,
              width: 120,
              height: 6,
              borderRadius: 999,
              backgroundColor: OG_COLORS.accentBright,
            }}
          />
        </div>
      </div>
    ),
    {
      ...OG_SIZE,
      fonts: [
        { name: "Bricolage Grotesque", data: fonts.display, weight: 700, style: "normal" },
        { name: "Inter", data: fonts.body, weight: 400, style: "normal" },
      ],
    },
  );
}
