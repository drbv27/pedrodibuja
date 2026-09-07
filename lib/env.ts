// Server-only environment access for the contact Server Action (design D7).
// Lazy getters, not eagerly read module constants: a missing var only
// surfaces when `app/contacto/actions.ts` actually needs it, not at import
// time (which would otherwise fail every route that imports this module
// transitively). This file is imported exclusively from that "use server"
// action file, so these values never reach a client bundle.

function readServerEnvVar(name: "RESEND_API_KEY" | "CONTACT_TO"): string | undefined {
  return process.env[name];
}

export const serverEnv = {
  get resendApiKey(): string | undefined {
    return readServerEnvVar("RESEND_API_KEY");
  },
  get contactTo(): string | undefined {
    return readServerEnvVar("CONTACT_TO");
  },
};

// Public, build-time-baked site URL (design D7 / spec `deployment-and-
// environment`). Every absolute URL in the app — `metadataBase`, every
// route's canonical, `sitemap.ts`, `robots.ts`, JSON-LD `Person.url`, and
// every `opengraph-image`'s implicit `og:image` URL — derives from this one
// value. No absolute URL literal may be hardcoded anywhere else.
//
// Deviation from design D7's stricter proposal (fail a *production* build
// outright if the var is missing): this work unit's explicit instruction is
// to keep a local build green with the var unset, so a missing
// `NEXT_PUBLIC_SITE_URL` falls back to `http://localhost:3000` instead of
// throwing. Reported as a deviation in the apply-progress artifact — set
// the real value in Vercel before the first production deploy regardless,
// or canonicals/sitemap/OG URLs will silently point at localhost.
const DEFAULT_SITE_URL = "http://localhost:3000";

/** Strips one or more trailing slashes so callers can safely do `${siteUrl}${path}`. */
function normalizeSiteUrl(rawValue: string): string {
  return rawValue.replace(/\/+$/, "");
}

function resolveSiteUrl(): string {
  const rawValue = process.env.NEXT_PUBLIC_SITE_URL;
  return rawValue ? normalizeSiteUrl(rawValue) : DEFAULT_SITE_URL;
}

export const publicEnv = {
  siteUrl: resolveSiteUrl(),
};
