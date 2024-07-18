import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import type { SocialLogin } from "~/types/pre-built/1-auth";
import { AccountTypeEnum } from "~/utils/enums";

export const useFirebase = () => {
  const config = useRuntimeConfig();
  const { socialLogin } = useAuthStore();

  const app = initializeApp({
    apiKey: "AIzaSyBbLtFYvYm4Hsi5-Wm2HkO02dPkpywB0uo",
    authDomain: "neste-e98ac.firebaseapp.com",
    projectId: "neste-e98ac",
    storageBucket: "neste-e98ac.appspot.com",
    messagingSenderId: "666248768541",
    appId: "1:666248768541:web:14229321d69ad91c28aaf4",
    measurementId: "G-PHKNRTDMZ5",
  });

  const auth = getAuth();

  /**
   * Facebook login
   */
  const facebookLogin = async () => {
    const provider = new FacebookAuthProvider();

    const userCredential = await signInWithPopup(auth, provider);
  };

  /**
   * Google login
   */
  const googleLogin = async (e: MouseEvent) => {
    e.stopImmediatePropagation();

    const provider = new GoogleAuthProvider();

    const res = await signInWithPopup(auth, provider);

    const userItem: SocialLogin = {
      accountType: AccountTypeEnum.Google,
      idToken: (res.user as any).accessToken,
    };

    await socialLogin(userItem);
  };

  /**
   * Firebase logout
   */
  const firebaseLogout = async () => {
    await signOut(auth);
  };

  return { app, facebookLogin, googleLogin, firebaseLogout };
};
