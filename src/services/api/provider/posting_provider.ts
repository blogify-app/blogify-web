import {Post, PostPicture, Reaction, ReactionType} from "@/services/api/gen";
import {postingApi, DataProvider, DEFAULT_QUERY, Query} from "@/services/api";

export interface PostProvider extends DataProvider<Post> {
  reactToPostById(pid: string, type: ReactionType): Promise<Reaction>;
  // pictures
  getPicture(picId: string, query: Query<{pid: string}>): Promise<PostPicture>;
  getPictures(pid: string): Promise<PostPicture[]>;
  getPostsByUserId(
    userId: string | undefined,
    query: Query<{}>
  ): Promise<Post[]>;
  uploadPicture(
    picId: string,
    file: File,
    query: Query<{pid: string}>
  ): Promise<PostPicture>;
  deletePicture(
    picId: string,
    query: Query<{pid: string}>
  ): Promise<PostPicture>;
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

  async getPicture(
    picId: string,
    query: Query<{pid: string}>
  ): Promise<PostPicture> {
    return (await postingApi().getPostPictureById(query.params.pid, picId))
      .data;
  },

  async uploadPicture(
    picId: string,
    file: File,
    query: Query<{pid: string}>
  ): Promise<PostPicture> {
    return (await postingApi().uploadPostPicture(query.params.pid, picId, file))
      .data;
  },

  async deletePicture(
    picId: string,
    query: Query<{pid: string}>
  ): Promise<PostPicture> {
    return (await postingApi().deletePostPictureById(query.params.pid, picId))
      .data;
  },

  async getPictures(pid: string): Promise<PostPicture[]> {
    return (await postingApi().getAllPostPictureById(pid)).data;
  },

  crupdate(_payload: Post): Promise<Post> {
    throw new Error("Function not implemented.");
  },

  crupdateMany(_toCrupdate: Post[]): Promise<Post[]> {
    throw new Error("Function not implemented.");
  },

  async getPostsByUserId(
    userId: string,
    query = DEFAULT_QUERY
  ): Promise<Post[]> {
    return (
      await postingApi().getPostsByUserId(userId, query.page, query.pageSize)
    ).data;
  },
};
