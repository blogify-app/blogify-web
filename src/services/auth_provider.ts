import {
  type AuthProvider as _AuthProvider,
  type UserCredential,
  type User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {auth} from "@/config/firebase.ts";

// FIXME: dummy, ... YOU DON'T EVENT HAVE THE RIGHT TO EXPORT ANYTHING APART FROM AUTH PROVIDER FROM THIS MOD
export interface DummyUser {
  email: string;
  username: string;
}

/**
 * such as: GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider from **firebase.auth**
 */
export type ProviderCtor = {
  new (): _AuthProvider;
};

export interface AuthProvider {
  signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<DummyUser>;

  signInWithProvider(providerCtor: ProviderCtor): Promise<DummyUser>;

  signUpWithEmailAndPassword(
    email: string,
    password: string,
    payload: DummyUser
  ): Promise<DummyUser>;

  signUpWithProvider(
    providerCtor: ProviderCtor,
    payload: DummyUser
  ): Promise<DummyUser>;

  logOut(): Promise<void>;
  getCurrentUser(): Promise<User | null>;
}

/**
 * IIFE (Immediately Invoked Function Expression) that creates a **AuthProvider** singleton
 */
export const AuthProvider = new (class implements AuthProvider {
  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<DummyUser> {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return this.signIn(credential);
  }

  async signInWithProvider(providerCtor: ProviderCtor): Promise<DummyUser> {
    const credential = await this._initializeProviderAuth(providerCtor);
    return this.signIn(credential);
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string,
    payload: DummyUser
  ): Promise<DummyUser> {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return this.signUp(payload, credential);
  }

  async signUpWithProvider(
    providerCtor: ProviderCtor,
    payload: DummyUser
  ): Promise<DummyUser> {
    const credential = await this._initializeProviderAuth(providerCtor);
    return this.signUp(payload, credential);
  }

  logOut(): Promise<void> {
    return signOut(auth);
  }

  // TODO: Ensure it is always resolved on **auth.onAuthStateChanged**
  getCurrentUser(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsub = auth.onAuthStateChanged((user) => {
        unsub();
        resolve(user);
      });
    });
  }

  private signIn(credential: UserCredential): Promise<DummyUser> {
    const {user} = credential;
    // TODO: find user by **user.uid** from blogify api, fire_auth base info: "uid" and "token
    return Promise.resolve({
      email: user.email ?? "dummy@gmail.com",
      username: user.displayName ?? "dummy user",
    });
  }

  private signUp(
    user: DummyUser,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _credential: UserCredential
  ): Promise<DummyUser> {
    // TODO: signup to blogify api using fire_auth base info: "uid" and "token"
    return Promise.resolve(user);
  }

  private _initializeProviderAuth(
    providerCtor: ProviderCtor
  ): Promise<UserCredential> {
    return signInWithPopup(auth, new providerCtor());
  }
})();
