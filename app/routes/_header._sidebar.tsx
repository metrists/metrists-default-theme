import { Outlet } from "@remix-run/react";
import { Share } from "lucide-react";
import { BookOverview } from "~/components/patterns/book-overview";
import { meta } from "~/utils/data";

export default function Index() {
  return (
    <div className="relative flex flex-col md:h-full md:flex-row">
      <div className="sticky top-0 z-10 w-full space-y-4 bg-background px-4 py-2 md:hidden">
        <div className="flex w-full items-center justify-start gap-2"></div>
      </div>
      <div className="m-auto flex w-full max-w-screen-lg justify-start">
        <div className="p-8">
          <Outlet />
        </div>
        <div className="hidden h-full min-h-screen  w-[266px] min-w-[266px] space-y-4 border-l py-5 md:sticky md:top-0 md:block">
          <div className="px-3 py-2">
            <BookOverview
              title={meta.title}
              authors={meta.authors.map((item) => item.name)}
              datePublished={meta.date}
              actions={[
                {
                  label: "Download",
                  action: "/epub.md",
                  buttonProps: { size: "sm" },
                  linkProps: { download: true },
                },
                {
                  label: <Share size={16} />,
                  action: () => alert("Share"),
                  buttonProps: { size: "sm", variant: "secondary" },
                },
              ]}
              twoToneImageProps={{
                imageContainerClassName: "w-full",
              }}
            />
          </div>
          <div className="py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Chapters</h2>
            <div className="space-y-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
