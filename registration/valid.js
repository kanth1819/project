const form = document.querySelector('#form');
const fname = document.querySelector('#fname');
const lname = document.querySelector('#lname');
const uname = document.querySelector('#uname');
const email = document.querySelector('#email');
const pass = document.querySelector('#pass');
const cpassword = document.querySelector('#cpassword');
const tableBody = document.querySelector('#data-table tbody');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show confirmation dialog
    const isConfirmed = confirm('Are you sure you want to Submit?');
    if (isConfirmed) {
        validation(); // Perform validation
        if (formIsValid()) {
            // Add the data to the table
            addDataToTable();
            // Reset the form
            form.reset();
            alert('Form submitted successfully!');
        }
    }
});

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

function setError(element, message) {
    const inputGrp = element.parentElement;
    const errorElement = inputGrp.querySelector('.error');

    errorElement.innerText = message;
    inputGrp.classList.add('error');
    inputGrp.classList.remove('success');
}

function setSuccess(element) {
    const inputGrp = element.parentElement;
    const errorElement = inputGrp.querySelector('.error');

    errorElement.innerText = '';
    inputGrp.classList.add('success');
    inputGrp.classList.remove('error');
}

const validmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
};

function formIsValid() {
    const inputs = document.querySelectorAll('.input');
    for (let input of inputs) {
        if (input.classList.contains('error')) {
            return false;
        }
    }
    return true;
}

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
