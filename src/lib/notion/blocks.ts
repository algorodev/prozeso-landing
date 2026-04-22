import "server-only";

import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { notion } from "./client";
import type { NotionBlock } from "./types";

export async function fetchBlockChildren(
  blockId: string,
): Promise<NotionBlock[]> {
  const blocks: NotionBlock[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });

    const full = response.results.filter(
      (b): b is BlockObjectResponse => "type" in b,
    );

    for (const block of full) {
      const node: NotionBlock = block as NotionBlock;
      if (block.has_children) {
        node.children = await fetchBlockChildren(block.id);
      }
      blocks.push(node);
    }

    cursor = response.next_cursor ?? undefined;
  } while (cursor);

  return blocks;
}
