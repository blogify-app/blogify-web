import {User} from "@/services/gen";
import {
  followingApi,
  DataProvider,
  Filter,
  DEFAULT_FILTER,
} from "@/services/data_provider";

export interface FollowingProvider extends DataProvider<User> {
  getUserFollowers(
    uid: string,
    filter: Filter<{followerName?: string}>
  ): Promise<User[]>;
  followUserById(uid: string): Promise<User>;
  unfollowUserById(uid: string): Promise<User>;
}

export const followingProvider: FollowingProvider = {
  async getUserFollowers(
    uid: string,
    filter = DEFAULT_FILTER
  ): Promise<User[]> {
    return (
      await followingApi().getUserFollowers(
        uid,
        filter.page,
        filter.pageSize,
        filter.query.followerName
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

  getMany(_filter: Filter<Record<string, string>>): Promise<User[]> {
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
