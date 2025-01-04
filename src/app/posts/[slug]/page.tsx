import postsService from "@/services/posts";
import { unstable_cache } from "next/cache";
import React from "react";

// const components: Options["components"] = {
//   h1: ({ children, ...props }) => (
//     <h1
//       id={slugify(String(children))}
//       className="mb-4 font-medium text-2xl leading-loose"
//       {...props}
//     >
//       {children}
//     </h1>
//   ),
//   h2: ({ children, ...props }) => (
//     <h2
//       id={slugify(String(children))}
//       className="mb-4 font-medium text-2xl leading-loose"
//       {...props}
//     >
//       {children}
//     </h2>
//   ),
//   h3: ({ children, ...props }) => (
//     <h3
//       id={slugify(String(children))}
//       className="mb-4 font-medium text-2xl leading-loose"
//       {...props}
//     >
//       {children}
//     </h3>
//   ),
//   p: ({ children, ...props }) => {
//     const childrenString = String(children);

//     if (childrenString.startsWith("TL;DR")) {
//       return (
//         <div>
//           <span className="font-medium text-red-500">TL;DR</span>
//           <p
//             className="mb-20 border-red-500 border-l-2 pl-4 text-neutral-300 text-xl leading-normal"
//             {...props}
//           >
//             {childrenString.replace("TL;DR:", "")}
//           </p>
//         </div>
//       );
//     }

//     return (
//       <p
//         className="mb-12 font-light text-neutral-300 text-xl leading-normal"
//         {...props}
//       >
//         {children}
//       </p>
//     );
//   },
//   a: (props) => <a className="text-red-500 underline" {...props} />,
//   ul: (props) => <ul className="mb-12" {...props} />,
//   ol: (props) => <ol {...props} />,
//   li: (props) => (
//     <li className="mb-6 flex items-start gap-4" {...props}>
//       <span className="h-2 w-2 bg-red-500" />
//       <p className="-mt-2 flex-1 font-light text-neutral-300 text-xl leading-normal">
//         {props.children}
//       </p>
//     </li>
//   ),
//   strong: (props) => <strong {...props} />,
//   em: (props) => <em {...props} />,
//   code: (props) => (
//     <code
//       className="rounded-md bg-neutral-900 p-1 font-light text-base text-red-400"
//       {...props}
//     />
//   ),
//   pre: (props) => <CodeBlock {...props} />,
//   blockquote: (props) => <blockquote {...props} />,
//   img: (props) => (
//     <img
//       className="border border-neutral-700 border-dashed shadow-inner"
//       {...props}
//       alt={props.alt}
//     />
//   ),
// };

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

  return <div>{JSON.stringify(post)}</div>;

  // const postHeadings = post.content.match(/#.+/g)?.map((heading) => ({
  //   id: slugify(heading),
  //   title: heading.replace(/#/g, ""),
  // }));

  // return (
  //   <React.Fragment>
  //     <Link
  //       href="/"
  //       className="group absolute top-4 z-50 flex items-center gap-2 font-normal text-neutral-50 hover:text-red-500"
  //     >
  //       <MdArrowBack className="mb-1" />
  //       Back to posts
  //     </Link>

  //     <section className="container absolute top-72 mx-auto flex w-full items-center justify-between">
  //       <div className="flex flex-col">
  //         {post.tags?.length && (
  //           <PostCategory className="font-medium text-xl">
  //             {post?.tags[0].name}
  //           </PostCategory>
  //         )}
  //         <PostDate className="text-base">{post.date}</PostDate>
  //       </div>

  //       <code className="text-neutral-600 text-sm uppercase">
  //         {post.id.split("-").slice(-1)}
  //       </code>
  //     </section>

  //     <main className={cn("relative mt-12 w-full", post.cover && "mt-96")}>
  //       <div className="mx-auto max-w-[54rem]">
  //         <article className="mb-20 space-y-8">
  //           <h1 className="font-normal text-6xl leading-normal tracking-tight">
  //             {post.title}
  //           </h1>
  //           <h3 className="text-2xl text-neutral-400 leading-normal">
  //             {post.headline}
  //           </h3>
  //         </article>
  //         <Markdown components={components}>{post.content}</Markdown>
  //       </div>

  //       <SectionAnchors
  //         className="fixed top-[50vh] right-12 mt-12"
  //         anchors={postHeadings ?? []}
  //       />
  //     </main>
  //   </React.Fragment>
  // );
}
