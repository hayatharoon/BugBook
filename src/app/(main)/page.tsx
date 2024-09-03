import Post from "@/components/posts/editor/Post";
import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import prisma from "@/lib/prisma";
import { postDataInclude } from "@/lib/type";

export default async function Home() {
  const posts = await prisma.post.findMany({
    include: postDataInclude,
    orderBy: { createAt: "desc" },
  });
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        {posts.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
      <TrendsSidebar />
    </main>
  );
}
