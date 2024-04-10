import { useFetcher, useOutletContext, Outlet, type MetaFunction } from "@remix-run/react";
import { Separator } from "@components/ui/separator";
import { Button } from "@components/ui/button";
import { MoonIcon, SunIcon, UserCogIcon } from "lucide-react";
import { useOptimisticThemeMode } from "@utils/hooks/use-theme";
import type { Theme } from "@utils/theme.server";

export default function Index() {
  const fetcher = useFetcher({});

  const { userPreferences } = useOutletContext<{
    userPreferences: { theme: Theme };
  }>();

  const optimisticMode = useOptimisticThemeMode();
  const mode = optimisticMode ?? userPreferences?.theme ?? "system";
  const nextMode = mode === "system" ? "light" : mode === "light" ? "dark" : "light";
  const modeLabel = {
    light: <SunIcon />,
    dark: <MoonIcon />,
    system: <UserCogIcon />,
  };

  return (
    <>
      <div>
        <div className="flex justify-between align-center h-[80px]">
          <div className="flex items-center"></div>
          <div className="mx-8 flex items-center">
            <fetcher.Form method="post" action="/preferences/theme">
              <input type="hidden" name="theme" value={nextMode} />
              <input type="hidden" name="intent" value="update-theme" />
              <Button variant="secondary" className="rounded-lg px-2 py-2" type="submit">
                {modeLabel[nextMode as Theme]}
              </Button>
            </fetcher.Form>
          </div>
        </div>
        <Separator />
      </div>
      <Outlet />
    </>
  );
}
