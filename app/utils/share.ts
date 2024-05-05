export interface ShareData {
  title: string;
  url: string;
  text: string;
}

export async function shareOrCopy(
  { title, url, text }: ShareData,
  onSuccess: (
    shareData: ShareData,
    method: "share" | "clipboard"
  ) => void,
  onFail?: (shareData?: ShareData) => void
) {
  if (navigator.share) {
    await navigator.share({
      title: title,
      url: url,
      text: text,
    });
    onSuccess({ title, url, text }, "share");
  } else if (navigator.clipboard) {
    await navigator.clipboard.writeText(url);
    onSuccess({ title, url, text }, "clipboard");
  } else if (onFail) {
    onFail({ title, url, text });
  }
}
