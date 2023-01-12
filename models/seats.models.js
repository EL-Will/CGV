const {pool} = require('../config/connectMySQL');

async function GetAllSeatsByScheduleID(id){
    const [rows] =await pool.query(`
    SELECT seat_id, seat_row, seat_column, seat_status, seat_type
    FROM tbl_seats
    Where tbl_seats.room_id = (SELECT tbl_schedule.room_id
    FROM tbl_schedule
    WHERE tbl_schedule.schedule_id = ${id})
    ORDER BY seat_id ASC`);
    return rows;
}

async function GetAllRowOfRoomByScheduleID(id){
    const [rows] =await pool.query(`
    SELECT DISTINCT seat_row, COUNT(seat_column) AS count
    FROM tbl_seats
    Where tbl_seats.room_id = (SELECT tbl_schedule.room_id
    FROM tbl_schedule
    WHERE tbl_schedule.schedule_id = ${id})
    GROUP BY seat_row
    ORDER BY seat_row ASC`);
    return rows;
}

module.exports = {GetAllSeatsByScheduleID,
    GetAllRowOfRoomByScheduleID}