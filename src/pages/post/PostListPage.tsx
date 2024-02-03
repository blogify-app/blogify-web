import {FC, useEffect, useState} from "react";
import {toast} from "sonner";
import {AnonymousHeader, Layout} from "@/layout";
import {PostCard} from "@/features/post";
import {PostProvider} from "@/services/api";
import {Post} from "@/services/api/gen";

export const PostListPage: FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);

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
        <Layout header={<AnonymousHeader/>}>
            <div className="container mb-5">
                <h1 className="px-1 py-5 text-xl font-semibold">Recent blog posts</h1>
                <div className="mb-7 grid grid-cols-2 gap-4">
                    <PostCard post={posts[0]} direction="col"/>
                    <div className="grid grid-rows-2 gap-6">
                        <PostCard post={posts[1]} direction="row"/>
                        <PostCard post={posts[2]} direction="row"/>
                    </div>
                </div>
                <div>
                    <PostCard post={posts[3]} direction="row"/>
                </div>
            </div>
            <div className="container">
                <h1 className="px-1 py-4 text-xl font-semibold">All blog posts</h1>
                <div className="grid grid-cols-3 gap-4">
                    <PostCard post={posts[4]} direction="col"/>
                    <PostCard post={posts[5]} direction="col"/>
                    <PostCard post={posts[6]} direction="col"/>
                    <PostCard post={posts[7]} direction="col"/>
                    <PostCard post={posts[8]} direction="col"/>
                    <PostCard post={posts[9]} direction="col"/>
                </div>
            </div>
        </Layout>
    );
};
