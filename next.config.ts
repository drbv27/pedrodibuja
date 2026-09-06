import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Do not auto-generate AGENTS.md / CLAUDE.md on every dev/build run —
  // this repo's AI-agent conventions are already tracked outside git (.atl/).
  agentRules: false,
};

export default nextConfig;
