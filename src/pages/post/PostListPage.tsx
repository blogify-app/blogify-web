import {FC, useEffect, useState} from "react";
import {toast} from "sonner";
import {AnonymousHeader, Layout} from "@/layout";
import {PostCard} from "@/features/post";
import {PostProvider} from "@/services/api";
import {Post} from "@/services/api/gen";
import {Button} from "@/components/common/button";

export const PostListPage: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        const posts = await PostProvider.getMany({
          page: currentPage,
          pageSize: 10,
          params: {},
        });
        setPosts(posts);
      } catch (_e) {
        toast("Could not get posts content.");
      }
    };

    void fetch();
  }, [currentPage]);

  return (
    <Layout header={<AnonymousHeader />}>
      <div className="container mb-5">
        <h1 className="px-1 py-5 text-xl font-semibold">Recent blog posts</h1>
        <div className="mb-7 grid grid-cols-2 gap-4">
          <PostCard post={posts[0]} direction="col" />
          <div className="grid grid-rows-2 gap-6">
            {posts.slice(1, 3).map((post) => (
              <PostCard key={post.id} post={post} direction="row" />
            ))}
          </div>
        </div>
        <div>
          <PostCard post={posts[3]} direction="row" />
        </div>
      </div>
      <div className="container">
        <h1 className="px-1 py-4 text-xl font-semibold">All blog posts</h1>
        <div className="grid grid-cols-3 gap-4">
          {posts.slice(4, 10).map((post) => (
            <PostCard key={post.id} post={post} direction="col" />
          ))}
        </div>
      </div>
      <div className="container flex justify-between">
        <Button
          onClick={() =>
            setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
          }
          disabled={currentPage === 1}
        >
          Previous Page
        </Button>
        <span>{currentPage}</span>
        <Button onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
          Next Page
        </Button>
      </div>
    </Layout>
  );
};
