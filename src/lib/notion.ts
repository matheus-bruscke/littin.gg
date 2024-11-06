import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";

const notion = new Client({
  auth: process.env.NOTION_SECRET,
});

const n2m = new NotionToMarkdown({ notionClient: notion });

export { n2m };
export default notion;
