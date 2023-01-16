const {transporter} = require('../config/configNodeMailer');
const bcrypt = require('bcrypt');
const {
    GetOneUserByEmail,
    UpdatePasswordForOneUser} = require('../models/user.model');
const {
    InsertValuesToTableResetPassword,
    DeleteValueFromTableResetPasswordByEmail,
    UpdatePasswordByEmail,
    FindEmailByToken } = require('../models/forgotPassword.models')

const randString = ()=>{
    const len = 8;
    let randStr = '';
    for(let i = 0; i<len; i++){
        const ch = Math.floor((Math.random()*10) + 1);
        randStr += ch;
    }
    return randStr;
}

let VerifyPassword = async(req,res)=>{
    const user = await GetOneUserByEmail(req.body.email);
    if(!user){
        return res.status(200).json({status: 0, message: 'Email is not exists'});
    }
    let token = randString();
    // Update to user
    await InsertValuesToTableResetPassword([req.body.email,token]);
    const mailOptions = {
        from: process.env.MAIL_USER,
        to: req.body.email,
        subject: 'Verify code to reset Password',
        text: `Your code is: ${token}`
    }
    
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

    return res.status(200).json({status: 1, message: 'Check verify code in your email'});
}

let apiUpdatePasswordByEmail = async(req,res)=>{
    const user = await GetOneUserByEmail(req.body.email);
    if(user.length >0){
        let {email,code, newpassword} =req.body;
        const result = await FindEmailByToken(code);
        if(result.length == 0){
            return res.status(200).json({status: 1, message: "Code incorrect"});
        }
        else{
            const hash = await bcrypt.hash(newpassword,13);
            const value = await UpdatePasswordForOneUser(email,hash);
            await DeleteValueFromTableResetPasswordByEmail(email);
            return res.status(200).json({status: 2});
        }
    }
    else{
        return res.status(200).json({status: 0, message: "Email incorrect"});
    }
}
let apiDeleteToken = async(req,res)=>{
    await DeleteValueFromTableResetPasswordByEmail(req.params.email);
    return res.status(200).json({status: 2});
}
module.exports = {
    VerifyPassword,
    apiUpdatePasswordByEmail,
    apiDeleteToken}