import Post from "@/components/templates/post";
import postsService from "@/services/posts";
import type { Post as PostType } from "@/services/posts/schemas";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

const PostsList = async ({ promise }: { promise: Promise<PostType[]> }) => {
	const posts = await promise;

	return posts.map((post) => (
		<Post key={post.id}>
			<Post.Header>
				<Post.Category>{post.tags?.[0].name}</Post.Category>
				<Post.Date>{post.date}</Post.Date>
			</Post.Header>
			<Post.Title href={`/posts/${post.slug}`}>{post.title}</Post.Title>
			<Post.Headline>{post.headline}</Post.Headline>
		</Post>
	));
};

interface HomeProps {
	searchParams: Promise<{
		q: string;
		tags: string[];
	}>;
}

export default async function Home({ searchParams }: HomeProps) {
	const params = await searchParams;

	const { q, tags: searchTags } = params;

	const postsData = postsService.getPosts({ q, tags: searchTags });

	const key = JSON.stringify(params);

	return (
		<section className="flex flex-col gap-12">
			<Suspense key={key} fallback={<LoaderCircle className="animate-spin" />}>
				<PostsList promise={postsData} />
			</Suspense>
		</section>
	);
}
