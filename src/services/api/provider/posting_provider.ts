import {Post, Reaction, ReactionType} from "@/services/api/gen";
import {postingApi, DataProvider, DEFAULT_QUERY, Query} from "@/services/api";

export interface PostProvider extends DataProvider<Post> {
  reactToPostById(pid: string, type: ReactionType): Promise<Reaction>;
}

export const PostProvider: PostProvider = {
  async getById(pid: string): Promise<Post> {
    return (await postingApi().getPostById(pid)).data;
  },

  async getMany(query = DEFAULT_QUERY): Promise<Post[]> {
    return (
      await postingApi().getPosts(
        query.page,
        query.pageSize,
        query.params.categories
      )
    ).data;
  },

  async crupdateById(pid: string, update: Post): Promise<Post> {
    return (await postingApi().crupdatePostById(pid, update)).data;
  },

  async reactToPostById(pid: string, type: ReactionType) {
    return (await postingApi().reactToPostById(pid, type)).data;
  },

  async deleteById(pid: string, _query: Query): Promise<Post> {
    return (await postingApi().deletePostById(pid)).data;
  },

  crupdate(_payload: Post): Promise<Post> {
    throw new Error("Function not implemented.");
  },

  crupdateMany(_toCrupdate: Post[]): Promise<Post[]> {
    throw new Error("Function not implemented.");
  },
};
