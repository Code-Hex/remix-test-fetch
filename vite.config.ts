import {
  vitePlugin as remix,
  cloudflareDevProxyVitePlugin as remixCloudflareDevProxy,
} from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import serverAdapter from "hono-remix-adapter/vite";
import { getLoadContext } from "./src/load-context";
import adapter from "@hono/vite-dev-server/cloudflare";

declare module "@remix-run/node" {
  interface Future {
    v3_singleFetch: true;
  }
}

export default defineConfig({
  plugins: [
    remixCloudflareDevProxy(),
    remix({
      appDirectory: "src/app",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_singleFetch: true,
        v3_lazyRouteDiscovery: true,
      },
    }),
    serverAdapter({
      adapter,
      getLoadContext,
      entry: "src/api/index.ts",
    }),
    tsconfigPaths(),
  ],
});
