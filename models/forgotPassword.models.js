const {pool} = require('../config/connectMySQL');

async function InsertValuesToTableResetPassword(arr){
    await pool.execute(`
    INSERT INTO tbl_reset_password (user_email, token) VALUES (?,?)`,arr)
}

async function DeleteValueFromTableResetPasswordByEmail(email){
    await pool.execute(`
    DELETE FROM tbl_reset_password WHERE user_email='${email}'`);
}

async function FindEmailByToken(token){
    const [rows] = await pool.query(`
    SELECT *
    FROM tbl_reset_password 
    WHERE token = ${token}`);
    return rows;
}
async function UpdatePasswordByEmail(email, newPass){
    const [rows] = await pool.query(`
    UPDATE tbl_users
    SET user_password = '${newPass}'
    WHERE user_email='${email}'`);
    return rows;
}

module.exports = {
    InsertValuesToTableResetPassword,
    DeleteValueFromTableResetPasswordByEmail,
    UpdatePasswordByEmail,
    FindEmailByToken
}