import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "New Remix App" }, { name: "description", content: "Welcome to Remix!" }];
};

export default function Index() {
  return (
    <div className="relative m-auto flex w-full max-w-sm flex-col md:h-full md:flex-row">
      We're here
    </div>
  );
}
