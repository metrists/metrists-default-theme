import { json, type LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData, Link, ShouldRevalidateFunction } from "@remix-run/react";
import { Share } from "lucide-react";
import { BookOverview } from "~/components/patterns/book-overview";
import { Button } from "~/components/ui/button";
import { ChapterNavigation } from "~/components/patterns/chapter-navigation";
import { getChapter, getChaptersWithoutBody, getMeta } from "~/utils/content-layer.server";
import { invariant } from "~/utils/invariant";
import { Drawer } from "~/components/ui/drawer";

export const loader = async ({ params }) => {
  const [meta, chapters] = await Promise.all([getMeta(), getChaptersWithoutBody()]);
  invariant(meta, "Meta not found");
  invariant(chapters, "Chapters not found");
  return json({ meta, chapters });
};

export const shouldRevalidate: ShouldRevalidateFunction = ({ currentParams, nextParams }) => {
  return currentParams.chapter !== nextParams.chapter;
};

export default function Index() {
  const { meta, chapters } = useLoaderData<typeof loader>();
  const firstChapter = chapters[0];

  return (
    <div className="relative max-w-4xl m-auto flex flex-col">
      <div className="m-auto grid grid-cols-7">
        <div className="p-4 col-span-7 md:col-span-5 md:p-8">
          <Outlet />
          <div className="sticky z-10 w-full bottom-0 space-y-4 bg-background py-2 md:hidden">
            <Drawer>
              <ChapterNavigation
                navigation={[undefined, undefined]}
                meta={meta}
                chapters={chapters}
              />
            </Drawer>
          </div>
        </div>
        <div className="col-span-2 space-y-4 border-l py-5 hidden md:block">
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
                  action: `/${firstChapter?.slug}`,
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
                        <Link to={`/${chapter.slug}`} prefetch="intent">
                          {chapter.title}
                        </Link>
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
