import { type LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Share } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Reader } from "~/components/patterns/reader";
import { ChapterNavigation } from "~/components/patterns/chapter-navigation";
import {
  getChapter,
  getMeta,
  getChaptersWithoutBody,
} from "~/utils/content-layer.server";
import { invariantResponse } from "~/utils/invariant";
import { getChapterNavigation } from "~/utils/chapter-navigation.server";
import { useShare } from "~/utils/hooks/use-share";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariantResponse(params.chapter, "Chapter not found");
  const [meta, currentChapter, chapters] = await Promise.all([
    getMeta(),
    getChapter(params.chapter),
    getChaptersWithoutBody(),
  ]);
  invariantResponse(currentChapter, "Chapter not found");
  const navigation = getChapterNavigation(currentChapter, chapters);
  return json({ chapter: currentChapter, navigation, meta });
};

export default function Index() {
  const { chapter, meta, navigation } = useLoaderData<typeof loader>();
  const shareMeta = useShare(meta);

  return (
    <div className="relative m-auto w-full md:h-full">
      <div className="hidden md:block">
        <ChapterNavigation
          navigation={navigation}
          meta={meta}
          buttonProps={{
            size: "sm",
            className: "px-2 py-1",
          }}
        >
          <Button
            variant="secondary"
            size="sm"
            className="text-md flex px-2 py-1"
            aria-label="Share"
            onClick={shareMeta}
          >
            <Share size={16} />
          </Button>
        </ChapterNavigation>
      </div>
      <Reader markdown={chapter.body} />
      <div className="hidden md:block">
        <ChapterNavigation
          navigation={navigation}
          meta={meta}
          buttonProps={{
            size: "sm",
            className: "px-2 py-1",
          }}
        >
          <Button
            variant="secondary"
            size="sm"
            className="text-md flex px-2 py-1"
            aria-label="Share"
            onClick={shareMeta}
          >
            <Share size={16} />
          </Button>
        </ChapterNavigation>
      </div>
    </div>
  );
}
