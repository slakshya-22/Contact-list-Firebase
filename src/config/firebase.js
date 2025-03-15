// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAe7A5xLIWIUxgWynp1OioisNDF1uk3yFQ",
  authDomain: "contact-list-ls.firebaseapp.com",
  projectId: "contact-list-ls",
  storageBucket: "contact-list-ls.firebasestorage.app",
  messagingSenderId: "204216048662",
  appId: "1:204216048662:web:397dd7b0dfcab759712937",
  measurementId: "G-F5CQSQQBKJ"
};
// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);





 //y4Aa1OgKWsXyKXmRruuM