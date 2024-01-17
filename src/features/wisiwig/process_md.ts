import rehypeSanitize, {defaultSchema} from "rehype-sanitize";
import {unified} from "unified";
import remarkParse from "remark-parse";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism";
import rehypeStringify from "rehype-stringify";

const addAttr = (tag: keyof HTMLElementTagNameMap, toAllow: string[]) => [
  ...((defaultSchema.attributes || {})[tag] || []),
  ...toAllow,
];

const allowAttributes = (
  tags: Array<keyof HTMLElementTagNameMap>,
  ...attributes: string[]
) => {
  return tags.reduce((record, tag) => {
    return {...record, [tag]: addAttr(tag, attributes)};
  }, {});
};

export const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkRehype, {allowDangerousHtml: true})
  .use(rehypeRaw)
  .use(rehypePrism)
  .use(rehypeSanitize, {
    ...defaultSchema,
    attributes: {
      ...defaultSchema.attributes,
      ...allowAttributes(["span", "pre", "code"], "className"),
    },
  })
  .use(rehypeStringify);

/**
 * Processes raw markdown
 * Returns _SANITIZED_ **[vulnerability-free: xss-free]** html that can be rendered safely in react **_dangerouslySetInnerHTML**
 */
export const processRaw = async (raw: string) => {
  try {
    return await processor.process(raw);
  } catch {
    throw new Error(
      "Unable to process the **raw** markdown. There might be an unsupported formats"
    );
  }
};
