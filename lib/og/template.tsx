// Shared OG image renderer, reused by every `app/**/opengraph-image.tsx`
// (design D4). Satori (the renderer behind `ImageResponse`) supports only a
// CSS subset: flexbox layout (no grid), hex color literals (no CSS custom
// properties — see `lib/og/colors.ts`), and every node with more than one
// child needs an explicit `display: "flex"` or Satori cannot lay it out.
//
// This file has no `async` boundary of its own beyond awaiting
// `loadOgFonts()` — a pure, memoized local file read, not a request-time
// API — so calling it from a six-line `opengraph-image.tsx` keeps that
// route's static prerender intact.

import { ImageResponse } from "next/og";
import { OG_SIZE } from "./size";
import { OG_COLORS } from "./colors";
import { loadOgFonts } from "./fonts";
import type { OgContent } from "./content";

const PADDING = 64;

export async function renderOgImage(content: OgContent): Promise<ImageResponse> {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: `${PADDING}px`,
          backgroundColor: OG_COLORS.paper,
          fontFamily: "Inter",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                width: 18,
                height: 18,
                marginRight: 16,
                borderRadius: 4,
                backgroundColor: OG_COLORS.accentBright,
              }}
            />
            <div
              style={{
                display: "flex",
                fontSize: 26,
                letterSpacing: 2,
                textTransform: "uppercase",
                color: OG_COLORS.accent,
              }}
            >
              {content.kicker}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 999,
              backgroundColor: OG_COLORS.accent,
              color: OG_COLORS.paper,
              fontFamily: "Bricolage Grotesque",
              fontSize: 22,
            }}
          >
            PD
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              maxWidth: 1000,
              marginBottom: 28,
              fontFamily: "Bricolage Grotesque",
              fontSize: 58,
              lineHeight: 1.15,
              color: OG_COLORS.ink,
            }}
          >
            {content.title}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: 880,
              fontSize: 27,
              lineHeight: 1.5,
              color: OG_COLORS.inkMuted,
            }}
          >
            {content.subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            height: 10,
            borderRadius: 999,
            backgroundColor: OG_COLORS.accentBright,
          }}
        />
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
