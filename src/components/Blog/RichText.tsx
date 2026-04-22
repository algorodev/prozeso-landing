import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { cn } from "@/lib/utils";

type Props = {
  items: RichTextItemResponse[];
  className?: string;
};

export function RichText({ items, className }: Props) {
  if (!items.length) return null;

  return (
    <span className={className}>
      {items.map((item, idx) => {
        const { annotations, plain_text: text, href } = item;
        const key = `${text.slice(0, 16)}-${idx}`;

        const classes = cn(
          annotations.bold && "font-semibold",
          annotations.italic && "italic",
          annotations.strikethrough && "line-through",
          annotations.underline && "underline",
        );

        const content = annotations.code ? (
          <code className="rounded bg-muted px-1.5 py-0.5 text-[0.9em] font-mono">
            {text}
          </code>
        ) : (
          text
        );

        if (href) {
          const isExternal = /^https?:\/\//.test(href);
          return (
            <a
              key={key}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              className={cn(
                "text-primary underline underline-offset-4 hover:opacity-80",
                classes,
              )}
            >
              {content}
            </a>
          );
        }

        if (!classes) {
          return <span key={key}>{content}</span>;
        }

        return (
          <span key={key} className={classes}>
            {content}
          </span>
        );
      })}
    </span>
  );
}
