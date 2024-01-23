import {Comment, Reaction, ReactionType} from "@/services/api/gen";
import {commentApi, DataProvider, DEFAULT_QUERY, Query} from "@/services/api";

export interface CommentProvider extends DataProvider<Comment> {
  reactById(cid: string, query: Query): Promise<Reaction>;
}

export const CommentProvider: CommentProvider = {
  async getById(cid: string, query): Promise<Comment> {
    // TODO: handle optional query
    return (await commentApi().getCommentById(query?.params?.pid ?? "", cid))
      .data;
  },

  async getMany(query = DEFAULT_QUERY): Promise<Comment[]> {
    return (
      await commentApi().getCommentsByPostId(
        query.params.pid,
        query.pageSize,
        query.page
      )
    ).data;
  },

  async crupdateById(cid: string, update: Comment, query): Promise<Comment> {
    // TODO: handle optional query
    return (
      await commentApi().crupdateCommentById(
        query?.params?.pid ?? update.post_id!,
        cid,
        update
      )
    ).data;
  },

  async reactById(cid: string, query: Query) {
    return (
      await commentApi().reactToCommentById(
        query.params.pid,
        cid,
        (query?.params?.type as ReactionType) || ReactionType.Like
      )
    ).data;
  },

  async deleteById(
    cid: string,
    query?: Query<Record<string, string>>
  ): Promise<Comment> {
    return (await commentApi().deleteCommentById(query?.params?.pid ?? "", cid))
      .data;
  },

  crupdate: function (_payload: Comment): Promise<Comment> {
    throw new Error("Function not implemented.");
  },

  crupdateMany(_toCrupdate: Comment[]): Promise<Comment[]> {
    throw new Error("Function not implemented.");
  },
};
