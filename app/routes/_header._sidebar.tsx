import { json, type LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, Link } from "@remix-run/react";
import { Share } from "lucide-react";
import { BookOverview } from "~/components/patterns/book-overview";
import { Button } from "~/components/ui/button";
import { getChaptersWithoutBody, getMeta } from "~/utils/content-layer.server";
import { invariant } from "~/utils/invariant";

export const loader = async () => {
  const [meta, chapters] = await Promise.all([getMeta(), getChaptersWithoutBody()]);

  invariant(meta, "Meta not found");
  invariant(chapters, "Chapters not found");
  return json({ meta, chapters });
};

export default function Index() {
  const { meta, chapters } = useLoaderData<typeof loader>();

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
              authors={meta.authors}
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
            <div className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Chapters</h2>
              <div className="space-y-1">
                <ul>
                  {chapters.map((chapter) => (
                    <li key={`nav_chapters_links_${chapter.slug}`}>
                      <Button
                        asChild
                        variant="ghost"
                        className="w-full justify-start gap-2 text-wrap text-left h-auto"
                        title={chapter.title}
                      >
                        <Link to={`/${chapter.slug}`}>{chapter.title}</Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
