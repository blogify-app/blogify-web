import {Post, PostStatus, User} from "@/services/api/gen";

export const createDraftPost = (pid: string, user: User): Post => ({
  id: pid,
  author: user,
  content: "<h1>Start writing</h1>",
  title: "Draft",
  status: PostStatus.DRAFT,
  creation_datetime: new Date(),
  categories: [],

  // nullish
  thumbnail_url: undefined,
  description: undefined,
});
