const apiURL_ChangePassword = 'http://127.0.0.1:3000/api/v1/change-password/';

document.getElementById('expand-account').addEventListener('mouseover', () => {
    let preAccountExpand = document.getElementsByClassName('pre-account-expand')[0];
    preAccountExpand.style.opacity = 1;
    preAccountExpand.style.visibility = "visible";
    preAccountExpand.style.transform = 'translateY(-5px)';
    preAccountExpand.style.zIndex = 1000;
})
document.getElementById('expand-account').addEventListener('mouseout', () => {
    let preAccountExpand = document.getElementsByClassName('pre-account-expand')[0];
    preAccountExpand.removeAttribute('style');
})
document.getElementById('logout-btn').addEventListener('click',()=>{
    let modalOpen = document.getElementById('body');
    if(modalOpen.className.indexOf('p-r-0-i') == -1){
        modalOpen.classList.toggle('p-r-0-i');
    }
})
document.getElementById('quitePage').addEventListener('click',async()=>{
    window.location.href = '/logout';
})
document.getElementById('gotoProfile').addEventListener('click',()=>{
    let uid = Number(document.getElementById('gotoProfile').dataset.uid);
    window.location.href = `/profile/${uid}`;
})
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

document.getElementById('email').addEventListener('input',()=>{
    let value = document.getElementById('email').value;
    if (validateEmail(value) == false) {
        document.getElementById('errEmail').innerText = "Please enter the correct email address";
        if (document.getElementById('email').className.indexOf('boder-err') == -1) {
            document.getElementById('email').classList.toggle('boder-err');
        }
    }
    else {
        document.getElementById('errEmail').innerText = "";
        if (document.getElementById('email').className.indexOf('boder-err') != -1) {
            document.getElementById('email').classList.toggle('boder-err');
        }
    }
})

let changepassForm = document.getElementById('formChangePass');
changepassForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let uid = Number(document.getElementById('gotoProfile').dataset.uid);
    const data ={
        email: changepassForm.email.value,
        currentPass: changepassForm.currentPassword.value,
        newPass: changepassForm.newPassword.value,
        confirmPass: changepassForm.confirmPassword.value
    }
    let borderEmail = document.getElementById('email');
    let borderCurrentPassword = document.getElementById('currentPassword');
    let bordernewPassword = document.getElementById('newPassword');
    let borderconfirmPassword = document.getElementById('confirmPassword');
    checkEmpty(data.email, 'errEmail', 'Please enter your email', borderEmail);
    checkEmpty(data.currentPass, 'errCurrentPassword', 'Please enter your password', borderCurrentPassword);
    checkEmpty(data.newPass, 'errNewPassword', 'Please enter new password', bordernewPassword);
    checkEmpty(data.confirmPass, 'errConfirmPassword', 'Please enter repeat password', borderconfirmPassword);

    if(data.confirmPass != data.newPass){
        document.getElementById('errConfirmPassword').innerText = 'Confirm password incorrect';
        if (borderconfirmPassword.className.indexOf('boder-err') == -1) {
            borderconfirmPassword.classList.toggle('boder-err');
        } 
    }
    // if(inforUser.status == 1){
    //     if(data.email != inforUser[0].email){
    //         document.getElementById('errConfirmPassword').innerText = 'Confirm password incorrect';
    //         if (borderconfirmPassword.className.indexOf('boder-err') == -1) {
    //             borderconfirmPassword.classList.toggle('boder-err');
    //         } 
    //     }
    // }
    // else{

    // }
    if(data.email != '' && data.currentPass != ''
    && data.newPass != '' && data.confirmPass != ''
    && data.newPass == data.confirmPass){
        let spinner = document.getElementById('loading');
        if (spinner.className.indexOf('hide-spinner') != -1) {
            spinner.classList.toggle('hide-spinner');
            spinner.classList.toggle('show-spinner');
        }
        const newPass = {
            currentPass: data.currentPass,
            newPass: data.newPass
        }
        const putMethod = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newPass)
        };
        fetch(apiURL_ChangePassword + `${data.email}/uid/${uid}`, putMethod)
            .then(res => res.json())
            .then(data => {
                if (spinner.className.indexOf('hide-spinner') == -1) {
                    spinner.classList.toggle('hide-spinner');
                    spinner.classList.toggle('show-spinner');
                }
                if (data.status == 0) {
                    document.getElementById('errEmail').innerText = data.message;
                    if (borderEmail.className.indexOf('boder-err') == -1) {
                        borderEmail.classList.toggle('boder-err');
                    } 
                }
                if(data.status == 1){
                    document.getElementById('errCurrentPassword').innerText = data.message;
                    if (borderCurrentPassword.className.indexOf('boder-err') == -1) {
                        borderCurrentPassword.classList.toggle('boder-err');
                    } 
                }
                if(data.status == 2){
                    window.location.href = '/logout';
                }
                
            })
            .catch(err => {
                console.log(err);
            })
    }
})

document.getElementById('show-current-password-change').addEventListener('click', () => {
    var x = document.querySelector("#currentPassword");
    var eye = document.getElementById('show-current-password-change');
    eye.removeAttribute("class");
    if (x.type === "password") {
        x.type = "text";
        eye.setAttribute("class", 'fa-solid fa-eye fixed-eye');

    } else {
        x.type = "password";
        eye.setAttribute("class", 'fa-solid fa-eye-slash fixed-eye');
    }
})

document.getElementById('show-new-password-change').addEventListener('click', () => {
    var x = document.querySelector("#newPassword");
    var eye = document.getElementById('show-new-password-change');
    eye.removeAttribute("class");
    if (x.type === "password") {
        x.type = "text";
        eye.setAttribute("class", 'fa-solid fa-eye fixed-eye');

    } else {
        x.type = "password";
        eye.setAttribute("class", 'fa-solid fa-eye-slash fixed-eye');
    }
})

document.getElementById('show-confirm-password-change').addEventListener('click', () => {
    var x = document.querySelector("#confirmPassword");
    var eye = document.getElementById('show-confirm-password-change');
    eye.removeAttribute("class");
    if (x.type === "password") {
        x.type = "text";
        eye.setAttribute("class", 'fa-solid fa-eye fixed-eye');

    } else {
        x.type = "password";
        eye.setAttribute("class", 'fa-solid fa-eye-slash fixed-eye');
    }
})