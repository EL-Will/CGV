const {pool} = require('../config/connectMySQL');

async function UpdateUser(uid, arr){
    const [rows] = await pool.query(`
    UPDATE tbl_users
    SET user_phone = ?, user_name = ?, user_role = ?, user_dob = ?, user_city=?
    WHERE user_id='${uid}'`,arr);
    return rows;
}
async function DeleteUser(uid){
    await pool.execute(`
    DELETE FROM tbl_users WHERE user_id='${uid}'`);
}

module.exports = {
    UpdateUser,
    DeleteUser
}