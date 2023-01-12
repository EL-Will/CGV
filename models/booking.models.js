const {pool} = require('../config/connectMySQL');

async function PostBooking(arr){
    await pool.execute(`
    INSERT INTO tbl_booking (user_id, schedule_id, seat_id, seat_status, price) VALUES(?,?,?,?,?)`,arr);
}

async function GetBookingByScheduleID(scheduleID){
    const [rows] = await pool.query(`
    SELECT seat_id, seat_status
    FROM tbl_booking
    WHERE schedule_id = ${scheduleID}`);
    return rows;
}
module.exports = {PostBooking,GetBookingByScheduleID};