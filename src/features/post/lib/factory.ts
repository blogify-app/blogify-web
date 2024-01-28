import {Post, PostStatus} from "@/services/api/gen";

export const createDraftPost = (pid: string, uid: string): Post => ({
  id: pid,
  author_id: uid,
  content: "<h1>Start writing</h1>",
  title: "Draft",
  status: PostStatus.DRAFT,
  creation_datetime: new Date(),
  categories: [],

  // nullish
  thumbnail_url: undefined,
  description: undefined,
});
