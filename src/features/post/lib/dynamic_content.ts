import {PostPicture} from "@/services/api/gen";

const IMAGE_PATTERN = /<img[^>]*src="([^"]+)"[^>]*>/g;

export const transformHtmlContent = (
  content: string,
  pictures: PostPicture[]
) => {
  const replaceImageSrc = (match: string, attribute: string) => {
    const matches = match.match(new RegExp(`${attribute}="([^"]+)"`));
    const src = matches ? matches[1] : "";
    const placeholder =
      pictures.find(
        (picture) => new URL(picture.url!).pathname === new URL(src).pathname
      )?.placeholder ?? "";
    return match.replace(
      new RegExp(`${attribute}="([^"]+)"`),
      `${attribute}="{{${placeholder}}}"`
    );
  };

  return content.replace(IMAGE_PATTERN, (match) => {
    if (match.includes("src")) {
      // Handle direct URL images
      match = replaceImageSrc(match, "src");
    }
    if (match.includes("data-mce-src")) {
      // Handle images with data-mce-src attribute
      match = replaceImageSrc(match, "data-mce-src");
    }
    return match;
  });
};
