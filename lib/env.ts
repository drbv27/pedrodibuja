// Server-only environment access for the contact Server Action (design D7).
// Lazy getters, not eagerly read module constants: a missing var only
// surfaces when `app/contacto/actions.ts` actually needs it, not at import
// time (which would otherwise fail every route that imports this module
// transitively). This file is imported exclusively from that "use server"
// action file, so these values never reach a client bundle.
//
// `publicEnv` (`NEXT_PUBLIC_SITE_URL`, validated at import, fails a
// production build if missing) is a separate concern that ships with the
// SEO work unit — not duplicated here.

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
