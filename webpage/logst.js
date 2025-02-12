// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

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

// Function to handle authentication UI
function setupAuthUI() {
    const authBtn = document.getElementById("auth-btn");

    if (!authBtn) return;

    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            authBtn.textContent = "LOGOUT";
            authBtn.style.cursor = "pointer";
            authBtn.removeAttribute("href");

            // Prevent multiple event bindings
            authBtn.replaceWith(authBtn.cloneNode(true));
            const newAuthBtn = document.getElementById("auth-btn");

            newAuthBtn.addEventListener("click", () => {
                signOut(auth).then(() => {
                    alert("✅ Logged out successfully!");
                    window.location.reload();
                }).catch((error) => {
                    alert("❌ Error logging out: " + error.message);
                });
            });

        } else {
            // User is not logged in
            authBtn.innerHTML = '<a href="login.html">LOGIN</a>';
        }
    });
}

// Wait for DOM to load before initializing
document.addEventListener("DOMContentLoaded", () => {
    setupAuthUI();
});
