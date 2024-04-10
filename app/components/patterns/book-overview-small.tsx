import { TwoToneImage } from "./two-tone-image";

export interface BookOverviewSmallProps {
  title: string;
  authors?: string[];
  cover: string;
  datePublished?: string;
}

export function BookOverviewSmall({
  title,
  authors,
  cover,
  datePublished,
}: BookOverviewSmallProps) {
  return (
    <div className="flex flex-col gap-2">
      <TwoToneImage
        imageContainerClassName="rounded"
        imageProps={{ src: cover }}
        aspectRatio="square"
      />
      <h3 className="text-md max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
        {title}
      </h3>
      <div className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-muted-foreground">
        {authors?.join(", ")} {datePublished ? `${datePublished}` : ""}
      </div>
    </div>
  );
}
