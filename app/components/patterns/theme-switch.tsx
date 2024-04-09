import { parse } from "@conform-to/zod";
import { useForm } from "@conform-to/react";
import { useFetcher } from "@remix-run/react";
import { SunMediumIcon, MoonIcon, SettingsIcon } from "lucide-react";
import { ErrorList } from "./form";
import { useOptimisticThemeMode } from "@utils/hooks/use-theme";
import { schema } from "@routes/preferences.theme";
import { type Theme } from "~/utils/theme.server";

export function ThemeSwitch({
  userPreference,
}: {
  userPreference?: Theme | null;
}) {
  const fetcher = useFetcher();

  const [form] = useForm({
    id: "theme-switch",
    // @ts-expect-error testing things out for now
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema });
    },
  });

  const optimisticMode = useOptimisticThemeMode();
  const mode = optimisticMode ?? userPreference ?? "system";
  const nextMode =
    mode === "system" ? "light" : mode === "light" ? "dark" : "system";
  const modeLabel = {
    light: <SunMediumIcon />,
    dark: <MoonIcon />,
    system: <SettingsIcon />,
  };

  return (
    <fetcher.Form method="POST" action="/preferences/theme" {...form.props}>
      <input type="hidden" name="theme" value={nextMode} />
      <div className="flex gap-2">
        <button
          name="intent"
          value="update-theme"
             type="submit"
          className="flex items-center justify-center w-8 h-8 cursor-pointer"
        >
          {modeLabel[mode as Theme]}
        </button>
      </div>
      <ErrorList errors={form.errors} id={form.errorId} />
    </fetcher.Form>
  );
}
