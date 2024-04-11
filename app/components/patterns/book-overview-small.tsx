import { useMemo } from "react";
import { TwoToneImage, TwoToneImageProps } from "./two-tone-image";
import { cn } from "~/utils";

export interface BookOverviewSmallActionProps {
  label: string;
  action: string | (() => void);
}

export interface BookOverviewSmallProps {
  title: string;
  authors?: string[];
  cover?: string;
  datePublished?: string;
  actions?: BookOverviewSmallActionProps[];
  twoToneImageProps?: Partial<TwoToneImageProps>;
  titleProps?: Partial<React.HTMLAttributes<HTMLHeadingElement>>;
}

export function BookOverviewSmall({
  title,
  authors = [],
  cover,
  datePublished,
  twoToneImageProps = {},
  titleProps = {},
}: BookOverviewSmallProps) {
  const [imageContainerClassNameOverride, restOfImageProps] = useMemo(() => {
    const { imageContainerClassName, ...rest } = twoToneImageProps;
    return [imageContainerClassName, rest];
  }, [twoToneImageProps]);

  const [titleClassNameOverride, restOfTitleProps] = useMemo(() => {
    const { className, ...rest } = titleProps;
    return [className, rest];
  }, [titleProps]);

  return (
    <div className="flex flex-col gap-2">
      {cover ? (
        <TwoToneImage
          imageContainerClassName={cn("rounded", imageContainerClassNameOverride)}
          imageProps={{ src: cover, title }}
          aspectRatio="square"
          {...restOfImageProps}
        />
      ) : (
        <></>
      )}
      <h3
        className={cn(
          "text-md max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap",
          titleClassNameOverride
        )}
        {...restOfTitleProps}
      >
        {title}
      </h3>
      <div className="max-w-full overflow-hidden overflow-ellipsis whitespace-nowrap text-muted-foreground">
        {authors?.join(", ")} {datePublished ? `${datePublished}` : ""}
      </div>
    </div>
  );
}
