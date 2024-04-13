import { Share } from "lucide-react";
import { BookOverview } from "../components/patterns/book-overview";
import { meta } from "~/utils/data";

export default function Index() {
  return (
    <div className="relative m-auto flex w-full  flex-col md:h-full md:flex-row">
      <BookOverview
        title="The Invisible Man"
        cover={meta.cover}
        authors={meta.authors.map((author) => author.name)}
        actions={[
          {
            label: "Start Reading",
            action: "/chapters/1",
          },
          {
            label: "Download Epub",
            action: "/epub.md",
            linkProps: { download: true },
            buttonProps: { variant: "secondary" },
          },
          {
            label: <Share size={16} />,
            action: () => alert("Share"),
            buttonProps: { variant: "secondary", className: "px-3" },
          },
        ]}
        twoToneImageProps={{
          imageContainerClassName: "max-h-[300px]",
        }}
      />
    </div>
  );
}
