// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXBSXgMPLn9CG89GTtH49QBOQ9C5YuEfQ",
  authDomain: "hackathon-29a5d.firebaseapp.com",
  databaseURL: "https://hackathon-29a5d-default-rtdb.firebaseio.com",
  projectId: "hackathon-29a5d",
  storageBucket: "hackathon-29a5d.appspot.com",
  messagingSenderId: "118257111150",
  appId: "1:118257111150:web:4ed0dcd952a20a0b4f967f",
  measurementId: "G-MLQGX065DT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);