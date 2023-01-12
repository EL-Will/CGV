const apiURL1 = 'http://127.0.0.1:3000/api/v1/login';
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
let loginForm = document.getElementsByClassName('login-form')[0];
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const data = {
        username: loginForm.email.value,
        password: loginForm.password.value
    };
    let borderUsername = document.getElementById('email');
    let borderPassword = document.getElementById('password');
    if(data.username == '' && data.password !== ''){
        document.getElementById('informUsername').innerText = "Please input your username";
        document.getElementById('informPassword').innerText = "";
        if(borderUsername.className.indexOf('boder-err') == -1){
            borderUsername.classList.toggle('boder-err');
        }
        if(borderPassword.className.indexOf('boder-err') != -1){
            borderPassword.classList.toggle('boder-err');
        }
    }
    else if(data.username !== '' && data.password == ''){
        document.getElementById('informUsername').innerText = "";
        document.getElementById('informPassword').innerText = "Please input your password";
        if(borderUsername.className.indexOf('boder-err') != -1){
            borderUsername.classList.toggle('boder-err');
        }
        if(borderPassword.className.indexOf('boder-err') == -1){
            borderPassword.classList.toggle('boder-err');
        }
    }
    else if(data.username == '' && data.password == ''){
        document.getElementById('informUsername').innerText = "Please input your username";
        document.getElementById('informPassword').innerText = "Please input your password";
        if(borderUsername.className.indexOf('boder-err') == -1){
            borderUsername.classList.toggle('boder-err');
        }
        if(borderPassword.className.indexOf('boder-err') == -1){
            borderPassword.classList.toggle('boder-err');
        }
    }
    else{
        const postMethod = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };
        fetch(apiURL1,postMethod)
            .then(res=>res.json())
            .then(data=>{
                if(data.status == false){
                    document.getElementById('informUsername').innerText = data.message;
                    document.getElementById('informPassword').innerText = data.message;
                    if(borderUsername.className.indexOf('boder-err') == -1){
                        borderUsername.classList.toggle('boder-err');
                    }
                    if(borderPassword.className.indexOf('boder-err') == -1){
                        borderPassword.classList.toggle('boder-err');
                    }
                }
                else{
                    window.location.href = '/NowShowing';
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }
})