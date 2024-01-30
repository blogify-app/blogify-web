import {Comment, CommentStatus, UserStatus} from "../../src/services/api/gen";
import {user1} from "./user";

export const comments = (): Comment[] => {
  return [
    {
      id: "comment_1",
      user: user1(),
      post_id: "post_1",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolore voluptatibus facere nulla quam ipsa quibusdam,
         voluptatem laborum iure repellat suscipit fuga provident voluptas dolor dignissimos aperiam possimus officia incidunt.Sunt
          voluptatum ipsa eius recusandae placeat et fugit, eos nemo? Est perspiciatis aut asperiores assumenda non deleniti provident! Dolorem excepturi laudantium quod autem assumenda repellendus ad error nobis illo culpa?
        Itaque id dolorum vero officiis quas veniam sint laborum,`,
      creation_datetime: new Date("2024-01-30T05:35:08.809Z"),
      reply_to_id: "",
      reactions: {
        likes: 0,
        dislikes: 0,
      },
      status: CommentStatus.ENABLED,
    },
    {
      id: "comment_2",
      user: user1(),
      post_id: "post_1",
      content: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo dolore voluptatibus facere nulla quam ipsa quibusdam,
         voluptatem laborum iure repellat suscipit fuga provident voluptas dolor dignissimos aperiam possimus officia incidunt.Sunt
          voluptatum ipsa eius recusandae placeat et fugit, eos nemo? Est perspiciatis aut asperiores assumenda non deleniti provident! Dolorem excepturi laudantium quod autem assumenda repellendus ad error nobis illo culpa?
        Itaque id dolorum vero officiis quas veniam sint laborum,`,
      creation_datetime: new Date("2024-01-30T06:35:08.809Z"),
      reply_to_id: "",
      reactions: {
        likes: 0,
        dislikes: 0,
      },
      status: CommentStatus.ENABLED,
    },
  ];
};
