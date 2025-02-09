// Initialize Firebase
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("User logged in:", user.email);
    }
});

// Firestore reference
const db = firebase.firestore();

// ✅ USER REGISTRATION
document.getElementById("form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = document.getElementById("uname").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("pass").value.trim();
    let confirmPassword = document.getElementById("cpassword").value.trim();

    // Validation
    if (!username || !email || !password || !confirmPassword) {
        alert("All fields are required.");
        return;
    }
    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
    }
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Create user in Firebase Auth
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            
            // Store user data in Firestore
            return db.collection("users").doc(user.uid).set({
                username: username,
                email: email
            });
        })
        .then(() => {
            alert("Registration successful! Redirecting to login...");
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// ✅ USER LOGIN
document.getElementById("loginForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    let email = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password.");
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login successful! Redirecting...");
            window.location.href = "index.html";  // Redirect to home/dashboard
        })
        .catch((error) => {
            alert("Invalid credentials. Please try again.");
        });
});

// ✅ LOGOUT FUNCTION
function logout() {
    firebase.auth().signOut().then(() => {
        alert("Logged out successfully!");
        window.location.href = "index.html";
    });
}

// ✅ RESTRICT ACCESS TO LOGIN WITHOUT REGISTRATION
document.addEventListener("DOMContentLoaded", function () {
    const loginBtn = document.getElementById("login-btn");

    if (loginBtn) {
        loginBtn.addEventListener("click", function (event) {
            firebase.auth().onAuthStateChanged((user) => {
                if (!user) {
                    event.preventDefault();
                    alert("You must register first before logging in.");
                    window.location.href = "register.html";
                }
            });
        });
    }
});

// ✅ RESTRICT ACCESS TO LOGGED-IN USERS (e.g., Cart Page)
document.addEventListener("DOMContentLoaded", function () {
    const cartBtn = document.querySelector("#cart-count")?.parentElement;

    if (cartBtn) {
        cartBtn.addEventListener("click", function (event) {
            event.preventDefault();
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    window.location.href = "cart.html";
                } else {
                    alert("You need to log in first!");
                    window.location.href = "login.html";
                }
            });
        });
    }
});

// ✅ DYNAMIC LOGIN/LOGOUT BUTTON
firebase.auth().onAuthStateChanged((user) => {
    const loginBtn = document.getElementById("login-btn");
    if (loginBtn) {
        loginBtn.innerHTML = user
            ? `<button onclick="logout()">LOGOUT</button>`
            : `<button><a href="login.html">LOGIN</a></button>`;
    }
});
