import { Link, Outlet, useLoaderData, useOutletContext, useRouteError } from "@remix-run/react";
import { LayoutGridIcon, SearchIcon, BookCopyIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { BookOverviewSmall } from "~/components/patterns/book-overview-small";
import { meta } from "~/utils/data";

export default function Index() {
  return (
    <div className="relative flex flex-col md:h-full md:flex-row">
      <div className="sticky top-0 z-10 w-full space-y-4 bg-background px-4 py-2 md:hidden">
        <div className="flex w-full items-center justify-start gap-2"></div>
      </div>
      <div className="m-auto flex w-full max-w-screen-2xl justify-start">
        <Outlet />
        <div className="hidden h-full min-h-screen  w-[266px] min-w-[266px] space-y-4 border-l py-5 md:sticky md:top-0 md:block">
          <div className="px-3 py-2">
            <BookOverviewSmall
              title={meta.title}
              authors={meta.authors.map((item) => item.name)}
              datePublished={meta.date}
            />
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
