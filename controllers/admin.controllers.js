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
    GetAllUsers
} = require('../models/user.model');
const {
    UpdateUser,
    DeleteUser
} = require('../models/admin.models')

let path = require('path');
let options = {
    root: path.join(__dirname, '../public')
};

let loginAdmin = async (req, res) => {
    return res.render('loginAdmin.ejs'); 
}
let findOneUserAdmin = async (req, res) => {
    let {username,password} = req.body;
    const user = await GetOneUser([username]);
    if(user.length == 0){
        return res.status(200).json({status: 0, message: "Email incorrect"});
    }
    const isValid = await bcrypt.compare(password, user[0].password);
    if(!isValid){
        return res.status(200).json({status: 1, message: "Password incorrect"});
    }
    
    if(user[0].role != 1){
        return res.status(200).json({status: 2});
    }
    req.session.userId = user[0].id;
    return res.status(200).json({status: 3});
}
let Logout = async(req,res)=>{
    req.session.destroy(err => {
        if(err){
            return res.redirect('/login-admin');
        }
        sessionStore.close();
        return res.redirect('/login-admin');
    })
}
let middlewareCheckExistsPhonenumber = async(req,res,next)=>{
    let exists =[];
    exists = req.users.filter((item)=>{
        return item.user_phone == req.body.phone && item.user_id !== Number(req.body.id);
    })
    if(exists.length == 0){
        next();
    }
    else{
        return res.status(200).json({status: false, message: 'Phone number exists'});
    }
}
let middlewareUpdateUser= async(req,res)=>{
    let {phone,username,role,dob,city} = req.body;
    await UpdateUser(Number(req.body.id),[phone,username,role,dob,city]);
    return res.status(200).json({status: true, message: 'Update User Success'})
}
let apiDeleteUser = async(req,res)=>{
    await DeleteUser(req.params.uid);
    return res.status(200).json({status: 2});
}
module.exports = {
    loginAdmin,
    findOneUserAdmin,
    Logout,
    middlewareCheckExistsPhonenumber,
    middlewareUpdateUser,
    apiDeleteUser
}