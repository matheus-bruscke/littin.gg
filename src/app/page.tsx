import Post from "@/components/templates/post";
import postsService from "@/services/posts";
import { unstable_cache } from "next/cache";

const getPosts = unstable_cache(
  async () => await postsService.getPosts(),
  ["posts"],
  { revalidate: 3600, tags: ["posts"] }
);

export default async function Home() {
  const postsData = await getPosts();
  return (
    <main>
      <section className="grid grid-cols-1 gap-8 pt-8 md:grid-cols-2">
        {postsData.map((post) => (
          <Post key={post.id}>
            <Post.Header>
              <Post.Category>{post.tags?.[0].name}</Post.Category>
              <Post.Date>{post.date}</Post.Date>
            </Post.Header>
            <Post.Title href={`/posts/${post.slug}`}>{post.title}</Post.Title>
            <Post.Headline>{post.headline}</Post.Headline>
          </Post>
        ))}
      </section>
    </main>
  );
}
