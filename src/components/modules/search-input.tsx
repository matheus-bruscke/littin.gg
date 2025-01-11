"use client";

import useDebounce from "@/hooks/use-debounce";
import useMedia, { MEDIA_QUERIES } from "@/hooks/use-media";
import { cn } from "@/utils/cn";
import { Search, Tags, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { PostsTagsNav } from "./posts-tags-nav";

interface SearchInputProps {
	tags: string[];
}

export function SearchInput({ tags }: SearchInputProps) {
	const [inputValue, setInputValue] = useState<string | null>(null);
	const debouncedValue = useDebounce(inputValue, 500);
	const searchParams = useSearchParams();
	const isMobile = useMedia(MEDIA_QUERIES.MOBILE);
	const router = useRouter();

	const [isSearchOpen, setIsSearchOpen] = useState(false);
	const [isTagsOpen, setIsTagsOpen] = useState(false);

	useEffect(() => {
		if (debouncedValue === null) return;

		const newSearchParams = new URLSearchParams(searchParams);
		if (debouncedValue === "") {
			newSearchParams.delete("q");
			setInputValue(null);
			return router.replace(`/?${newSearchParams.toString()}`);
		}

		newSearchParams.set("q", debouncedValue);
		return router.replace(`/?${newSearchParams.toString()}`);
	}, [debouncedValue, router, searchParams]);

	const SearchInput = (
		<div
			className={cn(
				"flex h-10 items-center gap-2 rounded-full border border-neutral-800 bg-transparent px-4 py-2 backdrop-blur-md lg:min-w-80",
				isSearchOpen && "flex-1",
			)}
		>
			<input
				type="text"
				className="h-full flex-1 bg-transparent outline-none placeholder:text-neutral-500"
				placeholder="Search"
				value={inputValue ?? ""}
				onChange={(e) => setInputValue(e.target.value)}
			/>
			{isSearchOpen ? (
				<X
					size={20}
					onClick={() => {
						setIsSearchOpen(false);
						setInputValue("");
					}}
					className="text-neutral-300"
				/>
			) : (
				<Search size={20} className="text-neutral-300" />
			)}
		</div>
	);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex w-full justify-between">
				{!isSearchOpen && <h1 className="font-bold text-3xl">Posts</h1>}
				<div
					className={cn("flex items-center gap-2", isSearchOpen && "w-full")}
				>
					{(isSearchOpen || !isMobile) && SearchInput}
					{!isSearchOpen && isMobile && (
						<button
							type="button"
							onClick={() => setIsSearchOpen(!isSearchOpen)}
							className="flex size-10 items-center justify-center rounded-full border border-neutral-800 bg-transparent"
						>
							<Search size={20} className="text-neutral-300" />
						</button>
					)}
					{isMobile && (
						<button
							type="button"
							onClick={() => setIsTagsOpen(!isTagsOpen)}
							className={cn(
								"flex size-10 items-center justify-center rounded-full border border-neutral-800 bg-transparent",
								isTagsOpen && "bg-neutral-800",
							)}
						>
							<Tags size={20} className="text-neutral-300" />
						</button>
					)}
				</div>
			</div>
			{isTagsOpen && <PostsTagsNav tags={tags} />}
		</div>
	);
}
