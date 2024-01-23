import {
  PostingApi,
  UserApi,
  FollowingApi,
  CommentsApi,
  HealthApi,
  SecurityApi,
} from "@/services/api/gen";

// TODO: pass auth_config

export const userApi = () => new UserApi();

export const postingApi = () => new PostingApi();

export const followingApi = () => new FollowingApi();

export const commentApi = () => new CommentsApi();

export const healthApi = () => new HealthApi();

export const securityApi = () => new SecurityApi();

export * from "./provider";
