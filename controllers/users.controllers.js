const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {sessionStore} = require('../config/connectMySQL');
const dotenv = require('dotenv');

dotenv.config();

const {
    GetInforUser,
    SetInforUser,
    GetOneUser,
    GetOneUserByID,
    GetInforBookingByUserID,
    GetBookingIDByUserID,
    GetOneUserByEmail,
    UpdatePasswordForOneUser,
    GetAllUsers} = require('../models/user.model');

let path = require('path');
let options = {
    root: path.join(__dirname, '../public')
};
let login = async (req, res) => {
    if(req.checkLogin == true){
        return res.redirect('/');
    }
    else{
        return res.render('login.ejs'); 
    }
    
}
let register = async (req, res) => {
    return res.render('register.ejs'); 
}
let middlewareGetInforUser = async(req,res,next)=>{
    const users = await GetInforUser();
    req.users = users;
    next();
}
let middlewareCheckExistsInforUser = async(req,res,next)=>{
    let exists =[];
    exists = req.users.filter((item)=>{
        return item.user_phone == req.body.phone || item.user_email == req.body.email;
    })
    if(exists.length == 0){
        next();
    }
    else{
        return res.status(200).json({status: false, message: 'Email or Phone number exists'});
    }
}
let CreateUser = async(req,res)=>{
    const hash = await bcrypt.hash(req.body.password,13);
    let {username,phone,email,dob,gender,city,agree,role} = req.body;
    const users = await SetInforUser([username,phone,email,hash,dob,gender,city,agree,role]);
    return res.status(200).json({status: true, message: 'Create User Success'})
}
let findOneUser = async (req, res) => {
    let {username,password} = req.body;
    const user = await GetOneUser([username]);
    if(user.length == 0){
        return res.status(200).json({status: 0, message: "Email incorrect"});
    }
    const isValid = await bcrypt.compare(password, user[0].password);
    if(!isValid){
        return res.status(200).json({status: 1, message: "Password incorrect"});
    }
    req.session.userId = user[0].id;
    return res.status(200).json({status: 2});
}
let middlwareCkeckLogin = async(req,res,next)=>{
    let session = req.session.userId;
    if(session){
        req.checkLogin = true;
        const user = await GetOneUserByID(Number(req.session.userId));
        req.username = user[0].name;
        req.userID = user[0].id;
        if(user[0].role == 0){
            next()
        }
        else{
            res.redirect('/login-admin');
        }
    }
    else{
        req.checkLogin = false;
        next();
    }
}
let apiCkeckLogin = async(req,res)=>{
    let session = req.session.userId;
    if(session){
        return res.status(200).json({status: true});
    }
    else{
        return res.status(200).json({status: false});
    }
    
}
let Logout = async(req,res)=>{
    req.session.destroy(err => {
        if(err){
            return res.redirect('/login');
        }
        sessionStore.close();
        return res.redirect('/login');
    })
}
let apiGetOneUserByID = async(req,res)=>{
    const user = await GetOneUserByID(Number(req.params.uid));
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let dob = `${months[((user[0].dob)).getMonth()]}/${((user[0].dob)).getDate()}/${((user[0].dob)).getFullYear()}`
    user[0].dob = dob;
    return res.render('profile.ejs',{user: user, username: user[0].name, userID: user[0].id , booking: req.booking});
}
let apiGetOneUserByUid = async(req,res)=>{
    const user = await GetOneUserByID(Number(req.params.uid));
    if(user.length >0){
        return res.status(200).json({status: 1, user: user})
    }
    else{
        return res.status(200).json({status: 0})
    }
    
}
let apiGetInforBookingByUserID = async(req,res,next)=>{
    const bookingInfor = await GetInforBookingByUserID(Number(req.params.uid));
    const bookingID = await GetBookingIDByUserID(Number(req.params.uid));
    for(let i=0; i<bookingInfor.length;i++){
        let arr=[];
        for(let j=0; j<bookingID.length;j++){
            if(bookingInfor[i].schedule_id == bookingID[j].schedule_id){
                arr.push(bookingID[j].booking_id);
            }
        }
        // jwt.sign({booking_id: arr},process.env.JWT_SECRET)
        let token = arr.join('');
        bookingInfor[i].booking_id = bookingInfor[i].user_id+'C'+token;
    }
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    let newArr = bookingInfor.reduce((arr,item)=>{
        let date = `${months[((item.schedule_date)).getMonth()]}/${((item.schedule_date)).getDate()}/${((item.schedule_date)).getFullYear()}`;
        let price = formatCash(item.price.toString())
        item.schedule_date = date;
        item.price = price;
        arr.push(item);
        return arr;
    },[])
    req.booking = newArr;
    next();
}
let apiGetOneUserByEmail = async(req,res)=>{
    const user = await GetOneUserByEmail(req.params.email);
    if(user.length >0 && user[0].id == Number(req.params.uid)){
        let {currentPass, newPass} =req.body;
        const isValid = await bcrypt.compare(currentPass, user[0].password);
        if(!isValid){
            return res.status(200).json({status: 1, message: "Password incorrect"});
        }
        else{
            const hash = await bcrypt.hash(newPass,13);
            const result = await UpdatePasswordForOneUser(req.params.email,hash);
            return res.status(200).json({status: 2});
        }
    }
    else{
        return res.status(200).json({status: 0, message: "Email incorrect"});
    }
}
function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev
    })
}
let middlwareCkeckLoginAdmin = async(req,res,next)=>{
    let session = req.session.userId;
    if(session){
        req.checkLogin = true;
        const user = await GetOneUserByID(Number(req.session.userId));
        req.username = user[0].name;
        req.userID = user[0].id;
        if(user[0].role == 1){
            next();
        }
        else{
            res.redirect('/');
        }
    }
    else{
        req.checkLogin = false;
        res.redirect('/login-admin');
    }
}
let apiGetAllUsers = async (req,res)=>{
    const users = await GetAllUsers();
    if(users.length >0){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let newUsers = users.reduce((obj,item)=>{
            let newObj ={
                user_id: item.user_id,
                user_name: item.user_name,
                user_phone: item.user_phone,
                user_email: item.user_email,
                user_password: item.user_password,
                user_dob: `${months[((item.user_dob)).getMonth()]}/${((item.user_dob)).getDate()}/${((item.user_dob)).getFullYear()}`, 
                user_gender: item.user_gender,
                user_city: item.user_city
            }
            obj.push(newObj);
            return obj;
        },[]);
        return res.render('admin.ejs',{status: true,data: newUsers});
        // if(req.checkLogin == false){
        //     return res.render('nowshowing.ejs',{status: true,data: newMoviews});
        // }
        // else{
        //     return res.render('nowshowingLogin.ejs',{status: true,data: newMoviews, username: req.username, userID: req.userID});
        // }
    }
    else{
        return res.render('admin.ejs',{status: false,data: newUsers});
        // if(req.checkLogin == false){
        //     return res.render('nowshowing.ejs',{status: false,data: films});
        // }
        // else{
        //     return res.render('nowshowingLogin.ejs',{status: false,data: films, username: req.username , userID: req.userID});
        // }
    }
}
module.exports = {
    login,
    register,
    middlewareGetInforUser,
    middlewareCheckExistsInforUser,
    CreateUser,
    findOneUser,
    middlwareCkeckLogin,
    Logout,
    apiGetOneUserByID,
    apiGetInforBookingByUserID,
    apiGetOneUserByEmail,
    apiGetAllUsers,
    middlwareCkeckLoginAdmin,
    apiCkeckLogin,
    apiGetOneUserByUid
};