// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.GOOGLE_APP_KEY,
  authDomain: "able-campaign-367901.firebaseapp.com",
  projectId: "able-campaign-367901",
  storageBucket: "able-campaign-367901.appspot.com",
  messagingSenderId: "445400835906",
  appId: "1:445400835906:web:989008b443bbdb92194adb"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);