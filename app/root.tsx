import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";
import { Toaster } from "~/components/ui/toaster";
import { getClientEnvironments } from "@utils/environment.server";
import { getTheme } from "@utils/theme.server";
import { getHints } from "@utils/client-hints";
import { useNonce } from "@utils/hooks/use-nonce";
import { useTheme } from "./utils/hooks/use-theme";
import stylesheet from "~/tailwind.css?url";
import readerStyles from "~/reader.css?url";
import vaulStyles from "vaul/dist/index.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  { rel: "stylesheet", href: readerStyles },
  { rel: "stylesheet", href: vaulStyles },
];

export async function loader({ request }: LoaderFunctionArgs) {
  const clientEnvs = getClientEnvironments();

  return json({
    requestInfo: {
      hints: getHints(request),
      path: new URL(request.url).pathname,
      userPreferences: {
        theme: getTheme(request),
      },
    },
    ENV: clientEnvs,
  });
}

export default function App() {
  const { requestInfo, ENV } = useLoaderData<typeof loader>();
  const nonce = useNonce();
  const theme = useTheme();

  return (
    <html lang="en" className={`${theme} h-full overflow-x-hidden`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
      </head>
      <body className="bg-background text-foreground">
        <Outlet
          context={{
            userPreferences: requestInfo.userPreferences,
          }}
        />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <Toaster />
      </body>
    </html>
  );
}
