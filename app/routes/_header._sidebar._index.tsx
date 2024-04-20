import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Share } from "lucide-react";
import { BookOverview } from "../components/patterns/book-overview";
import { getMeta } from "../utils/content-layer.server";

export const loader: LoaderFunction = async () => {
  const meta = await getMeta();
  return json({ meta });
};

export default function Index() {
  const { meta } = useLoaderData<typeof loader>();

  return (
    <div className="relative m-auto w-full md:h-full">
      <BookOverview
        title={meta.title}
        cover="/default-cover.svg"
        authors={meta.authors}
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
      <div className="pt-4">
        <div
          dangerouslySetInnerHTML={{
            __html: meta.body.html,
          }}
        />
      </div>
    </div>
  );
}
