// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "db-portfolio-web.firebaseapp.com",
  projectId: "db-portfolio-web",
  storageBucket: "db-portfolio-web.firebasestorage.app",
  messagingSenderId: "337479796147",
  appId: "1:337479796147:web:b76193643cb389897eb7c6",
  measurementId: "G-DYT4LDZM6X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export { serverTimestamp }; 