# Reproduce 404 with useFetcher().load

- a3be33e: This commit does not use hono-remix-adapter, we can confirm that fetcher.load succeeds.
- 638dba7: This commit uses hono-remix-adapter, I can confirm that fetcher.load fails.

Problematic code:

`src/app/routes/_index.tsx`

```tsx
const fetcher = useFetcher()

<button
  onClick={() => {
    console.log("clicked!!");
    fetcher.load("/user");
  }}
>
    Click!!
</button>
```

## 404 Not Found Problem

```
Error: No route matches URL "/src/app/routes/user.tsx"
    at getInternalRouterError (/Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@remix-run/router/router.ts:5505:5)
    at Object.query (/Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@remix-run/router/router.ts:3527:19)
    at handleDocumentRequest (/Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@remix-run/server-runtime/dist/server.js:275:35)
    at requestHandler (/Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@remix-run/server-runtime/dist/server.js:160:24)
    at processTicksAndRejections (node:internal/process/task_queues:95:5)
    at getRequestListener.overrideGlobalObjects (file:///Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@hono/vite-dev-server/dist/dev-server.js:93:32)
    at responseViaResponseObject (file:///Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@hono/node-server/dist/index.mjs:333:15)
No routes matched location "/src/app/routes/user.tsx?import"
ErrorResponseImpl {
  status: 404,
  statusText: 'Not Found',
  internal: true,
  data: 'Error: No route matches URL "/src/app/routes/user.tsx"',
  error: Error: No route matches URL "/src/app/routes/user.tsx"
      at getInternalRouterError (/Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@remix-run/router/router.ts:5505:5)
      at Object.query (/Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@remix-run/router/router.ts:3527:19)
      at handleDocumentRequest (/Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@remix-run/server-runtime/dist/server.js:275:35)
      at requestHandler (/Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@remix-run/server-runtime/dist/server.js:160:24)
      at processTicksAndRejections (node:internal/process/task_queues:95:5)
      at getRequestListener.overrideGlobalObjects (file:///Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@hono/vite-dev-server/dist/dev-server.js:93:32)
      at responseViaResponseObject (file:///Users/codehex/go/src/github.com/Code-Hex/remix-test-fetch/node_modules/@hono/node-server/dist/index.mjs:333:15)
}
```

## Development

Run the dev server:

```shellscript
npm run dev
```
