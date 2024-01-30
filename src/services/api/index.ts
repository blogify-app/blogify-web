import {
  PostingApi,
  UserApi,
  FollowingApi,
  CommentsApi,
  HealthApi,
  SecurityApi,
} from "@/services/api/gen";
import {AuthProvider} from "@/services/security";

// TODO: pass auth_config

export const userApi = () => new UserApi(AuthProvider.getAuthConf());

export const postingApi = () => new PostingApi(AuthProvider.getAuthConf());

export const followingApi = () => new FollowingApi(AuthProvider.getAuthConf());

export const commentApi = () => new CommentsApi(AuthProvider.getAuthConf());

export const healthApi = () => new HealthApi();

export const securityApi = () => new SecurityApi(AuthProvider.getAuthConf());

export * from "./provider";
