import {Comment, CommentStatus} from "../../src/services/api/gen";
import {user1} from "./user";

export const comment1 = (): Comment => ({
  id: "comment_1",
  user: user1(),
  post_id: "post_1",
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolore voluptatibus facere nulla quam ipsa quibusdam,
         voluptatem laborum iure repellat suscipit fuga provident voluptas dolor dignissimos aperiam possimus officia incidunt.Sunt
          voluptatum ipsa eius recusandae placeat et fugit, eos nemo? Est perspiciatis aut asperiores assumenda non deleniti provident! Dolorem excepturi laudantium quod autem assumenda repellendus ad error nobis illo culpa?
        Itaque id dolorum vero officiis quas veniam sint laborum,`,
  creation_datetime: new Date(2024, 10, 3),
  reply_to_id: "",
  reactions: {
    likes: 0,
    dislikes: 0,
  },
  status: CommentStatus.ENABLED,
});

export const comment2 = (): Comment => ({
  id: "comment_2",
  user: user1(),
  post_id: "post_1",
  content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolore voluptatibus facere nulla quam ipsa quibusdam,
         voluptatem laborum iure repellat suscipit fuga provident voluptas dolor dignissimos aperiam possimus officia incidunt.Sunt
          voluptatum ipsa eius recusandae placeat et fugit, eos nemo? Est perspiciatis aut asperiores assumenda non deleniti provident! Dolorem excepturi laudantium quod autem assumenda repellendus ad error nobis illo culpa?
        Itaque id dolorum vero officiis quas veniam sint laborum,`,
  creation_datetime: new Date(2024, 0, 2),
  reply_to_id: "",
  reactions: {
    likes: 0,
    dislikes: 0,
  },
  status: CommentStatus.ENABLED,
});

export const createComment1 = (): Comment => ({
  id: "comment_3",
  user: user1(),
  post_id: "post_1",
  content: `Dummy fuckn comment !!!`,
  creation_datetime: new Date(2024, 0, 2),
  reply_to_id: "",
  reactions: {
    likes: 0,
    dislikes: 0,
  },
  status: CommentStatus.ENABLED,
});

export const comments = () => [comment1(), comment2()];
