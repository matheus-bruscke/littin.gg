"use client";

import { cn } from "@/utils/cn";
import { useRouter, useSearchParams } from "next/navigation";

interface PostsTagsNavProps {
	tags: string[];
}

export function PostsTagsNav({ tags }: PostsTagsNavProps) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const searchTags = searchParams.getAll("tags") ?? [];

	return (
		<nav className="flex flex-wrap gap-2">
			{tags.map((tag) => {
				const isSelected = searchTags.includes(tag);

				return (
					<button
						key={tag}
						type="button"
						onClick={() => {
							const newSearchParams = new URLSearchParams(searchParams);

							if (isSelected) {
								newSearchParams.delete("tags", tag);
							} else {
								newSearchParams.append("tags", tag);
							}

							router.replace(`/?${newSearchParams.toString()}`);
						}}
						className={cn(
							"flex h-9 w-fit items-center justify-center rounded-full bg-red-500/10 px-3 text-red-500 text-sm",
							isSelected && "bg-red-500 text-black",
						)}
					>
						{tag}
					</button>
				);
			})}
		</nav>
	);
}
