import {FC} from "react";
import {useNavigate} from "react-router-dom";
import {Post} from "@/services/api/gen";
import {formatDate} from "@/common/utils";

interface PostCardProps {
    post: Post;
    direction: string;
}

export const PostCard: FC<PostCardProps> = (props) => {
    const {post, direction} = props;

    const {
        id = '',
        thumbnail_url = '',
        description = '',
        title = '',
        author_id = '',
        creation_datetime = '',
        categories = []
    } = post || {};

    const navigate = useNavigate();

    if (!post) return null;
    return (
        <div className={`grid grid-${direction === "col" ? "" : "cols"}-2 gap-4`}>
            {/* TODO: it'snt supposed to be like that */}
            <div
                className="max-h-56 cursor-pointer overflow-hidden"
                onClick={() => navigate(`/posts/${id}`)}
            >
                <img
                    src={thumbnail_url as string}
                    alt="Content thumbails"
                    className="w-full object-cover"
                />
            </div>
            <div className="bg-white">
                <p className="text-xs/8 text-purple-700">
                    {author_id} <span>{formatDate(creation_datetime)}</span>
                </p>
                <a href="#">
                    <h5 className="mb-2 text-lg font-semibold">
                        {title}
                    </h5>
                </a>
                <p className="mb-3 text-xs text-gray-400">
                    {description}
                </p>
                <div className="flex space-x-2 pb-5 pt-2 text-xs font-normal">
                    {categories.map((categorie) => {
                        return (
                            <div className="rounded-[8px] bg-green-100 px-3 py-1 text-green-800">
                                {categorie.label}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};
