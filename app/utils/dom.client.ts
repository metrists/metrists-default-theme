export const findFormParent = (
  element: HTMLElement | null
): HTMLFormElement | null => {
  if (!element) return null;
  if (element.tagName === "FORM") return element as HTMLFormElement;
  return findFormParent(element.parentElement);
};
