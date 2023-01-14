const {login,
    register,
    middlewareGetInforUser,
    middlewareCheckExistsInforUser,
    CreateUser,
    findOneUser,
    middlwareCkeckLogin,
    Logout,
    apiGetOneUserByID,
    apiGetInforBookingByUserID,
    apiGetOneUserByEmail} = require('../controllers/users.controllers');

const {findALLFilmNowShowing,
    findOneMovie,
    findGenreOfOneMovie,
    findFormatOfOneMovie,
    apiFindOneMovie,
    apiFindAllFilmNowShowing,
    apiFindRoomMovie,
    apiFindAllCityOfCinemas,
    apiFindAllSolutionOfMovieInCity,
    apiFindAllCinemasOfMovieInCity,
    apiFindAllSchedulesOfMovieInCity,
    Booking,
    apiBookingFindOneMovie,
    apiUpdateLikeOneMovie,
    findALLFilmComingSoon} = require('../controllers/film.controllers');

const {
    apiPostBooking,
    apiGetBookingByScheduleID} = require('../controllers/booking.controllers');

const {
    apiGetAllRowOfRoomByScheduleID,
    apiGetAllSeatsByScheduleID} = require('../controllers/seats.controllers');

const {
    GetHomePage} = require('../controllers/homepage.controllers');

const {
    VerifyPassword,
    apiUpdatePasswordByEmail,
    apiDeleteToken} = require('../controllers/forgotPassword.controller');

const express = require('express');

let router = express.Router();

const initWebRoute = (app) => {
    // directly page
    router.get('/NowShowing',middlwareCkeckLogin,findALLFilmNowShowing);
    router.get('/ComingSoon',middlwareCkeckLogin,findALLFilmComingSoon);
    router.get('/login', login);
    router.get('/register',register);
    router.get('/detail-movie/:id',findGenreOfOneMovie,findFormatOfOneMovie,apiFindAllFilmNowShowing,middlwareCkeckLogin,findOneMovie)
    router.get('/logout',Logout);
    router.get('/booking/movie/:movieID/schedule/:scheduleID',middlwareCkeckLogin,apiBookingFindOneMovie,Booking);
    router.get('/profile/:uid',apiGetInforBookingByUserID,apiGetOneUserByID);
    router.get('/',middlwareCkeckLogin,GetHomePage);
    // Call API
    // Get all city of the cinema, that have been showing movie is clicked
    router.get('/api/v1/getAllCity/:id/date/:d',apiFindRoomMovie,apiFindAllCityOfCinemas);
    router.get('/api/v1/get-one-movie/:id',findFormatOfOneMovie,apiFindOneMovie);
    router.get('/api/v1/get-solutions/:city/movie/:id',apiFindAllSolutionOfMovieInCity);
    router.get('/api/v1/get-cinemas-schedules/:movieID/date/:date/solution/:solution/city/:city',apiFindAllCinemasOfMovieInCity,apiFindAllSchedulesOfMovieInCity);
    
    router.post('/api/v1/create-user',middlewareGetInforUser,middlewareCheckExistsInforUser,CreateUser);
    router.post('/api/v1/login',findOneUser);
    router.post('/api/v1/post-booking',apiPostBooking);
    // Get seats
    router.get('/api/v1/get-seats/:scheduleID',apiGetAllRowOfRoomByScheduleID,apiGetAllSeatsByScheduleID);
    // Get booking
    router.get('/api/v1/get-booking/:scheduleID',apiGetBookingByScheduleID);
    // movie
    router.get('/api/v1/get-like-movie/:id',apiFindOneMovie);
    router.put('/api/v1/put-like-movie/:id',apiUpdateLikeOneMovie);
    // booking
    router.get('/api/v1/booking/:uid',apiGetInforBookingByUserID,apiGetOneUserByID);
    // change password
    router.put('/api/v1/change-password/:email',apiGetOneUserByEmail);
    // reset password
    router.post('/api/v1/reset-password',VerifyPassword);
    router.post('/api/v1/reset-update-password',apiUpdatePasswordByEmail);
    router.delete('/api/v1/delete-token/:email',apiDeleteToken)
    return app.use('/', router);
}

module.exports = {initWebRoute};