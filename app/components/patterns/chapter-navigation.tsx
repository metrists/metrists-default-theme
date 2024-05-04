import { Link } from "@remix-run/react";
import { ListIcon, ChevronRightIcon, ChevronLeftIcon, PlayIcon } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ConditionallyWrap } from "./conditionally-wrap";
import { Drawer, DrawerContent, DrawerTrigger } from "@components/ui/drawer";
import type { Chapter } from ".contentlayer/generated";
import type { ChapterLike, ChapterNavigation } from "~/utils/chapter-navigation.server";

export interface ChapterNavigationProps {
  currentChapter: ChapterLike | undefined;
  navigation: ChapterNavigation;
  chapters: Chapter[];
}

export function ChapterNavigation({
  navigation,
  chapters,
  currentChapter,
}: ChapterNavigationProps) {
  const [previousChapter, nextChapter] = navigation;
  return (
    <div className="align-center flex w-full items-center justify-between">
      <div className="flex gap-2">
        <Button
          variant="secondary"
          size="lg"
          className="text-md flex py-6 px-4"
          aria-disabled
          disabled
          title="Play Audio"
        >
          <PlayIcon size="16" />
        </Button>
        <Drawer
          onOpenChange={(open) => {
            if (!open) {
              document.querySelector("body").removeAttribute("data-scroll-locked");
            }
          }}
        >
          <DrawerTrigger asChild>
            <Button
              variant="secondary"
              size="lg"
              className="text-md flex gap-2 py-6 px-4"
              title="Chapters"
            >
              <ListIcon size="16" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4">
              <ul>
                {chapters.map((chapter) => (
                  <li key={`mobile_chapters_${chapter.slug}_mobile`}>
                    <Link to={`/${chapter.slug}`} prefetch="render" className="block">
                      <Button
                        variant={currentChapter?.slug === chapter.slug ? "default" : "ghost"}
                        className="h-auto w-full justify-start gap-2 text-left text-wrap"
                        title={`Read Chapter Named ${chapter.title}`}
                      >
                        {chapter.title}
                      </Button>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </DrawerContent>
        </Drawer>
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
            size="lg"
            className="py-6 px-4"
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
          <Button
            title="Go to Next Chapter"
            variant="default"
            size="lg"
            className="py-6 px-4"
            disabled={!nextChapter}
          >
            <ChevronRightIcon size="16" />
          </Button>
        </ConditionallyWrap>
      </div>
    </div>
  );
}
