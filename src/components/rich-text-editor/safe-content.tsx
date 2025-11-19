import { JSONContent } from "@tiptap/react";
import DOMPurify from "dompurify";
import parse from "html-react-parser";

import { jsonToHtml } from "@/lib/json-to-html";
import { cn } from "@/lib/utils";

interface SafeContentProps {
  content: JSONContent;
  className?: string;
}

export function SafeContent({ content, className }: SafeContentProps) {
  const html = jsonToHtml(content);

  const sanitizedHtml = DOMPurify.sanitize(html);

  return <div className={cn("prose dark:prose-invert max-w-none", className)}>{parse(sanitizedHtml)}</div>;
}
