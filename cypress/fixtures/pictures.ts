import {PostPicture} from "@/services/api/gen";
import {post1} from "./post.ts";
import {nanoid} from "nanoid";

export const ppicture1 = (): PostPicture => ({
  id: nanoid(),
  post_id: post1().id,
  url: "url1",
});

export const ppicture2 = (): PostPicture => ({
  id: nanoid(),
  post_id: post1().id,
  url: "url2",
});

export const pictures = [ppicture1(), ppicture2()];
