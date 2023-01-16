const apiURL1 = `https://provinces.open-api.vn/api/?depth=3`;
const apiURL2 = "http://127.0.0.1:3000/api/v1/create-user";

let registerForm = document.getElementById('registerForm');
async function getAddress() {
    var data = await fetch(apiURL1).then(res => res.json());
    var dataCity = [];
    var divData = '';
    for (let i = 0; i < data.length; i++) {
        dataCity.push(data[i].name);
        divData +=
            `<option value="${data[i].name}">${data[i].name}</option>`
    }
    document.getElementById('selectCity').innerHTML = divData;
    let nameCity = '';
    document.getElementById('selectCity').addEventListener('click', () => {
        nameCity = document.getElementById('selectCity').value;
    });
}
getAddress();


function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function checkEmpty(value, idErr, text, idBorder) {
    if (value == '') {
        document.getElementById(idErr).innerText = text;
        if (idBorder.className.indexOf('boder-err') == -1) {
            idBorder.classList.toggle('boder-err');
        }
    }
    else {
        document.getElementById(idErr).innerText = '';
        if (idBorder.className.indexOf('boder-err') != -1) {
            idBorder.classList.toggle('boder-err');
        }
    }
}
function isVietnamesePhoneNumber(number) {
    return /(03|05|07|08|09)+([0-9]{8})\b/.test(number);
}
let Email = document.getElementById('email');
Email.addEventListener('input', () => {
    if (validateEmail(Email.value) == false) {
        document.getElementById('errEmail').innerText = "Please enter the correct email address";
        if (Email.className.indexOf('boder-err') == -1) {
            Email.classList.toggle('boder-err');
        }
    }
    else {
        document.getElementById('errEmail').innerText = "";
        if (Email.className.indexOf('boder-err') != -1) {
            Email.classList.toggle('boder-err');
        }
    }
})
let Phone = document.getElementById('phone');
Phone.addEventListener('input', () => {
    console.log(Phone.value);
    if (isVietnamesePhoneNumber(Phone.value) == false) {
        document.getElementById('errPhone').innerText = "Please enter the correct phone number";
        if (Phone.className.indexOf('boder-err') == -1) {
            Phone.classList.toggle('boder-err');
        }
    }
    else {
        document.getElementById('errPhone').innerText = "";
        if (Phone.className.indexOf('boder-err') != -1) {
            Phone.classList.toggle('boder-err');
        }
    }
})
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        username: registerForm.username.value,
        phone: registerForm.phone.value,
        email: registerForm.email.value,
        password: registerForm.password.value,
        confirmpassword: registerForm.confirmpassword.value,
        dob: registerForm.birthday.value,
        gender: registerForm.gender.value,
        city: registerForm.city.value,
        agree: registerForm.agree.checked
    }
    let borderUsername = document.getElementById('username');
    let borderPhone = document.getElementById('phone');
    let borderEmail = document.getElementById('email');
    let borderPassword = document.getElementById('password');
    let borderConfirmPassword = document.getElementById('confirmpassword');
    let borderDob = document.getElementById('dob');
    let borderAgree = document.getElementById('agree');

    checkEmpty(data.username, 'errUsername', "Please input your username", borderUsername);
    checkEmpty(data.phone, 'errPhone', "Please input your phone number", borderPhone);
    checkEmpty(data.email, 'errEmail', "Please input your email", borderEmail);
    checkEmpty(data.password, 'errPassword', "Please input your password", borderPassword);
    checkEmpty(data.confirmpassword, 'errConfirmPassword', "Please input your confirm password", borderConfirmPassword);
    checkEmpty(data.dob, 'errDOB', "Please select your date of birth", borderDob);
    if (data.gender == '') {
        document.getElementById('errGender').innerText = "Please choose a gender";
    }
    else {
        document.getElementById('errGender').innerText = "";
    }
    if (data.agree == false) {
        document.getElementById('errAgree').innerText = "Please verify agree all statements in Terms of service";
        if (borderAgree.className.indexOf('boder-err') == -1) {
            borderAgree.classList.toggle('boder-err');
        }
    }
    else {
        document.getElementById('errAgree').innerText = "";
        if (borderAgree.className.indexOf('boder-err') != -1) {
            borderAgree.classList.toggle('boder-err');
        }
    }
    if (data.password != data.confirmpassword) {
        document.getElementById('errConfirmPassword').innerText = "Password incorrect";
        if (borderConfirmPassword.className.indexOf('boder-err') == -1) {
            borderConfirmPassword.classList.toggle('boder-err');
        }
    }
    else {
        document.getElementById('errConfirmPassword').innerText = "";
        if (borderConfirmPassword.className.indexOf('boder-err') != -1) {
            borderConfirmPassword.classList.toggle('boder-err');
        }
    }
    if (data.username != "" && data.email != '' && data.password != '' &&
        data.confirmpassword != '' && data.agree == true &&
        data.password == data.confirmpassword && data.gender != '' &&
        data.dob != '' && validateEmail(borderEmail.value) == true &&
        isVietnamesePhoneNumber(borderPhone.value) == true) {
        const user = {
            username: data.username,
            phone: data.phone,
            email: data.email,
            password: data.password,
            dob: data.dob,
            gender: data.gender,
            city: data.city,
            agree: 1,
            role: 0
        }
        const postMethod = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        };
        fetch(apiURL2, postMethod)
            .then(res => res.json())
            .then(data => {
                if (data.status == false) {
                    // document.getElementById('errAgree').innerText = data.message;
                    alert(data.message);
                }
                else {
                    // document.getElementById('errAgree').innerText = '';
                     borderUsername.value = '';
                     borderPhone.value = '';
                     borderEmail.value = '';
                     borderPassword.value = '';
                     borderConfirmPassword.value = '';
                     borderDob.value = '';
                    alert(data.message);
                    window.location.href = '/login';
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
})

document.getElementById('show-password-register').addEventListener('click', () => {
    var x = document.querySelector("#password");
    var eye = document.getElementById('show-password-register');
    eye.removeAttribute("class");
    if (x.type === "password") {
        x.type = "text";
        eye.setAttribute("class", 'fa-solid fa-eye fixed-eye');

    } else {
        x.type = "password";
        eye.setAttribute("class", 'fa-solid fa-eye-slash fixed-eye');
    }
})

document.getElementById('show-confirm-password-register').addEventListener('click', () => {
    var x = document.querySelector("#confirmpassword");
    var eye = document.getElementById('show-confirm-password-register');
    eye.removeAttribute("class");
    if (x.type === "password") {
        x.type = "text";
        eye.setAttribute("class", 'fa-solid fa-eye fixed-eye');

    } else {
        x.type = "password";
        eye.setAttribute("class", 'fa-solid fa-eye-slash fixed-eye');
    }
})