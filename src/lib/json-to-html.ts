import { generateHTML, JSONContent } from "@tiptap/react";

import { baseExtensions } from "@/components/rich-text-editor/extensions";

export const jsonToHtml = (json: JSONContent): string => {
  try {
    const content = typeof json === "string" ? JSON.parse(json) : json;

    return generateHTML(content, baseExtensions);
  } catch {
    console.error("Error converting JSON to HTML", { json });
    return "";
  }
};
