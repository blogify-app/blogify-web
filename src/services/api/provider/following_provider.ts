import {User} from "@/services/api/gen";
import {followingApi, DataProvider, Query, DEFAULT_QUERY} from "@/services/api";

export interface FollowingProvider extends DataProvider<User> {
  followUserById(uid: string): Promise<User>;
  unfollowUserById(uid: string): Promise<User>;
  getFollowedByUser(uid: string, query: Query): Promise<User[]>;
  getSelfFollowers(query: Query): Promise<User[]>;
}

export const FollowingProvider: FollowingProvider = {
  async getSelfFollowers(query = DEFAULT_QUERY): Promise<User[]> {
    return (
      await followingApi().getSelfFollowers(
        query.page,
        query.pageSize,
        query.params.name
      )
    ).data;
  },

  async getFollowedByUser(uid: string, query: Query): Promise<User[]> {
    return (
      await followingApi().getFollowedByUserId(
        uid,
        query.page,
        query.pageSize,
        query.params.name
      )
    ).data;
  },

  async followUserById(uid: string): Promise<User> {
    return (await followingApi().followUserById(uid)).data;
  },

  async unfollowUserById(uid: string): Promise<User> {
    return (await followingApi().unfollowUserById(uid)).data;
  },

  getById(_id: string): Promise<User> {
    throw new Error("Function not implemented.");
  },

  getMany(_filter: Query): Promise<User[]> {
    throw new Error("Function not implemented.");
  },

  deleteById(
    _id: string,
    _query?: Query<Record<string, string>>
  ): Promise<User> {
    throw new Error("Function not implemented.");
  },

  crupdateById(_id: string, _update: User): Promise<User> {
    throw new Error("Function not implemented.");
  },

  crupdate(_payload: User): Promise<User> {
    throw new Error("Function not implemented.");
  },

  crupdateMany(_toCrupdate: User[]): Promise<User[]> {
    throw new Error("Function not implemented.");
  },
};
