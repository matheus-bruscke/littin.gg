import notion, { n2m } from "@/lib/notion";
import { deslugify, slugify } from "@/utils/slugfy";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { z } from "zod";
import { multiSelectSchema, postSchema } from "./schemas";

class PostsService {
  public async getPosts() {
    const databaseRAW = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID ?? "",
    });

    return this.sanitizePosts(databaseRAW);
  }

  public async getPostBySlug(slug: string) {
    const databaseRAW = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID ?? "",
      filter: {
        property: "Name",
        title: {
          contains: deslugify(slug),
        },
      },
    });

    const santizedPosts = this.sanitizePosts(databaseRAW);

    const post = santizedPosts.find((post) => post.slug === slug);

    if (!post) {
      throw new Error(`Post with slug ${slug} not found`);
    }

    const postContent = await this.getPostContent(post.id);

    return {
      ...post,
      content: postContent.parent,
    };
  }

  private async getPostContent(postId: string) {
    const mdblocks = await n2m.pageToMarkdown(postId);
    const mdString = n2m.toMarkdownString(mdblocks);

    return mdString;
  }

  private sanitizePosts(dbRAW: QueryDatabaseResponse) {
    return dbRAW.results.map((post) => {
      // @ts-ignore
      const properties = post.properties;

      console.log(post);

      const santizedPostProperties = {
        title: this.getPropertyValue("title", properties.Name).text,
        date: this.getPropertyValue("date", properties["Publication Date"])
          .text,
        status: this.getPropertyValue("status", properties.Status).text,
        headline: this.getPropertyValue("rich_text", properties.Headline).text,
        tags: this.getPropertyValue("multi_select", properties.Tags).options,
      };

      return postSchema.parse({
        ...santizedPostProperties,
        id: post.id,
        cover:
          (post as any).cover?.external?.url || (post as any).cover?.file?.url,
        slug: slugify(santizedPostProperties.title ?? ""),
      });
    });
  }

  private getPropertyValue(
    type: NotionProperties,
    data: Record<NotionProperties, any>
  ) {
    const dataObject = data[type];

    switch (type) {
      case "title": {
        return {
          text: z.string().parse(dataObject[0].plain_text),
        };
      }

      case "rich_text": {
        return {
          text: z.string().parse(dataObject[0].plain_text),
        };
      }

      case "date": {
        return {
          text: z.string().parse(dataObject.start),
        };
      }

      case "status": {
        return {
          text: z.string().parse(dataObject.name),
        };
      }

      case "multi_select": {
        return {
          options: multiSelectSchema.parse(dataObject),
        };
      }

      default:
        return {
          text: z.string().parse(dataObject.value),
        };
    }
  }
}

const postsService = new PostsService();

export default postsService;
