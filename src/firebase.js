import { initializeApp } from "firebase/app";       // to create firebase web app
import { getFirestore } from "firebase/firestore"   // to get firestore db

// web app configuration:
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,     // let op staat in .env file en "dotenv" staat in gitignore
  authDomain: "basic-crud-firebase-a5145.firebaseapp.com",
  projectId: "basic-crud-firebase-a5145",
  storageBucket: "basic-crud-firebase-a5145.appspot.com",
  messagingSenderId: "891759089411",
  appId: "1:891759089411:web:ec5c20e296fc642e09fb36"
};

// Initialize Firebase/firestore
const app = initializeApp(firebaseConfig);   // app is used to connect to firebase project
export const db = getFirestore(app)          // getFirestore method: connect db to app
