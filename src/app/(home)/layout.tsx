import { PostsTagsNav } from "@/components/modules/posts-tags-nav";
import { SearchInput } from "@/components/modules/search-input";
import postsService from "@/services/posts";
import { unstable_cache } from "next/cache";
import { Suspense } from "react";

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const getPostsTags = unstable_cache(
		async () => await postsService.getPostsTags(),
		["posts-tags"],
		{ revalidate: 3600, tags: ["posts-tags"] },
	);

	const postsTags = await getPostsTags();

	return (
		<main className="relative flex flex-col gap-12">
			<Suspense>
				<SearchInput tags={postsTags} />
			</Suspense>

			<div className="grid gap-12 md:grid-cols-[1fr,320px]">
				{children}
				<nav className="hidden flex-col gap-6 md:flex">
					<Suspense>
						<PostsTagsNav tags={postsTags} />
					</Suspense>
				</nav>
			</div>
		</main>
	);
}
