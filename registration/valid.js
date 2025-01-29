const form = document.querySelector('#form');
const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const uname = document.querySelector('#uname');
const email = document.querySelector('#email');
const pass = document.querySelector('#pass');
const cpassword = document.querySelector('#cpassword');
const tableBody = document.querySelector('#data-table tbody');

// Load existing data from localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDataFromLocalStorage();
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show confirmation dialog
    const isConfirmed = confirm('Are you sure you want to submit?');
    if (isConfirmed) {
        validation(); // Perform validation
        if (formIsValid()) {
            addDataToTable(); // Add data to the table
            saveDataToLocalStorage(); // Save data to localStorage
            form.reset(); // Reset the form
            alert('Form submitted successfully!');
        }
    }
});

// Perform validation
function validation() {
    const fnameVal = fname.value.trim();
    const lnameVal = lname.value.trim();
    const unameVal = uname.value.trim();
    const emailVal = email.value.trim();
    const passVal = pass.value.trim();
    const cpasswordVal = cpassword.value.trim();

    if (fnameVal === '') {
        setError(fname, 'First name is required');
    } else {
        setSuccess(fname);
    }

    if (lnameVal === '') {
        setError(lname, 'Last name is required');
    } else {
        setSuccess(lname);
    }

    if (unameVal === '') {
        setError(uname, 'Username is required');
    } else {
        setSuccess(uname);
    }

    if (emailVal === '') {
        setError(email, 'Email is required');
    } else if (!validmail(emailVal)) {
        setError(email, 'Enter a valid email');
    } else {
        setSuccess(email);
    }

    if (passVal === '') {
        setError(pass, 'Password is required');
    } else if (passVal.length < 8) {
        setError(pass, 'Password must be at least 8 characters');
    } else {
        setSuccess(pass);
    }

    if (cpasswordVal === '') {
        setError(cpassword, 'Confirm password is required');
    } else if (cpasswordVal !== passVal) {
        setError(cpassword, 'Passwords do not match');
    } else {
        setSuccess(cpassword);
    }
}

// Display error message
function setError(element, message) {
    const inputGrp = element.parentElement;
    const errorElement = inputGrp.querySelector('.error');

    errorElement.innerText = message;
    inputGrp.classList.add('error');
    inputGrp.classList.remove('success');
}

// Display success state
function setSuccess(element) {
    const inputGrp = element.parentElement;
    const errorElement = inputGrp.querySelector('.error');

    errorElement.innerText = '';
    inputGrp.classList.add('success');
    inputGrp.classList.remove('error');
}

// Email validation
const validmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

// Check if the form is valid
function formIsValid() {
    const inputs = document.querySelectorAll('.input');
    for (let input of inputs) {
        if (input.classList.contains('error')) {
            return false;
        }
    }
    return true;
}

// Add data to the table
function addDataToTable() {
    const fnameVal = fname.value.trim();
    const lnameVal = lname.value.trim();
    const unameVal = uname.value.trim();
    const emailVal = email.value.trim();

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${fnameVal}</td>
        <td>${lnameVal}</td>
        <td>${unameVal}</td>
        <td>${emailVal}</td>
    `;

    tableBody.appendChild(row);
}

// Save data to localStorage
function saveDataToLocalStorage() {
    const fnameVal = fname.value.trim();
    const lnameVal = lname.value.trim();
    const unameVal = uname.value.trim();
    const emailVal = email.value.trim();
    const passVal = pass.value.trim();

    const user = {
        firstName: fnameVal,
        lastName: lnameVal,
        userName: unameVal,
        email: emailVal,
        password: passVal
    };

    // Get existing data from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user); // Add new user
    localStorage.setItem('users', JSON.stringify(users)); // Save back to localStorage
}

// Load data from localStorage and display in the table
function loadDataFromLocalStorage() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.userName}</td>
            <td>${user.email}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Clear existing data
const clearDataBtn = document.querySelector('#clear-data-btn');

clearDataBtn.addEventListener('click', () => {
    const isConfirmed = confirm('Are you sure you want to clear all data? This action cannot be undone.');
    if (isConfirmed) {
        // Clear localStorage
        localStorage.removeItem('users');
        // Clear the table
        tableBody.innerHTML = '';
        alert('All data has been cleared.');
    }
});
