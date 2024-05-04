import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

export const contentDirectory = "content";
export const metaPath = "meta.md";

export const Chapter = defineDocumentType(() => ({
  name: "Chapter",
  filePathPattern: `**/*.md`,
  fields: {
    title: { type: "string", required: true },
    index: { type: "number", required: true },
    date: { type: "date", required: false },
    author: { type: "string", required: false },
    description: { type: "string", required: false },
    updated: { type: "date", required: false },
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
    authors: {
      type: "json",
      resolve: (doc) => (doc.author ? doc.author.split(",") : null),
    },
  },
}));

export const Meta = defineDocumentType(() => ({
  name: "Meta",
  filePathPattern: `**/${metaPath}`,
  fields: {
    title: { type: "string", required: true },
    author: { type: "string", required: true },
    date: { type: "date", required: false },
    tags: { type: "json", required: false, default: [] },
  },
  computedFields: {
    authors: {
      type: "json",
      resolve: (doc) => doc.author.split(","),
    },
  },
}));
export default makeSource({
  contentDirPath: contentDirectory,
  documentTypes: [Chapter, Meta],
  markdown: { rehypePlugins: [highlight], remarkPlugins: [remarkGfm] },
});
