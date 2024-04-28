import { Link } from "@remix-run/react";
import { ShareIcon, ChevronRightIcon, ChevronLeftIcon, PlayIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ConditionallyWrap } from "./conditionally-wrap";
import type { Chapter, Meta } from ".contentlayer/generated";

export interface ChapterNavigationProps {
  meta: Meta;
  navigation: [Chapter | undefined, Chapter | undefined];
  chapters: Chapter;
}

export function ChapterNavigation({ meta, navigation, chapters }: ChapterNavigationProps) {
  const [previousChapter, nextChapter] = navigation;
  return (
    <div className="align-center flex w-full items-center justify-between gap-2 ">
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="sm"
          className="text-md flex gap-2"
          aria-disabled
          disabled
          title={`Play Audio`}
        >
          <PlayIcon size="16" />
        </Button>
        {/* <Button */}
        {/*   variant="secondary" */}
        {/*   size="sm" */}
        {/*   className="text-md flex gap-2" */}
        {/*   onClick={onShare} */}
        {/*   title={`Share ${book.title}`} */}
        {/* > */}
        {/*   <ShareIcon size="16" /> */}
        {/* </Button> */}
      </div>
      <div className="flex gap-2">
        <ConditionallyWrap
          condition={Boolean(previousChapter)}
          wrapper={Link}
          wrapperProps={{
            to: `/${previousChapter?.slug}`,
            title: "Go to Previous Chapter",
            prefetch: "render",
          }}
        >
          <Button
            title="Go to Previous Chapter"
            variant="default"
            size="sm"
            disabled={!previousChapter}
          >
            <ChevronLeftIcon size="16" />
          </Button>
        </ConditionallyWrap>
        <ConditionallyWrap
          condition={Boolean(nextChapter)}
          wrapper={Link}
          wrapperProps={{
            to: `/${nextChapter?.slug}`,
            title: "Go to Next Chapter",
            prefetch: "render",
          }}
        >
          <Button title="Go to Next Chapter" variant="default" size="sm" disabled={!nextChapter}>
            <ChevronRightIcon size="16" />
          </Button>
        </ConditionallyWrap>
      </div>
    </div>
  );
}