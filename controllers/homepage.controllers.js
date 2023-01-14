const {
    GetALLFilmNowShowing,
    GetALLFilmComingSoon} = require('../models/film.models');
const {
    GetBanner} = require('../models/homepage.models');

let GetHomePage = async(req,res)=>{
    const films = await GetALLFilmNowShowing();
    const comingSoon = await GetALLFilmComingSoon();
    const banners = await GetBanner();
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
                movie_like: item.movie_like
            }
            obj.push(newObj);
            return obj;
        },[]);
        let newComingSoon = comingSoon.reduce((obj,item)=>{
            let newObj ={
                movie_id: item.movie_id,
                rated_name: item.rated_name,
                rated_description: item.rated_description,
                movie_poster: item.movie_poster,
                movie_name: item.movie_name,
                movie_length: item.movie_length,
                movie_release: `${months[((item.movie_release)).getMonth()]} ${((item.movie_release)).getDate()} ${((item.movie_release)).getFullYear()}`, 
                movie_like: item.movie_like
            }
            obj.push(newObj);
            return obj;
        },[]);

        if(req.checkLogin == false){
            return res.render('homepage.ejs',{data: newMoviews, comingsoon: newComingSoon, banner: banners});
        }
        else{
            return res.render('homepageLogin.ejs',{data: newMoviews, comingsoon: newComingSoon, username: req.username, userID: req.userID , banner: banners});
        }
    }
    else{
        if(req.checkLogin == false){
            return res.render('homepage.ejs',{data: films, comingsoon: comingSoon, banner: banners});
        }
        else{
            return res.render('homepageLogin.ejs',{data: films, comingsoon: comingSoon, username: req.username , userID: req.userID, banner: banners});
        }
    }
}
module.exports = {GetHomePage};