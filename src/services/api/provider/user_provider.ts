import {User, UserPicture, UserPictureType} from "@/services/api/gen";
import {DataProvider, DEFAULT_QUERY, Query, userApi} from "@/services/api";

export type PictureQuery = Query<{type: UserPictureType}>;

export interface UserProvider extends DataProvider<User> {
  putPicture(
    uid: string,
    file: File,
    query: PictureQuery
  ): Promise<UserPicture>;
  deletePicture(uid: string, query: PictureQuery): Promise<UserPicture>;
  getPicture(uid: string | undefined, query: PictureQuery): Promise<UserPicture>;
}

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

  async getPicture(uid: string, query: PictureQuery): Promise<UserPicture> {
    return (await userApi().getUserPicture(uid, query.params.type)).data;
  },

  async putPicture(
    uid: string,
    file: File,
    query: PictureQuery
  ): Promise<UserPicture> {
    return (await userApi().putUserPicture(uid, query.params.type, file)).data;
  },

  async deletePicture(uid: string, query: PictureQuery): Promise<UserPicture> {
    return (await userApi().deleteUserPicture(uid, query.params.type)).data;
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
