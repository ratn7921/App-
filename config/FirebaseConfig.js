// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY ,
  authDomain: "getyourpet-e1ae2.firebaseapp.com",
  projectId: "getyourpet-e1ae2",
  storageBucket: "getyourpet-e1ae2.appspot.com",
  messagingSenderId: "330701907689",
  appId: "1:330701907689:web:3fb7008c151c8e0d3cf278",
  measurementId: "G-055PD8BZPP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db=getFirestore(app)
export const storage=getStorage(app)
// const analytics = getAnalytics(app);



