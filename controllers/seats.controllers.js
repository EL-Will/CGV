const {GetAllSeatsByScheduleID,
GetAllRowOfRoomByScheduleID} = require('../models/seats.models')

let apiGetAllRowOfRoomByScheduleID = async (req,res,next)=>{
    const rows = await GetAllRowOfRoomByScheduleID(Number(req.params.scheduleID));
    if(rows.length >0){
        req.rows = rows;
        next()
    }
    else{
        return res.status(200).json({status: false, message: 'Not Found Seat In Room'});
    }
}
let apiGetAllSeatsByScheduleID = async (req,res)=>{
    const seats = await GetAllSeatsByScheduleID(Number(req.params.scheduleID));
    if(seats.length >0){
        return res.status(200).json({status: true, seats: seats, rows: req.rows});
    }
    else{
        return res.status(200).json({status: false, message: 'Not Found Schedule Of Movie'});
    }
}

module.exports = {
    apiGetAllRowOfRoomByScheduleID,
    apiGetAllSeatsByScheduleID
}