import { json, redirect, type ActionFunctionArgs } from "@remix-run/node";
import { parse } from "@conform-to/zod";
import { setTheme } from "@utils/theme.server";
import { invariantResponse } from "@utils/invariant";
import { z } from "zod";

export const schema = z.object({
  theme: z.enum(["system", "light", "dark"]),
});

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  invariantResponse(formData.get("intent") === "update-theme", "Invalid intent", { status: 400 });
  const submission = parse(formData, {
    schema,
  });
  if (submission.intent !== "submit") {
    return json({ status: "success", submission } as const);
  }
  if (!submission.value) {
    return json({ status: "error", submission } as const, { status: 400 });
  }
  const { theme } = submission.value;

  const responseInit = {
    headers: { "set-cookie": setTheme(theme) },
  };
  if (request.headers.get("accept") === "application/json") {
    return json({ success: true, submission }, responseInit);
  } else {
    return redirect("/", responseInit);
  }
}
