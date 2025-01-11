import notion, { n2m } from "@/lib/notion";
import type { QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { z } from "zod";
import { multiSelectSchema, postSchema } from "./schemas";

class PostsService {
	public async getPosts(params?: { q?: string; tags?: string | string[] }) {
		const { q, tags } = params ?? {};

		type Filters = Parameters<typeof notion.databases.query>[0]["filter"];

		let notionFilter: Filters | undefined = undefined;
		const filters = [];

		if (q) {
			filters.push({
				property: "Name",
				rich_text: {
					contains: q ?? "",
				},
			});
		}

		if (tags) {
			filters.push({
				property: "Tags",
				multi_select: {
					contains: typeof tags === "string" ? tags : tags.join(","),
				},
			});
		}

		if (filters.length === 0) {
			notionFilter = undefined;
		}

		if (filters.length === 1) {
			notionFilter = filters[0];
		}

		if (filters.length > 1) {
			const [firstFilter, ...restFilters] = filters;

			notionFilter = {
				...firstFilter,
				and: restFilters,
			};
		}

		const databaseRAW = await notion.databases.query({
			database_id: process.env.NOTION_DATABASE_ID ?? "",
			filter: notionFilter,
		});

		return this.sanitizePosts(databaseRAW);
	}

	public async getPostsTags() {
		const databaseRAW = await notion.databases.query({
			database_id: process.env.NOTION_DATABASE_ID ?? "",
		});

		const santizedPosts = this.sanitizePosts(databaseRAW);

		const tags = santizedPosts.flatMap((post) => post.tags);

		return tags.flatMap((tag) => tag?.name.toLowerCase() as string);
	}

	public async getPostBySlug(slug: string) {
		const databaseRAW = await notion.databases.query({
			database_id: process.env.NOTION_DATABASE_ID ?? "",
			filter: {
				property: "Slug",
				rich_text: {
					equals: slug,
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

			const santizedPostProperties = {
				title: this.getPropertyValue("title", properties.Name).text,
				date: this.getPropertyValue("date", properties["Publication Date"])
					.text,
				status: this.getPropertyValue("status", properties.Status).text,
				headline: this.getPropertyValue("rich_text", properties.Headline).text,
				tags: this.getPropertyValue("multi_select", properties.Tags).options,
				slug: this.getPropertyValue("rich_text", properties.Slug).text,
			};

			return postSchema.parse({
				...santizedPostProperties,
				id: post.id,
				cover:
					(post as any).cover?.external?.url || (post as any).cover?.file?.url,
			});
		});
	}

	private getPropertyValue(
		type: NotionProperties,
		data: Record<NotionProperties, any>,
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
