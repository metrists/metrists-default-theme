import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";

export const Chapter = defineDocumentType(() => ({
  name: "Chapter",
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true },
    tags: { type: "json", required: false, default: [] },
    description: { type: "string" },
    updated: { type: "date" },
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath,
    },
    url: {
      type: "string",
      resolve: (doc) => `/chapters/${doc._raw.flattenedPath}`,
    },
  },
}));

export default makeSource({
  contentDirPath: "content/chapters",
  documentTypes: [Chapter],
  markdown: { rehypePlugins: [highlight] },
});
