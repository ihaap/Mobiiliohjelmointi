// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCajXITzqq6TkGFmyMOsZ-Nqr_2ges2Cmc",
  authDomain: "harjoitus12-cedd4.firebaseapp.com",
  databaseURL: "https://harjoitus12-cedd4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "harjoitus12-cedd4",
  storageBucket: "harjoitus12-cedd4.firebasestorage.app",
  messagingSenderId: "333871972888",
  appId: "1:333871972888:web:425148e7c220bfb247396d"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };