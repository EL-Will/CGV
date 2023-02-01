const apiURL1 = `https://provinces.open-api.vn/api/?depth=3`;
const apiURL2 = "http://127.0.0.1:3000/api/v1/create-admin";
const apiURL3 = "http://127.0.0.1:3000/api/v1/get-infor-user/";
const apiURL4 = "http://127.0.0.1:3000/api/v1/update-user";
const apiURL5 = "http://127.0.0.1:3000/api/v1/delete-user/";

let addAdminForm = document.getElementById('addAdmin');
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
    if (isVietnamesePhoneNumber(Phone.value) == false) {
        document.getElementById('errPhone').innerText = "Please enter the correct phone number";
        // if (Phone.className.indexOf('boder-err') == -1) {
        //     Phone.classList.toggle('boder-err');
        // }
    }
    else {
        document.getElementById('errPhone').innerText = "";
        // if (Phone.className.indexOf('boder-err') != -1) {
        //     Phone.classList.toggle('boder-err');
        // }
    }
})
addAdminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        username: addAdminForm.username.value,
        phone: addAdminForm.phone.value,
        email: addAdminForm.email.value,
        password: addAdminForm.password.value,
        confirmpassword: addAdminForm.confirmpassword.value,
        dob: addAdminForm.dob.value,
        gender: addAdminForm.gender.value,
        city: addAdminForm.city.value,
    }
    let borderUsername = document.getElementById('username');
    let borderPhone = document.getElementById('phone');
    let borderEmail = document.getElementById('email');
    let borderPassword = document.getElementById('password');
    let borderConfirmPassword = document.getElementById('confirmpassword');
    let borderDob = document.getElementById('dob');

    checkEmpty(data.username, 'errUsername', "Please input your username", borderUsername);
    checkEmpty(data.phone, 'errPhone', "Please input your phone number", borderPhone);
    checkEmpty(data.email, 'errEmail', "Please input your email", borderEmail);
    checkEmpty(data.password, 'errPassword', "Please input your password", borderPassword);
    checkEmpty(data.confirmpassword, 'errConfirmPassword', "Please input your confirm password", borderConfirmPassword);
    checkEmpty(data.dob, 'errDob', "Please select your date of birth", borderDob);
    if (data.gender == '') {
        document.getElementById('errGender').innerText = "Please choose a gender";
    }
    else {
        document.getElementById('errGender').innerText = "";
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
        data.confirmpassword != '' &&
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
            role: 1,
            agree: 1
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
                    window.location.href = '/admin-user';
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
})
let userDetail = document.getElementsByClassName('user-detail')
for (let i = 0; i < userDetail.length; i++) {
    userDetail[i].addEventListener('click', async () => {
        let body = document.getElementById('body');
        body.classList.toggle('p-r-0-i');
        let uid = userDetail[i].dataset.uid1;
        let data = JSON.parse(JSON.stringify(await fetch(apiURL3 + `${uid}`).then(res => res.json())));
        let user = data.user[0];

        inputID.value = user.id;
        inputPhone.value = user.phonenumber;
        inputUserName.value = user.name;
        inputEmail.value = user.email;
        inputPassword.value = user.password;
        inputRole.value = user.role;
        inputDob.value = user.dob;
        inputGender.value = user.gender;
        inputCity.value = user.city
    })
}
let userEdit = document.getElementsByClassName('user-edit')
for (let i = 0; i < userEdit.length; i++) {
    userEdit[i].addEventListener('click', async () => {
        let body = document.getElementById('body');
        body.classList.toggle('p-r-0-i');
        let uid = userEdit[i].dataset.uid2;
        let data = JSON.parse(JSON.stringify(await fetch(apiURL3 + `${uid}`).then(res => res.json())));
        let user = data.user[0];
        editID.value = user.id
        editPhone.value = user.phonenumber;
        editUsername.value = user.name;
        editRole.value = user.role;
        editDob.placeholder = user.dob;
        editCity.value = user.city;
    })
}
let userDelete = document.getElementsByClassName('user-delete')
for (let i = 0; i < userDelete.length; i++) {
    userDelete[i].addEventListener('click', async () => {
        let uid = userDelete[i].dataset.uid3;
        const deleteMethod ={
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        fetch(apiURL5 + `${uid}`,deleteMethod)
        .then(res=>res.json())
        .then((data)=>{
            if(data.status == 2){
                window.location.href = '/admin-user';
            }
        })
        .catch(err => {
            console.log(err);
        })
    })
}
document.getElementById('closeUserDetail').addEventListener('click', () => {
    let body = document.getElementById('body');
    body.classList.toggle('p-r-0-i');
})
document.getElementById('closeUserEdit').addEventListener('click', () => {
    let body = document.getElementById('body');
    body.classList.toggle('p-r-0-i');
})

let PhoneEdit = document.getElementById('editPhone');
PhoneEdit.addEventListener('input', () => {
    if (isVietnamesePhoneNumber(PhoneEdit.value) == false) {
        document.getElementById('errPhoneEdit').innerText = "Please enter the correct phone number";
        if (PhoneEdit.className.indexOf('boder-err') == -1) {
            PhoneEdit.classList.toggle('boder-err');
        }
    }
    else {
        document.getElementById('errPhoneEdit').innerText = "";
        if (PhoneEdit.className.indexOf('boder-err') != -1) {
            PhoneEdit.classList.toggle('boder-err');
        }
    }
})

let EditForm = document.getElementById('editForm');
EditForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        id: Number(EditForm.editID.value),
        phone: EditForm.phone.value,
        username: EditForm.username.value,
        role: EditForm.role.value,
        dob: EditForm.dob.value,
        city: EditForm.city.value
    }
    let borderUsername = document.getElementById('editUsername');
    let borderPhone = document.getElementById('editPhone');
    let borderRole = document.getElementById('editRole');
    let borderCity = document.getElementById('editCity');
    let borderDob = document.getElementById('editDob');

    checkEmpty(data.username, 'errUsernameEdit', "Please input username", borderUsername);
    checkEmpty(data.phone, 'errPhoneEdit', "Please input phone number", borderPhone);
    checkEmpty(data.role, 'errRoleEdit', "Please input Role", borderRole);
    checkEmpty(data.city, 'errCityEdit', "Please input City", borderCity);
    checkEmpty(data.dob, 'errDobEdit', "Please select your date of birth", borderDob);

    if (data.username != "" &&
        data.gender != '' &&
        data.role != '' &&
        data.dob != '' &&
        isVietnamesePhoneNumber(borderPhone.value) == true) {
        let loading = document.getElementById('loading');
        if (loading.className.includes('hide-spinner') == true) {
            loading.classList.toggle('hide-spinner');
        }
        const putMethod = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        fetch(apiURL4, putMethod)
            .then(res => res.json())
            .then(data => {
                if (data.status == false) {
                    // document.getElementById('errAgree').innerText = data.message;
                    if (loading.className.includes('hide-spinner') == false) {
                        loading.classList.toggle('hide-spinner');
                    }
                    alert(data.message);

                }
                else {
                    // document.getElementById('errAgree').innerText = '';
                    borderUsername.value = '';
                    borderPhone.value = '';
                    borderRole.value = '';
                    borderCity.value = '';
                    document.getElementById('editID').value = '';
                    borderDob.value = '';
                    if (loading.className.includes('hide-spinner') == false) {
                        loading.classList.toggle('hide-spinner');
                    }
                    alert(data.message);
                    window.location.href = '/admin-user';
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
})
