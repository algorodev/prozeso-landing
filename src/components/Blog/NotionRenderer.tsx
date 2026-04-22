import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import Image from "next/image";
import type { NotionBlock } from "@/lib/notion/types";
import { RichText } from "./RichText";

type Props = {
  blocks: NotionBlock[];
};

export function NotionRenderer({ blocks }: Props) {
  const grouped = groupListItems(blocks);

  return (
    <div className="space-y-5">
      {grouped.map((node) => (
        <RenderNode key={node.key} node={node} />
      ))}
    </div>
  );
}

type GroupedNode =
  | { kind: "block"; key: string; block: NotionBlock }
  | {
      kind: "bulleted_list";
      key: string;
      items: NotionBlock[];
    }
  | {
      kind: "numbered_list";
      key: string;
      items: NotionBlock[];
    };

function groupListItems(blocks: NotionBlock[]): GroupedNode[] {
  const out: GroupedNode[] = [];
  for (const block of blocks) {
    const last = out[out.length - 1];
    if (block.type === "bulleted_list_item" && last?.kind === "bulleted_list") {
      last.items.push(block);
      continue;
    }
    if (block.type === "numbered_list_item" && last?.kind === "numbered_list") {
      last.items.push(block);
      continue;
    }
    if (block.type === "bulleted_list_item") {
      out.push({ kind: "bulleted_list", key: block.id, items: [block] });
      continue;
    }
    if (block.type === "numbered_list_item") {
      out.push({ kind: "numbered_list", key: block.id, items: [block] });
      continue;
    }
    out.push({ kind: "block", key: block.id, block });
  }
  return out;
}

function RenderNode({ node }: { node: GroupedNode }) {
  if (node.kind === "bulleted_list") {
    return (
      <ul className="list-disc space-y-2 pl-6 text-base text-foreground/90">
        {node.items.map((item) => (
          <ListItem key={item.id} block={item} />
        ))}
      </ul>
    );
  }
  if (node.kind === "numbered_list") {
    return (
      <ol className="list-decimal space-y-2 pl-6 text-base text-foreground/90">
        {node.items.map((item) => (
          <ListItem key={item.id} block={item} />
        ))}
      </ol>
    );
  }
  return <Block block={node.block} />;
}

function ListItem({ block }: { block: NotionBlock }) {
  const items = extractRichText(block);
  return (
    <li>
      <RichText items={items} />
      {block.children && block.children.length > 0 ? (
        <div className="mt-2">
          <NotionRenderer blocks={block.children} />
        </div>
      ) : null}
    </li>
  );
}

function extractRichText(block: NotionBlock): RichTextItemResponse[] {
  const payload = (
    block as unknown as Record<string, { rich_text?: RichTextItemResponse[] }>
  )[block.type];
  return payload?.rich_text ?? [];
}

function Block({ block }: { block: NotionBlock }) {
  switch (block.type) {
    case "paragraph": {
      const items = block.paragraph.rich_text;
      if (!items.length) return <div className="h-2" />;
      return (
        <p className="text-base leading-relaxed text-foreground/90">
          <RichText items={items} />
        </p>
      );
    }
    case "heading_1":
      return (
        <h2 className="font-sora text-3xl font-semibold tracking-tight mt-10 mb-2">
          <RichText items={block.heading_1.rich_text} />
        </h2>
      );
    case "heading_2":
      return (
        <h3 className="font-sora text-2xl font-semibold tracking-tight mt-8 mb-2">
          <RichText items={block.heading_2.rich_text} />
        </h3>
      );
    case "heading_3":
      return (
        <h4 className="font-sora text-xl font-semibold tracking-tight mt-6 mb-2">
          <RichText items={block.heading_3.rich_text} />
        </h4>
      );
    case "quote":
      return (
        <blockquote className="border-l-2 border-primary/50 pl-4 italic text-foreground/80">
          <RichText items={block.quote.rich_text} />
        </blockquote>
      );
    case "callout":
      return (
        <aside className="rounded-xl border border-border bg-muted/40 p-4 text-foreground/90">
          <div className="flex gap-3">
            {block.callout.icon?.type === "emoji" ? (
              <span className="text-xl leading-none">
                {block.callout.icon.emoji}
              </span>
            ) : null}
            <div className="flex-1">
              <RichText items={block.callout.rich_text} />
            </div>
          </div>
        </aside>
      );
    case "divider":
      return <hr className="my-8 border-border" />;
    case "code":
      return (
        <pre className="overflow-x-auto rounded-xl border border-border bg-muted/40 p-4 text-sm font-mono">
          <code>{block.code.rich_text.map((r) => r.plain_text).join("")}</code>
        </pre>
      );
    case "image": {
      const src =
        block.image.type === "external"
          ? block.image.external.url
          : block.image.file.url;
      const caption = block.image.caption
        .map((c) => c.plain_text)
        .join("")
        .trim();
      return (
        <figure className="my-4">
          <div className="relative overflow-hidden rounded-xl border border-border">
            <Image
              src={src}
              alt={caption || ""}
              width={1280}
              height={720}
              className="h-auto w-full object-cover"
              unoptimized
            />
          </div>
          {caption ? (
            <figcaption className="mt-2 text-sm text-muted-foreground">
              {caption}
            </figcaption>
          ) : null}
        </figure>
      );
    }
    case "bookmark":
    case "embed":
    case "link_preview": {
      const url =
        block.type === "bookmark"
          ? block.bookmark.url
          : block.type === "embed"
            ? block.embed.url
            : block.link_preview.url;
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl border border-border bg-muted/30 p-4 text-sm text-foreground/90 hover:bg-muted/50 transition-colors"
        >
          {url}
        </a>
      );
    }
    default:
      return null;
  }
}
