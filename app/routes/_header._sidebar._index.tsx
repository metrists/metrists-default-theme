import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Share } from "lucide-react";
import { BookOverview } from "../components/patterns/book-overview";
import { getChaptersWithoutBody, getMeta } from "../utils/content-layer.server";
import { Reader } from "~/components/patterns/reader";
import { invariantResponse } from "~/utils/invariant";

export const loader = async () => {
  const [meta, chapters] = await Promise.all([getMeta(), getChaptersWithoutBody()]);
  invariantResponse(meta, "Meta data not found");
  return json({ meta, chapters });
};

export default function Index() {
  const { meta, chapters } = useLoaderData<typeof loader>();

  const firstChapter = chapters[0];

  return (
    <>
      <BookOverview
        title={meta.title}
        cover="/default-cover.svg"
        authors={meta.authors}
        actions={[
          ...(firstChapter
            ? [
                {
                  label: "Start Reading",
                  action: `/${firstChapter.slug}`,
                  linkProps: { rel: "intent" },
                },
              ]
            : []),
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
        <Reader markdown={meta.body} />
      </div>
    </>
  );
}
