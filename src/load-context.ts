import type { Context } from "hono";
import type { PlatformProxy } from "wrangler";

type Env = {
  TEST: string;
};

type HonoTypes = { Bindings: Env };

type GetLoadContextArgs = {
  request: Request;
  context: {
    cloudflare: Omit<
      PlatformProxy<HonoTypes["Bindings"]>,
      "dispose" | "caches" | "cf"
    > & {
      caches: PlatformProxy<HonoTypes>["caches"] | CacheStorage;
      cf: Request["cf"];
    };
    hono: {
      context: Context<HonoTypes>;
    };
  };
};

declare module "@remix-run/cloudflare" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AppLoadContext extends ReturnType<typeof getLoadContext> {
    // This will merge the result of `getLoadContext` into the `AppLoadContext`
    hono: {
      context: Context<HonoTypes>;
    };
  }
}

export function getLoadContext({ context }: GetLoadContextArgs) {
  return context;
}
