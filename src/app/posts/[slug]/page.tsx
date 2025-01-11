import CodeBlock from "@/components/common/markdown/code-block";
import { PostCategory, PostDate } from "@/components/templates/post";
import postsService from "@/services/posts";
import { cn } from "@/utils/cn";
import getBase64 from "@/utils/get-base64";
import { slugify } from "@/utils/slugfy";
import Image from "next/image";
import React from "react";
import Markdown, { type Options } from "react-markdown";

const components: Options["components"] = {
	h1: ({ children, ...props }) => (
		<h1
			id={slugify(String(children))}
			className="mb-3 font-medium text-2xl leading-relaxed"
			{...props}
		>
			{children}
		</h1>
	),
	h2: ({ children, ...props }) => (
		<h2
			id={slugify(String(children))}
			className="mb-3 font-medium text-2xl leading-relaxed"
			{...props}
		>
			{children}
		</h2>
	),
	h3: ({ children, ...props }) => (
		<h3
			id={slugify(String(children))}
			className="mb-3 font-medium text-2xl leading-relaxed"
			{...props}
		>
			{children}
		</h3>
	),
	p: ({ children, ...props }) => {
		const childrenString = String(children);

		if (childrenString.startsWith("TL;DR")) {
			return (
				<section className="relative mb-12 rounded-lg border border-red-500 border-dashed bg-red-500/10 p-4 md:pl-28">
					<img
						src="/images/frieren-tldr.png"
						className="md:-left-12 md:-bottom-2 float-right mt-4 mr-4 h-[20vh] md:absolute md:float-none md:mt-0 md:mr-0 md:h-[calc(100%+2rem)]"
						alt="Frieren"
					/>
					<h2 className="font-bold text-lg text-red-500">
						Frieren just cast "Too Long, Didn’t Read"
					</h2>
					<p className="font-light text-base text-neutral-300">
						{childrenString.replace("TL;DR:", "")}
					</p>
				</section>
			);
		}

		return (
			<p
				className="mb-12 font-light text-lg text-neutral-400 leading-relaxed"
				{...props}
			>
				{children}
			</p>
		);
	},
	a: (props) => (
		<a
			className="font-light text-red-500 underline-offset-4 hover:underline"
			{...props}
		/>
	),
	ul: (props) => <ul className="mb-12" {...props} />,
	ol: (props) => <ol {...props} />,
	li: (props) => (
		<li className="mb-6 flex items-start gap-4" {...props}>
			<span className="mt-1 h-px w-4 bg-red-500" />
			<p className="-mt-2 flex-1 font-light text-lg text-neutral-300 leading-relaxed">
				{props.children}
			</p>
		</li>
	),
	strong: (props) => <strong className="font-medium text-red-300" {...props} />,
	em: (props) => <em className="font-serif " {...props} />,
	code: (props) => (
		<code
			className="rounded-md bg-neutral-900 p-1 font-light text-base text-red-400"
			{...props}
		/>
	),
	pre: (props) => <CodeBlock {...props} />,
	blockquote: (props) => <blockquote {...props} />,
	img: (props) => <img className="rounded-lg" {...props} alt={props.alt} />,
};

export async function generateStaticParams() {
	const posts = await postsService.getPosts();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

export default async function Post({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;

	const post = await postsService.getPostBySlug(slug);

	let blurredCover: string | undefined;

	if (post.cover) {
		blurredCover = await getBase64(post.cover as string);
	}

	return (
		<React.Fragment>
			{typeof post.cover === "string" && (
				<div className="absolute top-0 left-0 h-80 w-full">
					<figure className="relative h-60 w-full md:h-80">
						<Image
							src={post.cover}
							alt={post.title}
							fill
							placeholder="blur"
							blurDataURL={blurredCover}
							style={{ objectFit: "cover", opacity: 0.5 }}
							priority
						/>
						<span className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-transparent to-black" />
					</figure>
				</div>
			)}
			<main className={cn("relative mt-0 w-full", post.cover && "mt-4")}>
				<div className="mx-auto">
					<article className="container mb-20 flex flex-col gap-2 md:mx-auto md:items-center">
						<div className="flex items-center gap-3 text-neutral-300 text-sm uppercase">
							<PostCategory className="uppercase">
								{post.tags?.[0].name}
							</PostCategory>
							<strong className="text-[4px]">●</strong>
							<PostDate className="text-neutral-300">{post.date}</PostDate>
						</div>
						<h1 className="font-normal text-4xl leading-normal tracking-tight md:text-center md:text-5xl">
							{post.title}
						</h1>
					</article>

					<section className="container mx-auto max-w-screen-md">
						<div className="relative">
							<h3 className="mb-12 font-serif text-2xl text-neutral-300 leading-normal">
								{post.headline}
							</h3>
						</div>
						<Markdown components={components}>{post.content}</Markdown>
					</section>
				</div>
			</main>
		</React.Fragment>
	);
}
