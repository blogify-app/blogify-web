import {Post, Reaction, ReactionType} from "@/services/gen";
import {
  postingApi,
  DataProvider,
  DEFAULT_FILTER,
} from "@/services/data_provider";

export interface PostProvider extends DataProvider<Post> {
  reactToPostById(id: string, type: ReactionType): Promise<Reaction>;
}

export const postProvider: PostProvider = {
  async getById(id: string): Promise<Post> {
    return (await postingApi().getPostById(id)).data;
  },

  async getMany(filter = DEFAULT_FILTER): Promise<Post[]> {
    return (
      await postingApi().getPosts(
        filter.page,
        filter.pageSize,
        filter.query?.categories
      )
    ).data;
  },

  async crupdateById(id: string, update: Post): Promise<Post> {
    return (await postingApi().crupdatePostById(id, update)).data;
  },

  async reactToPostById(id: string, type: ReactionType) {
    return (await postingApi().reactToPostById(id, type)).data;
  },

  crupdate(_payload: Post): Promise<Post> {
    throw new Error("Function not implemented.");
  },

  crupdateMany(_toCrupdate: Post[]): Promise<Post[]> {
    throw new Error("Function not implemented.");
  },
};
