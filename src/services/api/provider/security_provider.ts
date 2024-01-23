import {
  User,
  Whoami,
  SignUp,
  AuthenticationPayload as SignIn,
} from "@/services/api/gen";
import {securityApi} from "@/services/api";

export interface SecurityProvider {
  signIn(payload: SignIn): Promise<Whoami>;
  signUp(payload: SignUp): Promise<User>;
  whoami(): Promise<Whoami>;
}

export const SecurityProvider: SecurityProvider = {
  async signIn(payload: SignIn): Promise<Whoami> {
    return (await securityApi().signIn(payload)).data;
  },

  async signUp(payload: SignUp): Promise<User> {
    return (await securityApi().signUp(payload)).data;
  },

  async whoami(): Promise<Whoami> {
    return (await securityApi().whoami()).data;
  },
};
