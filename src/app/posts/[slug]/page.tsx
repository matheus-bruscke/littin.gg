import postsService from "@/services/posts";
import { unstable_cache } from "next/cache";
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
  code: (props) => <code className="bg-slate-400" {...props} />,
  pre: (props) => (
    <pre className="my-4 rounded-md bg-neutral-900 p-4" {...props} />
  ),
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

  return (
    <div className="">
      <Markdown components={components}>{post.content}</Markdown>
    </div>
  );
}
