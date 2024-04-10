import { json, type DataFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useRouteError } from "@remix-run/react";
import { LayoutGridIcon, SearchIcon, BookCopyIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

export default function Index() {
  return (
    <div className="relative flex flex-col md:h-full md:flex-row">
      <div className="sticky top-0 z-10 w-full space-y-4 bg-background px-4 py-2 md:hidden">
        <div className="flex w-full items-center justify-start gap-2">
          <Link to="/" title="home page">
            <Badge variant="secondary" className="text-md flex gap-2">
              <LayoutGridIcon size="16" />
              Home
            </Badge>
          </Link>
          <Link to="/search" title="Browse books">
            <Badge variant="secondary" className="text-md flex gap-2">
              <SearchIcon size="16" />
              Search
            </Badge>
          </Link>
        </div>
      </div>
      <div className="m-auto flex w-full max-w-screen-2xl justify-start">
        <Outlet />
        <div className="hidden h-full min-h-screen  w-[266px] min-w-[266px] space-y-4 border-l py-5 md:sticky md:top-0 md:block">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Discover</h2>
            <div className="space-y-1">
              <Link to="/">
                <Button variant="ghost" className="w-full justify-start gap-2">
                  <LayoutGridIcon size="16" />
                  Home
                </Button>
              </Link>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Popular</h2>
            <div className="space-y-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
