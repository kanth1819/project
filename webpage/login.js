document.getElementById("login-btn").addEventListener("click", function() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Please enter both email and password!");
        return;
    }

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "index.html";  // Redirect to home page
        })
        .catch((error) => {
            alert("Login failed! Please check your credentials or register.");
        });
});
