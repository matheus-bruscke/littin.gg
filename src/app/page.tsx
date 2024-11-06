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
      <div className="font-bold text-3xl">Hello world!</div>
      {JSON.stringify(postsData)}
    </main>
  );
}
