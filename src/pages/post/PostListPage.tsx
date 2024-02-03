import {FC, useEffect, useState} from "react";
import {AnonymousHeader, Layout} from "@/layout";
import {PostCard} from "@/features/post";
import image1 from "@/assets/images/pic1.png";
import image2 from "@/assets/images/pic2.png";
import image3 from "@/assets/images/pic3.png";
import image4 from "@/assets/images/pic4.png";
import image5 from "@/assets/images/pic5.png";
import image6 from "@/assets/images/pic6.png";
import {PostProvider} from "@/services/api";
import {toast} from "sonner";

export const PostListPage: FC = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const posts = await PostProvider.getMany();
        setPosts(posts);
      } catch (_e) {
        toast("Could not get posts content.");
      }
    };

    void fetch();
  }, []);

  return (
    <Layout header={<AnonymousHeader />}>
      <div className="container mb-5">
        <h1 className="px-1 py-5 text-xl font-semibold">Recent blog posts</h1>
        <div className="mb-7 grid grid-cols-2 gap-4">
          <PostCard image={image1} direction="col" />
          <div className="grid grid-rows-2 gap-6">
            <PostCard image={image6} direction="row" />
            <PostCard image={image3} direction="row" />
          </div>
        </div>
        <div>
          <PostCard image={image4} direction="row" />
        </div>
      </div>
      <div className="container">
        <h1 className="px-1 py-4 text-xl font-semibold">All blog posts</h1>
        <div className="grid grid-cols-3 gap-4">
          <PostCard image={image1} direction="col" />
          <PostCard image={image2} direction="col" />
          <PostCard image={image3} direction="col" />
          <PostCard image={image4} direction="col" />
          <PostCard image={image5} direction="col" />
          <PostCard image={image2} direction="col" />
        </div>
      </div>
    </Layout>
  );
};
