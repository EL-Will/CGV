const {pool} = require('../config/connectMySQL');

async function GetInforUser(){
    const [rows] =await pool.query(`
    SELECT user_phone, user_email
    FROM tbl_users`);
    return rows;
}
async function GetAllUsers(){
    const [rows] =await pool.query(`
    SELECT *
    FROM tbl_users`);
    return rows;
}
async function SetInforUser(arr){
    const [result] = await pool.execute(`
    INSERT INTO tbl_users 
    (user_name,user_phone,user_email,user_password,user_dob,user_gender,user_city,user_agree,user_role) 
    VALUES (?,?,?,?,?,?,?,?,?)
    `,arr);
}
async function GetOneUser(arr){
    const [rows] = await pool.query(`
    SELECT tbl_users.user_id AS id, tbl_users.user_name AS name, tbl_users.user_password AS password, tbl_users.user_role AS role 
    FROM tbl_users
    WHERE user_email=?`,arr);
    return rows;
}
async function GetOneUserByID(arr){
    const [rows] = await pool.query(`
    SELECT tbl_users.user_id AS id, 
    tbl_users.user_name AS name, 
    tbl_users.user_password AS password, 
    tbl_users.user_phone AS phonenumber,
    tbl_users.user_email AS email,
    tbl_users.user_dob AS dob,
    tbl_users.user_gender AS gender,
    tbl_users.user_city AS city,
    tbl_users.user_role AS role
    FROM tbl_users
    WHERE user_id=?`,arr);
    return rows;
}
async function GetInforBookingByUserID(uid){
    const [rows] = await pool.query(`
    SELECT s1.user_id, s1.schedule_id, tbl_schedule.schedule_date, tbl_movies.movie_name, tbl_rooms.room_name, tbl_cinemas.cinema_name, s1.price
    FROM (SELECT DISTINCT schedule_id, SUM(price) AS price, user_id
    FROM tbl_booking
    WHERE user_id = ${uid}
    GROUP BY schedule_id) AS s1
    JOIN tbl_schedule ON tbl_schedule.schedule_id = s1.schedule_id
    JOIN tbl_movies ON tbl_movies.movie_id = tbl_schedule.movie_id
    JOIN tbl_rooms ON tbl_rooms.room_id =tbl_schedule.room_id
    JOIN tbl_cinemas ON tbl_cinemas.cinema_id =tbl_rooms.cinema_id`);
    return rows;
}
async function GetBookingIDByUserID(uid){
    const [rows] = await pool.query(`
    SELECT schedule_id, booking_id
    FROM tbl_booking
    WHERE user_id = ${uid}`);
    return rows;
}
async function GetOneUserByEmail(email){
    const [rows] = await pool.query(`
    SELECT tbl_users.user_password AS password, tbl_users.user_id AS id
    FROM tbl_users
    WHERE user_email='${email}'`);
    return rows;
}
async function UpdatePasswordForOneUser(email,newPass){
    const [rows] = await pool.query(`
    UPDATE tbl_users
    SET user_password = '${newPass}'
    WHERE user_email='${email}'`);
    return rows;
}
module.exports = {
    GetInforUser,
    SetInforUser,
    GetOneUser,
    GetOneUserByID,
    GetInforBookingByUserID,
    GetBookingIDByUserID,
    GetOneUserByEmail,
    UpdatePasswordForOneUser,
    GetAllUsers};