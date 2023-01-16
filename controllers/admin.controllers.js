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
    req.session.userId = user[0].id;
    if(user[0].role != 1){
        return res.status(200).json({status: 2});
    }
    return res.status(200).json({status: 3});
}
module.exports = {
    loginAdmin,
    findOneUserAdmin
}