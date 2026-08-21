import type { NextConfig } from "next";

const previewEnabled = process.env.MIGRATION_PREVIEW === "1";
const previewPath = "/alandiaz145/allenks-web-v2/migration/current-public-20260821/preview-build";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  ...(previewEnabled
    ? {
        basePath: previewPath,
        assetPrefix: `https://raw.githack.com${previewPath}`,
      }
    : {}),
};

export default nextConfig;
