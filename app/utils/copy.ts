export interface ShareData {
  title: string;
  url: string;
  text: string;
}

export async function share(
  { title, url, text }: ShareData,
  fallback?: (shareData?: ShareData) => Promise<void>
) {
  if (navigator.share) {
    await navigator.share({
      title: title,
      url: url,
      text: text,
    });
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(url);
  } else if (fallback) {
    await fallback({ title, url, text });
  }
}
