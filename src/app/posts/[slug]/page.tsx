import CodeBlock from "@/components/common/markdown/code-block";
import postsService from "@/services/posts";
import { cn } from "@/utils/cn";
import getBase64 from "@/utils/get-base64";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import type { Options } from "react-markdown";
import Markdown from "react-markdown";

const components: Options["components"] = {
  h1: (props) => <h1 {...props} />,
  h2: (props) => <h2 {...props} />,
  h3: (props) => (
    <h3 className="mb-4 font-medium text-2xl leading-loose" {...props} />
  ),
  h4: (props) => <h4 {...props} />,
  h5: (props) => <h5 {...props} />,
  h6: (props) => <h6 {...props} />,
  p: (props) => <p className="mb-8 text-xl leading-normal" {...props} />,
  a: (props) => <a {...props} />,
  ul: (props) => <ul className="mb-8 marker:text-red-500" {...props} />,
  ol: (props) => <ol {...props} />,
  li: (props) => <li className="list-inside list-disc" {...props} />,
  strong: (props) => <strong {...props} />,
  em: (props) => <em {...props} />,
  code: (props) => (
    <code
      className="rounded-md bg-neutral-900 p-1 font-light text-base text-red-400"
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

  const getPostBySlug = unstable_cache(
    async () => postsService.getPostBySlug(slug),
    [slug],
    { revalidate: 3600, tags: ["posts:slug"] }
  );

  const post = await getPostBySlug();

  let blurredCover: string | undefined;

  if (post.cover) {
    const getCoverBase64 = unstable_cache(
      async () => getBase64(post.cover as string),
      [post.cover],
      { revalidate: 3600, tags: ["posts:cover"] }
    );

    blurredCover = await getCoverBase64();
  }

  return (
    <React.Fragment>
      <Link
        href="/"
        className="group absolute top-4 z-50 flex items-center gap-2 font-normal text-neutral-50 hover:text-red-500"
      >
        <MdArrowBack className="mb-1" />
        Back to posts
      </Link>
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

      <main className={cn("mt-12 w-full", post.cover && "mt-96")}>
        <div className="mx-auto max-w-[54rem]">
          <article className="mb-20 space-y-8">
            <h1 className="font-normal text-6xl leading-normal tracking-tight">
              {post.title}
            </h1>
            <h3 className="text-2xl text-neutral-400 leading-normal">
              {post.headline}
            </h3>
          </article>
          <Markdown components={components}>{post.content}</Markdown>
        </div>
      </main>
    </React.Fragment>
  );
}
