import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyAob9NTk7wlGwLqiL4XzEV4sZ7a1LTlclQ",
  authDomain: "smit-hackathon-740e6.firebaseapp.com",
  projectId: "smit-hackathon-740e6",
  storageBucket: "smit-hackathon-740e6.appspot.com",
  messagingSenderId: "791730902606",
  appId: "1:791730902606:web:1d7d4b0b65dcd0c5a0d51f",
  measurementId: "G-40T0TK577F"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);