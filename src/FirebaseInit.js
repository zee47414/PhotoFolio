// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5HqHz40KNLMlbWk7n8pmJrtBHqGFGzig",
  authDomain: "photofolio-34aa8.firebaseapp.com",
  projectId: "photofolio-34aa8",
  storageBucket: "photofolio-34aa8.appspot.com",
  messagingSenderId: "377226546612",
  appId: "1:377226546612:web:08d682e440988f0f47f6e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);