import { json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Share } from "lucide-react";
import { BookOverview } from "../components/patterns/book-overview";
import { getChaptersWithoutBody, getMeta } from "../utils/content-layer.server";
import { Reader } from "~/components/patterns/reader";
import { invariantResponse } from "~/utils/invariant";

export const loader = async () => {
  const meta = await getMeta();
  invariantResponse(meta, "Meta data not found");
  const firstChapter = (await getChaptersWithoutBody())[0];
  return json({ meta, firstChapter });
};

export default function Index() {
  const { meta, firstChapter } = useLoaderData<typeof loader>();

  return (
    <div className="relative m-auto w-full md:h-full">
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
    </div>
  );
}
