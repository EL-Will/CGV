const {
    PostBooking,
    GetBookingByScheduleID} = require('../models/booking.models');

let apiPostBooking = async(req,res)=>{
    for(let i=0; i< req.body.length; i++){
        let {user_id,schedule_id,seat_id,seat_status,price} = req.body[i];
        await PostBooking([user_id,schedule_id,seat_id,seat_status,price]);
    }
    return res.status(200).json({status: true, message: 'Create Booking Success'})
}

let apiGetBookingByScheduleID = async(req,res)=>{
    const booking = await GetBookingByScheduleID(Number(req.params.scheduleID));
    if(!booking){
        return res.status(200).json({status: false})
    }
    return res.status(200).json({status: true, booking: booking})
}

module.exports = {
    apiPostBooking,
    apiGetBookingByScheduleID}