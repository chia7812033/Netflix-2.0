import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDH3oD-ow_Mx6ru4uWL0h5FGLWwZlFUwH4",
  authDomain: "netflix-2point0.firebaseapp.com",
  projectId: "netflix-2point0",
  storageBucket: "netflix-2point0.appspot.com",
  messagingSenderId: "655635866138",
  appId: "1:655635866138:web:791cec4eab6e9c07efa7a3",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth(app);

export { db, auth };
