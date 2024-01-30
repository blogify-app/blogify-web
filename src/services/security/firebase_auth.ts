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

const cacheIdToken = async (credential: UserCredential) => {
  const user = credential?.user;
  if (!user) return credential;
  const idToken = await user.getIdToken();
  localStorage.setItem(AUTH_ID_TOKEN, idToken);
  return credential;
};

export const getCachedIdToken = () => localStorage.getItem(AUTH_ID_TOKEN);

export const loginWith: AuthWith = async (
  provider
): Promise<UserCredential> => {
  if ("email" in provider) {
    const {email, password} = provider;
    return cacheIdToken(
      await signInWithEmailAndPassword(auth, email, password)
    );
  }
  return cacheIdToken(await signInWithPopup(auth, new provider()));
};

export const registerWith: AuthWith = async (
  provider
): Promise<UserCredential> => {
  if ("email" in provider) {
    const {email, password} = provider;
    return cacheIdToken(
      await createUserWithEmailAndPassword(auth, email, password)
    );
  }
  return cacheIdToken(await loginWith(provider));
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
  localStorage.removeItem(AUTH_ID_TOKEN);
};
