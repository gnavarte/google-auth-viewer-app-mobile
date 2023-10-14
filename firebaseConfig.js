// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFvBZOn7oIc0kw36lsAVQcpNmHLlNd6Iw",
  authDomain: "labapplication-13b5f.firebaseapp.com",
  projectId: "labapplication-13b5f",
  storageBucket: "labapplication-13b5f.appspot.com",
  messagingSenderId: "485542750631",
  appId: "1:485542750631:web:5e54ef1a7f9338e95c6e82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);