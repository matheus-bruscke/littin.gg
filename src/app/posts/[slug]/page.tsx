import CodeBlock from "@/components/common/markdown/code-block";
import postsService from "@/services/posts";
import { cn } from "@/utils/cn";
import getBase64 from "@/utils/get-base64";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Options } from "react-markdown";
import Markdown from "react-markdown";

const getPostBySlug = unstable_cache(
  async (slug: string) => postsService.getPostBySlug(slug),
  ["posts:slug"],
  { revalidate: 3600, tags: ["posts:slug"] }
);

const components: Options["components"] = {
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 {...props} />,
  h3: (props) => (
    <h3 className="font-semibold text-2xl leading-loose" {...props} />
  ),
  h4: (props) => <h4 {...props} />,
  h5: (props) => <h5 {...props} />,
  h6: (props) => <h6 {...props} />,
  p: (props) => <p className="mb-4 text-lg leading-normal" {...props} />,
  a: (props) => <a {...props} />,
  ul: (props) => <ul className="my-4" {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li className="list-inside list-disc" {...props} />,
  strong: (props) => <strong {...props} />,
  em: (props) => <em {...props} />,
  code: (props) => (
    <code
      className="rounded-md bg-neutral-900 px-2 py-1 font-light text-red-400"
      {...props}
    />
  ),
  pre: (props) => <CodeBlock {...props} />,
  blockquote: (props) => <blockquote {...props} />,
  img: (props) => <img className="rounded-md" {...props} alt={props.alt} />,
};

export default async function Post({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  let blurredCover: string | undefined;

  if (post.cover) {
    blurredCover = await getBase64(post.cover);
  }

  console.log(post.cover);

  return (
    <React.Fragment>
      <Link
        href="/"
        className="absolute top-4 z-50 text-neutral-50 hover:text-red-500"
      >
        Back to Home
      </Link>
      {post.cover && (
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
      <main className={cn("mt-12 w-full", post.cover && "mt-96")}>
        <div className="max-w-[60rem]">
          <article className="mb-20 space-y-8">
            <h1 className="font-medium text-6xl leading-normal">
              {post.title}
            </h1>
            <h3 className="text-2xl text-neutral-600 leading-normal">
              {post.headline}
            </h3>
          </article>
          <Markdown components={components}>{post.content}</Markdown>
        </div>
      </main>
    </React.Fragment>
  );
}
