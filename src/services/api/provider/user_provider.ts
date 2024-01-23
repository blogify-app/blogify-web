import {User} from "@/services/api/gen";
import {userApi, DataProvider, DEFAULT_QUERY, Query} from "@/services/api";

export type UserProvider = DataProvider<User>;

export const UserProvider: UserProvider = {
  async getById(uid: string): Promise<User> {
    return (await userApi().getUserById(uid)).data;
  },

  async getMany(query = DEFAULT_QUERY): Promise<Array<User>> {
    return (
      await userApi().getUsers(
        query.page,
        query.pageSize,
        query.params.username
      )
    ).data;
  },

  async crupdateById(uid: string, user: User): Promise<User> {
    return (await userApi().crupdateUserById(uid, user)).data;
  },

  crupdate: function (_payload: User): Promise<User> {
    throw new Error("Function not implemented.");
  },

  crupdateMany(_toCrupdate: User[]): Promise<User[]> {
    throw new Error("Function not implemented.");
  },

  deleteById(_id: string, _query: Query): Promise<User> {
    throw new Error("Function not implemented.");
  },
};
