import {
  signInWithPopup,
  signInWithEmailAndPassword,
  UserCredential,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {ProviderCtor} from "@/services/security/auth_provider.ts";
import {auth} from "@/config/firebase.ts";

export type AuthWith<T = UserCredential> = (
  provider: ProviderCtor | {email: string; password: string}
) => Promise<T>;

const AUTH_ID_TOKEN = "auth_id_token";
const AUTH_PROVIDER_ID = "auth_provider_id";
const AUTH_EMAIL = "auth_email";

const cacheCredential = async (credential: UserCredential) => {
  const user = credential?.user;
  if (!user) return credential;
  localStorage.setItem(AUTH_EMAIL, user.email ?? "");
  localStorage.setItem(AUTH_ID_TOKEN, await user.getIdToken());
  localStorage.setItem(AUTH_PROVIDER_ID, user.uid);
  return credential;
};

export const getCachedAuth = () => ({
  token: localStorage.getItem(AUTH_ID_TOKEN),
  email: localStorage.getItem(AUTH_EMAIL),
  id: localStorage.getItem(AUTH_PROVIDER_ID),
});

export const loginWith: AuthWith = async (
  provider
): Promise<UserCredential> => {
  if ("email" in provider) {
    const {email, password} = provider;
    return cacheCredential(
      await signInWithEmailAndPassword(auth, email, password)
    );
  }
  return cacheCredential(await signInWithPopup(auth, new provider()));
};

export const registerWith: AuthWith = async (
  provider
): Promise<UserCredential> => {
  if ("email" in provider) {
    const {email, password} = provider;
    return cacheCredential(
      await createUserWithEmailAndPassword(auth, email, password)
    );
  }
  return cacheCredential(await loginWith(provider));
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
  localStorage.removeItem(AUTH_ID_TOKEN);
  localStorage.removeItem(AUTH_EMAIL);
  localStorage.removeItem(AUTH_PROVIDER_ID);
};
