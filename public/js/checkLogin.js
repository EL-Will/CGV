const apiURL_CheckLogin = 'http://127.0.0.1:3000/api/v1/check-login-user';
async function checkLogin(){
    const data = JSON.parse(
        JSON.stringify(
            await fetch(apiURL_CheckLogin)
            .then(res=>res.json())
        )
    );
    
    if(data.status == true){
        let href = window.location.href
        
        if(href == 'http://127.0.0.1:3000/NowShowing'){
            window.location.href = '/NowShowing';
        }
        else if(href == 'http://127.0.0.1:3000/ComingSoon'){
            window.location.href = '/ComingSoon';
        }
    }
}
checkLogin();