import {
  type AuthProvider as _AuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  type User as FUser,
  type UserCredential,
} from "firebase/auth";
import {auth} from "@/config/firebase.ts";
import {SignUp, User, Whoami} from "@/services/api/gen";
import {SecurityProvider} from "@/services/api";

/**
 * such as: GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider from **firebase.auth**
 */
export type ProviderCtor = {
  new (): _AuthProvider;
};

export interface AuthProvider {
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

  getCurrentUser(): Promise<FUser | null>;
}

/**
 * IIFE (Immediately Invoked Function Expression) that creates a **AuthProvider** singleton
 */
export const AuthProvider = new (class implements AuthProvider {
  async signInWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<Whoami> {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return this.signIn(credential);
  }

  async signInWithProvider(providerCtor: ProviderCtor): Promise<Whoami> {
    const credential = await this.initializeProviderAuth(providerCtor);
    return this.signIn(credential);
  }

  async signUpWithEmailAndPassword(
    email: string,
    password: string,
    payload: SignUp
  ): Promise<User> {
    const credential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return this.signUp(payload, credential);
  }

  async signUpWithProvider(
    providerCtor: ProviderCtor,
    payload: SignUp
  ): Promise<User> {
    const credential = await this.initializeProviderAuth(providerCtor);
    return this.signUp(payload, credential);
  }

  initializeProviderAuth(providerCtor: ProviderCtor): Promise<UserCredential> {
    return signInWithPopup(auth, new providerCtor());
  }

  logOut(): Promise<void> {
    return signOut(auth);
  }

  getCurrentUser(): Promise<FUser | null> {
    return new Promise((resolve) => {
      const unsub = auth.onAuthStateChanged((user) => {
        unsub();
        resolve(user);
      });
    });
  }

  private signIn(credential: UserCredential): Promise<Whoami> {
    const {user} = credential;
    return SecurityProvider.signIn({
      provider_id: user.uid,
      email: user.email || undefined,
      // FIXME: Do we really need password
      password: "passwd",
    });
  }

  public signUp(user: SignUp, _credential: UserCredential): Promise<User> {
    return SecurityProvider.signUp(user);
  }
})();
