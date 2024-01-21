import {Comment} from "@/services/api/gen";
import {commentApi, DataProvider, DEFAULT_FILTER} from "@/services/api";

export type CommentProvider = DataProvider<Comment>;

export const CommentProvider: CommentProvider = {
  getById(_id: string): Promise<Comment> {
    // TODO(spec): id is defined twice... for no good reason
    throw new Error("Function not implemented.");
  },

  async getMany(filter = DEFAULT_FILTER): Promise<Array<Comment>> {
    return (
      await commentApi().getComments(
        filter.page,
        filter.pageSize,
        filter.query.post_id
      )
    ).data;
  },

  crupdateById(_id: string, _user: Comment): Promise<Comment> {
    // TODO(spec): shouldn't ask for post[]
    throw new Error("Function not implemented.");
  },

  crupdate: function (_payload: Comment): Promise<Comment> {
    throw new Error("Function not implemented.");
  },

  crupdateMany(_toCrupdate: Comment[]): Promise<Comment[]> {
    throw new Error("Function not implemented.");
  },
};
