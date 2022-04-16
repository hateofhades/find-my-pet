import { auth, googleProvider } from "./firebase.js";
import { signInWithPopup } from "firebase/auth";

export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);

    const { displayName, photoURL, email } = user;

    return { displayName, photoURL, email };
  } catch (error) {
    console.log("Loggin error", error.messasge);

    return null;
  }
};
