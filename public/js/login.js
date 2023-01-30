const apiURL1 = 'http://127.0.0.1:3000/api/v1/login';
const apiURL_ResetPassword = 'http://127.0.0.1:3000/api/v1/reset-password';
const apiURL_OverwritePassword = 'http://127.0.0.1:3000/api/v1/reset-update-password';
const apiURL_DeleteToken = 'http://127.0.0.1:3000/api/v1/delete-token/';

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
let loginForm = document.getElementsByClassName('login-form')[0];
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        username: loginForm.email.value,
        password: loginForm.password.value
    };
    let borderUsername = document.getElementById('email');
    let borderPassword = document.getElementById('password');
    if (data.username == '' && data.password !== '') {
        document.getElementById('informEmail').innerText = "Please input your email";
        document.getElementById('informPassword').innerText = "";
        if (borderUsername.className.indexOf('boder-err') == -1) {
            borderUsername.classList.toggle('boder-err');
        }
        if (borderPassword.className.indexOf('boder-err') != -1) {
            borderPassword.classList.toggle('boder-err');
        }
    }
    else if (data.username !== '' && data.password == '') {
        document.getElementById('informEmail').innerText = "";
        document.getElementById('informPassword').innerText = "Please input your password";
        if (borderUsername.className.indexOf('boder-err') != -1) {
            borderUsername.classList.toggle('boder-err');
        }
        if (borderPassword.className.indexOf('boder-err') == -1) {
            borderPassword.classList.toggle('boder-err');
        }
    }
    else if (data.username == '' && data.password == '') {
        document.getElementById('informEmail').innerText = "Please input your email";
        document.getElementById('informPassword').innerText = "Please input your password";
        if (borderUsername.className.indexOf('boder-err') == -1) {
            borderUsername.classList.toggle('boder-err');
        }
        if (borderPassword.className.indexOf('boder-err') == -1) {
            borderPassword.classList.toggle('boder-err');
        }
    }
    else {
        let spinner = document.getElementById('loading');
        if (spinner.className.indexOf('hide-spinner') != -1) {
            spinner.classList.toggle('hide-spinner');
            spinner.classList.toggle('show-spinner');
        }
        const postMethod = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        fetch(apiURL1, postMethod)
            .then(res => res.json())
            .then(data => {
                if (spinner.className.indexOf('hide-spinner') == -1) {
                    spinner.classList.toggle('hide-spinner');
                    spinner.classList.toggle('show-spinner');
                }
                if (data.status == 0) {
                    document.getElementById('informEmail').innerText = data.message;
                    if (borderUsername.className.indexOf('boder-err') == -1) {
                        borderUsername.classList.toggle('boder-err');
                    }

                }
                else if (data.status == 1) {
                    document.getElementById('informPassword').innerText = data.message;
                    if (borderPassword.className.indexOf('boder-err') == -1) {
                        borderPassword.classList.toggle('boder-err');
                    }
                }
                else {
                    window.location.href = '/';
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
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

document.getElementById('email1').addEventListener('input',()=>{
    let value = document.getElementById('email1').value;
    if (validateEmail(value) == false) {
        document.getElementById('errEmail1').innerText = "Please enter the correct email address";
        if (document.getElementById('email1').className.indexOf('boder-err') == -1) {
            document.getElementById('email1').classList.toggle('boder-err');
        }
    }
    else {
        document.getElementById('errEmail1').innerText = "";
        if (document.getElementById('email1').className.indexOf('boder-err') != -1) {
            document.getElementById('email1').classList.toggle('boder-err');
        }
    }
})

document.getElementById('email2').addEventListener('input',()=>{
    let value = document.getElementById('email2').value;
    if (validateEmail(value) == false) {
        document.getElementById('errEmail2').innerText = "Please enter the correct email address";
        if (document.getElementById('email2').className.indexOf('boder-err') == -1) {
            document.getElementById('email2').classList.toggle('boder-err');
        }
    }
    else {
        document.getElementById('errEmail2').innerText = "";
        if (document.getElementById('email2').className.indexOf('boder-err') != -1) {
            document.getElementById('email2').classList.toggle('boder-err');
        }
    }
})

let forgotPass = document.getElementById('formResetPass');
let mainForm = document.getElementById('mainFormResetPass');
forgotPass.addEventListener('submit',(e)=>{
    e.preventDefault();
    const result={
        email: forgotPass.email1.value
    }
    let borderEmail = document.getElementById('email1');
    checkEmpty(result.email, 'errEmail1', 'Please enter your email', borderEmail);
    if(result.email != ''){
        let spinner = document.getElementById('loading');
        if (spinner.className.indexOf('hide-spinner') != -1) {
            spinner.classList.toggle('hide-spinner');
            spinner.classList.toggle('show-spinner');
        }
        const postMethod = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(result)
        };
        fetch(apiURL_ResetPassword, postMethod)
            .then(res => res.json())
            .then(data => {
                if (spinner.className.indexOf('hide-spinner') == -1) {
                    spinner.classList.toggle('hide-spinner');
                    spinner.classList.toggle('show-spinner');
                }
                if (data.status == 0) {
                    document.getElementById('errEmail1').innerText = data.message;
                    if (borderEmail.className.indexOf('boder-err') == -1) {
                        borderEmail.classList.toggle('boder-err');
                    } 
                }
                if(data.status == 1){
                    document.getElementById('errEmail1').innerText = '';
                    if (borderEmail.className.indexOf('boder-err') != -1) {
                        borderEmail.classList.toggle('boder-err');
                    }
                    document.getElementById('verifyEmail').innerText = data.message;
                    document.getElementById('email2').value = result.email;
                    var min = 0;
                    var sec = 60;
                    var x = setInterval(function () {
                        if (sec == 0 && min > 0) {
                            min = min - 1;
                            sec = 60;
                        }
                        sec--;
                        if ((min + '').length == 1) {
                            min = '0' + min;
                        }
                
                        if ((sec + '').length == 1) {
                            sec = '0' + sec;
                        }
                        // Display the result in the element with id="demo"
                        document.getElementById("countDown").innerText = min + ' : ' + sec;
                
                        //If the count down is finished, write some text
                        if (sec < 0) {
                            clearInterval(x);
                            document.getElementById("countDown").innerText = "EXPIRED";
                            const deleteMethod ={
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }
                            fetch(apiURL_DeleteToken + `${result.email}`,deleteMethod)
                            .then(res=>res.json())
                            .then((data)=>{
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }
                    }, 1000);
                    
                    if(forgotPass.className.indexOf('hide-reset-btn') == -1){
                        forgotPass.classList.toggle('hide-reset-btn');
                    }
                    if(mainForm.className.indexOf('hide-reset-btn') != -1){
                        mainForm.classList.toggle('hide-reset-btn');
                    }
                    document.getElementById('closeResetBtn').addEventListener('click',()=>{
                        clearInterval(x);
                        const deleteMethod ={
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }
                        fetch(apiURL_DeleteToken + `${result.email}`,deleteMethod)
                        .then(res=>res.json())
                        .then((data)=>{
                        })
                        .catch(err => {
                            console.log(err);
                        })
                        if(forgotPass.className.indexOf('hide-reset-btn') != -1){
                            forgotPass.classList.toggle('hide-reset-btn');
                        }
                        if(mainForm.className.indexOf('hide-reset-btn') == -1){
                            mainForm.classList.toggle('hide-reset-btn');
                        }
                        document.getElementById("countDown").innerText = '';
                        document.getElementById('verifyEmail').innerText = '';
                        document.getElementById('email2').value = '';
                    })
                }
                // window.location.href = '/logout';
            })
            .catch(err => {
                console.log(err);
            })
    }
})

mainForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const data={
        email: mainForm.email2.value,
        code: mainForm.verifycode.value,
        newpassword: mainForm.newpassword.value
    }
    let borderEmail = document.getElementById('email2');
    let borderCode = document.getElementById('verifyCode');
    let borderNewpassword = document.getElementById('newpassword');
    checkEmpty(data.email, 'errEmail2', 'Please enter your email', borderEmail);
    checkEmpty(data.code, 'errverifyCode', 'Please enter your code', borderCode);
    checkEmpty(data.newpassword, 'errNewpassword', 'Please enter your code', borderNewpassword);
    if(data.email != '' && data.code != '' && data.newpassword != ''){
        let spinner = document.getElementById('loading');
        if (spinner.className.indexOf('hide-spinner') != -1) {
            spinner.classList.toggle('hide-spinner');
            spinner.classList.toggle('show-spinner');
        }
        const postMethod = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        fetch(apiURL_OverwritePassword, postMethod)
            .then(res => res.json())
            .then(data => {
                if (spinner.className.indexOf('hide-spinner') == -1) {
                    spinner.classList.toggle('hide-spinner');
                    spinner.classList.toggle('show-spinner');
                }
                if (data.status == 0) {
                    document.getElementById('errEmail2').innerText = data.message;
                    if (borderEmail.className.indexOf('boder-err') == -1) {
                        borderEmail.classList.toggle('boder-err');
                    } 
                }
                if(data.status == 1){
                    document.getElementById('errverifyCode').innerText = data.message;
                    if (borderCode.className.indexOf('boder-err') == -1) {
                        borderCode.classList.toggle('boder-err');
                    } 
                }
                if(data.status == 2){
                    window.location.href = '/login';
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
})

const apiURL_CheckLogin = 'http://127.0.0.1:3000/api/v1/check-login-user';
fetch(apiURL_CheckLogin)
    .then(res=>res.json())
    .then((data)=>{
        if(data.status == true){
            window.location.href = '/'
        }
});

// ================== Strat show and hide password=====================//
document.getElementById('show-password').addEventListener('click', () => {
    var x = document.querySelector(".ip-pass");
    var eye = document.getElementById('show-password');
    eye.removeAttribute("class");
    if (x.type === "password") {
        x.type = "text";
        eye.setAttribute("class", 'fa-solid fa-eye fixed-eye');

    } else {
        x.type = "password";
        eye.setAttribute("class", 'fa-solid fa-eye-slash fixed-eye');
    }
})

document.getElementById('show-new-password').addEventListener('click', () => {
    var x = document.querySelector(".ip-new-password");
    var eye = document.getElementById('show-new-password');
    eye.removeAttribute("class");
    if (x.type === "password") {
        x.type = "text";
        eye.setAttribute("class", 'fa-solid fa-eye fixed-eye');

    } else {
        x.type = "password";
        eye.setAttribute("class", 'fa-solid fa-eye-slash fixed-eye');
    }
})
