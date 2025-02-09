document.getElementById("register-btn").addEventListener("click", function() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("All fields are required!");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            return db.collection("users").doc(user.uid).set({
                name: name,
                email: email,
                userId: user.uid
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
