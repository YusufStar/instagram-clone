import { getDatabase } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAjfT0JblMOsaF66ZoGEj_X15YfwfEmZaw",
  authDomain: "social-media-app-52df0.firebaseapp.com",
  databaseURL: "https://social-media-app-52df0-default-rtdb.firebaseio.com",
  projectId: "social-media-app-52df0",
  storageBucket: "social-media-app-52df0.appspot.com",
  messagingSenderId: "782550452881",
  appId: "1:782550452881:web:877a4f531db63b9737cd30",
  measurementId: "G-2VNS7C9BJY"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const auth = getAuth(app);

export { database, auth, app}