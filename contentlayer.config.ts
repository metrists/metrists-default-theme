import { defineDocumentType, makeSource } from "contentlayer/source-files";
import highlight from "rehype-highlight";

export const contentDirectory = "content";
export const metaPath = "meta.md";

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

export const Meta = defineDocumentType(() => ({
  name: "Meta",
  filePathPattern: `**/${metaPath}`,
  fields: {
    title: { type: "string", required: true },
    date: { type: "date", required: true },
    author: { type: "string", required: true },
    tags: { type: "json", required: false, default: [] },
    updated: { type: "date" },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (doc) => `/chapters/${doc._raw.flattenedPath}`,
    },
  },
}));
export default makeSource({
  contentDirPath: contentDirectory,
  documentTypes: [Chapter, Meta],
  markdown: { rehypePlugins: [highlight] },
});
