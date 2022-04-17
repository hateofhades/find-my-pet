import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getAuth,
  TwitterAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAq9Fpgb9ji5FlHCHpsHBgJ9K2hZNxL6Cc",
  authDomain: "find-my-pet-1264e.firebaseapp.com",
  projectId: "find-my-pet-1264e",
  storageBucket: "find-my-pet-1264e.appspot.com",
  messagingSenderId: "714732368232",
  appId: "1:714732368232:web:641c93c512f676d1f426dd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const storage = getStorage(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const imagesRef = ref(storage, "py-img.png");

export {
  firebaseApp,
  auth,
  googleProvider,
  twitterProvider,
  storage,
  imagesRef,
};
