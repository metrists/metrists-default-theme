import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { contentDirectory, metaPath } from "../../contentlayer.config";
import { Chapter, Markdown, Meta } from "../../.contentlayer/generated";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const CONTENT_LAYER_DIR = path.join(__dirname, "..", ".contentlayer", "generated");

export const CONTENT_CHAPTER_DIR = path.join(CONTENT_LAYER_DIR, "Chapter");
export const CONTENT_SRC_CHAPTER_DIR = path.join(__dirname, "..", contentDirectory);

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
  const dir = await fs.readdir(CONTENT_SRC_CHAPTER_DIR);

  return Promise.all(
    dir
      .map(async (filename) => {
        if (filename === metaPath) {
          return null;
        }
        const file = await getJsonData<Chapter>(path.join(CONTENT_CHAPTER_DIR, `${filename}.json`));
        return file;
      })
      .filter(Boolean)
  );
}

export async function getPostSourceFilenames(): Promise<Array<string>> {
  return await fs.readdir(CONTENT_SRC_CHAPTER_DIR);
}

/**
 *
 * @param slug the slug for the post
 * @returns the post
 */
export async function getChapter(slug: string): Promise<Chapter | null> {
  try {
    const file = await getJsonData<Chapter>(path.join(CONTENT_CHAPTER_DIR, `${slug}.md.json`));
    return file;
  } catch (e) {
    return null;
  }
}

/**
 *
 * @param slug the slug for the post
 * @returns the post
 */
export async function getMeta(): Promise<Meta | null> {
  try {
    return await getJsonData<Meta>(path.join(CONTENT_CHAPTER_DIR, `${metaPath}.json`));
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
