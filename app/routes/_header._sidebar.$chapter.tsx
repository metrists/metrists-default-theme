import { type LoaderFunctionArgs, json, type LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Reader } from "~/components/patterns/reader";
import { getChapter } from "../utils/content-layer.server";
import { invariantResponse } from "~/utils/invariant";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariantResponse(params.chapter, "Chapter not found");
  const chapter = await getChapter(params.chapter);
  invariantResponse(chapter, "Chapter not found");
  return json({ chapter });
};

export default function Index() {
  const { chapter } = useLoaderData<typeof loader>();

  return (
    <div className="relative m-auto w-full md:h-full">
      <div className="pt-4">
        <Reader markdown={chapter.body} />
      </div>
    </div>
  );
}
