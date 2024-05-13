// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD4zQWgJNI0sjq-7zJDPEkkdhz8R9-6T2Q",
  authDomain: "agilehelp-3aff8.firebaseapp.com",
  projectId: "agilehelp-3aff8",
  storageBucket: "agilehelp-3aff8.appspot.com",
  messagingSenderId: "318795903173",
  appId: "1:318795903173:web:30562b74c937d3c8d8c0ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app