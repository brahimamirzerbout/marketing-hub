import type { NextConfig } from "next";

const config: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  poweredByHeader: false,
  outputFileTracingRoot: process.cwd(),
};
export default config;
