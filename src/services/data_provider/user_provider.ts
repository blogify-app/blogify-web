import {User} from "@/services/gen";
import {userApi, DataProvider, DEFAULT_FILTER} from "@/services/data_provider";

export type UserProvider = DataProvider<User>;

export const UserProvider: UserProvider = {
  async getById(id: string): Promise<User> {
    return (await userApi().getUserById(id)).data;
  },

  async getMany(filter = DEFAULT_FILTER): Promise<Array<User>> {
    return (
      await userApi().getUsers(
        filter.page,
        filter.pageSize,
        filter.query.username
      )
    ).data;
  },

  async crupdateById(id: string, user: User): Promise<User> {
    return (await userApi().updateUserById(id, user)).data;
  },

  crupdate: function (_payload: User): Promise<User> {
    throw new Error("Function not implemented.");
  },

  crupdateMany(_toCrupdate: User[]): Promise<User[]> {
    throw new Error("Function not implemented.");
  },
};
