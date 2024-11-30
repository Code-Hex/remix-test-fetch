import type { MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import { loader as userLoader } from "./user";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const fetcher = useFetcher<typeof userLoader>();

  const users = fetcher.data?.users ?? [];
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-2">
        <button
          onClick={() => {
            console.log("clicked!!");
            fetcher.load("/user");
          }}
        >
          Click!!
        </button>
        <p>{users.map((u) => u.name).join(", ")}</p>
      </div>
    </div>
  );
}
