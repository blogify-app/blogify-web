import {FC} from "react";
import {Editor as TinyMCE, IAllProps} from "@tinymce/tinymce-react";
import {TINY_MCE_API_KEY} from "@/config/env.ts";

// Plugins to enable.
// Refer to https://www.tiny.cloud/docs/tinymce/latest/plugins for more info.
const ACTIVE_PLUGINS = [
  "advlist",
  "autolink",
  "lists",
  "quickbars",
  "link",
  "image",
  "charmap",
  "preview",
  "anchor",
  "searchreplace",
  "visualblocks",
  "code",
  "fullscreen",
  "insertdatetime",
  "media",
  "table",
  "code",
  "codesample",
  "help",
  "wordcount",
];

// Refer to https://www.tiny.cloud/docs/tinymce/latest/toolbar-configuration-options/ for more info
const TOOLBAR_LAYOUT = [
  "undo redo",
  "blocks",
  "bold italic",
  "forecolor",
  "alignleft aligncenter ",
  "alignright alignjustify",
  "bullist numlist outdent indent codesample",
  "removeformat",
  "help",
].join(" | ");

// Intentionally type as any for simplicity
// Refer to https://www.tiny.cloud/docs/tinymce/latest/editor-important-options/ for more info.
const TINY_MCE_CONFIGURATION: any = {
  plugins: ACTIVE_PLUGINS,
  toolbar: TOOLBAR_LAYOUT,
  toolbar_mode: "sliding",
  skin: "borderless",
  // word count, watermark (!)
  statusbar: false,
  // show ctx menu for basic cmd on select
  quickbars_insert_toolbar: false,
  menubar: false,
  // control its height by element's height wrapping it
  height: "100%",
  content_css: "writer",
};

export interface RichTextEditorProps {
  children?: string;
  id?: string;
  onInit: IAllProps["onInit"];
}

/**
 * TinyMCE wrapper that has our configuration.
 */
export const RichTextEditor: FC<RichTextEditorProps> = ({
  onInit,
  id,
  children = "",
}) => {
  const onEditorInit: IAllProps["onInit"] = (ev, editor) => {
    onInit && onInit(ev, editor);
  };

  return (
    <TinyMCE
      id={id}
      initialValue={children}
      onInit={onEditorInit}
      apiKey={TINY_MCE_API_KEY}
      init={TINY_MCE_CONFIGURATION}
    />
  );
};
