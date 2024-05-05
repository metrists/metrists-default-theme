import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  Link,
  type ShouldRevalidateFunction,
} from "@remix-run/react";
import { Share } from "lucide-react";
import { BookOverview } from "~/components/patterns/book-overview";
import { Button } from "~/components/ui/button";
import { ChapterNavigation } from "~/components/patterns/chapter-navigation";
import { useToast } from "~/components/ui/use-toast";
import { shareMetaCurry } from "~/utils/share";
import { getChaptersWithoutBody, getMeta } from "~/utils/content-layer.server";
import { invariant } from "~/utils/invariant";
import {
  type ChapterLike,
  getChapterNavigation,
  getSlugChapterIndex,
} from "~/utils/chapter-navigation.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const [meta, chapters] = await Promise.all([
    getMeta(),
    getChaptersWithoutBody(),
  ]);
  invariant(meta, "Meta not found");
  invariant(chapters, "Chapters not found");
  let currentChapter: ChapterLike | undefined;
  if (params.chapter) {
    const currentChapterIndex = getSlugChapterIndex(params.chapter, chapters);
    invariant(currentChapterIndex !== undefined, "Chapter not found");
    currentChapter = chapters[currentChapterIndex];
  }
  const navigation = getChapterNavigation(currentChapter, chapters);
  return json({ meta, chapters, navigation, currentChapter });
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  let title = data?.meta?.title;
  if (data?.currentChapter) {
    title += ` | ${data.currentChapter.title}`;
  }

  //TODO: add description and tags to meta
  return [{ title }];
};

export const shouldRevalidate: ShouldRevalidateFunction = ({
  currentParams,
  nextParams,
}) => {
  return currentParams.chapter !== nextParams.chapter;
};

export default function Index() {
  const { meta, chapters, navigation, currentChapter } =
    useLoaderData<typeof loader>();
  const { toast } = useToast();
  const shareMeta = shareMetaCurry(toast, meta);

  return (
    <div className="relative max-w-4xl m-auto flex flex-col">
      <div className="w-full grid grid-cols-7">
        <div className="p-4 pb-0 col-span-7 m-auto w-full md:h-full md:col-span-5 md:p-8 md:pb-0">
          <Outlet />
          <div className="sticky z-10 w-full bottom-0 space-y-4 bg-background py-2 md:hidden">
            <ChapterNavigation
              navigation={navigation}
              meta={meta}
              chapters={chapters}
              currentChapter={currentChapter}
            >
              <Button
                variant="secondary"
                size="lg"
                className="text-md flex py-6 px-4"
                aria-label="Share"
                onClick={shareMeta}
              >
                <Share size={16} />
              </Button>
            </ChapterNavigation>
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
                  action: shareMeta,
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
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Chapters
              </h2>
              <div className="space-y-1">
                <ul>
                  {chapters.map((chapter) => (
                    <li key={`nav_chapters_links_${chapter.slug}`}>
                      <Button
                        asChild
                        variant={
                          currentChapter?.slug === chapter.slug
                            ? "default"
                            : "ghost"
                        }
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
