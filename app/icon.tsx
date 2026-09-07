// Generated favicon, replacing the Vercel mark `create-next-app` scaffolded.
//
// Rendered through `ImageResponse` from the same subset display font and the
// same palette literals the Open Graph images use, so the tab icon and a
// shared link read as one brand. Like the OG routes, this file touches no
// request-time API, so Next.js prerenders it to a static PNG at build time.
//
// A single bold "P" rather than the OG badge's "PD": a favicon is rendered
// at 16px in a crowded tab bar, and one letter stays legible there where two
// blur into a smudge.

import { ImageResponse } from "next/og";
import { OG_COLORS } from "@/lib/og/colors";
import { loadOgFonts } from "@/lib/og/fonts";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const { display } = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          backgroundColor: OG_COLORS.accent,
          color: OG_COLORS.paper,
          fontFamily: "Display",
          fontSize: 42,
          lineHeight: 1,
          // Optical centering: the cap-height of "P" sits high in its em box,
          // so a mathematically centred glyph reads as if it were floating.
          paddingBottom: 4,
        }}
      >
        P
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Display", data: display, weight: 700, style: "normal" }],
    },
  );
}
