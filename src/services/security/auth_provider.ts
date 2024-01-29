import {
  type AuthProvider as _AuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type UserCredential,
} from "firebase/auth";
import {Configuration, SignUp, User, Whoami} from "@/services/api/gen";
import {SecurityProvider} from "@/services/api";
import {EmailAndPassword} from "@/features/auth/schema.ts";
import {auth} from "@/config/firebase.ts";

/**
 * such as: GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider from **firebase.auth**
 */
export type ProviderCtor = {
  new (): _AuthProvider;
};

// TODO: refactor!!!
export interface AuthProvider {
  signUp(user: SignUp, credential: UserCredential): Promise<Whoami>;

  signInWithEmailAndPassword(email: string, password: string): Promise<Whoami>;

  signInWithProvider(providerCtor: ProviderCtor): Promise<Whoami>;

  signUpWithEmailAndPassword(
    email: string,
    password: string,
    payload: SignUp
  ): Promise<User>;

  signUpWithProvider(
    providerCtor: ProviderCtor,
    payload: SignUp
  ): Promise<User>;

  logOut(): Promise<void>;

  initializeProviderAuth(providerCtor: ProviderCtor): Promise<UserCredential>;

  createWithEmailAndPassword(
    payload: EmailAndPassword
  ): Promise<UserCredential>;

  getCachedAuthConf(): Configuration;
}

/**
 * IIFE (Immediately Invoked Function Expression) that creates a **AuthProvider** singleton
 */
export const AuthProvider = new (class Provider implements AuthProvider {
  private static AUTH_TOKEN_KEY = "auth:token";

  signUp(user: SignUp): Promise<User> {
    return SecurityProvider.signUp(user);
  }

  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<Whoami> {
    await this.cacheCredential(
      await signInWithEmailAndPassword(auth, email, password)
    );
    return this.signIn();
  }

  async signInWithProvider(providerCtor: ProviderCtor): Promise<Whoami> {
    await this.initializeProviderAuth(providerCtor);
    return this.signIn();
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string,
    payload: SignUp
  ): Promise<User> {
    await this.createWithEmailAndPassword({email, password});
    return this.signUp(payload);
  }

  async signUpWithProvider(
    providerCtor: ProviderCtor,
    payload: SignUp
  ): Promise<User> {
    await this.initializeProviderAuth(providerCtor);
    return this.signUp(payload);
  }

  async initializeProviderAuth(
    providerCtor: ProviderCtor
  ): Promise<UserCredential> {
    return this.cacheCredential(
      await signInWithPopup(auth, new providerCtor())
    );
  }

  async createWithEmailAndPassword(
    payload: EmailAndPassword
  ): Promise<UserCredential> {
    return this.cacheCredential(
      await createUserWithEmailAndPassword(
        auth,
        payload.email,
        payload.password
      )
    );
  }

  logOut(): Promise<void> {
    return signOut(auth);
  }

  getCachedAuthConf(): Configuration {
    const conf = new Configuration();
    conf.accessToken = localStorage.getItem(Provider.AUTH_TOKEN_KEY) ?? "";
    return conf;
  }

  private signIn(): Promise<Whoami> {
    return SecurityProvider.signIn({} as any);
  }

  private async cacheCredential(credential: UserCredential) {
    const token = await credential.user.getIdToken();
    localStorage.setItem(Provider.AUTH_TOKEN_KEY, token);
    return credential;
  }
})();
