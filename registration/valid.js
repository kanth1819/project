const form = document.querySelector('#form');
const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const uname = document.querySelector('#uname');
const email = document.querySelector('#email');
const pass = document.querySelector('#pass');
const cpassword = document.querySelector('#cpassword');
const tableBody = document.querySelector('#data-table tbody');
const secretKey = "your-secret-key"; 

// Load existing data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromLocalStorage();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    
    const isConfirmed = confirm('Are you sure you want to submit?');
    if (isConfirmed) {
        validation();
        if (formIsValid()) {
            addDataToTable();
            saveDataToLocalStorage();
            form.reset();
            alert('Form submitted successfully!');
        }
    }
});

function validation() {
    let isValid = true;

    if (fname.value.trim() === '') {
        setError(fname, 'First name is required');
        isValid = false;
    } else {
        setSuccess(fname);
    }

    if (lname.value.trim() === '') {
        setError(lname, 'Last name is required');
        isValid = false;
    } else {
        setSuccess(lname);
    }

    if (uname.value.trim() === '') {
        setError(uname, 'Username is required');
        isValid = false;
    } else {
        setSuccess(uname);
    }

    if (email.value.trim() === '') {
        setError(email, 'Email is required');
        isValid = false;
    } else if (!validMail(email.value.trim())) {
        setError(email, 'Enter a valid email');
        isValid = false;
    } else {
        setSuccess(email);
    }

    if (pass.value.trim() === '') {
        setError(pass, 'Password is required');
        isValid = false;
    } else if (pass.value.trim().length < 8) {
        setError(pass, 'Password must be at least 8 characters');
        isValid = false;
    } else {
        setSuccess(pass);
    }

    if (cpassword.value.trim() === '') {
        setError(cpassword, 'Confirm password is required');
        isValid = false;
    } else if (cpassword.value.trim() !== pass.value.trim()) {
        setError(cpassword, 'Passwords do not match');
        isValid = false;
    } else {
        setSuccess(cpassword);
    }

    if (isValid) {
        window.open('login.html', '_blank');
    }
}

function setError(element, message) {
    const errorElement = element.nextElementSibling;
    errorElement.innerText = message;
    element.style.borderColor = "red";
}

function setSuccess(element) {
    const errorElement = element.nextElementSibling;
    errorElement.innerText = '';
    element.style.borderColor = "green";
}

function validMail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function formIsValid() {
    const inputs = document.querySelectorAll('.input');
    for (let input of inputs) {
        if (input.style.borderColor === "red") {
            return false;
        }
    }
    return true;
}

function addDataToTable() {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${fname.value.trim()}</td>
        <td>${lname.value.trim()}</td>
        <td>${uname.value.trim()}</td>
        <td>${email.value.trim()}</td>
        <td>(Encrypted)</td>
    `;
    tableBody.appendChild(row);
}

function saveDataToLocalStorage() {
    const encryptedPass = CryptoJS.AES.encrypt(pass.value.trim(), secretKey).toString();

    const user = {
        firstName: fname.value.trim(),
        lastName: lname.value.trim(),
        userName: uname.value.trim(),
        email: email.value.trim(),
        password: encryptedPass
    };

    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
}

function loadDataFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.userName}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
        `;
        tableBody.appendChild(row);
    });
}

function decryptPassword(encryptedPass) {
    const decryptedPass = CryptoJS.AES.decrypt(encryptedPass, secretKey).toString(CryptoJS.enc.Utf8);
    return decryptedPass;
}

document.querySelector('#clear-data-btn').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
        localStorage.removeItem('users');
        tableBody.innerHTML = '';
        alert('All data has been cleared.');
    }
});
