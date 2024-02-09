import {FC, useEffect, useState} from "react";
import {Layout, NavBar} from "@/layout";
import {useLoading, useToast} from "@/hooks";
import {Button} from "@/components/common/button";
import {Icons} from "@/components/common/icons.tsx";
import {PostCard} from "@/features/post";
import {PostProvider} from "@/services/api";
import {Post} from "@/services/api/gen";
import {useAuthStore} from "@/features/auth";

export const PostListPage: FC = () => {
  const auth = useAuthStore();
  const {queue, isLoading} = useLoading("get_posts");
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const toast = useToast();

  useEffect(() => {
    const fetch = async () => {
      try {
        const getPosts = auth.user
          ? PostProvider.getRecommendedPosts
          : PostProvider.getMany;
        const posts = await queue(() =>
          getPosts({
            page: currentPage,
            pageSize: 10,
            params: {
              categories: undefined,
            },
          })
        );
        setPosts(posts);
      } catch (_e) {
        toast({
          message: "Could not get posts list.",
        });
      }
    };

    void fetch();
  }, [currentPage]);

  return (
    <Layout header={<NavBar />}>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Icons.spinner className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <>
          <div className="container mb-5">
            <h1 className="px-1 py-5 text-xl font-semibold">
              Recent blog posts
            </h1>
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
              data-testid="prev-page"
            >
              Previous Page
            </Button>
            <span>{currentPage}</span>
            <Button
              onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
              data-testid="next-page"
            >
              Next Page
            </Button>
          </div>
        </>
      )}
    </Layout>
  );
};
