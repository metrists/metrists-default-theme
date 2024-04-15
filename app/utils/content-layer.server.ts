import { promises as fs, constants } from "fs";
import path from "path";
import { Chapter, Markdown } from "../../.contentlayer/types";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CONTENT_LAYER_DIR = path.join(
  __dirname,
  "..",
  "node_modules",
  ".contentlayer",
  "data"
);

export const CONTENT_POST_DIR = path.join(CONTENT_LAYER_DIR, "Post");
export const CONTENT_SRC_POST_DIR = path.join(__dirname, "..", "content", "posts");

export type ChapterData = Omit<Chapter, "_id" | "_raw" | "type" | "url" | "body"> & {
  body: string | Markdown;
};

/**
 *
 * @param post ContentLayer Post with internal and computed properties
 * @returns Normalized Post
 */
export function toPostData(post: Chapter): ChapterData {
  const { _id, _raw, type, url, ...rest } = post;
  return rest;
}

/**
 *
 * @returns all the posts generated from `/content/posts/*.md/
 */
export async function getChapters(): Promise<Array<Chapter>> {
  // due to a bug, the files generated once by content layer are not removed, this will lead to deleted file names loaded as an outcome of the scan. We check the files in the source dir to identify their targets and correctly load them
  // const dir = await fs.readdir(CONTENT_POST_DIR)
  const dir = await fs.readdir(CONTENT_SRC_POST_DIR);

  return Promise.all(
    dir.map(async (filename) => {
      const file = await getJsonData<Chapter>(path.join(CONTENT_POST_DIR, `${filename}.json`));
      return file;
    })
  );
}

export async function getPostSourceFilenames(): Promise<Array<string>> {
  return await fs.readdir(CONTENT_SRC_POST_DIR);
}

/**
 *
 * @param slug the slug for the post
 * @returns the post
 */
export async function getChapter(slug: string): Promise<Chapter | null> {
  try {
    const file = await getJsonData<Chapter>(path.join(CONTENT_POST_DIR, `${slug}.md.json`));
    return file;
  } catch (e) {
    return null;
  }
}

/**
 *
 * @param jsonPath the path to the Contentlayer generated .json file
 * @returns the <T>yped JSON data
 */
export async function getJsonData<T>(jsonPath: string): Promise<T> {
  const content = await fs.readFile(jsonPath, "utf-8");
  return JSON.parse(content);
}
