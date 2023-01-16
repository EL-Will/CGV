
const {GetALLFilmNowShowing,
    GetOneMovie,
    GetGenreOfOneMovie,
    GetFormatOfOneMovie,
    GetRoomOfMovie,
    GetAllCityOfCinemas,
    GetAllSolutionOfMovieInCity,
    GetAllCinemasOfMovieInCity,
    GetAllScheduleOfMovieInCity,
    GetScheduleOfMovieByScheduleID,
    UpdateLikeOneMovie,
    GetALLFilmComingSoon,
    GetAllFilms} = require('../models/film.models');

let findALLFilmNowShowing = async (req,res)=>{
    const films = await GetALLFilmNowShowing();
    if(films.length >0){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let newMoviews = films.reduce((obj,item)=>{
            let newObj ={
                movie_id: item.movie_id,
                rated_name: item.rated_name,
                rated_description: item.rated_description,
                movie_poster: item.movie_poster,
                movie_name: item.movie_name,
                movie_length: item.movie_length,
                movie_release: `${months[((item.movie_release)).getMonth()]} ${((item.movie_release)).getDate()} ${((item.movie_release)).getFullYear()}`, 
                movie_like: item.movie_like,
                movie_status: item.movie_status
            }
            obj.push(newObj);
            return obj;
        },[]);
        if(req.checkLogin == false){
            return res.render('nowshowing.ejs',{status: true,data: newMoviews});
        }
        else{
            return res.render('nowshowingLogin.ejs',{status: true,data: newMoviews, username: req.username, userID: req.userID});
        }
    }
    else{
        if(req.checkLogin == false){
            return res.render('nowshowing.ejs',{status: false,data: films});
        }
        else{
            return res.render('nowshowingLogin.ejs',{status: false,data: films, username: req.username , userID: req.userID});
        }
    }
}
let findOneMovie = async (req,res)=>{
    const films = await GetOneMovie(Number(req.params.id));
    if(films.length >0){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let newMoviews = films.reduce((obj,item)=>{
            let newObj ={
                movie_id: item.movie_id,
                rated_name: item.rated_name,
                rated_description: item.rated_description,
                movie_poster: item.movie_poster,
                movie_name: item.movie_name,
                movie_length: item.movie_length,
                movie_release: `${months[((item.movie_release)).getMonth()]} ${((item.movie_release)).getDate()} ${((item.movie_release)).getFullYear()}`, 
                movie_like: item.movie_like,
                movie_trailer: item.movie_trailer,
                movie_director: item.movie_director,
                movie_actor: item.movie_actor, 
                movie_description: item.movie_description, 
                movie_language: item.movie_language,
                movie_status: item.movie_status
            }
            obj.push(newObj);
            return obj;
        },[]);
        if(req.checkLogin == false){
            console.log(1);
            return res.render('detailMovie.ejs',{data: newMoviews, genres: req.genres, format: req.format, films: req.films});
        }
        else{
            return res.render('detailMovieLogin.ejs',{data: newMoviews, genres: req.genres, format: req.format, films: req.films, username: req.username, userID:req.userID});
        }
    }
    else{
        if(req.checkLogin == false){
            return res.render('detailMovie.ejs',{data: films, genres: req.genres, format: req.format, films: req.films});
        }
        else{
            return res.render('detailMovieLogin.ejs',{data: films, genres: req.genres, format: req.format, films: req.films, username: req.username, userID:req.userID});
        }
    }
}
let Booking = async (req,res)=>{
    if(req.checkLogin == false){
        return res.redirect('/login');
    }
    else{
        if(req.checkFilms == true){
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            let newMoviews = req.schedule.reduce((obj,item)=>{
            let newObj ={
                schedule_date: `${days[((item.schedule_date)).getDay()]}, ${months[((item.schedule_date)).getMonth()]} ${((item.schedule_date)).getDate()} ${((item.schedule_date)).getFullYear()}`,
                schedule_start: item.schedule_start,
                room_name: item.room_name,
                format_name: item.format_name,
                cinema_name: item.cinema_name
            }
            obj.push(newObj);
            return obj;
        },[]);
            return res.render('booking.ejs',{username: req.username, films: req.films, schedule: newMoviews, userID: req.userID});
        }
        else{
            return res.status(200).json({status: false, message: 'Not Found Information Of Film'});
        }
    }
}
let findALLFilmComingSoon = async (req,res)=>{
    const films = await GetALLFilmComingSoon();
    if(films.length >0){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let newMoviews = films.reduce((obj,item)=>{
            let newObj ={
                movie_id: item.movie_id,
                rated_name: item.rated_name,
                rated_description: item.rated_description,
                movie_poster: item.movie_poster,
                movie_name: item.movie_name,
                movie_length: item.movie_length,
                movie_release: `${months[((item.movie_release)).getMonth()]} ${((item.movie_release)).getDate()} ${((item.movie_release)).getFullYear()}`, 
                movie_like: item.movie_like,
                movie_status: item.movie_status
            }
            obj.push(newObj);
            return obj;
        },[]);
        if(req.checkLogin == false){
            return res.render('comingsoon.ejs',{status: true,data: newMoviews});
        }
        else{
            return res.render('comingsoonLogin.ejs',{status: true,data: newMoviews, username: req.username, userID: req.userID});
        }
    }
    else{
        if(req.checkLogin == false){
            return res.render('comingsoon.ejs',{status: false, data: films});
        }
        else{
            return res.render('comingsoonLogin.ejs',{status: false, data: films, username: req.username , userID: req.userID});
        }
    }
}
// API
let apiFindAllFilmNowShowing = async (req,res,next)=>{
    const films = await GetALLFilmNowShowing();
    if(films.length >0){
        req.films = films;
        next()
    }
    else{
        return res.status(200).json({status: false, message: 'Not Found Film'});
    }
}
let apiFindOneMovie = async (req,res)=>{
    const films = await GetOneMovie(Number(req.params.id));
    if(films.length >0){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let newMoviews = films.reduce((obj,item)=>{
            let newObj ={
                movie_id: item.movie_id,
                rated_name: item.rated_name,
                rated_description: item.rated_description,
                movie_poster: item.movie_poster,
                movie_name: item.movie_name,
                movie_length: item.movie_length,
                movie_release: `${months[((item.movie_release)).getMonth()]} ${((item.movie_release)).getDate()} ${((item.movie_release)).getFullYear()}`, 
                movie_like: item.movie_like,
                movie_trailer: item.movie_trailer,
                movie_director: item.movie_director,
                movie_actor: item.movie_actor, 
                movie_description: item.movie_description, 
                movie_language: item.movie_language
            }
            obj.push(newObj);
            return obj;
        },[]);
        return res.status(200).json({status: true, data: newMoviews, format: req.format});
    }
    else{
        return res.status(404).json({status: false, message: 'Not Found Film'});
    }
}
let findGenreOfOneMovie = async (req,res,next)=>{
    const genres = await GetGenreOfOneMovie(Number(req.params.id));
    if(genres.length >0){
        req.genres = '';
        for(let i in genres){
            if(Number(i) == 0){
                req.genres = req.genres + genres[i].genre_name;
            }
            else{
                req.genres = req.genres + ', '+genres[i].genre_name;
            }
        }
        next();
    }
    else{
        return res.status(404).json({status: false, message: 'Not Found Film'});
    }
}
let findFormatOfOneMovie = async (req,res,next)=>{
    const format = await GetFormatOfOneMovie(Number(req.params.id));
    if(format.length >0){
        req.format = format;
        next();
    }
    else{
        return res.status(404).json({status: false, message: 'Not Found Film'});
    }
}
let apiFindRoomMovie = async (req,res,next)=>{
    const rooms = await GetRoomOfMovie(Number(req.params.id), req.params.d);
    if(rooms.length >0){
        next();
    }
    else{
        return res.status(200).json({status: false, message: 'Not Found Schedule Of Movie'});
    }
}
let apiFindAllCityOfCinemas = async (req,res)=>{
    const city = await GetAllCityOfCinemas(Number(req.params.id), req.params.d);
    if(city.length >0){
        return res.status(200).json({status: true, city: city});
    }
    else{
        return res.status(200).json({status: false, message: 'Not Found Schedule Of Movie'});
    }
}
let apiFindAllSolutionOfMovieInCity = async (req,res)=>{
    const solutions = await GetAllSolutionOfMovieInCity(req.params.city, Number(req.params.id));
    if(solutions.length >0){
        return res.status(200).json({status: true, solutions: solutions});
    }
    else{
        return res.status(200).json({status: false, message: 'Not Found Schedule Of Movie'});
    }
}
let apiFindAllCinemasOfMovieInCity = async (req,res,next)=>{
    const cinemas = await GetAllCinemasOfMovieInCity(Number(req.params.movieID), req.params.date, req.params.solution, req.params.city);
    if(cinemas.length >0){
        req.cinemas = cinemas;
        next()
    }
    else{
        return res.status(200).json({status: false, message: 'Not Found Schedule Of Movie'});
    }
}
let apiFindAllSchedulesOfMovieInCity = async (req,res)=>{
    const schedules = await GetAllScheduleOfMovieInCity(Number(req.params.movieID), req.params.date, req.params.solution, req.params.city);
    if(schedules.length >0){
        let today = new Date();
        let time = add_zero(today,2) + ":" + add_zero(today,3);
        let newSchedules = schedules.filter((item)=>{
            let t = item.schedule_start.slice(0,5);
            return Date.parse(`01/01/2011 ${t}`) > Date.parse(`01/01/2011 ${time}`);
        })
        let arrCinemas = newSchedules.reduce((obj,item)=>{
            obj.push(item.cinema_id);
            return obj;
        },[])
        let newCinemas = req.cinemas.filter((item)=>{
            return arrCinemas.indexOf(item.cinema_id) != -1;
        })
        return res.status(200).json({status: true, cinemas: newCinemas, schedules: newSchedules});
    }
    else{
        return res.status(200).json({status: false, message: 'Not Found Schedule Of Movie'});
    }
}
function add_zero(today,num)
{ 
    if(num == 0){
        return (today.getMonth()+1 < 10 ? '0' : '') + (today.getMonth()+1);
    }
    else if(num == 1){
        return (today.getDate() < 10 ? '0' : '') + today.getDate();
    }
    else if(num == 2){
        return (today.getHours() < 10 ? '0' : '') + today.getHours();
    }
    else{
        return (today.getMinutes() < 10 ? '0' : '') + today.getMinutes();
    }
}
let apiBookingFindOneMovie = async (req,res,next)=>{
    if(req.checkLogin == false){
        return res.redirect('/login');
    }
    else{
        const films = await GetOneMovie(Number(req.params.movieID));
        const schedule = await GetScheduleOfMovieByScheduleID(Number(req.params.scheduleID));
        if(films.length >0 && schedule.length>0){
            req.films = films;
            req.schedule = schedule;
            req.checkFilms = true;
            next();
        }
        else{
            req.checkFilms = false;
            next();
        }
    }
   
}
let apiUpdateLikeOneMovie = async (req,res)=>{
    const like = await UpdateLikeOneMovie(Number(req.params.id),req.body.movie_like);
    console.log(like);
    return res.status(200).json({status: true});
}
let apiGetAllFilms = async (req,res)=>{
    const films = await GetAllFilms();
    if(films.length >0){
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let newMoviews = films.reduce((obj,item)=>{
            let str_status = '';
            if(item.movie_status == 1){
                str_status = 'Now showing';
            }
            else if(item.movie_status == 2){
                str_status = 'Comming soon';
            }
            else{
                str_status = 'Stop showing';
            }
            let newObj ={
                movie_id: item.movie_id,
                rated_name: item.rated_name,
                rated_description: item.rated_description,
                movie_poster: item.movie_poster,
                movie_name: item.movie_name,
                movie_length: item.movie_length,
                movie_release: `${months[((item.movie_release)).getMonth()]} ${((item.movie_release)).getDate()} ${((item.movie_release)).getFullYear()}`, 
                movie_like: item.movie_like,
                movie_status: str_status,
                movie_description: item.movie_description,
                movie_language: item.movie_language
            }
            obj.push(newObj);
            return obj;
        },[])
        return res.render('adminFilms.ejs',{status: true,data: newMoviews});
    }
    else{
        return res.render('adminFilms.ejs',{status: false, data: films}); 
    }
}
module.exports = {findALLFilmNowShowing,
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
    findALLFilmComingSoon,
    apiGetAllFilms};