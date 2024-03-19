// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-4ee8c.firebaseapp.com",
  projectId: "mern-estate-4ee8c",
  storageBucket: "mern-estate-4ee8c.appspot.com",
  messagingSenderId: "30695135776",
  appId: "1:30695135776:web:2bf5d3ef928af725a47a45",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
