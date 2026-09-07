import { renderOgImage } from "@/lib/og/template";
import { OG_CONTENT } from "@/lib/og/content";
import { OG_SIZE } from "@/lib/og/size";

// No request-time API anywhere in this file (spec `social-preview-images`).
// `next build`'s Route table must show this entry static (○) —
// `scripts/check-og.mjs` is the proof, not this comment.
export const alt = OG_CONTENT.home.alt;
export const size = OG_SIZE;
export const contentType = "image/png";
export default function Image() {
  return renderOgImage(OG_CONTENT.home);
}
