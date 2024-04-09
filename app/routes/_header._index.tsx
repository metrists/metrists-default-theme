import { Button } from "@components/ui/button";
import { ThemeSwitch } from "@components/patterns/theme-switch";
import type { MetaFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { type Theme } from "~/utils/theme.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div
      style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}
    ></div>
  );
}
