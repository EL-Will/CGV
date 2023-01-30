const apiURL_Post_Login_Admin = 'http://127.0.0.1:3000/api/v1/login-admin'

let loginForm = document.getElementById('mainFormLogin');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
        email: loginForm.email.value,
        password: loginForm.password.value
    };
    let borderemail = document.getElementById('email');
    let borderPassword = document.getElementById('password');
    if (data.email == '' && data.password !== '') {
        document.getElementById('informEmail').innerText = "Please input your email";
        document.getElementById('informPassword').innerText = "";
        if (borderemail.className.indexOf('boder-err') == -1) {
            borderemail.classList.toggle('boder-err');
        }
        if (borderPassword.className.indexOf('boder-err') != -1) {
            borderPassword.classList.toggle('boder-err');
        }
    }
    else if (data.email !== '' && data.password == '') {
        document.getElementById('informEmail').innerText = "";
        document.getElementById('informPassword').innerText = "Please input your password";
        if (borderemail.className.indexOf('boder-err') != -1) {
            borderemail.classList.toggle('boder-err');
        }
        if (borderPassword.className.indexOf('boder-err') == -1) {
            borderPassword.classList.toggle('boder-err');
        }
    }
    else if (data.email == '' && data.password == '') {
        document.getElementById('informEmail').innerText = "Please input your email";
        document.getElementById('informPassword').innerText = "Please input your password";
        if (borderemail.className.indexOf('boder-err') == -1) {
            borderemail.classList.toggle('boder-err');
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
        const newData={
            username: data.email,
            password: data.password
        }
        const postMethod = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        };
        fetch(apiURL_Post_Login_Admin, postMethod)
            .then(res => res.json())
            .then((data) => {
                if (spinner.className.indexOf('hide-spinner') == -1) {
                    spinner.classList.toggle('hide-spinner');
                    spinner.classList.toggle('show-spinner');
                }
                if (data.status == 0) {
                    document.getElementById('informEmail').innerText = data.message;
                    if (borderemail.className.indexOf('boder-err') == -1) {
                        borderemail.classList.toggle('boder-err');
                    }

                }
                else if (data.status == 1) {
                    document.getElementById('informPassword').innerText = data.message;
                    if (borderPassword.className.indexOf('boder-err') == -1) {
                        borderPassword.classList.toggle('boder-err');
                    }
                }
                else if (data.status == 2) {
                    window.location.href = '/login';
                }
                else {
                    window.location.href = '/admin-user';
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

document.getElementById('email').addEventListener('input',()=>{
    let value = document.getElementById('email').value;
    if (validateEmail(value) == false) {
        document.getElementById('informEmail').innerText = "Please enter the correct email address";
        if (document.getElementById('email').className.indexOf('boder-err') == -1) {
            document.getElementById('email').classList.toggle('boder-err');
        }
    }
    else {
        document.getElementById('informEmail').innerText = "";
        if (document.getElementById('email').className.indexOf('boder-err') != -1) {
            document.getElementById('email').classList.toggle('boder-err');
        }
    }
})