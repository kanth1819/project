// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB0JFiMfF2QTSU9efUNwMlzvRGRDY8dG8A",
    authDomain: "e-commerce-948b8.firebaseapp.com",
    projectId: "e-commerce-948b8",
    storageBucket: "e-commerce-948b8.firebasestorage.app",
    messagingSenderId: "57814118033",
    appId: "1:57814118033:web:ef9730f9f13a25bb1a9930",
    measurementId: "G-LGKNJ2DG7H"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get form element
const form = document.getElementById("form");

form.addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from refreshing

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("✅ Account Created! Please Login.");
            window.location.href = "login.html"; // Redirect to login page
        })
        .catch((error) => {
            alert("❌ Error: " + error.message);
        });
});
