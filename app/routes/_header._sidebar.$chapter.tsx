import { type LoaderFunctionArgs, json, type MetaFunction } from "@remix-run/node";
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
      <Reader markdown={chapter.body} />
      <div className="sticky z-10 w-full bottom-0 space-y-4 bg-background px-4 py-2 md:hidden">
        <div className="flex w-full items-center justify-start gap-2">we are in chapters</div>
      </div>
    </div>
  );
}
