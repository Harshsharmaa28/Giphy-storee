import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBQpfrEiDPCItBGeiY9Z8pA1DWtS0DhoL4",
  authDomain: "giphy-integration.firebaseapp.com",
  projectId: "giphy-integration",
  storageBucket: "giphy-integration.appspot.com",
  messagingSenderId: "690783171472",
  appId: "1:690783171472:web:a583639421d2eb76ef3915"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// auth.setPersistence('local');

export {app,auth};