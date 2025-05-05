import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firebase"

const firebaseConfig = {
  apiKey: "AIzaSyAlJdnkvyFWBPiFoa9vZEQJPyWTQyJXCPE",
  authDomain: "miniblog-559ba.firebaseapp.com",
  projectId: "miniblog-559ba",
  storageBucket: "miniblog-559ba.firebasestorage.app",
  messagingSenderId: "670769100813",
  appId: "1:670769100813:web:56aa2156e1e90bf921bd44"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };