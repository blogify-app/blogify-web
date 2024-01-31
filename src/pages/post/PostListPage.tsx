import {FC} from "react";
import {AnonymousHeader, Layout} from "@/layout";
import {PostCard} from "@/features/post";
import image1 from "@/assets/images/pic1.png";
import image2 from "@/assets/images/pic2.png";
import image3 from "@/assets/images/pic3.png";
import image4 from "@/assets/images/pic4.png";
import image5 from "@/assets/images/pic5.png";
import image6 from "@/assets/images/pic6.png";

export const PostListPage: FC = () => {
  return (
    <Layout header={<AnonymousHeader />}>
      <div className="p-6 pl-10">
        <h1 className="text-xl font-semibold">Recent blog posts</h1>
      </div>

      <div
        data-testid="post-title"
        className="mb-2 flex w-full justify-center p-5"
      >
        <PostCard image={image1} />
        <PostCard image={image2} />
        <PostCard image={image3} />
      </div>

      <div data-testid="post-title" className="flex w-full justify-center px-5">
        <PostCard image={image4} />
        <PostCard image={image5} />
        <PostCard image={image6} />
      </div>
    </Layout>
  );
};
